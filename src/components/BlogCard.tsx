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
        <div className="w-screen md:w-3/4 lg:mr-2.5 lg:ml-2.5 lg:pl-2 px-3">
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
              <div className=" text-sm text-gray-600 ml-2 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  fill="none"
                  viewBox="0 0 64 64"
                  data-label="svg"
                >
                  <path
                    fill="#FFC017"
                    d="m39.637 40.831-5.771 15.871a1.99 1.99 0 0 1-3.732 0l-5.771-15.87a2.02 2.02 0 0 0-1.194-1.195L7.298 33.866a1.99 1.99 0 0 1 0-3.732l15.87-5.771a2.02 2.02 0 0 0 1.195-1.194l5.771-15.871a1.99 1.99 0 0 1 3.732 0l5.771 15.87a2.02 2.02 0 0 0 1.194 1.195l15.871 5.771a1.99 1.99 0 0 1 0 3.732l-15.87 5.771a2.02 2.02 0 0 0-1.195 1.194"
                  ></path>
                </svg>
                {"Member-only"}
              </div>
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
        <div className="h-[250px] lg:w-[250px] lg:h-[145px] relative  overflow-hidden text-white px-3 ">
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
      <div className="border border-gray-100 lg:mt-2  my-4 lg:mb-0"></div>
    </Link>
  );
};
