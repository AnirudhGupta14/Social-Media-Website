

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./Home.css"

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar userid={user._id}/>
        <Feed/>
        <Rightbar/>
      </div> 
    </>
  )
}