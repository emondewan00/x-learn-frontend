import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Circle,
  Search,
} from "lucide-react";
import { Input } from "../ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  Lesson,
  Module,
  Progress as ProgressType,
} from "@/app/my-courses/[id]/page";

type Props = {
  modulesData: Module[];
  toggleModule: (moduleId: string) => void;
  openModules: string[];
  currentLesson: Lesson;
  setCurrentLesson: (lesson: Lesson) => void;
  progressData: ProgressType;
};

const RightSide: React.FC<Props> = ({
  modulesData,
  toggleModule,
  openModules,
  currentLesson,
  setCurrentLesson,
  progressData,
}) => {
  return (
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
              <span>{Math.round(progressData?.progress)}%</span>
            </div>
            <Progress value={progressData?.progress} className="h-2" />
          </div>

          {/* Search Input */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search lessons..."
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Modules and Lessons */}
          <div className="space-y-2">
            {modulesData?.map((module) => (
              <div key={module._id} className="border rounded-lg">
                <Collapsible
                  open={openModules.includes(module._id)}
                  onOpenChange={() => toggleModule(module._id)}
                >
                  <CollapsibleTrigger className="w-full p-3 text-left hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {openModules.includes(module._id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                        <span className="font-medium">{module.title}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {module.completedLessons}/{module.lessons.length}
                      </span>
                    </div>
                    <div className="mt-2">
                      <Progress
                        value={
                          (module.completedLessons / module.lessons.length) *
                          100
                        }
                        className="h-1"
                      />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-3 pb-3 space-y-1">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson._id}
                          className={`p-2 rounded cursor-pointer text-sm transition-colors ${
                            currentLesson?._id === lesson._id
                              ? "bg-blue-50 border border-blue-200"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            lesson.status !== "locked" &&
                            setCurrentLesson(lesson)
                          }
                        >
                          <div className="flex items-center space-x-2">
                            {lesson.status === "completed" ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Circle className="w-4 h-4 text-gray-400" />
                            )}
                            <div className="flex-1">
                              <div className="font-medium">{lesson.title}</div>
                              <div className="text-xs text-gray-600">
                                {/* {lesson.duration} */}
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
  );
};

export default RightSide;
