import { Link } from "react-router-dom";
import { BlogCardProps } from "../types";
import Avatar from "./Avatar";
import Dot from "./Dot";
import { stripHtml } from "@/Utils";
import BlogDropdown from "./BlogDropdown";
import { useDeleteBlog } from "@/hooks";

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
  refetchBlogs,
}: BlogCardProps) => {
  const { deleteBlog } = useDeleteBlog();
  const plainText = stripHtml(content);
  return (
    <Link to={`/blog/${id}`}>
      <div className="w-full my-2 p-2 mt-6">
        <div>
          <div className="flex items-center  ">
            <div className="flex justify-center flex-col">
              <Avatar name={authorName} />
            </div>
            <div className=" text-md   ml-3">{authorName}</div>
            <div className="flex  ml-2 ">
              <Dot />
            </div>

            <div className=" text-sm text-gray-600 ml-2">{publishedDate}</div>
            <div className=" text-sm text-gray-600 ml-2">{"Member-only"}</div>
          </div>
        </div>
        <div className=" text-2xl font-bold mt-3">{title}</div>
        <div className="mt-1">{plainText + "..."}</div>
        <div className="flex justify-between items-end">
          <div className="text-sm mt-4 text-gray-00">{`${Math.round(
            content.length / 100
          )} min read`}</div>

          <div className="flex cursor-pointer gap-1">
            <BlogDropdown
              onDelete={deleteBlog}
              id={id}
              refetchBlogs={refetchBlogs}
            />
          </div>
        </div>
      </div>
      <div className="border border-gray-100 mt-4"></div>
    </Link>
  );
};
