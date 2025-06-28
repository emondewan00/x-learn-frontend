import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";
import Image from "next/image";
import CourseDeleteButton from "./_components/CourseDeleteButton";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
const resource_url = process.env.NEXT_PUBLIC_RESOURCE_URL + "/thumbnails/";

export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  published: boolean;
  modules: string[];
  enrolledCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  modulesCount: number;
  lessonsCount: number;
}
const cookie_name = process.env.COOKIE_NAME || "authjs.session-token";
const AdminCoursePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookie_name)?.value;

  const response = await fetch(`${base_url}/courses/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) return <div>Something went wrong</div>;

  const courses: { data: Course[] } = await response.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pr-8">
      <Button className="absolute bottom-8 right-8 rounded-full bg-green-600 text-white hover:bg-green-700 size-14">
        <Link href="/admin/courses/new">
          <Plus className="size-10" />
        </Link>
      </Button>

      {courses?.data?.map((course) => (
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
            <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
              <Link href={`/admin/courses/${course._id}`}>{course.title}</Link>
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <CardDescription className="text-sm line-clamp-2 text-muted-foreground">
                <span>Modules : {course.modulesCount || 0}</span>
              </CardDescription>
              <CardDescription className="text-sm line-clamp-2 text-muted-foreground">
                <span>Duration : 20 hours</span>
              </CardDescription>
              <CardDescription className="text-sm line-clamp-2 text-muted-foreground">
                <span>Lessons : {course.lessonsCount || 0} </span>
              </CardDescription>
              <CardDescription className="text-sm line-clamp-2 text-muted-foreground">
                <span>Published: {course.published ? "Yes" : "No"}</span>
              </CardDescription>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600">
                {course.price}
              </span>
              <div className="flex items-center">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                  Edit
                </Button>

                <CourseDeleteButton courseId={course._id} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminCoursePage;
