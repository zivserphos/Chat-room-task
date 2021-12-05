import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const inputEl = useRef();

  function toHomePage(inputEl) {
    const inputVal = inputEl.current.value;
    if (inputVal !== "") return true;
    return false;
  }
  return (
    <div id="loginPage">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (toHomePage(inputEl))
            navigate("/", { state: { user: inputEl.current.value } });
        }}
      >
        <h3>Login Here</h3>
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="username" id="username" ref={inputEl} />

        <button>Log In</button>
      </form>
    </div>
  );
}
