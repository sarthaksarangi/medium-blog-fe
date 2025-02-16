import PublishForm from "@/components/PublishForm";

const Publish = () => {
  return (
    <>
      <div className="w-full flex items-center justify-center flex-col mt-4">
        <div className="max-w-screen-md w-full">
          <PublishForm />
        </div>
      </div>
    </>
  );
};

export default Publish;
