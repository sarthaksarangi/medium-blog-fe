import PublishForm from "@/components/PublishForm";

const Publish = () => {
  return (
    <>
      <div className="w-full flex items-center justify-center flex-col mt-4">
        <div className="max-w-screen-md w-full">
          <PublishForm />
        </div>
      </div>
      {/* <div className="w-full flex items-center justify-center flex-col mt-4">
        <div className="max-w-screen-md w-full">
          <div className="my-4 w-full ">
            <label
              htmlFor="large-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              className="block w-full h-20 text-slate-900  border-0 font-serif text-5xl "
            />
          </div>
          <div className="">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              rows={20}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  "
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>
          <div className="flex items-center mt-2">
            <input
              checked={isPublished}
              id="checked-checkbox"
              type="checkbox"
              onChange={() => {
                setIsPublished(!isPublished);
                console.log("inside", isPublished);
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
            />
            <label
              htmlFor="checked-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 d"
            >
              Public
            </label>
          </div>
          <button
            onClick={async () => {
              const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/blog`,
                {
                  title,
                  content: description,
                  published: true,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                  },
                }
              );
              if (response) {
                navigate(`/blog/${response.data.blogId}`);
              }
            }}
            type="button"
            className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Publish Blog
          </button>
        </div>
      </div> */}
    </>
  );
};

export default Publish;
