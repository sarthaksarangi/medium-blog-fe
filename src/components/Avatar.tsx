const Avatar = ({ name, size = "small" }: { name: string; size?: string }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      } overflow-hidden bg-gray-200 rounded-full `}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md "
        } text-gray-600 `}
      >
        {name[0]}
      </span>
    </div>
  );
};

export default Avatar;
