import React from "react";
import cpalgo from "./Assets/cpalgo.png";
import cses from "./Assets/cses.jpeg";
import priyansh from "./Assets/priyansh.jpeg";
import codeforces from "./Assets/codeforces.png";
import codechef from "./Assets/codechef.png";
import atcoder from "./Assets/atcoder.png";
import cp from "./Assets/cp.jpg";
import HomeCard from "./HomeCard";
const Home = () => {
  return (
    <div className="text-blue-900 flex-col justify-center items-center mt-4 px-4 pb-12">
      <div className="flex-col max-w-6xl mx-auto">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-center leading-tight"
          style={{ fontFamily: "Fira Code, monospace" }}
        >
          "Unlock your coding powers. Fuel your growth with our powerful
          resources."
        </h1>
        <p className="text-center text-lg mt-4 text-blue-700">
          Discover curated learning resources and practice platforms in one
          smooth experience.
        </p>
        <div className="flex justify-center mt-8">
          <img
            src={cp}
            alt="CP learning"
            className="w-full max-w-5xl rounded-2xl border border-blue-200 shadow-2xl shadow-blue-200/70"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-14">
        <h2 className="text-4xl font-bold flex justify-center items-center tracking-wide">
          Resources
        </h2>
        <div className="flex flex-wrap text-lg gap-8 md:gap-10 w-full justify-center items-center">
          <HomeCard
            name="CP-Algorithm"
            link="https://cp-algorithms.com/"
            photo={cpalgo}
          />
          <HomeCard
            name="CSES"
            link="https://cses.fi/problemset/"
            photo={cses}
          />
          <HomeCard
            name="Priyansh Aggarwal"
            link="https://www.youtube.com/@PriyanshAgarwal"
            photo={priyansh}
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-14">
        <h2 className="text-4xl font-bold flex justify-center items-center h-16 tracking-wide">
          Platform
        </h2>
        <div className="flex flex-wrap text-lg gap-8 md:gap-10 w-full justify-center items-center">
          <HomeCard
            name="Codeforces"
            link="https://codeforces.com/"
            photo={codeforces}
          />
          <HomeCard
            name="Codechef"
            link="https://www.codechef.com/"
            photo={codechef}
          />
          <HomeCard name="Atcoder" link="https://atcoder.jp/" photo={atcoder} />
        </div>
      </div>
    </div>
  );
};

export default Home;
