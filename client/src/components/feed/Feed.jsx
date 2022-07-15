import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Share from "../share/Share";
import Post from "../post/Post";
import './Feed.css'
import axios from 'axios';

export default function Feed() 
{
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const api = axios.create({baseURL: `http://localhost:3000/`})
  useEffect(() => {
    api.get(`posts/timeline/${user._id}`).then(res => {setPosts(res.data.sort((p1, p2) => {return new Date(p2.createdAt) - new Date(p1.createdAt);}));});
  });
  

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}