import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ChatList from "../../components/chatList/ChatList";
import "./dashboardLayout.css";
import {  Menu } from "lucide-react";

const DashboardLayout = () => {
  // const token = localStorage.getItem("user-info");
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const [userInfo, setUserInfo] = useState(null);
 
     useEffect(()=>{
         const data = localStorage.getItem('user-info');
         const userData = JSON.parse(data);
         setUserInfo(userData);
     },[])

     const handleLogout = ()=>{
      localStorage.removeItem('user-info');
      navigate('/login');
  }

  // Toggle function for mobile view
  const toggleChatList = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="dashboardLayout">
      <aside className={`chatList ${isExpanded ? "expanded" : ""}`}>
        <ChatList isExpanded={isExpanded} onToggle={setIsExpanded} />
      </aside>
      <main className="content">
        <header className="content-header">
            {/* Hamburger Menu for Mobile */}
            <button className="toggle-chatList-btn" onClick={toggleChatList}>
              <Menu size={24} />
            </button>
          
            {/* User button aligned to the right-most side */}
            <div className="flex justify-end w-full items-center">
            <h3>{userInfo?.name}</h3>
            <a className="cursor-pointer ml-6 text-gray-200 hover:text-white font-semibold px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg transform hover:scale-105 transition-transform duration-300" onClick={handleLogout}>Logout</a>
            </div>
          </header>
        <div className="content-main">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;