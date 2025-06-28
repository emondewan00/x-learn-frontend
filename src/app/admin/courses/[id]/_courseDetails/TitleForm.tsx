"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import axiosClient from "@/lib/axios";
import UpdateSubmitButton from "./UpdateSubmitButton";
import { toast } from "sonner";
import getToken from "@/lib/getToken";

type Props = {
  initialData: { title: string };
  courseId: string;
};

export const TitleForm: React.FC<Props> = ({ initialData, courseId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title || "");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
    setError(""); // clear previous error
    setTitle(initialData.title || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setIsSubmitting(true);
      const token = await getToken();
      await axiosClient.patch(
        `/courses/${courseId}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Title updated successfully", {
        position: "top-right",
        duration: 2000,
      });
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", {
        position: "top-right",
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course title
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Title
            </>
          )}
        </Button>
      </div>

      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            placeholder="e.g. 'Advanced web development'"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex items-center gap-x-2">
            <UpdateSubmitButton isDisabled={isSubmitting || !title.trim()} />
          </div>
        </form>
      )}
    </div>
  );
};
