import moment from "moment";
import { BlogCard } from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { blogs, isLoading, refetch } = useBlogs();
  return (
    <>
      <div className=" flex justify-center">
        <div className=" flex justify-center flex-col  lg:max-w-4xl">
          {!isLoading ? (
            blogs?.map((blog) => (
              <BlogCard
                id={blog.id}
                key={blog.id}
                authorName={blog?.author?.name || "Sarthak Sarangi"}
                title={blog.title}
                content={blog.content}
                publishedDate={moment(blog.createdAt).format("DD-MM-YY")}
                refetchBlogs={refetch}
                image={blog.image}
              />
            ))
          ) : (
            <>
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Blogs;
