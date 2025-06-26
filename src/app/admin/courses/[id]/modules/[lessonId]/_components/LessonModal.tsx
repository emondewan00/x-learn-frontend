import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { LayoutDashboard, Trash } from "lucide-react";
import { Eye } from "lucide-react";
import { Video } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { LessonTitle } from "./LessonTitle";
import { LessonDescriptionForm } from "./LessonDescriptionForm";
import { VideoUrlForm } from "./LessonVideoForm";
import { Button } from "@/components/ui/button";
import PDFInput from "./PDFInput";

export const LessonModal = ({ open, setOpen, lessonId }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[1200px] w-[96%] overflow-y-auto max-h-[90vh]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <div className="flex items-center justify-between">
            <div className="w-full">
              <Link
                href={`/admin/courses/${1}`}
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to course setup
              </Link>
              <div className="flex items-center justify-end">
                <Button>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-x-2">
                  <h2 className="text-xl">Customize Your Lesson</h2>
                </div>
                <LessonTitle initialData={{}} courseId={1} />
                <LessonDescriptionForm initialData={{}} courseId={1} />
                <PDFInput />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                {/* <IconBadge icon={Video} /> */}
                <h2 className="text-xl">Add a video</h2>
              </div>
              <VideoUrlForm initialData={{}} courseId={1} lessonId={lessonId} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
