import { useState } from "react";
import Editor from "@monaco-editor/react";
import NavbarC from "./NavbarC";
import axios from "axios";
import Loading from "./loadingC.gif";

function Compiler() {
  const [userCode, setUserCode] = useState(``);
  const [userLang, setUserLang] = useState("python");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const options = { fontSize: fontSize };

  // Map your language value to Judge0 language IDs
  const languageMapping = {
    c: 50,
    cpp: 54,
    python: 71,
    java: 62,
    javascript: 63, // new language added
  };

  async function compile() {
    setLoading(true);
    if (userCode === ``) {
      setLoading(false);
      return;
    }

    // Build payload for Judge0 API
    const data = JSON.stringify({
      source_code: userCode,
      language_id: languageMapping[userLang],
      stdin: userInput,
    });
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: {
        base64_encoded: 'false', // Changed to false for easier handling
        wait: 'true', // Set to true to wait for result
        fields: '*'
      },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_JUDGE0_API_KEY,
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data
    };

    try {
      const response = await axios.request(options);

      // Process the response
      if (response.data.stdout) {
        setUserOutput(response.data.stdout);
      } else if (response.data.compile_output) {
        setUserOutput(response.data.compile_output);
      } else if (response.data.stderr) {
        setUserOutput(response.data.stderr);
      } else {
        setUserOutput(response.data.message || "No output");
      }
    } catch (error) {
      console.error("Error:", error);
      setUserOutput("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  }

  function clearOutput() {
    setUserOutput("");
  }

  return (
    <div>
      <NavbarC
        userLang={userLang}
        setUserLang={setUserLang}
        userTheme={userTheme}
        setUserTheme={setUserTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      <div>
        <div className="flex-col">
          <div>
            <Editor
              options={options}
              height="calc(60vh - 60px)"
              width="100%"
              theme={userTheme}
              language={userLang}
              defaultLanguage="python"
              defaultValue="# Enter your code here"
              onChange={(value) => setUserCode(value)}
            />
          </div>
          <div className="mt-5 flex justify-center">
            <div>
              <h4>Input:</h4>
              <div className="border-2 border-black">
                <textarea
                  id="code-inp"
                  onChange={(e) => setUserInput(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="ml-4">
              <h4>Output:</h4>
              {loading ? (
                <div>
                  <img width={"20px"} src={Loading} alt="Loading..." />
                </div>
              ) : (
                <div>
                  <pre>{userOutput}</pre>
                  <button
                    onClick={clearOutput}
                    className="bg-blue-900 text-white mt-4 p-1"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-900 text-white hover:bg-white hover:text-blue-950 border-2 p-2 m-3 rounded-xl"
            onClick={compile}
          >
            Run
          </button>
        </div>
      </div>
    </div>
  );
}

export default Compiler;
