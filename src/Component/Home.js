import React from "react";
import "./styles.css"; // Import the Tailwind styles

const Home = () => {
  return (
    <div className="text-blue-800 min-h-screen flex flex-col justify-center items-center">
      <div className="flex h-20 w-full justify-center items-center mb-10 my-20">
        <h1
          className="text-4xl font-bold text-center"
          style={{ fontFamily: "Fira Code, monospace" }}
        >
          "Unlock your coding powers. Fuel your growth with our powerful
          resources."
        </h1>
      </div>
      <img
        src="https://skoolofcode.us/wp-content/uploads/2022/11/cc1.jpg"
        alt="CP Image"
        className="w-80vw h-auto"
      />
      <div className="flex flex-wrap gap-6 mt-10">
        <h2 className="text-4xl font-bold flex justify-center items-center h-16">
          Resources
        </h2>
        <div className="flex text-lg gap-20 w-full justify-center items-center">
          <div className="bg-blue-200 text-blue-900 rounded-lg p-4 w-48 gap-5 flex flex-col items-center">
            <div className="h-40 w-full flex justify-center items-center">
              <img
                className="w-full h-full rounded-md"
                src="https://cdn.discordapp.com/attachments/1081494472623390750/1109464524085547099/2Q.png"
                alt="Image"
              />
            </div>
            <a
              href="https://cp-algorithms.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CP-Algorithm
            </a>
          </div>
          <div className="bg-blue-200 text-blue-900 rounded-lg p-4 w-48 gap-5 flex flex-col items-center">
            <div className="h-40 w-full flex justify-center items-center">
              <img
                className="w-full h-full rounded-md"
                src="https://cdn.discordapp.com/attachments/1081494472623390750/1109472552100827246/9YnigGgDiiLAAAAAElFTkSuQmCC.png"
                alt="Image"
              />
            </div>
            <a
              href="https://usaco.guide/dashboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              USACO
            </a>
          </div>
          <div className="bg-blue-200 text-blue-900 rounded-lg p-4 w-48 gap-5 flex flex-col items-center">
            <div className="h-40 w-full flex justify-center items-center">
              <img
                className="w-full h-full rounded-md"
                src="https://cdn.discordapp.com/attachments/1081494472623390750/1109474603375525918/image.png"
                alt="Image"
              />
            </div>

            <a
              href="https://takeuforward.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              takeUforward
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 m-10">
        <h2 className="text-4xl font-bold flex justify-center items-center h-16">
          Platform
        </h2>
        <div className="flex text-lg gap-20 w-full justify-center items-center">
          <div className="bg-blue-200 text-blue-900 rounded-lg p-4 w-48 gap-5 flex flex-col items-center">
            <div className="h-40 w-full flex justify-center items-center">
              <img
                className="w-full h-full rounded-md"
                src="https://cdn.discordapp.com/attachments/1081494472623390750/1109472154900242462/Z.png"
                alt="Image"
              />
            </div>
            <a
              href="https://codeforces.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              codeforces.com
            </a>
          </div>
          <div className="bg-blue-200 text-blue-900 rounded-lg p-4 w-48 gap-5 flex flex-col items-center">
            <div className="h-40 w-full flex justify-center items-center">
              <img
                className="w-full h-full rounded-md"
                src="https://cdn.discordapp.com/attachments/1081494472623390750/1109472286915956806/UT7QfqP8w9DA3Ly8ljQDlPAAAAAElFTkSuQmCC.png"
                alt="Image"
              />
            </div>
            <a
              href="https://www.codechef.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              codechef.com
            </a>
          </div>
          <div className="bg-blue-200 text-blue-900 rounded-lg p-4 w-48 gap-5 flex flex-col items-center">
            <div className="h-40 w-full flex justify-center items-center">
              <img
                className="w-full h-full rounded-md"
                src="https://cdn.discordapp.com/attachments/1081494472623390750/1109472816379744276/image.png"
                alt="Image"
              />
            </div>

            <a
              href="https://atcoder.jp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              atcoder.jp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
