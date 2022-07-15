import "./Online.css";
import {Link} from "react-router-dom";

export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
            <Link to={`/profile/${user._id}`}><img className="rightbarProfileImg" src={user.profile_picture ? PF+user.profile_picture : PF+"persons/blank.jpg"} alt="" /></Link>
            <div className="rightbarOnline"></div>
        </div>
        <Link className="rightbarUsername" to={`/profile/${user._id}`}><span >{user.first_name + " " + user.last_name}</span></Link>
        
    </li>
  );
}