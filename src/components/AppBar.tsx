import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const AppBar = () => {
  return (
    <div className="flex justify-between px-5 py-3 md:px-10 md:py-4 border-b items-center w-screen mb-2">
      <Link to={"/"}>
        <div className=" font-bold cursor-pointer text-2xl">Medium</div>
      </Link>
      <div className="">
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white bg-green-600 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mr-4"
          >
            New
          </button>
        </Link>
        <Avatar name="S" size={"big"} />
      </div>
    </div>
  );
};

export default AppBar;
