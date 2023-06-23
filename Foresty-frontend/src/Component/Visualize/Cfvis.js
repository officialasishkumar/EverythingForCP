import React, { useState } from "react";
import { useEffect } from "react";

import axios from "axios";
import Table from "../Charts/Table";
import PieData from "../Charts/pieData";
import BarIndex from "../Charts/BarIndex";
import DoughnutChart from "../Charts/Doughnutchart";
import Loading from "../Loading";

const apiUrl1 = "https://codeforces.com/api/user.status?handle=";
const apiUrl2 = "https://codeforces.com/api/user.rating?handle=";
const apiUrl3 = "https://codeforces.com/api/user.info?handles=";

export default function Cfvis() {
  const [skipstate, setskipstate] = useState(false);
  const [submissions, setSubmissions] = useState();
  const [flag, setFlag] = useState(false);
  const [contest, setContest] = useState();
  const [info, setInfo] = useState();
  const [text, settext] = useState("");
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const buttons = () => {
    return (
      <>
        <ul className="mb-3 flex place-content-evenly">
          <li>
            <button
              className="mx-2 text-white right-2.5 bottom-2.5 bg-blue-700 hover:text-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setCount(0)}
            >
              Languages Used
            </button>
          </li>
          <li>
            <button
              className="mx-2 text-white right-2.5 bottom-2.5 bg-blue-700 hover:text-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-white dark:focus:ring-blue-800"
              onClick={() => setCount(1)}
            >
              Problem Type
            </button>
          </li>
          <li>
            <button
              className="mx-2 text-white right-2.5 bottom-2.5 bg-blue-700 hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setCount(2)}
            >
              Verdicts
            </button>
          </li>
          <li>
            <button
              className="mx-2 text-white right-2.5 bottom-2.5 bg-blue-700 hover:text-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setCount(3)}
            >
              Tags
            </button>
          </li>
        </ul>
      </>
    );
  };

  useEffect(() => {
    const fetchDetails = () => {
      setLoading(true);
      axios
        .get(apiUrl1 + text)
        .then((result) => {
          setSubmissions(result);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Please try again");
          setLoading(false);
        });
      axios
        .get(apiUrl2 + text)
        .then((result) => {
          setContest(result);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Please try again");
          setLoading(false);
        });
      axios
        .get(apiUrl3 + text)
        .then((result) => {
          setInfo(result);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Please try again");
          setLoading(false);
        });
    };
    if (skipstate) {
      fetchDetails();
    } else {
      setskipstate(true);
    }
  }, [flag]);

  // For Language Pie chart
  const programLang = () => {
    // Gives the programming language of user in plang
    const plang = submissions.data.result.map((p) => p.programmingLanguage);
    let counts = {};
    for (let i = 0; i < plang.length; i++) {
      let num = plang[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    // counts stores the programming language used and its frequency
    return counts;
  };

  // For Bar chart
  const probIndex = () => {
    // submission array contains submissions which are accepted
    const submission = submissions.data.result.filter(
      (c) => c.verdict === "OK"
    );
    // it takes the indexes of problems(from submission[accepted problems]) in pindex(for eg. A,B,C etc..)
    const pindex = submission.map((p) => p.problem.index);
    var counts = {};
    for (let i = 0; i < pindex.length; i++) {
      var num = pindex[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    // counts will store the frequency of a particular index problem solved
    return counts;
  };

  // For Verdict Pie chart
  const programVerdict = () => {
    const pverdict = submissions.data.result.map((p) => p.verdict);
    let counts = {};
    for (let i = 0; i < pverdict.length; i++) {
      let num = pverdict[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    //         counts will store the frequency of a particular verdict(
    //             for eg
    //                 {
    //                     COMPILATION_ERROR : 206
    //                     MEMORY_LIMIT_EXCEEDED: 34
    //                     OK : 1033
    //                  }
    //          )
    return counts;
  };

  // Tags for Doughnut
  const programtags = () => {
    let tags = submissions.data.result.map((p) => p.problem.tags);
    tags = [].concat.apply([], tags);
    let counts = {};
    for (let i = 0; i < tags.length; i++) {
      let num = tags[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    // counts stores the number of problems of different tags(for eg Binary Search-1)
    return counts;
  };

  return (
    <>
      <div className="flex justify-center my-11">
        <input
          className="px-3 py-1 border-2 border-black rounded-lg"
          type="text"
          value={text}
          onChange={(event) => {
            settext(event.target.value);
          }}
          placeholder="Search"
        />
        {/* <button type='Button' onClick={() => { setFlag(!flag); if (submissions != undefined) { programtags() } }}>Submit</button> */}
        <button
          type="Button"
          onClick={() => setFlag(!flag)}
          className="mx-2 text-white right-2.5 bottom-2.5 bg-blue-900 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-900 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-900 dark:hover:bg-blue-900 dark:focus:ring-blue-900"
        >
          Search
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap justify-center">
          {submissions !== undefined && (
            <Table
              user={text}
              sub={submissions}
              contest={contest}
              info={info}
            />
          )}
          <div className="w-full">
            {submissions !== undefined && buttons()}
            <div className="flex justify-center">
              {submissions !== undefined && count === 0 && (
                <PieData data={programLang()} />
              )}
              {submissions !== undefined && count === 1 && (
                <BarIndex data={probIndex()} />
              )}
              {submissions !== undefined && count === 2 && (
                <PieData data={programVerdict()} />
              )}
              {submissions !== undefined && count === 3 && (
                <DoughnutChart data={programtags()} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
