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
