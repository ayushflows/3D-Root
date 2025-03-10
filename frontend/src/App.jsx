/* eslint-disable react/prop-types */
// import './App.css'
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import GoogleLogin from './GoogleLogin';
// import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
// import Dashboard from './Dashboard';
// import { useState } from 'react';
// import RefrshHandler from './RefreshHandler';
// import NotFound from './NotFound';

// function App() {
// 	const [isAuthenticated, setIsAuthenticated] = useState(false);
// 	const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
// 	const GoogleWrapper = ()=>(
// 		<GoogleOAuthProvider clientId={clientId}>
// 			<GoogleLogin></GoogleLogin>
// 		</GoogleOAuthProvider>
// 	)
// 	const PrivateRoute = ({ element }) => {
// 		return isAuthenticated ? element : <Navigate to="/login" />
// 	}
// 	return (
// 		<BrowserRouter>
// 		    <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
// 			<Routes>
// 				<Route path="/login" element={<GoogleWrapper />} />
// 				<Route path="/" element={<Navigate to="/login" />} />
// 				<Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>}/>
// 				<Route path="*" element={<NotFound/>} />
// 			</Routes>
// 	</BrowserRouter>
// 	);
// }

// export default App


import './App.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from './GoogleLogin';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import RefrshHandler from './RefreshHandler';
import NotFound from './NotFound';
import Homepage from "./routes/homepage/Homepage";
import DashboardPage from "./routes/dashboardPage/DashboardPage";
import ChatPage from "./routes/chatPage/ChatPage";
import RootLayout from "./layouts/rootLayout/RootLayout";
import DashboardLayout from "./layouts/dashboardLayout/DashboardLayout";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
    const GoogleWrapper = () => (
        <div className='w-full h-full'>
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin setIsAuthenticated={setIsAuthenticated} />
        </GoogleOAuthProvider>
        </div>
    );
    
    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/login" />;
    };

    return (
        <BrowserRouter>
            <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path="/login" element={<GoogleWrapper />} />
                <Route path="/" element={<Homepage />} />
                
                <Route element={<RootLayout />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
                        <Route path="/dashboard/chats/:id" element={<PrivateRoute element={<ChatPage />} />} />
                    </Route>
                </Route>
                
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
