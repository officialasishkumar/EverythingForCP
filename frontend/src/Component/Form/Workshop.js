import React from "react";
import { useState } from "react";

export default function Workshop() {
  const [data, setData] = useState({
    username: "",
    topic: "",
    cfhandle: "",
    email: "",
    date: "",
    time: "",
    description: "",
    imagelink: "",
    eventlink: "",
  });

  // const host = "http://localhost:800";
  const host = "https://yoyo-gdyv.onrender.com";

  const handleChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const saveindb = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/Workshop`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        description: data.description,
        date: data.date,
        time: data.time,
        topic: data.topic,
        cfhandle: data.cfhandle,
        eventlink: data.eventlink,
      }),
    });

    const data1 = await response.json();
    console.log(data1);

    if (data1.check === false) {
      alert("Some error Occurred! ");
    } else {
      alert("Yupp! Your form is submitted ");

      setData({
        username: "",
        eventname: "",
        linkedin: "",
        email: "",
        date: "",
        time: "",
        eventimage: "",
        description: "",
        eventlink: "",
        cfhandle: "",
        topic: "",
      });
    }
  }; // this fun will save the details in db

  return (
    <div className="flex flex-col justify-center">
      <form className="max-w-[400px] w-full mx-auto rounded-lg bg-blue-900 p-8 px-8">
        <h2 className="text-4xl text-white font-bold text-center">
          WANT TO CONDUCT A WORKSHOP
        </h2>
        <div className="flex flex-col py-2">
          <label htmlFor="username" className="text-white">
            Username
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            id="username"
            value={data.username}
            placeholder="User Name"
            className="text-black rounded-lg bg-white mt-2 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col py-2">
          <label htmlFor="topic" className="text-white">
            TOPIC
          </label>
          <input
            type="text"
            name="topic"
            value={data.topic}
            onChange={handleChange}
            id="topic"
            placeholder="topic"
            className=" rounded-lg bg-white mt-2 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col py-2">
          <label htmlFor="eventlink" className="text-white">
            Zoom Link
          </label>
          <input
            type="text"
            name="eventlink"
            value={data.eventlink}
            onChange={handleChange}
            id="eventlink"
            placeholder="eventlink"
            className=" rounded-lg bg-white mt-2 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col py-2">
          <label htmlFor="cfhandle" className="text-white">
            CF handle
          </label>
          <input
            type="text"
            name="cfhandle"
            value={data.cfhandle}
            onChange={handleChange}
            id="cfhandle"
            placeholder="cfhandle"
            className=" rounded-lg bg-white mt-2 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col py-2">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={handleChange}
            id="email"
            placeholder="EMAIL"
            className=" rounded-lg mt-2 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col py-2">
          <label htmlFor="description" className="text-white">
            Description of Workshop
          </label>
          <textarea
            rows="4"
            name="description"
            id="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Type your message"
            className="rounded-lg mt-2 p-2 focus:border-blue-500 focus:outline-none"
          ></textarea>
        </div>

        <div className="flex justify-between py-2">
          <div>
            <label htmlFor="date" className="text-white">
              Event Date
            </label>
            <input
              type="date"
              name="date"
              value={data.date}
              onChange={handleChange}
              id="date"
              className="rounded-lg mt-2 p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="even-time" className="text-white">
              Event Time
            </label>
            <input
              type="time"
              name="time"
              value={data.time}
              onChange={handleChange}
              id="time"
              className="rounded-lg mt-2 p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={saveindb}
          className="w-full my-5 py-2 bg-green shadow-lg text-white hover:bg-white hover:text-blue-950 font-semibold rounded-lg"
        >
          LET'S GO
        </button>
      </form>
    </div>
  );
}
