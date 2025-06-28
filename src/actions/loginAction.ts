"use server";
import { signIn } from "@/auth";
import axiosClient from "@/lib/axios";
import { revalidatePath } from "next/cache";

type FormData = {
  email: string;
  password: string;
};

const loginAction = async (formData: FormData) => {
  try {
    const res = await axiosClient.post("/auth/login", formData);

    if (res.status !== 200) {
      return { error: "Invalid credentials" };
    }

    const user = res.data;

    await signIn("credentials", user?.user);

    revalidatePath("/");
  } catch (error) {
    return error;
  }
};

export default loginAction;
