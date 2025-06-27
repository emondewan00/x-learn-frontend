"use client";
import CourseCard from "@/components/CourseCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import axiosClient from "@/lib/axios";
import Course from "@/types/course";
import React, { useEffect, useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const getCourses = async () => {
      const data = await axiosClient.get("/courses");

      if (data.data.data.length === 0) {
        alert("No courses found");
      } else {
        setCourses(data.data.data);
      }
    };

    getCourses();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6 min-h-[60vh]">
        <div className="text-center border-b pb-12 mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Courses</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive collection of courses designed to help
            you master new skills and advance your career.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
