import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, FileText, Trash2, Video } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

interface Lessons {
  _id: string;
  title: string;
  courseId: Course;
  moduleId: Course;
  videoUrl: string;
  resources: string[];
  createdAt: string;
  updatedAt: string;
}

type Course = {
  _id: string;
  title: string;
};

type Props = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
  lessons: Lessons[];
  handleDeleteLesson: (lessonId: string) => void;
  onLimitChange: (value: string) => void;
  onPageChange: (value: number) => void;
};

const LessonsTable: React.FC<Props> = ({
  limit,
  page,
  total,
  totalPages,
  lessons,
  handleDeleteLesson,
  onLimitChange,
  onPageChange,
}) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lessons </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Materials</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lessons.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No lessons found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                lessons.map((lesson) => (
                  <TableRow key={lesson._id}>
                    <TableCell>
                      <div className="font-medium">{lesson.title}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{lesson.courseId.title}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{lesson.moduleId.title}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Video className="w-4 h-4 mr-1" />
                          Video
                        </Button>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <FileText className="w-4 h-4 mr-1" />
                          {lesson.resources.length} PDF
                          {lesson.resources.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(lesson.createdAt).toDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(lesson.updatedAt).toDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() =>
                            router.push(
                              `/admin/courses/${lesson.courseId._id}/modules/${lesson.moduleId._id}/lessons/${lesson._id}`
                            )
                          }
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteLesson(lesson._id)}
                          className="text-destructive hover:text-destructive cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium">{(page - 1) * limit + 1}</span> to{" "}
              <span className="font-medium">
                {page * limit > lessons.length ? lessons.length : page * limit}
              </span>{" "}
              of <span className="font-medium">{total}</span>
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={limit.toString()}
                onValueChange={(value) => {
                  onLimitChange(value);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 30, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={pageSize.toString()}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonsTable;
