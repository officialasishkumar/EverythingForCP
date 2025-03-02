import React from "react";
import Select from "react-select";

const NavbarC = ({
  userLang,
  setUserLang,
  userTheme,
  setUserTheme,
  fontSize,
  setFontSize,
}) => {
  const languages = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" }, // new language added
  ];
  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];
  return (
    <div className="my-4 py-3"> {/* Removed mt-72 to cut down on excess whitespace */}
      <div className="flex place-content-evenly">
        <Select
          className="text-xl"
          options={languages}
          value={languages.find(lang => lang.value === userLang)}
          onChange={(e) => setUserLang(e.value)}
          placeholder={userLang}
        />
        <Select
          className="text-xl"
          options={themes}
          value={themes.find(theme => theme.value === userTheme)}
          onChange={(e) => setUserTheme(e.value)}
          placeholder={userTheme}
        />
        <div className='flex flex-wrap justify-center'>
          <label className="mr-5 text-xl" htmlFor="bar">
            Font Size:
          </label>
          <input
            id="bar"
            type="range"
            min="18"
            max="30"
            value={fontSize}
            step="2"
            onChange={(e) => setFontSize(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarC;
