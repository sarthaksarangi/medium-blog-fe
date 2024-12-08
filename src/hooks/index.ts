import { useEffect, useState } from "react";
import { Blogs } from "../types";
import axios from "axios";

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blogs[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("https://backend.sarthaksarangi-dev.workers.dev/api/v1/blog/bulk", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  }, []);

  return { blogs, isLoading };
};

export const useBlog = ({ id }: { id: string }) => {
  const [blog, setBlog] = useState<Blogs | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    axios
      .get(`https://backend.sarthaksarangi-dev.workers.dev/api/v1/blog/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
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
