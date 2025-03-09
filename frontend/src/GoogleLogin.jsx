import {useState} from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";
import {useNavigate} from 'react-router-dom';

const GoolgeLogin = (props) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const responseGoogle = async (authResult) => {
		try {
			if (authResult["code"]) {
				console.log("hitting request")
				const result = await googleAuth(authResult.code);
				const {email, name, image} = result.data.user;
				const token = result.data.token;
				const obj = {email, name, token, image};
				console.log("the token is:", token)
				localStorage.setItem('user-info',JSON.stringify(obj));
				navigate('/dashboard');
			} else {
				console.log(authResult);
				throw new Error(authResult);
			}
		} catch (e) {
			console.log('Error while Google Login...', e);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-4xl font-bold text-gray-200 mb-4">Welcome to 3DRoot</h1>
			<p className="text-lg text-gray-400 mb-8">Please sign in to continue</p>
			<button 
				className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
				onClick={googleLogin}
			>
				<img src="https://w7.pngwing.com/pngs/882/225/png-transparent-google-logo-google-logo-google-search-icon-google-text-logo-business-thumbnail.png" alt="Google logo" className="w-6 h-6 mr-3" />
				Sign in with Google
			</button>	
		</div>
	);
};

export default GoolgeLogin;