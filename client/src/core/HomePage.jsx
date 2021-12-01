import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const location = useLocation();
  const userName = location.state.user;
  const msgAreaEl = useRef()
  const inputEl = useRef();

  const source = new EventSource("http://localhost:3001/kaka");
  source.onopen = function () {
    console.log("connection to stream has been opened");
  };
  source.onerror = function (error) {
    console.log("An error has occurred while receiving stream", error);
  };
  source.onmessage = function ({ data }) {
    console.log("received stream", data);
  };

  async function postComment() {
    console.log("i got fired");
    if (!inputEl.current.value) return
    try {
        console.log(inputEl.current.value)
        const response = await axios.post("http://localhost:3001/AniGever", {
            comment: inputEl.current.value,
          });
        console.log(response.data)
        console.log("zzz")
    }
    catch(err) {
        console.log(err)
    }

  }

  return (
    <div id="homePage">
      <div className="welcome-banner">
        <div className="name-side">
          <p>Welcome, {userName}</p>
        </div>
      </div>
      <div className="wrapper">
        <div className="main-container">
          <div className="message-area" ref={msgAreaEl}>
            {userName}: This is the first message <br />
            {userName}: this is the Second message
          </div>
          <div className="enter-area">
            <form>
              <input
                type="text"
                placeholder="Enter Message..."
                name="message-ent"
                id="message-ent"
                ref={inputEl}
              ></input>
              <input
                type="submit"
                name="message-send"
                id="message-send"
                value="Send"
                onClick={(e) => {
                  e.preventDefault();
                  postComment();
                }}
              ></input>
            </form>
          </div>
        </div>
        <div className="online-tab">
          <div className="status-bar-user">
            <p>
              <span>• </span>Online
            </p>
          </div>
          <div className="online-user-list">
            <div className="online-tab-open">&#9776;</div>
          </div>
        </div>
      </div>
    </div>
  );
}
