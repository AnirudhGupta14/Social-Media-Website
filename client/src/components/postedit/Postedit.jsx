import {useRef, useEffect, useState} from "react";
import "../profileupdate/Profileupdate.css";
import axios from "axios";

export default function Postedit({postdata}) {

    const api = axios.create({baseURL: `http://localhost:3000/`});
    const [file, setFile] = useState(null);

    const desc = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();
        
        const newPost = {
          desc: desc.current.value ? desc.current.value : postdata.desc
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
            await api.put(`posts/change/${postdata._id}`, newPost);
            window.location.reload();
        } 
        catch(err)
        {
            console.log(err);
        }
    };

  return (
    <>
        <button type="button" className="edit-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit your post</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={submitHandler}>
                            <div className="field input extraX">
                                <label>Description</label>
                                <input type="text" name="desc" placeholder="Post Description" ref={desc}/>
                            </div>
                            <div className="field input extra">
                                <label htmlFor="myfile">Post Picture</label>
                                <input type="file" id="myfile" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])}/>   
                            </div> 
                            <hr />
                            <div className="field button">
                                <button className="submit-btn" type="submit" name="submit" >Save</button>
                            </div>
                        </form>
                    </div>  
                </div>
            </div>
       </div>
    </>
  )
}
