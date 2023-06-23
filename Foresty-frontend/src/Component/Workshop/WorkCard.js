import React, { useState } from "react";
import "./Modal.css";
import User from "../Form/Userregister";

export default function WorkCard(props) {
  const [timeday, settimeday] = useState();
  const [time, settime] = useState();
  setInterval(() => {
    var year = parseInt(
      props.date[0] + props.date[1] + props.date[2] + props.date[3]
    );
    var month = parseInt(props.date[5] + props.date[6]);
    var day = parseInt(props.date[8] + props.date[9]);
    var hour = parseInt(props.time[0] + props.time[1]);
    var minute = parseInt(props.time[3] + props.time[4]);
    var destination = new Date(year, month, day, hour, minute).getTime();
    var now = new Date().getTime();
    var difference = destination - now;
    var days = Math.floor(difference / (86400 * 1000));
    var hours = Math.floor((difference % (86400 * 1000)) / (1000 * 86400));
    var minutes = Math.floor((difference % (3600 * 1000)) / (1000 * 60));
    var seconds = Math.floor((difference % (60 * 1000)) / 1000);
    settimeday(days.toString() + " days");
    settime(
      hours.toString() +
        " hrs : " +
        minutes.toString() +
        " min : " +
        seconds.toString() +
        " sec"
    );
  }, 1000);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <div className="flex-col">
        <div class="bg-[#D77F7F] flex flex-col items-center rounded-lg text-white mx-10 mb-5">
          <img
            class="h-50 w-full rounded-t-lg object-cover md:h-30 md:w-48 md:rounded-none md:rounded-l-lg"
            src={""}
            alt=""
          />
          <div class="flex flex-col items-center p-6">
            <h1 className="font-bold text-5xl py-3">{props.topic}</h1>
            <div className="flex">
              <div className="flex flex-col justify-center my-5">
                <div>Date : {props.date}</div>
                <div>Time : {props.time}</div>
              </div>
              <div className="py-5 px-4">
                <h2 className="font-bold">By {props.setter}</h2>
                <h2>
                  <a href={`https://codeforces.com/profile/${props.cfhandle}`}>
                    {props.cfhandle}
                  </a>
                </h2>
              </div>
            </div>

            <div class="flex justify-center rounded-lg text-white my-5">
              <div className="mr-3">
                <div className="text-4xl font-bold">{`Hurry  `}</div>
              </div>
              <div>
                <div>{timeday}</div>
                <div>{time}</div>
              </div>
            </div>
            <button
              onClick={toggleModal}
              className="w-full my-5 py-2 text-xl shadow-lg bg-white text-blue-950  hover:text-[#D77F7F]  font-semibold rounded-lg"
            >
              Register
            </button>
          </div>
        </div>

        {modal && (
          <div className="modal bg-black">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <User
                eventid={props.eventid}
                eventtime={props.time}
                eventlink={props.eventlink}
                eventemail={props.eventemail}
                topic={props.topic}
                eventdate={props.date}
              />
              <button
                className="w-full my-5 py-2  text-white font-semibold rounded-lg"
                onClick={toggleModal}
              >
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-200 via-red-500 to-fuchsia-700
// bg-gradient-to-r from-rose-300 to-rose-500
