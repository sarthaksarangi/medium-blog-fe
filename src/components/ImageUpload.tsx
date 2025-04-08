import { MainImageUploadProps } from "@/types";
import { AlertCircle, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";

const ImageUpload: React.FC<MainImageUploadProps> = ({
  onImageSelected,
  isUploading = false,
  maxSizeMB = 5,
  initialImageUrl = null,
}) => {
  const [previewURL, setPreviewURL] = useState<string | null>(initialImageUrl);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validFile = (file: File | null) => {
    setError(null);
    if (!file) return false;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/svg"];

    if (!validTypes.includes(file.type)) {
      setError("Please select a valid image (JPG, PNG, WebP, or SVG)");
      return false;
    }
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`Image size exceeds ${maxSizeMB}MB limit`);
      return false;
    }

    return true;
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    console.log(file);
    if (!validFile(file)) return;

    //Preview
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewURL(result);
        onImageSelected({
          file,
          previewUrl: result,
          cloudinaryURL: null,
          cloudinaryImageId: null,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewURL(null);
    setError(null);
    onImageSelected(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        {error && (
          <Alert variant="destructive" className="mb-3">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          disabled={isUploading}
        />

        {previewURL ? (
          <div className="relative">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={previewURL}
                  alt="Blog main image preview"
                  className="w-full h-64 object-cover"
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-white">Uploading...</div>
                  </div>
                )}
              </CardContent>
            </Card>
            <Button
              variant="outline"
              size="sm"
              className="absolute bottom-2 right-2 bg-white/80 hover:bg-white/90"
              onClick={handleRemoveImage}
              disabled={isUploading}
            >
              Change
            </Button>
          </div>
        ) : (
          <>
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800  hover:bg-gray-100 dark:border-gray-600 "
              onClick={triggerFileInput}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload </span> or
                  drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG (MAX. {maxSizeMB}MB)
                </p>
              </div>
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
