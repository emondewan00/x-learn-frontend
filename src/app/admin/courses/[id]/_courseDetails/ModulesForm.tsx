"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialModules = [
  { id: 1, title: "test" },
  { id: 2, title: "hello 2" },
];

export const ModulesForm = ({ initialData = {}, courseId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Modules
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Add Module
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="space-y-4 mt-4">
          {initialModules.map((module) => (
            <div
              key={module.id}
              className="border rounded p-4 flex items-center justify-between bg-gray-100"
            >
              <p className="text-base">{module.title}</p>

              <Button variant="ghost">
                <Link href={`/admin/courses/${courseId}/modules/${module.id}`}>
                  <Pencil className="h-4 w-4 mr-2" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
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
