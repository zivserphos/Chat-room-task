import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = function () {
  const navigate = useNavigate();
  const inputEl = useRef<HTMLInputElement>(null);

  function toHomePage() {
    if (!inputEl.current?.value) return false;
    return true;
  }
  return (
    <div id="loginPage">
      <div className="background">
        <div className="shape" />
        <div className="shape" />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (toHomePage()) {
            navigate("/", { state: { user: inputEl.current?.value } });
          }
        }}
      >
        <h3>Login Here</h3>
        <label htmlFor="username">
          Username
          <input type="text" placeholder="username" id="username" ref={inputEl} />
        </label>

        <button type="button">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;
