import "./Share.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useState} from "react";
import axios from "axios";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Share() 
{
    const [file, setFile] = useState(null);
    const { user } = useContext(AuthContext);
    const desc = useRef();
    

    const submitHandler = async (e) => {
        e.preventDefault();
        const api = await axios.create({baseURL: `http://localhost:3000/`});
        const newPost = {
          userId: user._id,
          desc: desc.current.value,
        };
        if(file)
        {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name", fileName);
          data.append("file", file);
          newPost.img = fileName;
          try 
          {
              await api.post("/posts/upload", data);
          } 
          catch(err) 
          {
            console.log(err);
          }
        }
        try 
        {
            const res = await api.post("/posts/createpost", newPost);
            window.location.reload();
        } 
        catch(err)
        {
            console.log(err);
        }
    };

  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg" src={user.profile_picture ? PF+user.profile_picture : PF+"persons/blank.jpg"} alt="" />
                <input type="text" placeholder="What's in your mind? Share with your friends..." className="shareInput" ref={desc}/>
            </div>
            <hr className="shareHr"/>
            {file && (
                <div className="shareImgContainer">
                    <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                    <img src={PF+"share/cross.png"} alt="" className="shareCancelImg" onClick={() => setFile(null)} />
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <img className="shareIcon" src={PF+"share/photo.png"} alt="" />
                        <span className="shareOptionText">Photo</span>
                        <input type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <img className="shareIcon" src={PF+"share/video.png"} alt="" />
                        <span className="shareOptionText">Video</span>
                    </div>
                    <div className="shareOption">
                        <img className="shareIcon" src={PF+"share/tag.png"} alt="" />
                        <span className="shareOptionText">Tags</span>
                    </div>
                    <div className="shareOption">
                        <img className="shareIcon" src={PF+"share/location.png"} alt="" />
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <img className="shareIcon" src={PF+"share/location.png"} alt="" />
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button type="submit" className="shareButton">Share</button>
            </form>
        </div>
    </div>
  );
}