import "./Profile.css";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useEffect} from "react";
import axios from 'axios';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Profilefeed from "../../components/profilefeed/Profilefeed";
import Profileupdate from "../../components/profileupdate/Profileupdate";
import Rightprofile from "../../components/rightprofile/Rightprofile";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;


export default function Profile() {

const { user } = useContext(AuthContext);   
const [user_profile,setUser_profile] = useState({})
const userid = useParams().id;
const api = axios.create({baseURL: `http://localhost:3000/`})
useEffect(() => {
    api.get(`users/${userid}`).then(res => setUser_profile(res.data));
},[useParams().id]);

    
  return (
    <>
        <Topbar />
        <div className="profile">
            <Sidebar userid={userid}/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img className="profileCoverImg" src={PF+"persons/cover.jpg"} alt=""/>
                        <img className="profileUserImg" src={user_profile.profile_picture ? PF+user_profile.profile_picture : PF+"persons/blank.jpg"}  alt=""/>
                        {userid === user._id && <Profileupdate/>}
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">{user_profile.first_name + " " + user_profile.last_name}</h4>
                        <span className="profileInfoDesc">{user_profile.desc}</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Profilefeed userid={userid}/>
                    <Rightprofile user={user_profile}/>
                </div>
            </div>
        </div>
    </>
  );
}
