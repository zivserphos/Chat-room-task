import "../homePage.scss";
import React from "react";

export default function HomePage({user}) {
  console.log({user})
  const source = new EventSource("http://localhost:3001/kaka");
  source.onopen = function () {
    console.log("connection to stream has been opened");
  };
  source.onerror = function (error) {
    console.log("An error has occurred while receiving stream", error);
  };
  source.onmessage = function ({data}) {
    console.log("received stream", data);
  };





  return (
    <div id="homePage">
     <div class="welcome-banner">
  <div class="name-side"><p>Welcome, Ziv123</p></div>
</div>
<div class="wrapper">
<div class="main-container">
  
  <div class="message-area"></div>
  <div class="enter-area">
    <form>
      <input type="text" placeholder="Enter Message..." name="message-ent" id="message-ent"></input>
      <input type="submit" name="message-send" id="message-send" value="Send" onclick="#"></input>
    </form>
  </div>
  </div>
<div class="online-tab"> 
  <div class="status-bar-user"><p><span>• </span>Online</p></div>
  <div class="online-user-list">
    <div class="online-tab-open">&#9776;</div>
  </div>
  
 </div>

</div>
    </div>
  );
}
