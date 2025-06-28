"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import axiosClient from "@/lib/axios";
import { toast } from "sonner";
import UpdateSubmitButton from "../../../_courseDetails/UpdateSubmitButton";
import getToken from "@/lib/getToken";

interface LessonTitleProps {
  initialData: {
    title?: string;
  };
  lessonId: string;
}

export const LessonTitle: React.FC<LessonTitleProps> = ({
  initialData,
  lessonId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
    setTitle(initialData.title || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setIsSubmitting(true);
      const token = await getToken();
      await axiosClient.patch(
        `/lessons/${lessonId}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Title updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update title", error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Lesson Title
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Title
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p className="text-sm mt-2">
          {initialData.title || "No title available"}
        </p>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            placeholder="Enter lesson title"
          />
          <div className="flex items-center gap-x-2">
            <UpdateSubmitButton
              title={isSubmitting ? "Saving..." : "Save"}
              isDisabled={!title.trim()}
            />
          </div>
        </form>
      )}
    </div>
  );
};
