"use client";
import { Loader2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

type Props = {
  title: string;
};

const AuthSubmitButton: React.FC<Props> = ({ title }) => {
  const status = useFormStatus();
  return (
    <Button
      disabled={status.pending}
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
    >
      {status.pending && <Loader2Icon className="animate-spin" />} {title}
    </Button>
  );
};

export default AuthSubmitButton;
