import React, { useEffect } from "react";
import axios from "axios";
import { ladders } from "./data";
import { useState } from "react";
import Card from "./Card";

const url1 = "https://codeforces.com/api/user.status?handle=";
const url2 = "https://codeforces.com/api/user.info?handles=";

export default function Ladder() {
  // It sets the handle of user(username)
  const [userName, setuserName] = useState("");

  // data is fetched from API
  const [mydata, setmydata] = useState();

  const [cardData, setcarddata] = useState();

  // It sets the data of division entered, by default it contains data of DIV A
  const [division, setDivision] = useState(ladders.div_a);

  // When the website is rendered, initialRender is true
  const [initialRender, setInitialRender] = useState(true);

  // whenever flag changes , then useEffect calls.
  const [flag, setFlag] = useState(false);

  const [displayCard, setdisplayCard] = useState(false);

  var correct = [];
  var wrong = [];

  // useEffect is only called when flag is changed.
  useEffect(() => {
    const fetchdata = () => {
      axios
        .get(url1 + userName)
        .then((res) => setmydata(res))
        .catch((e) => console.log("Network error"));
      axios
        .get(url2 + userName)
        .then((res) => {
          setcarddata(res);
          console.log(res);
        })
        .catch((e) => console.log("Network error"));
    };
    // If the page is initially rendering then useEffect will not be called
    if (initialRender) {
      setInitialRender(false);
    }
    // If the page had already rendered once then useEffect will be called
    else {
      fetchdata();
    }
  }, [flag]);

  const Onchange = (event) => {
    setuserName(event.target.value);
  };

  function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }
  return (
    <>
      <div className="flex-row justify-center">
        {/* Navbar for C2 ladder */}
        <div className="my-14 flex justify-center">
          <input
            className="px-3 py-1 border-2 border-black rounded-lg"
            type="text"
            value={userName}
            onChange={Onchange}
            placeholder="Search"
          />
          <button
            className="mx-2 text-white right-2.5 bottom-2.5 bg-blue-900 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-900 dark:hover:bg-blue-900 dark:focus:ring-blue-900"
            type="Button"
            onClick={() => {
              setFlag(!flag);
              setdisplayCard(true);
            }}
          >
            Search
          </button>
        </div>

        {mydata && displayCard && (
          <Card
            image={cardData.data.result[0].avatar}
            name={userName}
            rank={cardData.data.result[0].rank}
            currRating={cardData.data.result[0].rating}
            maxRating={cardData.data.result[0].maxRating}
          />
        )}
        {/* Buttons for C2 ladder */}
        <div className="flex-col items-center mb-8">
          <div className="flex place-content-evenly">
            <button
              className="mx-2 text-white right-2.5 bottom-2.5 bg-blue-900 hover:text-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="Button"
              onClick={() => setDivision(ladders.div_a)}
            >
              Div A
            </button>
            <button
              className="mx-2 text-white right-2.5 bottom-2.5 bg-blue-900 hover:text-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="Button"
              onClick={() => setDivision(ladders.div_b)}
            >
              Div B
            </button>
            <button
              className="mx-2 text-white right-2.5 bottom-2.5 bg-blue-900 hover:text-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="Button"
              onClick={() => setDivision(ladders.div_c)}
            >
              Div C
            </button>
            <button
              className="mx-2 text-white right-2.5 bottom-2.5 bg-blue-900 hover:text-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="Button"
              onClick={() => setDivision(ladders.div_d)}
            >
              Div D
            </button>
            <button
              className="mx-2 text-white right-2.5 bottom-2.5 bg-blue-900 hover:text-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="Button"
              onClick={() => setDivision(ladders.div_e)}
            >
              Div E
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="border-2">
            <table>
              <thead>
                <tr>
                  <th className="border-b-2 px-10 py-2">SNo.</th>
                  <th className="border-b-2 px-10 py-2">Problem Name</th>
                  <th className="border-b-2 px-10 py-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {division.map((prob) => {
                  return (
                    <>
                      <tr>
                        <td className="text-center px-10 py-2">{prob[0]}</td>
                        <td className="text-center px-10 py-2">
                          <a
                            href={
                              "https://codeforces.com/problemset/problem/" +
                              prob[2] +
                              "/" +
                              prob[3]
                            }
                            target="_blank"
                          >
                            {prob[1]}
                          </a>
                        </td>
                        {mydata &&
                          mydata.data.result.map((item) => {
                            if (
                              item.problem.contestId.toString() === prob[2] &&
                              item.problem.index.toString() === prob[3] &&
                              item.verdict === "OK" &&
                              !correct.includes(prob[2] + prob[3])
                            ) {
                              correct.push(prob[2] + prob[3]);
                            } else if (
                              item.problem.contestId.toString() === prob[2] &&
                              item.problem.index.toString() === prob[3] &&
                              item.verdict === "WRONG_ANSWER" &&
                              !wrong.includes(prob[2] + prob[3])
                            ) {
                              wrong.push(prob[2] + prob[3]);
                            }
                          })}
                        {correct.map((item) => {
                          wrong = removeItemAll(wrong, item);
                        })}
                        {correct.includes(prob[2] + prob[3]) ? (
                          <td className="bg-green-300 text-center border-2">
                            <div>AC</div>
                          </td>
                        ) : (
                          <></>
                        )}
                        {wrong.includes(prob[2] + prob[3]) ? (
                          <td className="bg-red-300 text-center border-2">
                            <div>WA</div>
                          </td>
                        ) : (
                          <></>
                        )}
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
