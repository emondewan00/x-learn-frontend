"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import axiosClient from "@/lib/axios";
import LeftSide from "@/components/myCourse/LeftSide";
import RightSide from "@/components/myCourse/RightSide";
import { useParams } from "next/navigation";

export type Module = {
  _id: string;
  title: string;
  lessons: Lesson[];
  description: string;
  order: number;
  completedLessons: number;
};

export type Lesson = {
  _id: string;
  title: string;
  status: "locked" | "unlocked" | "in_progress" | "completed";
  description: string;
  order: number;
  resources: string[];
  video: string;
  moduleId: string;
};

export type Progress = {
  progress: number;
  completedLessons: string[];
  totalLessons: number;
};

const CourseWatch = () => {
  const param = useParams<{ id: string }>();
  const [currentLesson, setCurrentLesson] = useState<Lesson>();
  const [searchQuery, setSearchQuery] = useState("");
  const [openModules, setOpenModules] = useState<string[]>([]);
  const [progress, setProgress] = useState<Progress>({
    progress: 0,
    completedLessons: [],
    totalLessons: 0,
  });
  const [modulesData, setModulesData] = useState<Module[]>([]);

  useEffect(() => {
    const getModuleData = async () => {
      const response = await axiosClient.get(`/modules/course/${param.id}`);
      if (response.status === 200) {
        setModulesData(response.data?.data);
        setProgress({
          progress: response.data?.progress,
          completedLessons: response.data?.completedLessons,
          totalLessons: response.data?.totalLessons,
        });
        setCurrentLesson(response.data?.activeLesson);
        if (response.data?.activeLesson?.moduleId) {
          setOpenModules([response.data?.activeLesson?.moduleId]);
        }
      }
    };
    getModuleData();
  }, [param.id]);

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  async function markLessonCompleted(
    modules: Module[],
    moduleIndex: number,
    lessonIndex: number,
    lessonId: string
  ) {
    const updatedModules = [...modules];
    const moduleCopy = { ...updatedModules[moduleIndex] };
    const lessonsCopy = [...moduleCopy.lessons];

    if (lessonsCopy[lessonIndex].status !== "completed") {
      lessonsCopy[lessonIndex] = {
        ...lessonsCopy[lessonIndex],
        status: "completed",
      };
      moduleCopy.completedLessons = (moduleCopy.completedLessons || 0) + 1;

      // store this lesson as completed and update last visited by next lesson id
      const response = await axiosClient.post(`/userCourses/complete`, {
        courseId: param.id,
        lessonId: lessonsCopy[lessonIndex]._id,
        lastVisitedLesson: lessonId,
      });

      console.log(response.data, "response");
    }

    moduleCopy.lessons = lessonsCopy;
    updatedModules[moduleIndex] = moduleCopy;
    return updatedModules;
  }

  function unlockLesson(
    modules: Module[],
    moduleIndex: number,
    lessonIndex: number
  ) {
    const updatedModules = [...modules];
    const moduleCopy = { ...updatedModules[moduleIndex] };
    const lessonsCopy = [...moduleCopy.lessons];

    if (lessonsCopy[lessonIndex].status === "locked") {
      lessonsCopy[lessonIndex] = {
        ...lessonsCopy[lessonIndex],
        status: "unlocked",
      };
    }

    moduleCopy.lessons = lessonsCopy;
    updatedModules[moduleIndex] = moduleCopy;
    return updatedModules;
  }

  function getCurrentPosition(modules: Module[], currentLesson: Lesson) {
    const currentModuleIndex = modules.findIndex(
      (m) => m._id === currentLesson.moduleId
    );
    if (currentModuleIndex === -1) return null;

    const currentModule = modules[currentModuleIndex];
    const currentLessonIndex = currentModule.lessons.findIndex(
      (l) => l._id === currentLesson._id
    );
    if (currentLessonIndex === -1) return null;

    return {
      currentModuleIndex,
      currentLessonIndex,
      currentModule,
    };
  }

  async function navigateNext(modules: Module[], currentLesson: Lesson) {
    const result = getCurrentPosition(modules, currentLesson);
    if (!result) return;

    const { currentModuleIndex, currentLessonIndex, currentModule } = result;

    const nextLessonIndex = currentLessonIndex + 1;

    if (nextLessonIndex < currentModule.lessons.length) {
      const nextLesson = currentModule.lessons[nextLessonIndex];
      let updatedModules = await markLessonCompleted(
        modules,
        currentModuleIndex,
        currentLessonIndex,
        nextLesson._id
      );
      updatedModules = unlockLesson(
        updatedModules,
        currentModuleIndex,
        nextLessonIndex
      );

      setModulesData(updatedModules);
      setCurrentLesson(nextLesson);
      return;
    }

    const nextModuleIndex = currentModuleIndex + 1;
    if (nextModuleIndex < modules.length) {
      const nextModule = modules[nextModuleIndex];
      const nextLesson = nextModule.lessons[0];

      let updatedModules = await markLessonCompleted(
        modules,
        currentModuleIndex,
        currentLessonIndex,
        nextLesson._id
      );
      updatedModules = unlockLesson(updatedModules, nextModuleIndex, 0);

      setModulesData(updatedModules);
      setCurrentLesson(nextLesson);

      if (!openModules.includes(nextModule._id)) {
        setOpenModules((prev) => [...prev, nextModule._id]);
      }

      return;
    }

    const updatedModules = await markLessonCompleted(
      modules,
      currentModuleIndex,
      currentLessonIndex,
      currentLesson._id
    );
    setModulesData(updatedModules);
  }

  function navigatePrevious(modules: Module[], currentLesson: Lesson) {
    const result = getCurrentPosition(modules, currentLesson);
    if (!result) return false;

    const { currentModuleIndex, currentLessonIndex, currentModule } = result;

    const previousLessonIndex = currentLessonIndex - 1;

    if (previousLessonIndex >= 0) {
      const previousLesson = currentModule.lessons[previousLessonIndex];
      setCurrentLesson(previousLesson);
      return;
    }

    const previousModuleIndex = currentModuleIndex - 1;
    if (previousModuleIndex >= 0) {
      const previousModule = modules[previousModuleIndex];
      const previousLesson =
        previousModule.lessons[previousModule.lessons.length - 1];

      setCurrentLesson(previousLesson);
      if (!openModules.includes(previousModule._id)) {
        setOpenModules((prev) => [...prev, previousModule._id]);
      }
    }
  }

  const currentModule: Module | undefined = modulesData.find(
    (m) => m._id === currentLesson?.moduleId
  );

  const lessonOutOfLessons =
    (currentModule &&
      currentModule.lessons.findIndex((l) => l._id === currentLesson?._id) +
        1) ||
    0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Video and Content */}
          <LeftSide
            currentLesson={currentLesson as Lesson}
            nextHandler={() =>
              navigateNext(modulesData, currentLesson as Lesson)
            }
            prevHandler={() =>
              navigatePrevious(modulesData, currentLesson as Lesson)
            }
            lessonOutOfLessons={`Lesson ${lessonOutOfLessons} of ${currentModule?.lessons.length}`}
            moduleTitle={currentModule?.title || ""}
          />

          {/* Right Side - Course Content */}
          <RightSide
            currentLesson={currentLesson as Lesson}
            modulesData={modulesData}
            toggleModule={toggleModule}
            openModules={openModules}
            setCurrentLesson={setCurrentLesson}
            progressData={progress as Progress}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseWatch;
