"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import SearchAndFilter from "./_components/SearchAndFilter";
import LessonsTable from "./_components/LessonsTable";
import getToken from "@/lib/getToken";

interface Lessons {
  _id: string;
  title: string;
  courseId: Course;
  moduleId: Course;
  videoUrl: string;
  resources: string[];
  createdAt: string;
  updatedAt: string;
}

type Course = {
  _id: string;
  title: string;
};

export default function LessonsManagement() {
  const [data, setData] = useState<{
    curses: Course[];
    modules: Course[];
    limit: number;
    page: number;
    total: number;
    totalPages: number;
    data: Lessons[];
  }>({
    curses: [],
    modules: [],
    limit: 0,
    page: 0,
    total: 0,
    totalPages: 0,
    data: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [selectedModule, setSelectedModule] = useState<string>("all");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    const getData = async () => {
      const token = await getToken();
      const res = await axiosClient.get(`/lessons?${searchParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setData({
          curses: res.data.courses,
          modules: res.data.modules,
          limit: res.data.limit,
          page: res.data.page,
          total: res.data.total,
          totalPages: res.data.totalPages,
          data: res.data.data,
        });
      }
    };
    getData();
  }, [searchParams]);

  useEffect(() => {
    if (params.get("moduleId")) {
      const moduleId = params.get("moduleId");
      setSelectedModule(moduleId!);
    }

    if (params.get("courseId")) {
      const courseId = params.get("courseId");
      setSelectedCourse(courseId!);
    }
    if (params.get("search")) {
      const search = params.get("search");
      setSearchTerm(search!);
    }
    if (params.get("limit")) {
      const limit = params.get("limit");
      setLimit(parseInt(limit!));
    }
    if (params.get("page")) {
      const page = params.get("page");
      setPage(parseInt(page!));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteLesson = async (lessonId: string) => {
    try {
      const token = await getToken();
      const res = await axiosClient.delete(`/lessons/${lessonId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        toast.success("Lesson deleted successfully");
        const filteredLectures = data.data.filter(
          (lesson) => lesson._id !== lessonId
        );
        setData({ ...data, data: filteredLectures });
      }
    } catch (error) {
      console.log("Failed to delete lesson", error);
      toast.error("Something went wrong");
    }
  };

  const onChangeCourse = (value: string) => {
    params.delete("courseId");

    setSelectedCourse(value);
    if (value === "all") {
      router.push(`${pathName}?${params.toString()}`);
      return;
    }
    params.append("courseId", value);

    router.push(`${pathName}?${params.toString()}`);
  };

  const onChangeModule = (value: string) => {
    params.delete("moduleId");
    setSelectedModule(value);
    if (value === "all") {
      router.push(`${pathName}?${params.toString()}`);
      return;
    }

    params.append("moduleId", value);
    router.push(`${pathName}?${params.toString()}`);
  };

  const handleSearch = (value: string) => {
    params.delete("search");
    setSearchTerm(value);

    if (value === "") {
      router.push(`${pathName}?${params.toString()}`);
      return;
    }

    params.append("search", value);
    router.push(`${pathName}?${params.toString()}`);
  };

  const onLimitChange = (value: string) => {
    params.delete("limit");
    params.delete("page");
    const limitN = parseInt(value);
    params.set("limit", limitN.toString());
    setLimit(limitN);
    router.push(`${pathName}?${params.toString()}`);
  };

  const onPageChange = (value: number) => {
    params.set("page", value.toString());
    setPage(value);
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Lessons Management</h1>
          <p className="text-muted-foreground">
            Manage your course lessons and materials
          </p>
        </div>
      </div>

      <SearchAndFilter
        courses={data.curses}
        modules={data.modules}
        onChangeCourse={onChangeCourse}
        onChangeModule={onChangeModule}
        selectedCourse={selectedCourse}
        selectedModule={selectedModule}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />

      <LessonsTable
        limit={limit}
        page={page}
        total={data.total}
        totalPages={data.totalPages}
        lessons={data.data}
        handleDeleteLesson={handleDeleteLesson}
        onLimitChange={onLimitChange}
        onPageChange={onPageChange}
      />
    </div>
  );
}
