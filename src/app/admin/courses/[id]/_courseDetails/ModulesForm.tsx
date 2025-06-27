"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosClient from "@/lib/axios";

interface Module {
  _id: string;
  title: string;
  order: number;
}

interface ModulesFormProps {
  initialData: {
    modules?: Module[];
  };
  courseId: string;
}

export const ModulesForm: React.FC<ModulesFormProps> = ({
  initialData,
  courseId,
}) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [modules] = useState<Module[]>(initialData.modules || []);//we can use ref here 

  const toggleCreating = () => {
    setIsCreating((prev) => !prev);
    setTitle("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const maxOrder = modules.reduce((max, mod) => Math.max(max, mod.order), 0);
    const newOrder = maxOrder + 1;

    await axiosClient.post(`/modules`, {
      title,
      courseId,
      order: newOrder,
    });

    // setModules((prev) => [
    //   ...prev,
    //   { title: title, _id: response.data?.module?._id, order: newOrder },
    // ]);

    setTitle("");
    setIsCreating(false);
    router.refresh();
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/courses/${courseId}/modules/${id}`);
  };
  console.log(modules);
  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Modules
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a module
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            type="text"
            placeholder="e.g. 'Introduction to the course...'"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit" disabled={!title.trim()}>
            Create
          </Button>
        </form>
      )}

      {!isCreating && (
        <div
          className={`text-sm mt-2 ${
            !modules.length ? "text-slate-500 italic" : ""
          }`}
        >
          {!modules.length && "No modules"}
          {modules.length > 0 && (
            <ul className="space-y-2 mt-2">
              {modules.map((mod) => (
                <li
                  key={mod._id}
                  className="flex items-center justify-between bg-white border rounded-md px-3 py-2"
                >
                  <span>{mod.title}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(mod._id)}
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
