import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { cookies } from "next/headers";
import React from "react";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Courses</h1>
      </div>
      <Footer />
    </div>
  );
};

export default MyCourses;
