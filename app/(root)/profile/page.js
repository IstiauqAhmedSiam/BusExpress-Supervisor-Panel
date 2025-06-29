// app/profile/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BottomNavbar from '@/components/BottomNavbar';

const ProfilePage = () => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                let usersData = await fetch(process.env.NEXT_PUBLIC_API_URL + "/supervisor/user.php", {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem("authToken"),
                    }
                });
                usersData = await usersData.json();
                
                setUserData(usersData);
            } catch (err) {
                setError('Failed to load user profile.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);


    const handleLogout = ()=>{
        localStorage.removeItem("authToken");
        router.push("/login")
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
                <p className="text-gray-700 text-lg">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans text-center">
                <p className="text-red-600 text-xl mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
                <p className="text-gray-700 text-lg">Profile data not found.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col font-sans mb-20">
            <BottomNavbar />

            {/* Header */}
            <header className="bg-blue-700 p-6 shadow-md text-white flex items-center">
                <h1 className="text-xl font-semibold flex-grow">My Profile</h1>
            </header>

            <main className="p-4 flex-grow">
                {/* Top Profile Card */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center relative overflow-hidden">
                    {/* Background Waves/Patterns - Placeholder */}
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 opacity-60 rounded-t-lg"
                         style={{clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0% 100%)'}}></div>
                    <div className="absolute inset-x-0 top-12 h-20 bg-gradient-to-bl from-pink-400 to-purple-400 opacity-50 rounded-t-lg"
                         style={{clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0% 100%)'}}></div>


                    {/* Profile Picture */}
                    <div className="relative z-10 w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                        <img src={userData.profilePic} alt="Profile" className="w-full h-full object-cover" /> 
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2> 
                    <p className="text-gray-500 mb-4">@{userData.username}</p> 

                    <div className="flex justify-center items-center text-gray-600 text-sm mb-6 space-x-6">
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            <span>{userData.tripsCompleted} Trips Completed</span> 
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Joined {userData.joinedDate}</span> 
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-wider">About</h3> 
                    <div className="space-y-4 text-gray-700">
                        <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="font-semibold">Full Name:</span>
                            <span>{userData.fullName}</span> 
                        </div>
                        <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold">Status:</span>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">{userData.status}</span> 
                        </div>
                        <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                            </svg>
                            <span className="font-semibold">Role:</span>
                            <span>{userData.role}</span> 
                        </div>
                    </div>
                </div>

                {/* Contacts Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-wider">Contacts</h3> 
                    <div className="space-y-4 text-gray-700">
                        <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-2" />
                            </svg>
                            <span className="font-semibold">Email:</span>
                            <span>{userData.email}</span> 
                        </div>
                        <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                            </svg>
                            <span className="font-semibold">Contact:</span>
                            <span>{userData.contact}</span> 
                        </div>
                    </div>
                </div>

                <button className='bg-[#d00909] text-white font-semibold rounded-lg mx-auto w-full py-3 mt-7' onClick={handleLogout}>Logout</button>
            </main>
        </div>
    );
};

export default ProfilePage;