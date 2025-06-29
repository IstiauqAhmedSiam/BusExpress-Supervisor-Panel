// app/ticket-verification/[tripId]/page.jsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';

// Helper component for the Circular Progress Bar
const CircularProgressBar = ({ percentage, radius = 50, stroke = 8 }) => {
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    // Determine color based on percentage
    let strokeColor = 'text-green-500'; // Default to green
    if (percentage < 30) {
        strokeColor = 'text-red-500';
    } else if (percentage < 70) {
        strokeColor = 'text-[#FF896C]';
    }

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90 scale-[1.8]">
                <circle
                    className="text-gray-200"
                    strokeWidth='1'
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                />
                <circle
                    className={`${strokeColor} transition-all duration-500 ease-in-out`}
                    strokeWidth={stroke}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                />
            </svg>
            <span className="absolute text-4xl font-bold text-green-700">{`${percentage}%`}</span>
            <span className="absolute text-md text-gray-500 top-1/2 mt-6">Tickets Verified</span>
        </div>
    );
};


const Seat = ({ seatNumber, status }) => {
    let imgSrc = "/assets/icon/seat-available.png";
    let textColor = 'text-gray-700';

    if (status === 'Verified') { 
        imgSrc = "/assets/icon/seat-booked.png";
    } else if (status === 'Not Verified') { //
        imgSrc = "/assets/icon/seat-selected.png";
    }


    return (
        <div className={`relative rounded-lg flex flex-col items-center justify-center mb-5`}>
            <img src={imgSrc} width="55" height="57" alt="" />
            <span className={`text-xs font-medium ${textColor} mt-1`}>{seatNumber}</span>
        </div>
    );
};


