"use client";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

type Props = {
  title?: string;
  isDisabled?: boolean;
};

const UpdateSubmitButton: React.FC<Props> = ({
  title = "Save",
  isDisabled = false,
}) => {
  const status = useFormStatus();
  return (
    <Button type="submit" disabled={status.pending || isDisabled}>
      {status.pending && <Loader2Icon className="animate-spin" />} {title}
    </Button>
  );
};

export default UpdateSubmitButton;
