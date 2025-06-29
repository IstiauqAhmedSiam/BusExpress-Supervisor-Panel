'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const OngoingTripSummary = ({ status, schedule, bookedSeats, verifiedTickets, routeIconUrl }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-gray-500 text-sm">Trip Status</p>
                    <p className="text-lg font-semibold text-gray-800">{status}</p>
                </div>
                <div className="text-right">
                    <p className="text-gray-500 text-sm">Schedule</p>
                    <p className="text-lg font-semibold text-gray-800">{schedule}</p>
                </div>
            </div>
            <div className="flex items-center justify-around text-center mb-4">
                {/* Placeholder for the route icon */}
                <div className="flex flex-col items-center">
                    <img src="/assets/icon/bus-route.png" alt="Route" className="w-16 h-16 object-contain mb-2" />
                    <p className="text-gray-600 text-sm">Trip Route</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 p-3 rounded-lg flex flex-col items-center">
                    <p className="text-2xl font-bold text-blue-800">{bookedSeats}</p>
                    <p className="text-sm text-blue-600">Booked Seats</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg flex flex-col items-center">
                    <p className="text-2xl font-bold text-green-800">{verifiedTickets}</p>
                    <p className="text-sm text-green-600">Verified Tickets</p>
                </div>
            </div>
        </div>
    );
};

const TripActionButton = ({ icon, title, buttonText, onClick }) => (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center">
        {/* Placeholder icon */}
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
            {icon}
        </div>
        <h3 className="text-md font-semibold text-gray-700 mb-3">{title}</h3>
        <button
            onClick={onClick}
            className={`${title != "Vehicle Details" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} font-semibold py-2 px-6 rounded-md hover:bg-green-700 transition-colors`}
        >
            {buttonText}
        </button>
    </div>
);


