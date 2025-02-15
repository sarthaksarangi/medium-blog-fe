import { PropagateLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="flex h-screen items-center flex-col justify-center">
      <PropagateLoader size={6} />
    </div>
  );
};

export default Loader;
