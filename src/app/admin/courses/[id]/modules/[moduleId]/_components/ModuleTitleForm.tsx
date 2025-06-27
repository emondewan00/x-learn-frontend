"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import axiosClient from "@/lib/axios";
import { toast } from "sonner";
import UpdateSubmitButton from "../../../_courseDetails/UpdateSubmitButton";

interface ModuleTitleFormProps {
  initialData: {
    title?: string;
  };
  moduleId: string;
}

export const ModuleTitleForm: React.FC<ModuleTitleFormProps> = ({
  initialData,
  moduleId,
}) => {
  const router = useRouter();
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
      await axiosClient.patch(`/modules/${moduleId}`, { title });
      toast.success("Title updated successfully");
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      console.error("Failed to update title:", err);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Module Title
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
        <p className="text-sm mt-2">{initialData.title || "No title set"}</p>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            placeholder="Enter module title"
          />
          <div className="flex items-center gap-x-2">
            <UpdateSubmitButton
              title={isSubmitting ? "Saving..." : "Save"}
              isDisabled={isSubmitting || !title.trim()}
            />
          </div>
        </form>
      )}
    </div>
  );
};
