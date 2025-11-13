import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import Avatar from "../components/Avatar";
import BlogContent from "@/components/BlogContent";
import moment from "moment";
import Loader from "@/components/Loader";

const Blog = () => {
  const { id } = useParams();
  const { blog, isLoading } = useBlog({ id: id || "" });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className=" flex justify-center ">
        <div className=" lg:grid lg:grid-cols-12 lg:px-10 w-full pt-10 lg:max-w-screen-2xl">
          <div className="lg:col-span-8 m-2.5">
            <div className="text-2xl md:text-5xl font-extrabold text-slate-900">
              {blog?.title}
            </div>
            <div className="flex items-center py-4">
              <div className=" text-slate-600">
                Posted on {moment(blog?.createdAt).format("DD-MM-YYYY")}
              </div>
              <div className=" text-gray-600 ml-2 flex items-center gap-1">
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
            <figure className=" lg:h-[500px] relative  overflow-hidden my-2 mb-5">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={
                  blog?.image?.url ||
                  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlbnR8fHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                }
                alt="image description"
              />
            </figure>

            <div className="text-slate-600 ">
              <BlogContent content={blog?.content} />
            </div>
          </div>
          <div className="lg:col-span-4 hidden md:block">
            <div className=" text-slate-600 text-sm ">Author</div>
            <div className=" flex w-full  items-center pt-3 ">
              <div className=" pr-4 ">
                <Avatar size={"big"} name={blog?.author?.name || "Anonymous"} />
              </div>
              <div className="">
                <div className=" text-xl font-bold  text-slate-800">
                  {blog?.author?.name || "Anonymous"}
                </div>
                <div className="pt-1 text-slate-500">
                  Random catch phrase about the author to grab the reader's
                  attention.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
