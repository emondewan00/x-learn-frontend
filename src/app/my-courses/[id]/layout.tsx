import { auth } from "@/auth";
import React from "react";
import { redirect } from "next/navigation";

const CourseWatchLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
};

export default CourseWatchLayout;
