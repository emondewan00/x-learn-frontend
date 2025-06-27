"use client";
import { Navbar } from "@/components/Navbar";
import LeftSide from "@/components/myCourse/LeftSide";
import RightSide from "@/components/myCourse/RightSide";
import { useParams } from "next/navigation";
import CourseProvider from "@/provider/CourseProvider";
import { useRouter } from "next/navigation";

const CourseWatch = () => {
  const param = useParams<{ id: string }>();
  const router = useRouter();
  if (!param.id) {
    router.push("/my-courses");
    return <div>Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <CourseProvider courseId={param.id}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side - Video and Content */}
            <LeftSide />

            {/* Right Side - Course Content */}
            <RightSide />
          </div>
        </CourseProvider>
      </div>
    </div>
  );
};

export default CourseWatch;
