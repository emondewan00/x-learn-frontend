"use client";
import axiosClient from "@/lib/axios";
import React, { useEffect, useState } from "react";
import Module from "@/types/module";
import Lesson from "@/types/lesson";

export const CourseContext = React.createContext<{
  currentLesson: Lesson | null;
  handleClickLesson: (lesson: Lesson) => void;
  modulesData: Module[];
  openModule: string;
  setOpenModule: React.Dispatch<React.SetStateAction<string>>;
  completedLessons: Set<string>;
  setCompletedLessons: React.Dispatch<React.SetStateAction<Set<string>>>;
  progress: number;
  toggleModule: (moduleId: string) => void;
  nextHandler: () => void;
  prevHandler: () => void;
  lessonOutOfLessons: string;
  moduleTitle: string;
  isUnlocked: (lessonId: string) => boolean;
  lastLessonId: string;
  firstLessonId: string;
  completeCourseHandler: () => void;
  allLessons: Lesson[];
}>({
  currentLesson: null,
  handleClickLesson: () => {},
  modulesData: [],
  openModule: "",
  setOpenModule: () => {},
  completedLessons: new Set(),
  setCompletedLessons: () => {},
  progress: 0,
  toggleModule: () => {},
  nextHandler: () => {},
  prevHandler: () => {},
  lessonOutOfLessons: "",
  moduleTitle: "",
  isUnlocked: () => false,
  lastLessonId: "",
  firstLessonId: "",
  completeCourseHandler: () => {},
  allLessons: [],
});

const CourseProvider = ({
  children,
  courseId,
}: {
  children: React.ReactNode;
  courseId: string;
}) => {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [modulesData, setModulesData] = useState<Module[]>([]);
  const [openModule, setOpenModule] = useState<string>("");
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axiosClient.get(`/modules/course/${courseId}`);
        setModulesData(response.data.data);
        setCompletedLessons(new Set(response.data.completedLessons));
        setCurrentLesson(response.data.activeLesson);
        setOpenModule(response.data.activeLesson.moduleId);
      } catch (error) {
        console.log("Error fetching modules:", error);
      }
    };

    fetchModules();
  }, [courseId]);

  const allLessons = modulesData.flatMap((module) => module.lessons);

  const handleClickLesson = async (lesson: Lesson) => {
    setCurrentLesson(lesson);
    await axiosClient.patch(`/userCourses/active`, {
      courseId,
      lastVisitedLesson: lesson._id,
    });
  };

  const toggleModule = (moduleId: string) => {
    if (openModule === moduleId) {
      setOpenModule("");
    } else {
      setOpenModule(moduleId);
    }
  };

  const nextHandler = async () => {
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson._id === currentLesson?._id
    );
    if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
      const newCurrentLesson = allLessons[currentIndex + 1];

      setCurrentLesson(newCurrentLesson);

      if (!completedLessons.has(currentLesson?._id as string)) {
        setCompletedLessons(
          (prev) => new Set([...prev, currentLesson?._id as string])
        );

        await axiosClient.patch(`/userCourses`, {
          courseId,
          lessonId: currentLesson?._id,
          lastVisitedLesson: newCurrentLesson._id,
        });
      }
      if (openModule !== newCurrentLesson.moduleId) {
        toggleModule(newCurrentLesson.moduleId);
      }
    }
  };

  const prevHandler = () => {
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson._id === currentLesson?._id
    );
    if (currentIndex !== -1 && currentIndex > 0) {
      setCurrentLesson(allLessons[currentIndex - 1]);

      if (openModule !== allLessons[currentIndex - 1].moduleId) {
        toggleModule(allLessons[currentIndex - 1].moduleId);
      }
    }
  };

  const isUnlocked = (lessonId: string): boolean => {
    if (completedLessons.has(lessonId)) return true;
    const firstIncomplete = allLessons.find(
      (l) => !completedLessons.has(l._id)
    );
    return firstIncomplete?._id === lessonId;
  };

  const getCourseProgress = () => {
    const done = allLessons.filter((l) => completedLessons.has(l._id)).length;
    return Math.round((done / allLessons.length) * 100);
  };

  const completeCourseHandler = async () => {
    if (!completedLessons.has(currentLesson?._id as string)) {
      setCompletedLessons(
        (prev) => new Set([...prev, currentLesson?._id as string])
      );
      // add a toast
      await axiosClient.patch(`/userCourses`, {
        courseId,
        lessonId: currentLesson?._id,
        lastVisitedLesson: currentLesson?._id,
      });
    }
  };

  const currentModule = modulesData.find((m) => m._id === openModule);

  const currentIndex =
    currentModule?.lessons.findIndex(
      (lesson) => lesson._id === currentLesson?._id
    ) || 0;

  const totalLessonsInModule = currentModule?.lessons.length || 0;

  const lessonOutOfLessons = `${currentIndex + 1}/${totalLessonsInModule}`;

  const lastLessonId =
    allLessons.length > 0 ? allLessons[allLessons.length - 1]._id : "";
  const firstLessonId = allLessons.length > 0 ? allLessons[0]._id : "";

  return (
    <CourseContext.Provider
      value={{
        progress: getCourseProgress() || 0,
        currentLesson,
        handleClickLesson,
        modulesData,
        openModule,
        setOpenModule,
        toggleModule,
        nextHandler,
        prevHandler,
        isUnlocked,
        completedLessons,
        setCompletedLessons,
        lessonOutOfLessons,
        moduleTitle: currentModule?.title || "",
        lastLessonId,
        firstLessonId,
        completeCourseHandler,
        allLessons,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseProvider;
