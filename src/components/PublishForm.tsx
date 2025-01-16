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
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const PublishForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof createBlogInput>>({
    resolver: zodResolver(createBlogInput),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      published: true,
    },
  });

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

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/blog`,
        {
          title: values.title,
          content: values.content,
          published: values.published,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response.data.blogId) {
        toast({
          description: "Blog post created successfully!",
        });
        navigate(`/blog/${response.data.blogId}`);
      } else {
        throw new Error("Blog ID not received");
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

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Content</FormLabel>
              <FormControl>
                <div className="min-h-[500px]  rounded-lg">
                  <TipTap
                    description={field.value}
                    onChange={(value) => {
                      field.onChange(value);
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
              <div className="flex items-center space-x-2">
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

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !form.formState.isValid}
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PublishForm;
