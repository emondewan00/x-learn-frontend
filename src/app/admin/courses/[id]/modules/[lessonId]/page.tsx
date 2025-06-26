import React from "react";
import { ModuleTitleForm } from "./_components/ModuleTitleForm";
import { LessonsForm } from "./_components/LessonsForm";

const Lesson = () => {
  return (
    <div className="grid grid-cols-2 gap-x-4">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Customize your module
        </h2>

        <ModuleTitleForm courseId={1} initialData={{}} />

        <h2 className="text-2xl font-bold mb-4 text-gray-800 my-6">
          Module Lessons
        </h2>

        <LessonsForm courseId={1} />
      </div>
    </div>
  );
};

export default Lesson;
