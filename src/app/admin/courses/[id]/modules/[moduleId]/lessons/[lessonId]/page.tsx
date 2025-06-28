import React from "react";
import { cookies } from "next/headers";
import { LessonTitle } from "../../_components/LessonTitle";
import { VideoUrlForm } from "../../_components/LessonVideoForm";
import { LessonDescriptionForm } from "../../_components/LessonDescriptionForm";
import PDFInput from "../../_components/PDFInput";
import DeleteLesson from "../_components/DeleteLesson";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
const cookie_name = process.env.COOKIE_NAME || "session-token";

const Lesson = async ({
  params,
}: {
  params: Promise<{ id: string; moduleId: string; lessonId: string }>;
}) => {
  const { lessonId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get(cookie_name)?.value;

  const response = await fetch(`${base_url}/lessons/${lessonId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["lessons"] },
  });

  const data = await response.json();

  if (!data?.success) {
    return <div>{data.message || "Something went wrong"}</div>;
  }
  const { title, description, video, resources } = data.data;

  return (
    <div>
      <DeleteLesson lessonId={lessonId} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Customize Your Lesson
              </h2>
            </div>
            <LessonTitle
              initialData={{
                title: title || "",
              }}
              lessonId={lessonId}
            />
            <LessonDescriptionForm
              initialData={{ description: description || "" }}
              lessonId={lessonId}
            />
            <PDFInput lessonId={lessonId} resources={resources || []} />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Add a video
            </h2>
          </div>
          <VideoUrlForm
            initialData={{
              videoUrl: video || "",
            }}
            lessonId={lessonId}
          />
        </div>
      </div>
    </div>
  );
};

export default Lesson;
