import { Outlet } from "react-router"
import Navbar from "../components/nav/Navbar" 
import Footer from "../components/footer/Footer"
import Admindrawer from "./AdminDashboard/aside/Admindrawer"
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

const AdminDashboard = () => {
    const [drawerOpen, setDrawerOpen]= useState(false)
    const handleDrawerToggle = ()=>{
        setDrawerOpen((prev) => !prev ) 
    }
    
    return (
        <div>
            <Navbar />
            {/* Top bar */}
            <div className="flex p-4 bg-gray-600 items-center">
                <button className="mr-4 text-white text-2xl lg:hidden"
                    onClick={handleDrawerToggle}
                >
                    {
                        drawerOpen ? < IoCloseSharp/>: < FaBars/>
                    }
                </button>
                <span className="text-white text-lg font-semibold">
                    Welcome to your Admin Dashboard
                </span>
            </div>
            <div className="flex ">
                <aside className={`
                    bg-gray-500 w-64 min-h-screen fixed top-0 
                    lg:static lg:block
                    ${drawerOpen ? " " : "hidden"}
                    `}>
                    <div className="">
                        <button 
                        className="absolute right-4 top-4 m-0.5 text-2xl text-white"
                        onClick={handleDrawerToggle}>
                            <IoCloseSharp/>
                        </button>
                        <Admindrawer/>
                    </div>
                </aside>        
                <main className="flex-1 min-h-screen bg-green-200">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    )

}

export default AdminDashboard