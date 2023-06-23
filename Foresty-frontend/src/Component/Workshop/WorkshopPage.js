import React from "react";
import { useState, useEffect } from "react";
import Loader from "./loader.gif";

import WorkshopD from "./Workshop";
import WorkCard from "./WorkCard";

export default function WorkshopPage() {
  const [data, setData] = useState([]);
  const [timer, setTimer] = useState(true);
  // const host = "http://localhost:800";
  const host = "https://yoyo-gdyv.onrender.com";

  useEffect(() => {
    const fun = async () => {
      const response = await fetch(`${host}/Workshop`, {
        method: "GET",
      });

      const workdata = await response.json();
      setData(workdata);
      setTimer(false);
    };

    fun();
  }, []);

  return (
    <div className="my-20">
      <div className="flex flex-wrap justify-evenly mb-20">
        {timer ? <img width={"200px"} src={Loader} alt="" /> : ""}
        {data.map((item) => {
          return (
            <WorkCard
              eventlink={item.eventlink}
              eventemail={item.email}
              topic={item.topic}
              date={item.date}
              eventid={item._id}
              time={item.time}
              setter={item.username}
              cfhandle={item.cfhandle}
            />
          );
        })}
      </div>
      <WorkshopD />
    </div>
  );
}
// place-content-evenly pt-20 mb-40

// <WorkCard date="2024-05-20" time="11:22" />;
