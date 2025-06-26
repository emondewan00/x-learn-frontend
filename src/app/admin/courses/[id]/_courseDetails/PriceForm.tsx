"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const PriceForm = ({ initialData = {}, courseId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Price
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Price
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">Initial Data</p>}
      {isEditing && (
        <form className="space-y-4 mt-4">
          <Input
            name="price"
            value={22}
            onChange={(e) => console.log(e.target.value)}
            type="number"
          />

          <div className="flex items-center gap-x-2">
            <Button type="submit">Save</Button>
          </div>
        </form>
      )}
    </div>
  );
};
