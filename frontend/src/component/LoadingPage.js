import React from "react";
import { Loading as Loader } from "react-daisyui";

function LoadingPage() {
  return (
    <div className="w-full h-full bg-white bg-opacity-70">
      <div className="flex items-center justify-center h-full my-auto">
        <span className="text-2xl font-semibold">Loading contents</span>
        <Loader variant="dots" className="ml-3" />
      </div>
    </div>
  );
}

export default LoadingPage;
