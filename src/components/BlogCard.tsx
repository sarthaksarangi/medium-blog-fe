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
  image,
}: BlogCardProps) => {
  const { deleteBlog } = useDeleteBlog();
  const plainText = stripHtml(content);
  return (
    <Link to={`/blog/${id}`}>
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center lg:mt-4 ">
        <div className="w-screen md:w-3/4 lg:mr-2.5 lg:ml-2.5 pl-2">
          <div>
            <div className="flex items-center mt-3 lg:mt-0">
              <div className="flex justify-center flex-col">
                <Avatar name={authorName} />
              </div>
              <div className=" text-sm  ml-3">{authorName}</div>
              <div className="flex  ml-2 ">
                <Dot />
              </div>

              <div className=" text-sm text-gray-600 ml-2">{publishedDate}</div>
              <div className=" text-sm text-gray-600 ml-2">{"Member-only"}</div>
            </div>
          </div>
          <div className=" text-2xl font-bold mt-2">{title}</div>
          <div className="mt-1 lg:min-h-[68px]">{plainText + "..."}</div>
          <div className="flex justify-between items-center ">
            <div className="text-sm text-gray-500">{`${Math.round(
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
        <div className="h-[250px] lg:w-[230px] lg:h-[145px] relative  overflow-hidden text-white px-2 ">
          <img
            className="w-full h-full object-cover rounded-md "
            src={
              image?.url ||
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlbnR8fHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
            }
            alt="card-image"
          />
        </div>
      </div>
      <div className="border border-gray-100 lg:mt-2  mb-4 lg:mb-0"></div>
    </Link>
  );
};
