"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import axiosClient from "@/lib/axios";
import { toast } from "sonner";
import UpdateSubmitButton from "../../../_courseDetails/UpdateSubmitButton";
import getToken from "@/lib/getToken";

interface LessonDescriptionFormProps {
  initialData: {
    description?: string;
  };
  lessonId: string;
}

export const LessonDescriptionForm: React.FC<LessonDescriptionFormProps> = ({
  initialData,
  lessonId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(initialData.description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
    setDescription(initialData.description || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      setIsSubmitting(true);
      const token = await getToken();
      await axiosClient.patch(
        `/lessons/${lessonId}`,
        { description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Description updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update description", error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Lesson Description
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Description
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p className="text-sm mt-2">
          {initialData.description || "No description provided."}
        </p>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            placeholder="Enter lesson description"
          />

          <div className="flex items-center gap-x-2">
            <UpdateSubmitButton
              title={isSubmitting ? "Saving..." : "Save"}
              isDisabled={isSubmitting || !description.trim()}
            />
          </div>
        </form>
      )}
    </div>
  );
};
