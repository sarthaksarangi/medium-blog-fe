import AppBar from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { blogs, isLoading } = useBlogs();
  return (
    <>
      <AppBar />
      <div className=" flex justify-center ">
        <div className=" flex justify-center flex-col w-screen lg: max-w-3xl">
          {!isLoading ? (
            blogs?.map((blog) => (
              <BlogCard
                key={blog.id}
                authorName={blog.author.name || "Sarthak Sarangi"}
                title={blog.title}
                content={blog.content}
                publishedDate={"01/01/01"}
              />
            ))
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>
    </>
  );
};

export default Blogs;
