import {useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Rightbar.css";
import Online from "../online/Online";
import axios from 'axios';
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Rightbar() 
{
  const {user} = useContext(AuthContext);
  const [alluser,setallUser] = useState([])
  const api = axios.create({baseURL: `http://localhost:3000/`})
  useEffect(() => {
    api.get(`users/findusers/${user._id}`).then(res => setallUser(res.data));
  });
  
    return(
      <div className="rightbar">
        <div className="rightbarWrapper">
          <div className="birthdayContainer">
            <img className="birthdayImg" src={PF+"header/birthday.png"} alt="" />
            <span className="birthdayText">
              <b>Anirudh Gupta</b> and <b>3 other friends</b> have a birthday today. <b>Wish them ...</b>
            </span>
          </div>
          <img src="https://images.theconversation.com/files/228846/original/file-20180723-189310-1ymcybu.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip" alt="" className="rightbarAd"/>
          <div className="rightbarTitle">Suggested Users</div>
          <ul className="rightbarFriendList">
            {alluser.map((u) => (<Online key={u._id} user={u} />))}
          </ul>
        </div>
      </div>
           
  );
}
