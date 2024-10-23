import Avatar from "./Avatar";

const AppBar = () => {
  return (
    <div className="flex justify-between px-5 py-3 md:px-10 md:py-4 border-b items-center">
      <div className=" font-bold cursor-pointer text-2xl">Medium</div>
      <Avatar name="S" size={"large"} />
    </div>
  );
};

export default AppBar;
