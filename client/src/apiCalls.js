import axios from "axios";

export const loginCall = async (userCredential, dispatch) => 
{
    const api = axios.create({baseURL: `http://localhost:3000/`})
    dispatch({ type: "LOGIN_START" });
    try 
    {
        const res = await api.post("/users/sign-in", userCredential);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } 
    catch(err) 
    {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
};