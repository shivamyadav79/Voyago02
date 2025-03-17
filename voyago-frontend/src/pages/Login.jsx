import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Store/Slice/AuthSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error } = useSelector((state) => state.auth) || {}; // Ensure safe access

    useEffect(() => {
      if (user && user.role) {
        navigate(user.role === "admin" ? "/admin" : "/");
      }
    }, [user, navigate]); // Redirect after successful login

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Login</h2>
                    <p className="mt-2 text-sm text-gray-600">Enter your credentials to access your account</p>
                </div>
                
                {error && (
                    <div className="p-4 text-sm text-red-700 bg-red-100 rounded-md">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            // type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            // required
                            className="w-full px-4 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="your@email.com"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="••••••••"
                        />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        
                        <div className="text-sm">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Sign in
                    </button>
                    
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign up
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;