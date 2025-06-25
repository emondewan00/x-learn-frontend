import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  jwt: {
    async encode({ secret, token }) {
      const encodedToken = jwt.sign(token, secret[0]);
      return encodedToken;
    },
    async decode({ secret, token }) {
      const decodedToken = jwt.verify(token, secret[0]);
      return decodedToken;
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
        if (!credentials) {
          return null;
        }

        return {
          id: credentials?.id,
          name: credentials?.name,
          email: credentials?.email,
          role: credentials?.role,
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
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }

      return session;
    },
  },
});
