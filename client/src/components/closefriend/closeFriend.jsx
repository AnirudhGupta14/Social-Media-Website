import "./closeFriend.css";
import {Link} from "react-router-dom";

export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <Link to={`/profile/${user._id}`}><img className="sidebarFriendImg" src={user.profile_picture ? PF+user.profile_picture : PF+"persons/blank.jpg"} alt="" /></Link>
      <Link className="sidebarFriendName" to={`/profile/${user._id}`}><span className="">{user.first_name + " " + user.last_name}</span></Link>
    </li>
  );
}