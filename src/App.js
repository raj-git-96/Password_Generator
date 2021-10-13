import logo from "./logo.svg";
import "./App.css";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./Character";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

function App() {
  const [password, setPassword] = useState("");
  const [psdLength, setPsdLength] = useState(8);
  const [isUpperLetter, setIsUpperLetter] = useState(false);
  const [isLowerLetter, setIsLowerLetter] = useState(false);
  const [isNumeric, setIsNumeric] = useState(false);
  const [isSpecialChar, setIsSpecialChar] = useState(false);
  const btnRef = useRef();

  const handleGeneratePswd = () => {
    if (!isUpperLetter && !isLowerLetter && !isNumeric && !isSpecialChar)
      toastMessage("error", "Please select any one case type.");
    else {
      btnRef.current.style.boxShadow = "none";
      let charList = "";
      if (isUpperLetter) charList += upperCaseLetters;
      if (isSpecialChar) charList += specialCharacters;
      if (isNumeric) charList += numbers;
      if (isLowerLetter) charList += lowerCaseLetters;

      setPassword(createPassword(charList));
    }
  };

  const createPassword = (charList) => {
    let pswd = "";
    const charListLength = charList.length;
    for (let i = 0; i < psdLength; i++) {
      let charIndex = Math.round(Math.random() * charListLength);
      pswd += charList.charAt(charIndex);
    }

    return pswd;
  };

  const toastMessage = (type, msg) => {
    toast[type](msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const copyToClipBoard = () => {
    if (!password) toastMessage("error", "Nothing to copy");
    else {
      var copyText = document.getElementById("myInput");

      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */

      /* Copy the text inside the text field */
      navigator.clipboard.writeText(copyText.value);
      toastMessage("success", "Copied");
    }
  };

  useEffect(() => {
    btnRef.current.style.boxShadow = "0 5px 15px";
  }, [password]);

  return (
    <div className="container">
      <div className="generator_box text-center">
        <h4>Password Generator</h4>
        <div className="div__1">
          <span className="span__1">
            <input id="myInput" type="text" value={password} disabled="true" />
            <i
              title="copy in clipboard"
              onClick={copyToClipBoard}
              className="fas fa-clipboard"
            ></i>
          </span>
        </div>
        <div className="div__2">
          <span className="span__2">Password Length :- </span>
          <input
            type="number"
            value={psdLength}
            onChange={(e) => setPsdLength(e.target.value)}
          />
        </div>
        <div className="div__3">
          <span className="span__3">Include Uppercase letters :- </span>
          <input
            type="checkbox"
            className=""
            value={isUpperLetter}
            onChange={(e) => setIsUpperLetter(e.target.checked)}
          />
        </div>
        <div className="div__4">
          <span className="span__4">Include Lowercase letters :- </span>
          <input
            type="checkbox"
            className=""
            value={isLowerLetter}
            onChange={(e) => setIsLowerLetter(e.target.checked)}
          />
        </div>
        <div className="div__5">
          <span className="span__5">Include Numerics :- </span>
          <input
            type="checkbox"
            className=""
            value={isNumeric}
            onChange={(e) => setIsNumeric(e.target.checked)}
          />
        </div>
        <div className="div__6">
          <span className="span__6">Include Symbols :- </span>
          <input
            type="checkbox"
            className=""
            value={isSpecialChar}
            onChange={(e) => setIsSpecialChar(e.target.checked)}
          />
        </div>
        <div className="div__7">
          <button ref={btnRef} type="button" onClick={handleGeneratePswd}>
            Generate
          </button>
        </div>
      </div>
      <div className="text-center div__8">
        Developed by Raj Agrawal
        <a title="click for source code" target="_blank" href="https://github.com/raj-git-96/password_generator">
          <i class="fab fa-github"></i>
        </a>
      </div>
    </div>
  );
}

export default App;
