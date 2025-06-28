"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle } from "lucide-react";
import axiosClient from "@/lib/axios";
import { toast } from "sonner";
import UpdateSubmitButton from "../../../_courseDetails/UpdateSubmitButton";
import getToken from "@/lib/getToken";

interface Lesson {
  _id: string;
  title: string;
  order: number;
}

interface LessonsFormProps {
  initialData: {
    lessons?: Lesson[];
  };
  moduleId: string;
  courseId: string;
}

export const LessonsForm: React.FC<LessonsFormProps> = ({
  initialData,
  moduleId,
  courseId,
}) => {
  const router = useRouter();

  const lessons = useRef<Lesson[]>(initialData.lessons || []).current;
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");

  const toggleCreating = () => {
    setIsCreating((prev) => !prev);
    setTitle("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const maxOrder = lessons.reduce((max, mod) => Math.max(max, mod.order), 0);
    const newOrder = maxOrder + 1;
    const token = await getToken();
    await axiosClient.post(
      `/lessons`,
      {
        title,
        moduleId,
        order: newOrder,
        courseId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Lesson created successfully", {
      position: "top-right",
      duration: 2000,
    });
    setTitle("");
    setIsCreating(false);
    router.refresh();
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Module Lessons
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Lesson
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter lesson title"
          />
          <div className="flex items-center gap-x-2">
            <UpdateSubmitButton isDisabled={!title.trim()} />
          </div>
        </form>
      )}

      {!isCreating && (
        <div className="space-y-4 mt-4">
          {lessons.length === 0 && (
            <p className="text-sm italic text-muted-foreground">
              No lessons yet.
            </p>
          )}
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="border rounded p-4 flex items-center justify-between bg-gray-100"
            >
              <p className="text-base">{lesson.title}</p>
              <Button
                variant="ghost"
                onClick={() =>
                  router.push(
                    `/admin/courses/${courseId}/modules/${moduleId}/lessons/${lesson._id}`
                  )
                }
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
