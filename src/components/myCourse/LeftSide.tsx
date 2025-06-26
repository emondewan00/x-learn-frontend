import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BookOpen, Clock, Play, SkipBack, SkipForward } from "lucide-react";
import { Button } from "../ui/button";
import { Lesson } from "@/app/my-courses/[id]/page";

type Props = {
  currentLesson: Lesson;
  nextHandler: () => void;
  prevHandler: () => void;
  lessonOutOfLessons: string;
  moduleTitle: string;
};

const LeftSide: React.FC<Props> = ({
  currentLesson,
  nextHandler,
  prevHandler,
  lessonOutOfLessons,
  moduleTitle,
}) => {
  return (
    <div className="lg:col-span-2">
      {/* Course Title */}

      <Card className="mb-4 p-6">
        <CardContent className="p-0">
          <CardDescription className=" uppercase font-semibold text-blue-600 flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>{moduleTitle}</span>
          </CardDescription>
          <CardTitle className="text-3xl font-bold text-gray-900">
            {currentLesson?.title}
          </CardTitle>
        </CardContent>
        <CardFooter className="p-0 flex gap-x-2 mt-2">
          <CardDescription className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>12h 30min</span>
          </CardDescription>
          <CardDescription className="flex items-center">
            <Play className="mr-2 h-4 w-4" />
            <span>{lessonOutOfLessons}</span>
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
              src={`https://www.youtube.com/embed/${"dQw4w9WgXcQ"}`}
              title={currentLesson?.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-t-lg"
            ></iframe>
          </div>

          {/* Video Controls */}
          <div className="p-4 bg-white border-t">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">{currentLesson?.title}</h3>
              <span className="text-sm text-gray-600">20:15</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevHandler}
                  className="cursor-pointer"
                  // disabled={currentLesson?._id === 1}
                >
                  <SkipBack className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextHandler}
                  className="cursor-pointer"
                >
                  Next
                  <SkipForward className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="text-sm text-gray-600">{lessonOutOfLessons}</div>
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
            {currentLesson?.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeftSide;
