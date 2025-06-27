"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Upload, X, Check } from "lucide-react";
import axiosClient from "@/lib/axios";

type Props = {
  lessonId: string;
  resources: string[];
};

const PDFInput: React.FC<Props> = ({ lessonId, resources }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>(resources);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer?.files?.length > 0) {
      handleFile(e.dataTransfer.files);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.length) {
      handleFile(e.target.files);
    }
  };

  const handleFile = (selectedFiles: FileList | File[]) => {
    const fileArray = Array.from(selectedFiles);
    const pdfFiles = fileArray.filter(
      (file) => file.type === "application/pdf"
    );

    if (pdfFiles.length !== fileArray.length) {
      alert("Some files were skipped. Only PDF files are allowed.");
    }

    setFiles(pdfFiles);
    setFileNames(pdfFiles.map((file) => file.name));
    setUploaded(false);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileNames((prev) => prev.filter((_, i) => i !== index));
    setUploaded(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onButtonClick = () => inputRef.current?.click();

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      await axiosClient.patch(`/lessons/pdf/${lessonId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFiles([]);
      if (inputRef.current) inputRef.current.value = "";

      setUploaded(true);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full mt-4">
      <CardContent className="p-6">
        {fileNames.length === 0 ? (
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,application/pdf"
              multiple
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Upload PDF files"
            />
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Drop your PDFs here, or{" "}
                  <button
                    type="button"
                    onClick={onButtonClick}
                    className="text-primary hover:underline"
                  >
                    browse
                  </button>
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports multiple PDF files up to 10MB each
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">
                Selected Files ({fileNames.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFiles([]);
                  setFileNames([]);
                }}
              >
                Clear All
              </Button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {fileNames.map((name, index) => (
                <div
                  key={`${name}-${index}`}
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {uploaded && (
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {!uploaded && !uploading && (
              <Button onClick={handleUpload} className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload {files.length} PDF{files.length > 1 ? "s" : ""}
              </Button>
            )}

            {uploaded && (
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm font-medium text-green-600">
                  {files.length} PDF{files.length > 1 ? "s" : ""} uploaded
                  successfully!
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PDFInput;
