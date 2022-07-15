import "./Topbar.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;


export default function Topbar() {

const {user} = useContext(AuthContext);
const api = axios.create({baseURL: `http://localhost:3000/`});
const[user_main, set_user_main] = useState({user});

useEffect(() => {
    api.get(`users/${user._id}`).then(res => set_user_main(res.data))
});


const handleClick = async (e) => {
    localStorage.clear();
    window.location.reload();
}

return (
    <div className="topbarContainer">
        <div className="topbarLeft">
            <img src={PF+"header/icon.png"} alt="" className="head-img"/>
            <Link to="/"> <span className="logo">Friends Book</span> </Link>
        </div>
        <div className="topbarCenter">
            <div className="searchbar">
                <i className="fa-solid fa-magnifying-glass searchIcon"></i>
                <input placeholder="Search for something good...." className="searchInput"/>
            </div>
            <Link to="/"><button className="home-button">Home</button></Link>
        </div>
        <div className="topbarRight">
            <div className="topbar-img">
                <img src={PF+"header/home.png"} alt="" className="topbarImg"/>
                <img src={PF+"header/tag.png"} alt="" className="topbarImg"/>
                <img src={PF+"header/message.png"} alt="" className="topbarImg"/>
                <img src={PF+"header/bell.png"} alt="" className="topbarImg"/>
            </div> 
            <Link to={`/profile/${user._id}`}><span className="head-name"> {user_main.first_name + " " + user_main.last_name} </span> </Link>
            <Link to={`/profile/${user._id}`}><img src={user_main.profile_picture ? PF+user_main.profile_picture : PF+"persons/blank.jpg"} alt="" className="userImg"/></Link>
            <div className="topbarLinks">
                <button className="home-button" onClick={handleClick}>Logout</button>
            </div>
        </div> 
    </div>
  );
}