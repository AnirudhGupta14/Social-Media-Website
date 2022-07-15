import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useEffect} from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import '../feed/Feed.css'
import axios from 'axios';

export default function Profilefeed({userid}) 
{
  const { user } = useContext(AuthContext);
  const [user_posts, setuser_Posts] = useState([]);
  const api = axios.create({baseURL: `http://localhost:3000/`})
  useEffect(() => {api.get(`posts/profile/${userid}`).then(res => {setuser_Posts(res.data.sort((p1, p2) => {return new Date(p2.createdAt) - new Date(p1.createdAt);}));});},[{userid}]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {userid === user._id && <Share/>}
        {user_posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}