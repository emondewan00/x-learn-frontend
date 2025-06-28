"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImageIcon, Pencil, PlusCircle, Upload, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import axiosClient from "@/lib/axios";
import getToken from "@/lib/getToken";

interface ImageFormProps {
  initialData: {
    imageUrl?: string;
  };
  courseId: string;
}

export const ImageForm: React.FC<ImageFormProps> = ({
  initialData,
  courseId,
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(
    initialData.imageUrl || null
  );
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
    setThumbnail(initialData.imageUrl || null);
    setThumbnailFile(null);
  };

  const handleThumbnailUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      console.log("Invalid file type. Only JPG, PNG, or JPG allowed.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      console.log("File too large. Max 10MB.");
      return;
    }

    setThumbnailFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setThumbnail(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailFile(null);
  };

  const handleSubmit = async () => {
    if (!thumbnailFile) {
      toast.info("Please select a file first.", {
        position: "top-right",
        duration: 2000,
      });
      return;
    }
    const formData = new FormData();
    formData.append("image", thumbnailFile);

    try {
      setIsSubmitting(true);
      const token = await getToken();
      await axiosClient.patch(`/courses/image/${courseId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Image updated successfully", {
        position: "top-right",
        duration: 2000,
      });
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error("Image upload failed.", error);
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
        Course Image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : !initialData.imageUrl ? (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>

      {!isEditing ? (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Course"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        )
      ) : (
        <div className="space-y-4 mt-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            {thumbnail ? (
              <div className="relative aspect-video mx-auto">
                <Image
                  src={thumbnail}
                  alt="Preview"
                  fill
                  className="rounded-lg object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removeThumbnail}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <label
                  htmlFor="thumbnail"
                  className="cursor-pointer text-blue-600 hover:text-blue-500 text-sm block"
                >
                  Click to upload
                </label>
                <p className="text-xs text-gray-500">
                  PNG, JPG, or GIF up to 10MB
                </p>
              </>
            )}
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
              className="hidden"
            />
          </div>

          {thumbnail && (
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Uploading..." : "Save Image"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
