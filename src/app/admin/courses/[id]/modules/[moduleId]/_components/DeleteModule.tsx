"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import deleteModule from "@/actions/deleteModule";
import { toast } from "sonner";

type Props = {
  moduleId: string;
};

const DeleteModule: React.FC<Props> = ({ moduleId }) => {
  const router = useRouter();

  return (
    <div className="flex ">
      <form
        action={async () => {
          await deleteModule(moduleId);
          router.back();
          toast.success("Module deleted successfully");
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

export default DeleteModule;
