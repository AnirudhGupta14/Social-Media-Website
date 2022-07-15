import "./Sidebar.css";
import {useEffect, useState} from "react";
import CloseFriend from "../closefriend/closeFriend";
import axios from 'axios';
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Sidebar({userid}) {

    const [allfriends,setFriends] = useState([])
    const api = axios.create({baseURL: `http://localhost:3000/`})
    useEffect(() => {
        api.get(`users/friends/${userid}`).then(res => setFriends(res.data));
    },[userid]);
    

  return (
    <div className="sidebar">
        <div className="sidebarWrapper">
            <header className="sidebar-head">Main Menu</header>
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <img src={PF+"menu/chat.png"} alt="" className='sidebarIcon'/>
                    <span className="sidebarListItemText">Chats</span>
                </li>
                <li className="sidebarListItem">
                    <img src={PF+"menu/trend.png"} alt="" className='sidebarIcon'/>
                    <span className="sidebarListItemText">Trends</span>
                </li>
                <li className="sidebarListItem">
                    <img src={PF+"menu/group.png"} alt="" className='sidebarIcon'/>
                    <span className="sidebarListItemText">Groups</span>
                </li>
                <li className="sidebarListItem">
                    <img src={PF+"menu/bookmark.png"} alt="" className='sidebarIcon'/>
                    <span className="sidebarListItemText">Bookmarks</span>
                </li>
                <li className="sidebarListItem">
                    <img src={PF+"menu/question.png"} alt="" className='sidebarIcon'/>
                    <span className="sidebarListItemText">Questions</span>
                </li>
                <li className="sidebarListItem">
                    <img src={PF+"menu/job.png"} alt="" className='sidebarIcon'/>
                    <span className="sidebarListItemText">Jobs</span>
                </li>
                <li className="sidebarListItem">
                    <img src={PF+"menu/event.png"} alt="" className='sidebarIcon'/>
                    <span className="sidebarListItemText">Events</span>
                </li>
                <li className="sidebarListItem">
                    <img src={PF+"menu/course.png"} alt="" className='sidebarIcon'/>
                    <span className="sidebarListItemText">Courses</span>
                </li>
            </ul>
            <hr className="sidebarHr" />
            <header className="sidebar-head">Friends</header>
            <ul className="sidebarFriendList">
                {allfriends.map((u) => (
                    <CloseFriend key={u._id} user={u} />
                ))}
            </ul>
        </div>
    </div>
  );
}
