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
  ];
  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];
  return (
    <div className="mt-72 mb-5">
      <div className="flex place-content-evenly">
        <Select
          className="text-xl"
          options={languages}
          value={userLang}
          onChange={(e) => setUserLang(e.value)}
          placeholder={userLang}
        />
        <Select
          className="text-xl"
          options={themes}
          value={userTheme}
          onChange={(e) => setUserTheme(e.value)}
          placeholder={userTheme}
        />
        <div className='flex flex-wrap justify-center'>
          <label className="mr-5 text-xl" for="bar">
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
