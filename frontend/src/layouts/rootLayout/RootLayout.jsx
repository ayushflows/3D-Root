import { Outlet } from "react-router-dom";
import "./rootLayout.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {GoogleOAuthProvider} from "@react-oauth/google";



const queryClient = new QueryClient();
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

const RootLayout = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <QueryClientProvider client={queryClient}>
        <div className="rootLayout">
          <Outlet />
        </div>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default RootLayout;