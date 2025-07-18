"use client";
import { Button } from "@/components/ui/button";
import axiosClient from "@/lib/axios";
import getToken from "@/lib/getToken";
import React from "react";
import { toast } from "sonner";
type Props = {
  courseId: string;
};

const CourseDeleteButton: React.FC<Props> = ({ courseId }) => {
  const handleCourseDelete = async () => {
    try {
      const token = await getToken();
      await axiosClient.delete(`/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Course deleted successfully");
    } catch (error) {
      console.log("Failed to delete course", error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Button
      onClick={handleCourseDelete}
      size="sm"
      className="bg-red-600 hover:bg-red-700 ml-2 cursor-pointer"
    >
      Delete
    </Button>
  );
};

export default CourseDeleteButton;
