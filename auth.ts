import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { JWTDecodeParams, JWT } from "next-auth/jwt";

const secret = process.env.AUTH_SECRET;

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  secret,
  jwt: {
    async encode({ token }) {
      if (!token) throw new Error("Missing token");

      return jwt.sign(token as object, secret as string);
    },

    async decode({ token }: JWTDecodeParams): Promise<JWT | null> {
      if (!token) return null;

      try {
        const decoded = jwt.verify(token, secret as string);

        return decoded as JWT;
      } catch (err) {
        console.error("JWT decode error:", err);
        return null;
      }
    },
  },
  cookies: {
    sessionToken: {
      name: "session-token",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        role: {
          label: "Role",
          type: "text",
        },
        id: {
          label: "ID",
          type: "text",
        },
        name: {
          label: "Name",
          type: "text",
        },
      },

      authorize: async (credentials) => {
        if (!credentials) return null;

        return {
          id: credentials.id as string,
          name: credentials.name as string,
          email: credentials.email as string,
          role: credentials.role as string,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
