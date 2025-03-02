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
    <div className="text-blue-800 flex-col justify-center items-center mt-4">
      <div className="flex-col">
        <h1
          className="text-4xl font-bold text-center"
          style={{ fontFamily: "Fira Code, monospace" }}
        >
          "Unlock your coding powers. Fuel your growth with our powerful
          resources."
        </h1>
        <div className="flex justify-center">
          <img src={cp} alt="CP Image" className="w-80vw" />
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-10">
        <h2 className="text-4xl font-bold flex justify-center items-center">
          Resources
        </h2>
        <div className="flex flex-wrap text-lg gap-20 w-full justify-center items-center">
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
      <div className="flex flex-col gap-6 mt-10">
        <h2 className="text-4xl font-bold flex justify-center items-center h-16">
          Platform
        </h2>
        <div className="flex flex-wrap text-lg gap-20 w-full justify-center items-center">
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
