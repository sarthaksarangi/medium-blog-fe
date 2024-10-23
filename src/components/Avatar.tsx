const Avatar = ({ name, size = "small" }: { name: string; size?: string }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-${
        size === "small" ? 6 : 10
      } h-${
        size === "small" ? 6 : 10
      } overflow-hidden bg-gray-100 rounded-full `}
    >
      <span
        className={`${size === "small" ? "text-xs" : "text-md"} text-gray-600 `}
      >
        {name[0]}
      </span>
    </div>
  );
};

export default Avatar;
