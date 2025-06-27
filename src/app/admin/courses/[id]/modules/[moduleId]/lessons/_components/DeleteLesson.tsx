"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import deleteLesson from "@/actions/deleteLesson";
import { toast } from "sonner";

type Props = {
  lessonId: string;
};

const DeleteLesson: React.FC<Props> = ({ lessonId }) => {
  const router = useRouter();

  return (
    <div className="flex ">
      <form
        action={async () => {
          await deleteLesson(lessonId);
          toast.success("Lesson deleted successfully");
          router.back();
        }}
        className="ml-auto"
      >
        <Button type="submit" variant="destructive" className=" cursor-pointer">
          Delete <Trash className=" h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default DeleteLesson;
