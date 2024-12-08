import axios from "axios";
import AppBar from "../components/AppBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <AppBar />
      {console.log("outside", isPublished)}
      <div className="w-full flex items-center justify-center flex-col">
        <div className="max-w-screen-lg w-full">
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
              id="large-input"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 "
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
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
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
                "http://localhost:8787/api/v1/blog",
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
      </div>
    </>
  );
};

export default Publish;
