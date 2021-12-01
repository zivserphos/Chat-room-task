import React , {useRef} from "react";
import { Link , useNavigate} from "react-router-dom";
import "../login.scss"


export default function LoginPage() {
  const navigate = useNavigate()
  const inputEl = useRef()

  function toHomePage(inputEl) {
    const inputVal = inputEl.current.value
    if (inputVal !== "") return true
    return false
 
  }
  return (
    <div id="loginPage">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault()
        if(toHomePage(inputEl))  navigate("/" , {user: "Gggg"})
      }}>
        <h3>Login Here</h3>
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" ref={inputEl}/>

        <button>Log In</button>
      </form>
    </div>
  );
}
