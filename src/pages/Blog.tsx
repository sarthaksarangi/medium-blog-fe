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
        <div className=" grid grid-cols-12 px-10 w-full pt-10 max-w-screen-2xl">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold text-slate-900">
              {blog?.title}
            </div>
            <div className=" text-slate-600 pt-2 pb-4">
              Posted on {moment(blog?.createdAt).format("DD-MM-YYYY")}
            </div>

            <figure className=" h-[600px] relative m-2.5 overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={
                  blog?.image?.url ||
                  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlbnR8fHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                }
                alt="image description"
              />
            </figure>

            <div className="text-slate-600">
              <BlogContent content={blog?.content} />
            </div>
          </div>
          <div className="col-span-4">
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
