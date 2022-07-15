import "./Register.css";
import axios from "axios";
import { useRef } from "react";
import {Link} from "react-router-dom";
import { useHistory } from "react-router";

export default function Register() {

    const first_name = useRef();
    const last_name = useRef();
    const email = useRef();
    const password = useRef();
    const confirm_password = useRef();

    const history = useHistory();

    const api = axios.create({baseURL: `http://localhost:3000/`})
    
    const handleClick = async (e) => {
        e.preventDefault();
        if (confirm_password.current.value !== password.current.value) 
        {
          confirm_password.current.setCustomValidity("Passwords don't match!");
        } 
        else 
        {
          const user = {
            first_name: first_name.current.value,
            last_name: last_name.current.value,
            email: email.current.value,
            password: password.current.value,
            confirm_password: confirm_password.current.value
          };
          try 
          {
            await api.post("/users/sign-up", user);
            history.push("/login");
          } 
          catch (err) 
          {
            console.log(err);
          }
        }
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
                        <form onSubmit={handleClick}>
                            <div className="name-details">
                                <div className="field input">
                                    <label>First Name</label>
                                    <input type="text" name="fname" placeholder="First name" ref={first_name} required/>
                                </div>
                                <div className="field input">
                                    <label>Last Name</label>
                                    <input type="text" name="lname" placeholder="Last name" ref={last_name} required/>
                                </div>
                            </div>
                            <div className="field input">
                                <label>Email Address</label>
                                <input type="email" name="email" placeholder="Enter your email" ref={email} required/>
                            </div>
                            <div className="field input">
                                <label>Password</label>
                                <input type="password" name="password" placeholder="Enter new password" ref={password} required/>
                            </div>
                            <div className="field input">
                                <label>Confirm Password</label>
                                <input type="password" name="password" placeholder="Enter same password" ref={confirm_password} required/>
                            </div>
                            <div className="field button">
                                <button type="submit" name="submit" >Continue</button>
                            </div>
                        </form>
                        <div className="link">Already signed up? <Link to="/login">Login now</Link></div>
                    </section>
                </div>
            </div>
        </div>
    </div>
  );
}