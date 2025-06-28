"use server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
const cookie_name = process.env.COOKIE_NAME || "session-token";

const deleteLesson = async (lessonId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookie_name)?.value;
  const response = await fetch(` ${base_url}/lessons/${lessonId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  revalidateTag("lessons");

  return response.json();
};

export default deleteLesson;
