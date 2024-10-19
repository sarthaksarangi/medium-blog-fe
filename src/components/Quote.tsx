const Quote = () => {
  return (
    <>
      <div className=" bg-slate-100 h-screen flex justify-center flex-col ">
        <div className="flex justify-center ">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold">
              “Be who you are and say what you feel, because those who mind
              don't matter, and those who matter don't mind.”
            </h2>

            <p className="text-md mt-3  font-bold">Bernard M. Baruch</p>
            <p className="text-sm font-light  text-gray-400 mt-1">
              American Financier and Statesman
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quote;
