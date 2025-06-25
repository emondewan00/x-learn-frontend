"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronRight,
  Search,
  CheckCircle,
  Circle,
  SkipForward,
  SkipBack,
  BookOpen,
  Clock,
  Play,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

const CourseWatch = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModules, setOpenModules] = useState<number[]>([0]);

  const courseData = {
    title: "Complete React Development Course",
    instructor: "Sarah Johnson",
    description:
      "Master React from beginner to advanced level with hands-on projects and real-world examples. This comprehensive course covers everything from basic components to advanced state management, hooks, and modern React patterns.",
  };

  const modules = [
    {
      id: 0,
      title: "Getting Started with React",
      lessons: [
        {
          id: 0,
          title: "Introduction to React",
          duration: "15:30",
          completed: true,
          videoId: "dQw4w9WgXcQ",
        },
        {
          id: 1,
          title: "Setting up Development Environment",
          duration: "12:45",
          completed: true,
          videoId: "dQw4w9WgXcQ",
        },
        {
          id: 2,
          title: "Your First React App",
          duration: "18:20",
          completed: false,
          videoId: "dQw4w9WgXcQ",
        },
      ],
    },
    {
      id: 1,
      title: "React Fundamentals",
      lessons: [
        {
          id: 3,
          title: "JSX and Components",
          duration: "22:15",
          completed: false,
          videoId: "dQw4w9WgXcQ",
        },
        {
          id: 4,
          title: "State and Props",
          duration: "16:40",
          completed: false,
          videoId: "dQw4w9WgXcQ",
        },
        {
          id: 5,
          title: "Event Handling",
          duration: "25:30",
          completed: false,
          videoId: "dQw4w9WgXcQ",
        },
      ],
    },
    {
      id: 2,
      title: "Advanced React Concepts",
      lessons: [
        {
          id: 6,
          title: "Hooks Overview",
          duration: "28:45",
          completed: false,
          videoId: "dQw4w9WgXcQ",
        },
        {
          id: 7,
          title: "Context API",
          duration: "20:15",
          completed: false,
          videoId: "dQw4w9WgXcQ",
        },
        {
          id: 8,
          title: "Performance Optimization",
          duration: "32:10",
          completed: false,
          videoId: "dQw4w9WgXcQ",
        },
      ],
    },
  ];

  const allLessons = modules.flatMap((module) => module.lessons);
  const currentLessonData = allLessons[currentLesson];
  const completedLessons = allLessons.filter(
    (lesson) => lesson.completed
  ).length;
  const totalLessons = allLessons.length;
  const overallProgress = (completedLessons / totalLessons) * 100;

  const filteredModules = modules
    .map((module) => ({
      ...module,
      lessons: module.lessons.filter((lesson) =>
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((module) => module.lessons.length > 0);

  const toggleModule = (moduleId: number) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const nextLesson = () => {
    if (currentLesson < allLessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const getModuleProgress = (moduleId: number) => {
    const module = modules[moduleId];
    const completedInModule = module.lessons.filter(
      (lesson) => lesson.completed
    ).length;
    return (completedInModule / module.lessons.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Video and Content */}
          <div className="lg:col-span-2">
            {/* Course Title */}

            <Card className="mb-4 p-6">
              <CardContent className="p-0">
                <CardDescription className=" uppercase font-semibold text-blue-600 flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>{courseData.instructor}</span>
                </CardDescription>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  {courseData.title}
                </CardTitle>
              </CardContent>
              <CardFooter className="p-0 flex gap-x-2 mt-2">
                <CardDescription className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>12h 30min</span>
                </CardDescription>
                <CardDescription className="flex items-center">
                  <Play className="mr-2 h-4 w-4" />
                  <span>Lesson 1 of 16</span>
                </CardDescription>
              </CardFooter>
            </Card>

            {/* Video Player */}
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${currentLessonData.videoId}`}
                    title={currentLessonData.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-t-lg"
                  ></iframe>
                </div>

                {/* Video Controls */}
                <div className="p-4 bg-white border-t">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">
                      {currentLessonData.title}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {currentLessonData.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={prevLesson}
                        disabled={currentLesson === 0}
                      >
                        <SkipBack className="w-4 h-4 mr-1" />
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={nextLesson}
                        disabled={currentLesson === allLessons.length - 1}
                      >
                        Next
                        <SkipForward className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600">
                      Lesson {currentLesson + 1} of {allLessons.length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About this Lesson</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {courseData.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Course Content */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Overall Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{Math.round(overallProgress)}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </div>

                {/* Search Input */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search lessons..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Modules and Lessons */}
                <div className="space-y-2">
                  {filteredModules.map((module) => (
                    <div key={module.id} className="border rounded-lg">
                      <Collapsible
                        open={openModules.includes(module.id)}
                        onOpenChange={() => toggleModule(module.id)}
                      >
                        <CollapsibleTrigger className="w-full p-3 text-left hover:bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {openModules.includes(module.id) ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                              <span className="font-medium">
                                {module.title}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {module.lessons.filter((l) => l.completed).length}
                              /{module.lessons.length}
                            </span>
                          </div>
                          <div className="mt-2">
                            <Progress
                              value={getModuleProgress(module.id)}
                              className="h-1"
                            />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="px-3 pb-3 space-y-1">
                            {module.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className={`p-2 rounded cursor-pointer text-sm transition-colors ${
                                  currentLesson === lesson.id
                                    ? "bg-blue-50 border border-blue-200"
                                    : "hover:bg-gray-50"
                                }`}
                                onClick={() => setCurrentLesson(lesson.id)}
                              >
                                <div className="flex items-center space-x-2">
                                  {lesson.completed ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-gray-400" />
                                  )}
                                  <div className="flex-1">
                                    <div className="font-medium">
                                      {lesson.title}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                      {lesson.duration}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseWatch;
