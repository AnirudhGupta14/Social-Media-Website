import "../register/Register.css";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

export default function Login()
{
    const email = useRef();
    const password = useRef();
    const {isFetching, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
          {email: email.current.value, password: password.current.value},
          dispatch
        );
    };

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Friends Book</h3>
                <span className="loginDesc">Connect with friends and the world around you on Friends Book.</span>
                <img src="https://thumbs.dreamstime.com/b/network-avatar-icons-hand-woman-hand-holds-smartphone-send-message-to-friends-network-social-connection-internet-flat-147106279.jpg" alt="" className="main-img"/>
            </div>
            <div className="loginRight">
                <div className="wrapper">
                    <section className="form signup">
                        <header>Friends Book</header>
                        <form id="sign-up-form" onSubmit={handleClick}>
                            <div className="field input">
                                <label>Email Address</label>
                                <input type="email" name="email" placeholder="Enter your email"  ref={email} required/>
                            </div>
                            <div className="field input">
                                <label>Password</label>
                                <input type="password" name="password" placeholder="Enter new password"  ref={password} required/>
                            </div>
                            <div className="field button">
                                <button type="submit" name="submit" >{isFetching? "Loading..." : "Continue"}</button>
                            </div>
                        </form>
                        <div className="link">New user? <Link to="/">Signup now</Link></div>
                    </section>
                </div>
            </div>
        </div>
    </div>
  );
}