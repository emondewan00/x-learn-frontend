import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Course from "@/types/course";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen } from "lucide-react";

type CourseWithProgress = Course & {
  progress: number;
};

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
const resource_url = process.env.NEXT_PUBLIC_RESOURCE_URL + "/thumbnails/";

const MyCourses = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authjs.session-token")?.value;

  const response = await fetch(`${base_url}/userCourses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);
  let content = <></>;

  if (data?.data?.length === 0) {
    content = (
      <div className="container mx-auto px-4 py-6 h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-96">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            No courses found
          </h1>
          <p className="text-lg text-gray-600">
            You have not enrolled in any courses yet.
          </p>
          <Link href="/courses">
            <Button
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {data?.data?.length > 0 &&
          data.data.map((course: CourseWithProgress) => (
            <Card
              key={course._id}
              className="group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  width={300}
                  height={200}
                  src={resource_url + course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors ">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="">
                <div className="my-4">
                  <Progress value={course.progress} />
                  <p className="text-sm text-gray-600 text-center mt-1">
                    Progress: {course.progress}%
                  </p>
                </div>
                <Button className="w-full ">
                  <Link href={`/my-courses/${course._id}`}>View Course</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Courses</h1>

        {content}
      </div>
      <Footer />
    </div>
  );
};

export default MyCourses;
