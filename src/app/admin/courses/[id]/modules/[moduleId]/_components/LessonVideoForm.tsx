"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosClient from "@/lib/axios";
import { Pencil } from "lucide-react";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import UpdateSubmitButton from "../../../_courseDetails/UpdateSubmitButton";

type VideoUrlFormProps = {
  initialData: { videoUrl?: string };
  lessonId: string;
};

export const VideoUrlForm: React.FC<VideoUrlFormProps> = ({
  initialData,
  lessonId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(initialData.videoUrl || "");

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await axiosClient.patch(`/lessons/${lessonId}`, { video: videoUrl });

    toast.success("Video URL updated successfully");

    setIsEditing(false);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Video URL
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit URL
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          <p className="text-sm mt-2">{videoUrl || "No video URL set"}</p>
          {videoUrl && (
            <div className="mt-6">
              <div className="relative aspect-video">
                <iframe
                  className="w-full h-full"
                  src={videoUrl}
                  title="Video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            name="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Enter embed video URL"
          />
          <div className="flex items-center gap-x-2">
          <UpdateSubmitButton title="Save" />
          </div>
        </form>
      )}
    </div>
  );
};
