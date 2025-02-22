const finalpage = () => {
  return (
    <div className="bg-white h-screen flex items-center justify-center mt-8 mb-8">
      <div className="flex w-full h-full max-w-7xl">
        {/* Left Section (Centering content) */}
        <div className="bg-white p-8 sm:p-12 rounded-lg w-full sm:w-1/2 h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 mb-4 sm:mb-6">
            You’re Ready to Roll! 🎉
          </h1>
          <p className="text-lg text-center text-gray-600 mb-4 sm:mb-6">
            Welcome to <span className="text-blue-500">Drew’s</span> world.
          </p>
          <p className="text-center text-gray-600">
            Thanks for submitting your details! Your personalized quote is on
            the way.
          </p>
        </div>

        {/* Right Section (Image) */}
        <div className="sm:block hidden w-full sm:w-1/2 flex items-center justify-center mt-6 sm:mt-0">
          <div className="flex justify-center items-center h-[calc(100vh-2rem)] w-full sticky top-4">
            <img
              alt="Dashboard Preview"
              loading="lazy"
              decoding="async"
              src="/images/Picture6.jpg" // Replace with your image
              className="h-auto w-4/5 sm:w-5/6 px-3"
              style={{ color: "transparent" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default finalpage;
