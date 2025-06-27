import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
import { CourseContext } from "@/provider/CourseProvider";
import Module from "@/types/module";
import Lesson from "@/types/lesson";

function calculateModuleProgress(
  module: Module,
  completedLessons: Set<string>
): { moduleProgress: number; completedCountOutOfLessons: string } {
  if (!module || module.lessons.length === 0)
    return { moduleProgress: 0, completedCountOutOfLessons: "0/0" };

  const completedCount = module.lessons.filter((lesson) =>
    completedLessons.has(lesson._id)
  ).length;

  return {
    moduleProgress: Math.round((completedCount / module.lessons.length) * 100),
    completedCountOutOfLessons: completedCount + "/" + module.lessons.length,
  };
}

const RightSide = () => {
  const {
    modulesData,
    progress,
    openModule,
    toggleModule,
    currentLesson,
    completedLessons,
    handleClickLesson,
    isUnlocked,
    allLessons,
  } = useContext(CourseContext);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

  // Get search results for floating container
  const searchResults = searchQuery.trim()
    ? allLessons.filter((lesson) =>
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchFocus = () => {
    setShowSearchResults(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowSearchResults(false), 200);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(true);
  };

  const onClickSearch = (lesson: Lesson) => {
    handleClickLesson(lesson);
    if (lesson.moduleId !== openModule) {
      toggleModule(lesson.moduleId);
    }
    setShowSearchResults(false);
  };

  return (
    <div className="lg:col-span-1">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Course Progress</CardTitle>
          <CardDescription>
            {completedLessons.size} of {allLessons.length} lessons completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Overall Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Search Input with Floating Results */}
          <div className="mb-4 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="pl-10"
              />
            </div>

            {/* Floating Search Results */}
            {showSearchResults && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((lesson) => (
                      <div
                        key={lesson._id}
                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() =>
                          isUnlocked(lesson._id) && onClickSearch(lesson)
                        }
                      >
                        <div className="flex items-center space-x-2">
                          {completedLessons.has(lesson._id) ? (
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0 font-medium text-sm truncate">
                            {lesson.title}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-3 py-4 text-center text-gray-500 text-sm">
                    No lessons found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modules and Lessons */}
          <div className="space-y-2">
            {modulesData?.map((module) => {
              const moduleProgress = calculateModuleProgress(
                module,
                completedLessons
              );

              return (
                <div key={module._id} className="border rounded-lg">
                  <Collapsible
                    open={module._id === openModule}
                    onOpenChange={() => toggleModule(module._id)}
                  >
                    <CollapsibleTrigger className="w-full p-3 text-left hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {module._id === openModule ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                          <span className="font-medium">{module.title}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {moduleProgress.completedCountOutOfLessons}
                        </span>
                      </div>
                      <div className="mt-2">
                        <Progress
                          value={moduleProgress.moduleProgress}
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
                              isUnlocked(lesson._id) &&
                              handleClickLesson(lesson)
                            }
                          >
                            <div className="flex items-center space-x-2">
                              {completedLessons.has(lesson._id) ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <Circle className="w-4 h-4 text-gray-400" />
                              )}

                              <div className="font-medium">{lesson.title}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightSide;
