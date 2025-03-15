const finalpage = () => {
  return (
    <div className="bg-white h-screen flex items-center justify-center mt-8 mb-8">
      <div className="flex w-full h-full max-w-7xl">
        {/* Left Section (Centering content) */}
        <div className="bg-white p-8 sm:p-12 rounded-lg w-full sm:w-1/2 h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 mb-4 sm:mb-6">
            You're In. (Almost.)
          </h1>
          <p className="text-lg text-center text-gray-600 mb-4 sm:mb-6">
            We've got your application, and our team is reviewing it now. If you make the cut, you'll get 30 days of exclusive, free access to test-drive Hello Drew before the world gets in on April 15.
          </p>
          <p className="text-center text-gray-600 mb-4 sm:mb-6">
            No gimmicks. No commitments. Just AI that actually works.
          </p>
          
          <div className="mt-4 mb-4">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
              What's Next?
            </h2>
            <p className="text-center text-gray-600 mb-2">
              👉 If you're approved, expect an invite soon, keep an eye on your inbox.
            </p>
            <p className="text-center text-gray-600 mb-2">
              👉 If this isn't your round, no worries. We'll still keep you in the loop and make sure you're among the first to get access when we open the doors again.
            </p>
          </div>
          
          <p className="text-center text-gray-600 mt-2">
            Either way, you're now on our radar, and big things are coming. Stay tuned.
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
