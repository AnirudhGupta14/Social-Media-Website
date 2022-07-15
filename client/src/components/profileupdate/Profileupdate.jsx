import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useEffect, useState} from "react";
import "./Profileupdate.css";


export default function Profileupdate() 
{
    const { user } = useContext(AuthContext);
    const api = axios.create({baseURL: `http://localhost:3000/`});
    const[user_main, set_user_main] = useState({user});
    const [file, setFile] = useState(null);

    useEffect(() => {
        api.get(`users/${user._id}`).then(res => set_user_main(res.data))
    });

    const first_name = useRef();
    const last_name = useRef();
    const city = useRef();
    const country = useRef();
    const relationship = useRef();
    const job = useRef();
    const desc = useRef();
    const gender = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();
        
        const newProfile = {
          first_name: first_name.current.value ? first_name.current.value : user_main.first_name,
          last_name: last_name.current.value ? last_name.current.value : user_main.last_name,
          city: city.current.value ? city.current.value : user_main.city,
          country: country.current.value ? country.current.value : user_main.country,
          relationship: relationship.current.value ? relationship.current.value : user_main.relationship,
          job: job.current.value ? job.current.value : user_main.job,
          desc: desc.current.value ? desc.current.value : user_main.desc,
          gender: gender.current.value ? gender.current.value : user_main.gender
        };

        if(file)
        {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name", fileName);
          data.append("file", file);
          newProfile.profile_picture = fileName;
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
            await api.put(`users/update/${user._id}`, newProfile);
            window.location.reload();
        } 
        catch(err)
        {
            console.log(err);
        }
    };

  return (
    <>
        <button type="button" className="btn btn-primary update-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Update Profile</button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Your Profile Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={submitHandler}>
                            <div className="field input">
                                <label>First Name</label>
                                <input type="text" name="first_name" placeholder="Enter your first name" ref={first_name}/>
                            </div>
                            <div className="field input">
                                <label>Last Name</label>
                                <input type="text" name="last_name" placeholder="Enter your last name" ref={last_name}/>
                            </div>
                            <div className="field input extra">
                                <label htmlFor="myfile">Profile Picture</label>
                                <input type="file" id="myfile" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])}/>   
                            </div>
                            <div className="field input smallX">
                                <label>City</label>
                                <input type="text" name="city" placeholder="Enter your city" ref={city}/>
                            </div>
                            <div className="field input">
                                <label>Country</label>
                                <input type="text" name="country" placeholder="Enter your country" ref={country}/>
                            </div>
                            <div className="field input extra">
                                <label>Relationship Status</label>
                                <input type="text" name="relationship" placeholder="Enter your relationship status" ref={relationship}/>
                            </div>
                            <div className="field input">
                                <label>Profession</label>
                                <input type="text" name="job" placeholder="Enter your profession" ref={job}/>
                            </div>
                            <div className="field input extraX">
                                <label>Description</label>
                                <input type="text" name="desc" placeholder="Enter something about you" ref={desc}/>
                            </div>
                            <div className="field input smallX">
                                <label>Gender</label>
                                <input type="text" name="gender" placeholder="Enter your gender" ref={gender}/>
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
