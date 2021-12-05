import { useRef } from "react";
import axios from "axios";
import { isStrongPassword } from "../core/helpers/passwordValidator";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useNavigate } from "react-router-dom";

const notyf = new Notyf();

export default function SignUp() {
  const userNameEl = useRef();
  const passwordEl = useRef();
  const emailEl = useRef();
  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();
    const userName = userNameEl.current.value;
    const password = passwordEl.current.value;
    const email = emailEl.current.value;
    if (!email) return notyf.error("please enter an Email");
    if (!password) return notyf.error("please enter a Password");
    if (!userName) return notyf.error("please enter an username");

    const isStrong = isStrongPassword(password);
    console.log(!(isStrong === true));
    if (!(isStrong === true)) return notyf.error(isStrong[0].message);
    try {
      await axios.post("/auth/register", {
        userName,
        password,
        email,
      });
      // navigate("/login");
    } catch (err) {
      console.log(err.response);
      notyf.error(err.response.data);
    }
  }

  return (
    <div id="signup">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="form">
        <h3>Sign Up</h3>
        <label htmlFor="email"> Email </label>
        <input type="text" placeholder="email" id="email" ref={emailEl} />
        <label htmlFor="username">Choose Your User Name</label>
        <input type="text" placeholder="Email" id="userName" ref={userNameEl} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          ref={passwordEl}
        />
        <button id="signUp" onClick={(e) => registerUser(e)}>
          Sign Up
        </button>
        <div className="social"></div>
      </form>
    </div>
  );
}
