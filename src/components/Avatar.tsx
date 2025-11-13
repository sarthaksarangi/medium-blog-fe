const Avatar = ({ name, size = "small" }: { name: string; size?: string }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      } overflow-hidden bg-slate-800 rounded-full `}
    >
      <span
        className={`${size === "small" ? "text-xs" : "text-md "} text-white `}
      >
        {name[0]}
      </span>
    </div>
  );
};

export default Avatar;
