import { BlogCardProps } from "../types";
import Avatar from "./Avatar";
import Dot from "./Dot";

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <>
      <div className="w-full my-2 p-2 mt-6">
        <div>
          <div className="flex items-center  ">
            <Avatar name={authorName} />
            <div className=" text-md   ml-2">{authorName}</div>
            <div className="flex  ml-2 ">
              <Dot />
            </div>

            <div className=" text-sm text-gray-600 ml-2">{publishedDate}</div>
            <div className=" text-sm text-gray-600 ml-2">{"Member-only"}</div>
          </div>
        </div>
        <div className=" text-2xl font-extrabold mt-3">{title}</div>
        <div className="mt-1">{content.slice(0, 200) + "..."}</div>
        <div className="flex justify-between items-end">
          <div className="text-sm mt-4 text-gray-800">{`${Math.floor(
            content.length / 100
          )} min read`}</div>

          <div className="flex  gap-1">
            <Dot />
            <Dot />
            <Dot />
          </div>
        </div>
      </div>
      <div className="border border-gray-100 mt-4"></div>
    </>
  );
};
