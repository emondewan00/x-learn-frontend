"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const deleteModule = async (lessonId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authjs.session-token")?.value;
  const response = await fetch(` ${base_url}/modules/${lessonId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  revalidateTag("modules");

  return response.json();
};

export default deleteModule;
