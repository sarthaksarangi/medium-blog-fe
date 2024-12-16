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
import TipTap from "./TipTap";
import { Checkbox } from "./ui/checkbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const PublishForm = () => {
  const navigate = useNavigate();
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
    console.log(response);
    if (response) {
      navigate(`/blog/${response.data.blogId}`);
    } else {
      toast({
        description: "Something went wrong!",
      });
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <TipTap description={field.value} onChange={field.onChange} />
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
                <div className=" flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Publish</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default PublishForm;
