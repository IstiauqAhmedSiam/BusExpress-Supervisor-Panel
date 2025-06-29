'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TripSummaryCard from '@/components/TripSummaryCard';
import TripCard from '@/components/TripCard';
import BottomNavbar from '@/components/BottomNavbar';

const HomePage = () => {
    const router = useRouter();

    // Simulated API Data States
    const [userData, setUserData] = useState(null);
    const [tripSummary, setTripSummary] = useState(null);
    const [ongoingTrip, setOngoingTrip] = useState(null);
    const [upcomingTrips, setUpcomingTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dummy API Fetching Function
    const fetchDashboardData = async () => {
        let usersData = await fetch(process.env.NEXT_PUBLIC_API_URL + "/supervisor/user.php", {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem("authToken"),
            }
        });
        usersData = await usersData.json();

        
        let ongoingTripData = await fetch(process.env.NEXT_PUBLIC_API_URL + "/supervisor/trips.php?type=ongoing", {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem("authToken"),
            }
        });
        ongoingTripData = await ongoingTripData.json();

        
        let upcomingTripData = await fetch(process.env.NEXT_PUBLIC_API_URL + "/supervisor/trips.php?type=upcoming", {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem("authToken"),
            }
        });
        upcomingTripData = await upcomingTripData.json();


        // Dummy Data (Matching Home.png) [cite: Home.png]
        return {
            user: {
                ...usersData 
            },
            summary: {
                totalTripsCount: 100,
                totalTripsPercentage: 100, // Assuming 100% means target achieved
                completedTripsCount: 74,
                completedTripsPercentage: 74, // 74 out of 100 total trips
            },
            ongoingTrip: {
                ...ongoingTripData
            },
            upcomingTrips: [
                {
                    id: 'UPT-002',
                    route: 'Chattogram - Sylhet',
                    time: '30th June, 08:00 am',
                    coachNo: '701-b',
                },
                {
                    id: 'UPT-003',
                    route: 'Dhaka - Rajshahi',
                    time: '30th June, 11:30 am',
                    coachNo: '620-c',
                },
                {
                    id: 'UPT-001',
                    route: 'Dhaka - Chattogram',
                    time: '30th June, 10:00 pm',
                    coachNo: '777-y',
                },
            ],
        };
    };

    useEffect(() => {
        // Check User Login Status
        if(!localStorage.getItem("authToken")){
            router.push("/login");
            return;
        }

        const getDashboardData = async () => {
            try {
                setLoading(true);
                const data = await fetchDashboardData();
                setUserData(data.user);
                setTripSummary(data.summary);
                setOngoingTrip(data.ongoingTrip);
                setUpcomingTrips(data.upcomingTrips);
            } catch (err) {
                setError('Failed - load dashboard data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
                <p className="text-gray-700 text-lg">Loading dashboard...</p>
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

    return (
        <div className="bg-gradient-to-b from-blue-50 via-gray-100 to-gray-100 min-h-screen flex flex-col font-sans pb-24"> {/* pb-24 for navbar clearance */}
            {/* Header Section */}
            <header className="bg-white p-6 pb-2 sm:p-8 sm:pb-4 shadow-sm relative">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-[22px] font-extrabold text-gray-900">Busexpress</h1>
                    <span className="text-md font-semibold text-gray-600 mt-2 sm:mt-0">Supervisor Panel</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-base">Welcome</p>
                        <h2 className="text-[18px] font-bold text-gray-800">{userData?.name}</h2>
                    </div>
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 shadow-md flex-shrink-0">
                        <img src={userData?.profilePic} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </header>

            {/* Trip Summary Cards Section */}
            <section className="p-3 grid grid-cols-2 gap-3 mb-5">
                <TripSummaryCard
                    title="Total Trips"
                    count=""
                    percentage={tripSummary?.totalTripsPercentage}
                    progressColor="#3DCC72"
                />
                <TripSummaryCard
                    title="Completed Trips"
                    count=""
                    percentage={tripSummary?.completedTripsPercentage}
                    progressColor="#3DCC72"
                />
            </section>

            {/* Ongoing Trips Section */}
            {ongoingTrip?.id ? (
                <section className="px-4 py-2 flex flex-col mb-5">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Ongoing Trips</h2>
                    </div>
                    <div onClick={()=>{router.push("/ongoing-trip/trip1010")}}>
                        <TripCard trip={ongoingTrip} type="ongoing" />
                    </div>
                </section>
            ) : (
                <></>
            )}
            

            {/* Upcoming Trips Section */}
            <section className="px-4 py-2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Upcoming Trips</h2>
                    <button className="text-blue-600 text-sm font-semibold hover:underline" onClick={()=>{router.push("/my-trips")}}>View all</button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {upcomingTrips.length > 0 ? (
                        upcomingTrips.map(trip => (
                            <TripCard key={trip.id} trip={trip} type="upcoming" />
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-4">No upcoming trips.</div>
                    )}
                </div>
            </section>

            {/* Bottom Navigation Bar */}
            <BottomNavbar />
        </div>
    );
};

export default HomePage;