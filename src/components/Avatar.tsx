const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full">
      <span className="font-xs text-gray-600 ">{name[0]}</span>
    </div>
  );
};

export default Avatar;
