"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const VideoUrlForm = ({ initialData, courseId, lessonId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

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
          <p className="text-sm mt-2">
            {"https://www.youtube.com/embed/Cn4G2lZ_g2I?si=8FxqU8_NU6rYOrG1"}
          </p>
          <div className="mt-6">
            <div className="relative aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/666K4aizIu8?si=hgMgYujVVL4R8Dr_"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </>
      )}
      {isEditing && (
        <form className="space-y-4 mt-4">
          <Input
            name="title"
            value={"test"}
            onChange={(e) => console.log(e.target.value)}
          />

          <div className="flex items-center gap-x-2">
            <Button type="submit">Save</Button>
          </div>
        </form>
      )}
    </div>
  );
};
