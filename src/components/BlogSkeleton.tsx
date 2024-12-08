import Dot from "./Dot";

const BlogSkeleton = () => {
  return (
    <div>
      <div role="status" className="max-w-screen-2xl animate-pulse">
        <div className="w-full my-2 p-2 mt-6">
          <div>
            <div className="flex items-center  ">
              <div className="flex justify-center flex-col"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
              <div className="flex  ml-2 ">
                <Dot />
                <div className="h-2.5 bg-gray-200 rounded-full ml-6  w-48 mb-4"></div>
              </div>

              <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded-full  w-44 mb-4"></div>
          <div className="mt-1">
            <div className="h-2.5 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full mb-2.5"></div>
          </div>
          <div className="flex justify-between items-end">
            <div className="text-sm mt-4 text-gray-00">
              <div className="h-2 bg-gray-200 rounded-full w-10" />
            </div>
          </div>
        </div>

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default BlogSkeleton;