const TripActivityList = ({ activities }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Trip Activity</h2>
            {activities.length === 0 ? (
                <p className="text-gray-500 text-center">No activities logged yet.</p>
            ) : (
                <div className="relative pl-4"> {/* Added padding-left for timeline line */}
                    {/* Vertical timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>
                    {activities.map((activity, index) => (
                        <div key={activity.id} className="mb-6 last:mb-0 flex items-start">
                            {/* Dot for activity */}
                            <div className="absolute left-6 top-1 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                <span className="w-3 h-3 bg-green-500 rounded-full block ring-4 ring-white"></span>
                            </div>
                            <div className="ml-10"> {/* Offset content to the right of the line */}
                                <p className="font-semibold text-gray-800">{activity.title}</p>
                                <p className="text-sm text-gray-600">{activity.description}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(activity.timestamp).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const TripActivityForm = ({ onActivitySubmit, loading }) => {
    const [note, setNote] = useState('');
    const [selectedQuickActivity, setSelectedQuickActivity] = useState('');

    // More comprehensive predefined activities
    const predefinedActivities = [
        { label: 'Departure', title: 'Departed', description: 'Bus has departed from the origin.' },
        { label: 'Rest Point', title: 'Rest Point', description: 'Bus stopped at a designated rest point.' },
        { label: 'Passenger Pickup', title: 'Passenger Pickup', description: 'Picked up passengers from a boarding point.' },
        { label: 'Traffic Jam', title: 'Traffic Delay', description: 'Encountered a significant traffic jam.' },
        { label: 'Engine Issue', title: 'Engine Issue', description: 'Reported an engine related problem.' },
        { label: 'Arrival', title: 'Arrived at Destination', description: 'Bus has arrived at the final destination.' },
        { label: 'Trip Completed', title: 'Trip Completed', description: 'Trip successfully concluded.' },
    ];

    const handleSubmit = () => {
        let activityTitle = '';
        let activityDescription = note;

        if (!selectedQuickActivity && !note.trim()) {
            alert('Please select an activity type or add a note.');
            return;
        }

        if (selectedQuickActivity) {
            const predefinedAct = predefinedActivities.find(qa => qa.label === selectedQuickActivity);
            activityTitle = predefinedAct.title;
            activityDescription = note.trim() || predefinedAct.description; // Use note if available, otherwise default description
        } else {
            activityTitle = 'Custom Update'; // Default title for pure notes
        }

        onActivitySubmit({
            title: activityTitle,
            description: activityDescription
        });

        // Reset form
        setNote('');
        setSelectedQuickActivity('');
    };


    return (
        <div className="bg-white rounded-lg shadow-md p-4 mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add Activity</h2>
            <div className="flex flex-wrap gap-2 mb-4">
                {predefinedActivities.map((activity) => (
                    <button
                        key={activity.label}
                        onClick={() => setSelectedQuickActivity(activity.label)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200
                                    ${selectedQuickActivity === activity.label
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                    >
                        {activity.label}
                    </button>
                ))}
            </div>
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add Note..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y mb-4"
                rows="3"
            ></textarea>
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Updating...' : 'Update'}
            </button>
        </div>
    );
};


const OngoingTripPage = () => {
    const router = useRouter();
    const { tripId } = useParams(); // Get tripId from URL

    const [tripData, setTripData] = useState(null);
    const [loadingPage, setLoadingPage] = useState(true);
    const [submittingActivity, setSubmittingActivity] = useState(false);
    const [error, setError] = useState(null);

    // Fetch initial trip data
    useEffect(() => {
        const fetchTripData = async () => {
            setLoadingPage(true);
            setError(null);
            try {
                let ongoingTripData = await fetch(process.env.NEXT_PUBLIC_API_URL + "/supervisor/trips.php?type=ongoing-full", {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem("authToken"),
                    }
                });
                ongoingTripData = await ongoingTripData.json();

                let tripActivities = await fetch(process.env.NEXT_PUBLIC_API_URL + "/supervisor/tripActivity.php?type=get", {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/x-www-form-urlencoded',
                        'Authorization': localStorage.getItem("authToken"),
                    }, 
                    body: `tripID=${ongoingTripData.trip_id}`
                });
                tripActivities = await tripActivities.json();

                const dummyData = {
                    tripId: ongoingTripData.trip_id,
                    status: "Ticket verification",
                    schedule: "12:00 PM",
                    bookedSeats: ongoingTripData.total_booked_seats,
                    verifiedTickets: ongoingTripData.total_verified_seats,
                    activities: [
                        ...tripActivities,
                    ]
                };
                setTripData(dummyData);
            } catch (err) {
                setError('Failed to load trip data.');
                console.error(err);
            } finally {
                setLoadingPage(false);
            }
        };

        if (tripId) {
            fetchTripData();
        }
    }, [tripId]);

    const handleActivitySubmit = async (activity) => {
        setSubmittingActivity(true);
        setError(null);
        try {
            let updateTripActivity = await fetch(process.env.NEXT_PUBLIC_API_URL + "/supervisor/tripActivity.php?type=add", {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Authorization': localStorage.getItem("authToken"),
                }, 
                body: `tripID=${tripData.tripId}&title=${activity.title}&note=${activity.description}`
            });
            updateTripActivity = await updateTripActivity.json();

            const newActivity = {
                ...activity,
                id: `act${Date.now()}`, // Unique ID
                timestamp: new Date().toISOString()
            };

            setTripData(prevData => ({
                ...prevData,
                activities: [...prevData.activities, newActivity]
            }));
            // In a real app, you'd check the API response for success.
            console.log("Activity submitted:", newActivity);
        } catch (err) {
            setError('Failed to submit activity.');
            console.error(err);
        } finally {
            setSubmittingActivity(false);
        }
    };

    if (loadingPage) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
                <p className="text-gray-700 text-lg">Loading trip dashboard...</p>
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

    if (!tripData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
                <p className="text-gray-700 text-lg">Trip not found.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col font-sans pb-4">
            {/* Header */}
            <header className="bg-blue-700 p-4 shadow-md text-white flex items-center">
                <button onClick={() => router.push('/')} className="mr-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h1 className="text-xl font-semibold flex-grow">Ongoing Trip Dashboard</h1>
            </header>

            <main className="p-4 flex-grow">
                {/* Trip Summary Section */}
                <OngoingTripSummary
                    status={tripData.status}
                    schedule={tripData.schedule}
                    bookedSeats={tripData.bookedSeats}
                    verifiedTickets={tripData.verifiedTickets}
                />

                {/* Action Cards Section */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <TripActionButton
                        title="Ticket Verification"
                        buttonText="Continue"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        }
                        onClick={() => {router.push(`./${tripId}/ticket-verification`)}}
                    />
                    <TripActionButton
                        title="Vehicle Details"
                        buttonText="View"
                        icon={
                            <img src="/assets/icon/ongoing-trip.png" />
                        }
                        onClick={() => {router.push(`./${tripId}/vehicle-details`)}}
                    />
                </div>

                {/* Trip Activity Section */}
                <TripActivityList activities={tripData.activities} />

                {/* Activity Update Form */}
                <TripActivityForm onActivitySubmit={handleActivitySubmit} loading={submittingActivity} />
            </main>
        </div>
    );
};

export default OngoingTripPage;