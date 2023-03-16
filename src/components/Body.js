import { Outlet } from "react-router-dom"
import MainContainer from "./MainContainer.js"
import Sidebar from "./SideBar.js"

const Body = () =>{
    return(
        <div className="flex">
            <Sidebar/>
            <Outlet/>
        </div>
    )
}

export default Body