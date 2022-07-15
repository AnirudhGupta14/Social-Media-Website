import {useState, useContext, useEffect} from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import "../rightbar/Rightbar.css";
import Rightbar from "../rightbar/Rightbar";
import axios from "axios";

export default function Rightprofile({user}) 
{  
    const {user: main_user} = useContext(AuthContext);
    const id = useParams().id;
    const api = axios.create({baseURL: `http://localhost:3000/`})
    const [followed, setFollowed] = useState(false);

    useEffect(() => {

        const findfriends = async () => {
                const res = await api.post(`/users/isfriends/${main_user._id}`, {userId: id});
                setFollowed(res.data);
        }
        findfriends();
    });

  

const handleClick = async () => {
    try
    {
        if(followed)
        {
            await api.put(`/users/unfollow/${main_user._id}`, {userId: id});
        }
        else
        {
            await api.put(`/users/follow/${main_user._id}`, {userId: id});
        }
        setFollowed(!followed);
        window.location.reload();
    }
    catch(err)
    {
        console.log(err);
    }
};

  return (
    <div className="rightbar">
        <div className="rightbarWrapper">
            {main_user._id !== user._id && (
            <button className="rightbarButton" onClick={handleClick}>
                {followed ? "Unfollow" : "Follow"}
            </button>
            )}
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{user.city}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">{user.country}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Job:</span>
                    <span className="rightbarInfoValue">{user.job}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue">{user.relationship}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Gender:</span>
                    <span className="rightbarInfoValue">{user.gender}</span>
                </div>
            </div>
            <Rightbar/>
        </div>
    </div>
  )
}
