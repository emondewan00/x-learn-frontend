import React from "react";
import { TitleForm } from "./_courseDetails/TitleForm";
import { DescriptionForm } from "./_courseDetails/DescriptionForm";
import { ImageForm } from "./_courseDetails/ImageForm";
import { PriceForm } from "./_courseDetails/PriceForm";
import { ModulesForm } from "./_courseDetails/ModulesForm";

const AdminCourseDetails = () => {
  return (
    <div className="grid grid-cols-2 gap-x-4">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Course Details
        </h2>

        <TitleForm courseId={1} initialData={{}} />
        <DescriptionForm courseId={1} />
        <ImageForm courseId={1} initialData={{}} />
        <PriceForm courseId={1} />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Course Modules
        </h2>
        <ModulesForm courseId={1} />
      </div>
    </div>
  );
};

export default AdminCourseDetails;
