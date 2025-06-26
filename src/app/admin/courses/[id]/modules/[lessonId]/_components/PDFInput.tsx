"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Upload, X, Check } from "lucide-react";

export default function PDFInput() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      handleFile(droppedFiles);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
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

    setFiles((prev) => [...prev, ...pdfFiles]);
    setUploaded(false);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setUploaded(false);
    setUploadProgress(0);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const simulateUpload = () => {
    setUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploaded(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <Card className="w-full mt-4">
      <CardContent className="p-6">
        {files.length === 0 ? (
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
                Selected Files ({files.length})
              </h3>
              <Button variant="outline" size="sm" onClick={() => setFiles([])}>
                Clear All
              </Button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-red-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
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

            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    Uploading {files.length} file{files.length > 1 ? "s" : ""}
                    ...
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}

            {!uploaded && !uploading && (
              <Button onClick={simulateUpload} className="w-full">
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
}
