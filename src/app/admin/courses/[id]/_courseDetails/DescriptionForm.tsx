"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import axiosClient from "@/lib/axios";
import { toast } from "sonner";
import UpdateSubmitButton from "./UpdateSubmitButton";
import getToken from "@/lib/getToken";

type Props = {
  initialData: { description: string };
  courseId: string;
};

export const DescriptionForm: React.FC<Props> = ({ initialData, courseId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(initialData.description || "");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
    setDescription(initialData.description || "");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      setError("Description is required");
      toast.error("Description is required");
      return;
    }

    try {
      setIsSubmitting(true);
      const token = await getToken();
      await axiosClient.patch(
        `/courses/${courseId}`,
        { description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Description updated successfully");
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Description
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Description
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p className="text-sm mt-2 whitespace-pre-line">
          {initialData.description}
        </p>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            placeholder="Write a brief description of the course..."
          />
          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex items-center gap-x-2">
            <UpdateSubmitButton
              title="Save"
              isDisabled={isSubmitting || !description.trim()}
            />
          </div>
        </form>
      )}
    </div>
  );
};
