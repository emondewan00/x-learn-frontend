"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosClient from "@/lib/axios";

interface PriceFormProps {
  initialData: {
    price?: number;
  };
  courseId: string;
}

export const PriceForm: React.FC<PriceFormProps> = ({
  initialData,
  courseId,
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState<number>(initialData.price || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
    setPrice(initialData.price || 0);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (price <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    try {
      setIsSubmitting(true);
      await axiosClient.patch(`/courses/${courseId}`, { price });
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      console.error("Failed to update price:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {!isEditing && (
        <p className="text-sm mt-2">
          {initialData.price ? `$${initialData.price}` : "Free"}
        </p>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            name="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            type="number"
            min="0"
            step="0.01"
            disabled={isSubmitting}
            placeholder="Enter course price"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex items-center gap-x-2">
            <Button type="submit" disabled={isSubmitting || price <= 0}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
