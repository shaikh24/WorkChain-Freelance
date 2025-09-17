import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, FileText, Image as ImageIcon, File } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
}

export const FileUpload = ({
  onFileSelect,
  maxFiles = 5,
  maxSize = 10,
  acceptedTypes = [".pdf", ".doc", ".docx", ".txt", ".jpg", ".jpeg", ".png", ".gif"],
  className
}: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const validateFiles = (files: File[]): File[] => {
    const validFiles: File[] = [];
    
    for (const file of files) {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than ${maxSize}MB`,
          variant: "destructive",
        });
        continue;
      }

      // Check file type
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      if (!acceptedTypes.includes(fileExtension)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type`,
          variant: "destructive",
        });
        continue;
      }

      validFiles.push(file);
    }

    return validFiles;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = validateFiles(droppedFiles);
    
    if (validFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can only upload ${maxFiles} files at once`,
        variant: "destructive",
      });
      return;
    }

    if (validFiles.length > 0) {
      // Simulate upload progress
      validFiles.forEach((file, index) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 30;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
          }
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: progress
          }));
        }, 100);
      });

      onFileSelect(validFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = validateFiles(selectedFiles);
    
    if (validFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can only upload ${maxFiles} files at once`,
        variant: "destructive",
      });
      return;
    }

    if (validFiles.length > 0) {
      onFileSelect(validFiles);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) {
      return <ImageIcon className="h-4 w-4" />;
    } else if (["pdf", "doc", "docx", "txt"].includes(extension || "")) {
      return <FileText className="h-4 w-4" />;
    }
    return <File className="h-4 w-4" />;
  };

  return (
    <Card className={cn("border-2 border-dashed transition-colors", className, {
      "border-primary bg-primary/5": isDragOver,
      "border-border": !isDragOver
    })}>
      <CardContent
        className="p-6 text-center cursor-pointer"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className={cn("h-8 w-8 mx-auto mb-2 transition-colors", {
          "text-primary": isDragOver,
          "text-muted-foreground": !isDragOver
        })} />
        <p className="text-sm text-muted-foreground mb-2">
          {isDragOver ? "Drop files here" : "Drag and drop files here, or click to browse"}
        </p>
        <Button variant="outline" type="button">
          Choose Files
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Max {maxFiles} files, {maxSize}MB each. Supported: {acceptedTypes.join(", ")}
        </p>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept={acceptedTypes.join(",")}
        />
      </CardContent>
    </Card>
  );
};

interface UploadedFile {
  file: File;
  progress?: number;
}

interface FileListProps {
  files: UploadedFile[];
  onRemove: (index: number) => void;
}

export const FileList = ({ files, onRemove }: FileListProps) => {
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) {
      return <ImageIcon className="h-4 w-4" />;
    } else if (["pdf", "doc", "docx", "txt"].includes(extension || "")) {
      return <FileText className="h-4 w-4" />;
    }
    return <File className="h-4 w-4" />;
  };

  if (files.length === 0) return null;

  return (
    <div className="space-y-2">
      {files.map((uploadedFile, index) => (
        <Card key={index} className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {getFileIcon(uploadedFile.file.name)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(uploadedFile.file.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(index)}
              className="h-8 w-8 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {uploadedFile.progress !== undefined && uploadedFile.progress < 100 && (
            <div className="mt-2">
              <Progress value={uploadedFile.progress} className="h-1" />
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};