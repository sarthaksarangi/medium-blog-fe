import { useEffect, useState } from "react";
import { Blogs } from "../types";
import axios from "axios";
import { UpdatedBlogInput } from "@sarthak.dev/medium-common";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const getAuthHeaders = () => ({
  Authorization: "Bearer " + localStorage.getItem("jwtToken"),
});

//Get all the blogs in bulk
export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blogs[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(API_URL + "/blog/bulk", {
        headers: getAuthHeaders(),
      })
      .then((response) => {
        setBlogs(response.data.blogs);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  }, []);

  return { blogs, isLoading };
};

//Get one blog only
export const useBlog = ({ id }: { id: string }) => {
  const [blog, setBlog] = useState<Blogs | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    axios
      .get(`${API_URL}/blog/${id}`, {
        headers: getAuthHeaders(),
      })
      .then((response) => {
        console.log(response);
        setBlog(response.data.blog);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  }, [id]);

  return { blog, isLoading };
};

//Edit one blog
export const useEditBlog = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const editBlog = async (id: string, updates: UpdatedBlogInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_URL}/blog/${id}`, {
        updates,
        headers: getAuthHeaders(),
      });
      setIsLoading(false);
      console.log(response);
      return response.data.blog;
    } catch (error: any) {
      setIsLoading(false);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update Blog. Sorry!";
      setError(errorMessage);
      throw error;
    }
  };
  return { editBlog, isLoading, error };
};

//Delete one blog

export const useDeleteBlog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteBlog = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.delete(API_URL + `/blog/${id}`, {
        headers: getAuthHeaders(),
      });
      setIsLoading(false);
      if (response.data.success) {
        return response.data.message;
      }
      return response.data.error;
    } catch (e) {
      setIsLoading(false);
      const errorMessage =
        e instanceof Error ? e.message : "Failed to delete blog.";
      setError(errorMessage);
      throw e;
    }
  };
  return { isLoading, error, deleteBlog };
};
