"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Loader2Icon, Star, Users } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import Course from "@/types/course";
import { useSession } from "next-auth/react";
import axiosClient from "@/lib/axios";

const resource_url = process.env.NEXT_PUBLIC_RESOURCE_URL + "/thumbnails/";

type Props = {
  course: Course;
};

const CourseCard: React.FC<Props> = ({ course }) => {
  const { data: session } = useSession();
  const [leading, setLeading] = useState<boolean>(false);

  const handleEnroll = async () => {
    if (!session?.user) return;
    setLeading(true);
    const checkAlreadyEnrolled = await axiosClient.get(
      `/userCourses/course/${course._id}`
    );

    if (
      checkAlreadyEnrolled.status === 200 &&
      checkAlreadyEnrolled.data?.isEnrolled
    ) {
      alert("You are already enrolled in this course");
      setLeading(false);
      return;
    } else {
      const response = await axiosClient.post(`/userCourses/`, {
        courseId: course._id,
        userId: session.user.id,
      });

      if (response.status === 201) {
        alert("You have successfully enrolled in the course");
      }
    }

    setLeading(false);
  };

  return (
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
          {course.title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          by Sarah Johnson
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">3.8</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.enrolledCount || 0}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            {course.price}
          </span>
          <Button
            disabled={leading}
            onClick={handleEnroll}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            {leading && <Loader2Icon className="animate-spin" />} Enroll Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
