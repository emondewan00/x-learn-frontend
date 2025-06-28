import React from "react";
import { TitleForm } from "./_courseDetails/TitleForm";
import { DescriptionForm } from "./_courseDetails/DescriptionForm";
import { ImageForm } from "./_courseDetails/ImageForm";
import { PriceForm } from "./_courseDetails/PriceForm";
import { ModulesForm } from "./_courseDetails/ModulesForm";
import { cookies } from "next/headers";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
const resource_url = process.env.NEXT_PUBLIC_RESOURCE_URL + "/thumbnails/";
const cookie_name = process.env.COOKIE_NAME || "authjs.session-token";

const AdminCourseDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const courseId = (await params).id;

  const cookieStore = await cookies();
  const token = cookieStore.get(cookie_name)?.value;

  const response = await fetch(`${base_url}/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  const data = await response.json();

  if (!data?.data) return <div>Course not found</div>;
  const { title, description, price, image, modules, updatedAt } = data?.data;

  return (
    <div className="grid md:grid-cols-2 gap-x-4">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Course Details
        </h2>

        <TitleForm
          courseId={courseId}
          initialData={{
            title: title,
          }}
        />
        <DescriptionForm courseId={courseId} initialData={{ description }} />
        <ImageForm
          courseId={courseId}
          initialData={{ imageUrl: resource_url + image }}
        />
        <PriceForm initialData={{ price: price }} courseId={courseId} />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Course Modules
        </h2>
        <ModulesForm
          key={updatedAt}
          initialData={{ modules: modules }}
          courseId={courseId}
        />
      </div>
    </div>
  );
};

export default AdminCourseDetails;
