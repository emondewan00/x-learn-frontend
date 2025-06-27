import React from "react";
import { ModuleTitleForm } from "./_components/ModuleTitleForm";
import { LessonsForm } from "./_components/LessonsForm";
import { cookies } from "next/headers";
import DeleteModule from "./_components/DeleteModule";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const Module = async ({
  params,
}: {
  params: Promise<{ id: string; moduleId: string }>;
}) => {
  const { moduleId, id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("authjs.session-token")?.value;

  const response = await fetch(`${base_url}/modules/${moduleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
    next: { tags: ["modules"] },
  });

  const data = await response.json();

  if (!data?.success)
    return <div>{data.message || "Something went wrong"}</div>;
  const { title, lessons, updatedAt } = data.data;

  return (
    <div>
      <DeleteModule moduleId={moduleId} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Customize your module
          </h2>

          <ModuleTitleForm moduleId={moduleId} initialData={{ title: title }} />

          <h2 className="text-2xl font-bold mb-4 text-gray-800 my-6">
            Module Lessons
          </h2>

          <LessonsForm
            key={updatedAt}
            moduleId={moduleId}
            courseId={id}
            initialData={{ lessons: lessons }}
          />
        </div>
      </div>
    </div>
  );
};

export default Module;
