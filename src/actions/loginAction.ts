"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

const loginAction = async (formData: FormData) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(baseUrl + "/auth/login", {
      method: "POST",
      body: JSON.stringify(formData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok == false) {
      return await response.json();
    }

    const user = await response.json();

    await signIn("credentials", user?.user);
  } catch (error) {
    if (isRedirectError(error)) {
      redirect("/");
    } else {
      return error;
    }
  }
};

export default loginAction;
