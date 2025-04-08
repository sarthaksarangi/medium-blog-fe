import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { createBlogInput } from "@sarthak.dev/medium-common";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import TipTap from "./RichTextEditor";
import { Checkbox } from "./ui/checkbox";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from "react";
import { useEditBlog } from "@/hooks";
import Loader from "./Loader";
import ImageUpload from "./ImageUpload";
import { ImageDetails } from "@/types";

const PublishForm = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [editorKey, setEditorKey] = useState("initial");
  const [selectedImage, setSelectedImage] = useState<ImageDetails | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedImageId, setUploadedImageId] = useState<string | null>(null);

  const isEditMode = Boolean(blogId);
  const { blogData, updateBlog, isLoading, error } = useEditBlog(
    isEditMode ? blogId : null
  );
  const API_URL = import.meta.env.VITE_BACKEND_PROD_URL;

  const dataLoadedRef = useRef(false);

  const form = useForm<z.infer<typeof createBlogInput>>({
    resolver: zodResolver(createBlogInput),
    mode: "onChange",
    defaultValues: {
      ...(blogData || {
        title: "",
        content: "",
        published: true,
      }),
      image: blogData?.image?.url || "",
    },
  });

  // Load blog data when available
  useEffect(() => {
    if (blogData && isEditMode && !dataLoadedRef.current) {
      console.log("Setting form data:", blogData);

      // Set editor content state
      setEditorContent(blogData.content);

      // Force editor rerender with new content
      setEditorKey(`edit-${blogId}-${Date.now()}`);

      // Set form values
      form.reset({
        title: blogData.title,
        content: blogData.content,
        published: blogData.published,
        image: blogData.image?.url || "",
      });

      dataLoadedRef.current = true;
    }
  }, [blogData, form, isEditMode, blogId]);

  // Handle errors
  useEffect(() => {
    if (error && isEditMode) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load blog post for editing",
      });
      navigate(-1);
    }
  }, [error, navigate, isEditMode]);

  // Update form when editor content changes
  useEffect(() => {
    if (editorContent) {
      form.setValue("content", editorContent, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [editorContent, form]);

  useEffect(() => {
    if (uploadedImageUrl) {
      form.setValue("content", editorContent, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [editorContent, form]);

  const handleUploadImage = async () => {
    if (!selectedImage?.file) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an image first",
      });
      return;
    }
    try {
      setIsUploading(true);
      const formdata = new FormData();
      formdata.append("image", selectedImage.file);
      const response = await axios.post(API_URL + `/upload`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      console.log(response.data);
      if (response.data?.secure_url) {
        setUploadedImageUrl(response.data.secure_url);
        setUploadedImageId(response.data.public_id);
        toast({
          description: "Image uploaded successfully!",
        });
      } else {
        throw new Error("Upload failed: No secure URL returned");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description:
          err instanceof Error ? err.message : "Failed to upload image",
      });
    } finally {
      setIsUploading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof createBlogInput>) {
    try {
      setIsSubmitting(true);

      // Validate content is not empty HTML
      if (values.content === "<p></p>" || values.content === "") {
        form.setError("content", {
          type: "manual",
          message: "Content cannot be empty",
        });
        return;
      }

      if (selectedImage?.file && !uploadedImageUrl) {
        await handleUploadImage();
        if (!uploadedImageUrl) {
          // If upload failed, stop submission
          return;
        }
      }

      const payload = {
        title: values.title,
        content: values.content,
        published: values.published,
        image: uploadedImageUrl || "",
        image_id: uploadedImageId || "",
      };

      if (isEditMode && blogId) {
        await updateBlog(payload);
        toast({
          description: "Blog post updated successfully!",
        });
        navigate(`/blog/${blogId}`);
      } else {
        const response = await axios.post(
          `http://localhost:8787/api/v1/blog`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );
        toast({
          description: "Blog post created successfully!",
        });

        if (response.data.blogId) {
          navigate(`/blog/${response.data.blogId}`);
        } else {
          throw new Error("Blog ID not received");
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong while creating the blog post",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isEditMode && (isLoading || !blogData)) {
    return <Loader />;
  }
  if (isLoading && isEditMode) {
    return <Loader />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-4xl mx-auto p-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your blog title"
                  className="text-xl py-6"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <FormLabel className="text-lg font-semibold">Cover Image</FormLabel>
          <ImageUpload
            onImageSelected={(imageDetails) => {
              setSelectedImage(imageDetails);

              setUploadedImageUrl(null);
              setUploadedImageId(null);
            }}
            isUploading={isUploading}
            initialImageUrl={uploadedImageUrl}
          />

          {selectedImage && !uploadedImageUrl && (
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handleUploadImage}
                disabled={isUploading || !selectedImage}
                className="mt-2"
              >
                {isUploading ? "Uploading..." : "Upload Image"}
              </Button>
            </div>
          )}

          {uploadedImageUrl && (
            <div className="text-sm text-green-600">
              Image uploaded successfully ✓
            </div>
          )}
        </div>
        <FormField
          control={form.control}
          name="content"
          render={() => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Content</FormLabel>
              <FormControl>
                <div className="min-h-[500px] rounded-lg">
                  <TipTap
                    key={editorKey}
                    description={editorContent}
                    onChange={(value) => {
                      setEditorContent(value);
                      // Clear error when user starts typing
                      form.clearErrors("content");
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2 ">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-medium">
                  Publish immediately
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !form.formState.isValid}
          >
            {isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Publishing..."
              : isEditMode
              ? "Update"
              : "Publish"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PublishForm;
