"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
const cookie_name = process.env.COOKIE_NAME || "session-token";

const deleteModule = async (lessonId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookie_name)?.value;
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
