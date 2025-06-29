'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('mahadi_420');
    const [password, setPassword] = useState('1234');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        fetch(process.env.NEXT_PUBLIC_API_URL + "/supervisor/auth.php", {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            body : `username=${email}&password=${password}`
        })
        .then(e=>e.json())
        .then(res=>{
            if(res.code == "LOGIN_SUCCESS"){
                localStorage.setItem("authToken", res.auth.token);
                router.push("/");
            }else{
                setErrorMsg(res.message);
            }

            setLoading(false);
        });
    };

    return (
        
            <div className="w-full h-screen bg-white rounded-2xl shadow-xl p-8 pb-10 relative"> {/* Main card container */}

                {/* Top App Icon */}
                <div className="flex justify-center mb-6 mt-4">
                    {/* Placeholder for the triangular logo */}
                    <svg
                        width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-900"
                    >
                        <path d="M2 2L58 20L2 38V2Z" fill="currentColor" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
                        <path d="M30 10L58 20L30 30L30 10Z" fill="currentColor" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
                    </svg>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h1>
                    <p className="text-gray-500 text-sm">Please enter your details to login.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john_alfred" // Matches placeholder from image
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-800"
                            required
                        />
                    </div>

                    {/* Password Input with Forgot Password & Eye Icon */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="password" className="block text-base font-medium text-gray-700">Password</label>
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500 text-sm">Forgot password?</a>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-800"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth=".5">
                                            <path d="M5.70711 19.7071L19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071Z" fill="currentColor"/>
                                            <path d="M12 5C13.2011 5 14.394 5.21361 15.5362 5.63535L13.9368 7.23482C13.2953 7.0777 12.6458 7 12 7C9.07319 7 6.06862 8.59614 4.09173 11.9487C4.74631 13.0987 5.52178 14.046 6.37447 14.7971L4.95845 16.2131C3.88666 15.248 2.93477 14.037 2.16029 12.5876C1.94361 12.1821 1.94637 11.6844 2.17003 11.2807C4.45796 7.15186 8.18777 5 12 5Z" fill="currentColor"/>
                                            <path d="M12 9C12.056 9 12.1117 9.00154 12.167 9.00457L9.00457 12.167C9.00154 12.1117 9 12.056 9 12C9 10.3431 10.3431 9 12 9Z" fill="currentColor"/>
                                            <path d="M14.9954 11.833L11.833 14.9954C11.8883 14.9985 11.944 15 12 15C13.6569 15 15 13.6569 15 12C15 11.944 14.9985 11.8883 14.9954 11.833Z" fill="currentColor"/>
                                            <path d="M12 17C11.355 17 10.7061 16.9216 10.0654 16.763L8.46807 18.3604C9.60812 18.7849 10.7998 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807C21.0543 9.88089 20.1128 8.7083 19.0587 7.76977L17.6421 9.18635C18.4837 9.91776 19.2525 10.8366 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z" fill="currentColor"/>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>    
                                    )}
                            </button>
                        </div>
                    </div>

                    {/* Remember me Checkbox */}
                    <div className="flex items-center mt-2">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                            Remember me
                        </label>
                    </div>
                    
                    {
                        errorMsg && <div className='text-[red]'>{errorMsg}</div>
                    }

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center py-3 px-4 rounded-lg bg-blue-700 text-lg font-semibold text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition duration-150 ease-in-out active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed mt-6"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Login'}
                    </button>
                </form>


                {/* Don't have an account? Register */}
                <p className="mt-8 text-gray-600 text-sm text-center">
                    Don&apos;t have an account?{' '}
                    <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                        Register
                    </a>
                </p>
            </div>
    );
};

export default LoginPage;