const TicketVerificationPage = () => {
    const router = useRouter();
    const { tripId } = useParams(); // Get tripId from URL

    const [verificationData, setVerificationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVerificationData = async () => {
            setLoading(true);
            setError(null);
            try {
                let ongoingTripData = await fetch(process.env.NEXT_PUBLIC_API_URL + "/supervisor/trips.php?type=ongoing-full", {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem("authToken"),
                    }
                });
                ongoingTripData = await ongoingTripData.json();


                let ongoingTripSeatData = await fetch(process.env.NEXT_PUBLIC_API_URL + "/supervisor/ongoingTripTicketData.php", {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/x-www-form-urlencoded',
                        'Authorization': localStorage.getItem("authToken"),
                    },
                    body: `tripID=${ongoingTripData.trip_id}`
                });
                ongoingTripSeatData = await ongoingTripSeatData.json();

                let seatLayout = [
                        { seatNumber: 'A1', status: 'Not Booked' }, //
                        { seatNumber: 'A2', status: 'Not Booked' }, //
                        { seatNumber: 'A3', status: 'Not Booked' }, //
                        { seatNumber: 'A4', status: 'Not Booked' }, //
                        { seatNumber: 'B1', status: 'Not Booked' }, // Changed from Sold to Not Verified to fit 3 statuses
                        { seatNumber: 'B2', status: 'Not Booked' }, //
                        { seatNumber: 'B3', status: 'Not Booked' }, //
                        { seatNumber: 'B4', status: 'Not Booked' }, //
                        { seatNumber: 'C1', status: 'Not Booked' }, // Changed from Sold to Not Verified
                        { seatNumber: 'C2', status: 'Not Booked' }, //
                        { seatNumber: 'C3', status: 'Not Booked' }, //
                        { seatNumber: 'C4', status: 'Not Booked' }, //
                        { seatNumber: 'D1', status: 'Not Booked' },
                        { seatNumber: 'D2', status: 'Not Booked' },
                        { seatNumber: 'D3', status: 'Not Booked' },
                        { seatNumber: 'D4', status: 'Not Booked' },
                        { seatNumber: 'E1', status: 'Not Booked' },
                        { seatNumber: 'E2', status: 'Not Booked' },
                        { seatNumber: 'E3', status: 'Not Booked' },
                        { seatNumber: 'E4', status: 'Not Booked' },
                        { seatNumber: 'F1', status: 'Not Booked' },
                        { seatNumber: 'F2', status: 'Not Booked' },
                        { seatNumber: 'F3', status: 'Not Booked' },
                        { seatNumber: 'F4', status: 'Not Booked' },
                        { seatNumber: 'G1', status: 'Not Booked' },
                        { seatNumber: 'G2', status: 'Not Booked' },
                        { seatNumber: 'G3', status: 'Not Booked' },
                        { seatNumber: 'G4', status: 'Not Booked' },
                        { seatNumber: 'H1', status: 'Not Booked' },
                        { seatNumber: 'H2', status: 'Not Booked' },
                        { seatNumber: 'H3', status: 'Not Booked' },
                        { seatNumber: 'H4', status: 'Not Booked' },
                        { seatNumber: 'I1', status: 'Not Booked' },
                        { seatNumber: 'I2', status: 'Not Booked' },
                        { seatNumber: 'I3', status: 'Not Booked' },
                        { seatNumber: 'I4', status: 'Not Booked' }
            ];

                seatLayout.forEach(seat=>{
                    if(ongoingTripSeatData.booked_seats.indexOf(seat.seatNumber) > -1){
                        seat.status = "Not Verified";
                    }

                    if(ongoingTripSeatData.verified_seats && ongoingTripSeatData.verified_seats.indexOf(seat.seatNumber) > -1){
                        seat.status = "Verified";
                    }
                })

                // Dummy data based on the provided image
                const dummyData = {
                    overview: {
                        route: 'Dhaka - Coxs bazar',
                        timeDate: '12:00 PM, 30th April',
                        totalBooked: ongoingTripData.total_booked_seats,
                        totalVerified: ongoingTripData.total_verified_seats,
                        scanLeft: ongoingTripData.total_booked_seats - ongoingTripData.total_verified_seats // assuming this is remaining to verify
                    },
                    seatLayout: [
                        ...seatLayout
                    ]
                };

                // Calculate percentage verified
                const percentage = (dummyData.overview.totalVerified / dummyData.overview.totalBooked) * 100;
                setVerificationData({ ...dummyData, percentageVerified: Math.round(percentage) });

            } catch (err) {
                setError('Failed to load ticket verification data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (tripId) {
            fetchVerificationData();
        }
    }, [tripId]);


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
                <p className="text-gray-700 text-lg">Loading ticket verification data...</p>
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

    if (!verificationData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
                <p className="text-gray-700 text-lg">No verification data found for this trip.</p>
            </div>
        );
    }

    const { overview, seatLayout, percentageVerified } = verificationData;

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col font-sans">
            {/* Header */}
            <header className="bg-blue-700 p-4 shadow-md text-white flex items-center">
                <button onClick={() => router.back()} className="mr-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h1 className="text-xl font-semibold flex-grow">Ticket Verification</h1>
            </header>

            <main className="p-4 flex-grow">
                {/* Overview Section */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Overview</h2>
                    <p className="text-md text-gray-600">{overview.route}</p>
                    <p className="text-md text-gray-500 mb-8">{overview.timeDate}</p>

                    <div className="flex justify-between items-center mb-6">
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Total Booked</p>
                            <p className="text-2xl font-bold text-gray-800">{overview.totalBooked}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Total Verified</p>
                            <p className="text-2xl font-bold text-gray-800">{overview.totalVerified}</p>
                        </div>
                    </div>

                    <div className="w-50 h-50 mx-auto my-10"> {/* Container for the progress bar */}
                        <CircularProgressBar percentage={percentageVerified} />
                    </div>

                    <div className='flex items-center justify-between border-1 border-[#D7D7D7] rounded-lg px-3 py-2 mb-3'>
                        <div className='flex flex-col items-start'>
                            <h3 className='text-[18px] font-bold mb-1'>Scan Left</h3>
                            <span className="text-[22px] font-semibold text-green-700">{overview.scanLeft}</span>
                        </div>

                        <div className="flex items-center bg-[#f3f4f6] rounded-lg px-4 py-2" onClick={()=>{location.href = ("/scan-qr")}}>
                            <span className="font-semibold mr-1">Scan</span>
                            <img src="/assets/icon/scanner.png" />
                        </div>
                    </div>
                </div>

                {/* Seat Layout Section */}
                <div className="bg-white rounded-lg shadow-md p-4 pt-10">
                    {/* Legend */}
                    <div className="flex justify-around text-xs font-semibold text-gray-600 mb-10">
                        <div className="flex items-center space-x-2">
                            <span className="w-5 h-5 bg-gray-300 rounded"></span>
                            <span>Not Booked</span>
                        </div>
                        {/* Removed 'Sold' legend item */}
                        <div className="flex items-center space-x-2">
                            <span className="w-5 h-5 bg-[#143f40] rounded"></span>
                            <span>Verified</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-5 h-5 bg-[#4c836d] rounded"></span>
                            <span>Not Verified</span>
                        </div>
                    </div>

                    {/* Seat Grid */}
                    <div className="grid grid-cols-4 gap-3 justify-items-center">
                        {seatLayout.map(seat => (
                            <Seat key={seat.seatNumber} seatNumber={seat.seatNumber} status={seat.status} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TicketVerificationPage;