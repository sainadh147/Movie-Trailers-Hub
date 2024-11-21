import React from "react";

const VideoTitle = ({ title, overview }) => {
  // console.log("Video Title");
  const addEllipsis = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      const shortenedText = words.slice(0, maxWords).join(" ") + "......";
      return shortenedText;
    }
    return text;
  };
  return (
    <div className="absolute w-screen aspect-video pt-[60%] lg:pt-[20%] px-14 gap-10 text-white lg:bg-gradient-to-r from-black">
      <h1 className="text-2xl text-center lg:text-left md:text-5xl font-bold">
        {title}
      </h1>
      <h2 className="hidden lg:block py-6 text-xl w-3/12 lg:w-5/12">
        {addEllipsis(overview, 30)}
      </h2>
      <div className="buttons flex justify-center lg:flex-none lg:justify-start pt-6">
        <button className="h-10 px-5 mx-6 bg-white text-gray-600 text-xl rounded-lg hover:bg-gray-500 hover:text-white">
          Play
        </button>
        <button className="h-10 px-5 bg-gray-600 text-white text-xl rounded-lg hover:bg-white hover:text-gray-600">
          Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
