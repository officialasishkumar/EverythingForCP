import React from "react";
import { useState } from "react";

export default function User(props) {
  // Zoom Link,registerfor By,Date,time,workshopid
  let a1 = props.eventid;
  let b1 = props.eventdate;
  let c1 = props.eventlink;
  let d1 = props.eventtime;
  let e1 = props.eventemail;
  let j1 = props.topic;

  const [data, setData] = useState({
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    // console.log(data);
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // const host = "http://localhost:800";
  const host = "https://yoyo-gdyv.onrender.com";

  const saveindb = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/Register`, {
      method: "POST",

      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        username: data.username,
        email: data.email,
        registerfor: j1,
        eventemail: e1,
        eventlink: c1,
        eventid: a1,
        eventdate: b1,
        eventtime: d1,
      }),
    });

    const data1 = await response.json();

    if (data1.check === false) {
      alert("Some error Occurred! ");
    } else {
      alert("YUP successfully registered");

      setData({
        username: "",
        email: "",
      });
    }
  };

  return (
    <>
      <div className=" bg-blue-900  flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-blue-950 p-8 px-8">
          <h2 className="text-4xl text-white font-bold text-center">
            Register here
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="username">Username</label>
            <input
              onChange={handleChange}
              type="text"
              name="username"
              id="username"
              value={data.username}
              placeholder="User Name"
              className=" rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={handleChange}
              id="email"
              placeholder="EMAIL"
              className=" rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            />
          </div>
          <button
            onClick={saveindb}
            className="w-full my-5 py-2 bg-green shadow-lg  text-white font-semibold rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

//
