import React from "react";
import { Loading as Loader } from "react-daisyui";

function LoadingPage() {
  return (
    <div className="w-full h-full bg-gray-300 bg-opacity-60">
      <div className="flex flex-col items-center justify-center h-full my-auto">
        <Loader variant="spinner" className="mb-5 w-20 h-20" />
        <span className="text-2xl font-semibold">Loading contents...</span>
      </div>
    </div>
  );
}

export default LoadingPage;
