import logo from "./logo.svg";
import "./App.css";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
  ambigousCharacters
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
  const [isAmbigousChar, setAmbigousChar] = useState(true)
  const btnRef = useRef();

  const handleGeneratePswd = () => {
    
    if(psdLength < 8) toastMessage("error","less than 8 character is not allowed")
    else if (!isUpperLetter && !isLowerLetter && !isNumeric && !isSpecialChar){
      toastMessage("error", "Please select any one case type.");
      setPassword('')
    }
    else {
      btnRef.current.style.boxShadow = "none";
      let charList = "";
      if (isUpperLetter) charList += createPassword(upperCaseLetters);
      if (isSpecialChar) charList += createPassword(specialCharacters);
      if (isNumeric) charList += createPassword(numbers);
      if (isLowerLetter) charList += createPassword(lowerCaseLetters);
      if (!isAmbigousChar) charList += createPassword(ambigousCharacters)
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

    if(pswd)

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

  const handlePswdLength = (e) => {
    setPsdLength(e.target.value)
  }

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

  console.log("isAmbigousChar",isAmbigousChar)

  return (
    <div className="container">
      <div className="generator_box text-center">
        <h4>Password Generator</h4>
        <div className="div__1">
          <span className="span__1">
            <input id="myInput" type="text" value={password} disabled={true} />
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
            onChange={(e) => handlePswdLength(e)}
          />
        </div>
        <div className="div__3">
          <span className="span__3">Include Uppercase letters :- </span>
          <input
            type="checkbox"
            className=""
            defaultChecked={isUpperLetter}
            value={isUpperLetter}
            onChange={(e) => setIsUpperLetter(e.target.checked)}
          />
        </div>
        <div className="div__4">
          <span className="span__4">Include Lowercase letters :- </span>
          <input
            type="checkbox"
            className=""
            defaultChecked={isLowerLetter}
            value={isLowerLetter}
            onChange={(e) => setIsLowerLetter(e.target.checked)}
          />
        </div>
        <div className="div__5">
          <span className="span__5">Include Numerics :- </span>
          <input
            type="checkbox"
            className=""
            defaultChecked={isNumeric}
            value={isNumeric}
            onChange={(e) => setIsNumeric(e.target.checked)}
          />
        </div>
        <div className="div__6">
          <span className="span__6">Include Symbols :- </span>
          <input
            type="checkbox"
            className=""
            defaultChecked={isSpecialChar}
            value={isSpecialChar}
            onChange={(e) => setIsSpecialChar(e.target.checked)}
          />
        </div>
        <div className="div__8">
          <span className="span__8">Exclude Ambigous Characters {"({}[]()/'`~,;:.<>)"+'"'} :- </span>
          <input
            type="checkbox"
            className=""
            defaultChecked={isAmbigousChar}
            value={isAmbigousChar}
            onChange={(e) => setAmbigousChar(e.target.checked)}
          />
        </div>
        <div className="div__7">
          <button ref={btnRef} type="button" onClick={handleGeneratePswd}>
            Generate
          </button>
        </div>
      </div>
      <div className="text-center div__8">
        <span>Developed by Raj Agrawal</span>
        <a title="click for source code" rel="noreferrer" target="_blank" href="https://github.com/raj-git-96/password_generator">
          <i className="fab fa-github"></i>
        </a>
        <a title="LinkedIn" rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/raj-agrawal-1a8173173/">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
}

export default App;
