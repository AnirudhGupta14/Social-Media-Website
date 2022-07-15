import "./Post.css";
import Postedit from "../postedit/Postedit";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;


export default function Post({post}) 
{
  let api = axios.create({baseURL: `http://localhost:3000/`})
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user,setUser] = useState({})

  const {user: main_user} = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(main_user._id));
  }, [main_user._id, post.likes]);

  const handleDelete = async () => {
    try
    {
      if(window.confirm("Are you sure you want to delete this post ????"))
      {
        api.get(`posts/destroy/${post._id}`);
      }
    }
    catch(err) 
    {
      console.log(err);
    }
  }

  const likeHandler = () => {
    api = axios.create({baseURL: `http://localhost:3000/`})
    try 
    {
      api.put(`posts/like/${post._id}`, {userId: main_user._id});
    } 
    catch (err) 
    {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  

  useEffect(() => {
      api.get(`users/${post.userId}`).then(res => {
        setUser(res.data);
      });
  },[post.userId]);

  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to ={`profile/${user._id}`}><img className="postProfileImg" src={user.profile_picture ? PF+user.profile_picture : PF+"persons/blank.jpg"} alt=""/></Link>
                    <Link className="postUsername" to ={`profile/${user._id}`}><span>{user.first_name + " " + user.last_name}</span></Link>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                {main_user._id === user._id && (<Postedit postdata={post}/>)}
                  {main_user._id === user._id && (<button className="delete-btn" onClick={handleDelete}>Delete</button>)}
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className="postImg" src={PF+post.img} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src={PF+"menu/like.png"} onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like} people liked it</span>
                </div>
            </div>
        </div>
    </div>
  );
}