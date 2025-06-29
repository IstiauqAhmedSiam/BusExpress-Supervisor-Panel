// app/my-trips/page.jsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import MyTripsCalendar from '@/components/MyTripsCalendar';
import MyTripItem from '@/components/MyTripItem';
import BottomNavbar from '@/components/BottomNavbar';

const MyTripsPage = () => {
    const router = useRouter();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today for comparison

    // `displayDate` will represent a date within the month/week currently being displayed
    const [displayDate, setDisplayDate] = useState(today);
    // `selectedDate` is the specific date the user clicked on for trip details
    const [selectedDate, setSelectedDate] = useState(today); // Default to today
    // `calendarViewMode` toggles between 'month' and 'week' view
    const [calendarViewMode, setCalendarViewMode] = useState('month');

    const [activityDates, setActivityDates] = useState([]); // Dates with trips (for dots)
    const [tripsForSelectedDate, setTripsForSelectedDate] = useState([]); // Trips for selected date
    const [loadingActivities, setLoadingActivities] = useState(true);
    const [loadingTrips, setLoadingTrips] = useState(false);
    const [error, setError] = useState(null);

    // Dummy API Functions
    const fetchActivityDates = async (year, month, weekStart = null) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 3000));
        const formattedMonth = String(month + 1).padStart(2, '0');
        const simulatedDates = [
            `2025-06-1`,
            `2025-06-3`,
            `2025-06-10`,
            `2025-06-29`, // Today for May example
            `2025-06-30`  // Example future date for May
        ];
        // In a real app, if weekStart is provided, you might fetch specific week data.
        // For this demo, we'll continue fetching for the month and filter/display in calendar component.
        return simulatedDates;
    };

    const fetchTripsByDate = async (dateStr) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        // Example logic to return different data based on date
        let [year, month, day] = dateStr.split('-').map(Number);
        const queryDate = new Date(year, month - 1, day+1);
        queryDate.setHours(0, 0, 0, 0);

        day++;
        console.log(day);

        if (queryDate.getTime() === today.getTime()) {
            // Data for today (can have ongoing + upcoming)
            return [
                { id: 'ON-20250529-01', type: 'ongoing', route: 'Dhaka to Cox Bazar', time: '01:45 AM', coachNo: '589-2a' },
                { id: 'UP-20250529-02', type: 'upcoming', route: 'Dhaka to Sylhet', time: '11:30 PM', coachNo: '600-b' },
            ];
        } else if (month-1 == 5 && day < 29) {
            // Data for a past date
            switch(true){
                case day == 32 :
                    return [
                        {id: 'PAST-20250501-01', type: 'past', route: 'Dhaka to Khulna', time: '06:00 AM', coachNo: '123-x'},
                    ];
                break;

                case day == 3:
                    return [
                        {id: 'PAST-20250501-01', type: 'past', route: 'Dhaka to Rajshahi', time: '06:00 AM', coachNo: '123-x'},
                    ];
                break;

                case day == 10:
                    return [
                        {id: 'PAST-20250501-01', type: 'past', route: 'Dhaka to Khulna', time: '06:00 AM', coachNo: '306-x'},
                    ];
                break;

                default:
                    return [];
            }
            
        } else if(day == 30) {
            // Data for a future date (upcoming)
            return [
                { id: 'UP-20250531-02', type: 'upcoming', route: 'Chattogram - Sylhet', time: '08:00 am', coachNo: '777-y' },
                { id: 'UP-20250531-03', type: 'upcoming', route: 'Dhaka - Rajshahi', time: '11:30 am', coachNo: '777-y' },
                { id: 'UP-20250531-01', type: 'upcoming', route: 'Dhaka - Chattogram', time: '10:00 PM', coachNo: '777-y' },
            ];
        }else{
            return [];
        }
    };

    // Effect to fetch activity dates when the displayed month/week changes
    // We fetch for the entire month that displayDate falls into, for simplicity
    useEffect(() => {
        const loadActivityDates = async () => {
            // setLoadingActivities(true);
            setError(null);
            try {
                const year = displayDate.getFullYear();
                const month = displayDate.getMonth();
                const dates = await fetchActivityDates(year, month);
             
                setActivityDates(dates);
            } catch (err) {
                setError('Failed to fetch trip activities.');
                console.error(err);
            } finally {
                setLoadingActivities(false);
            }
        };
        loadActivityDates();
    }, [displayDate]); // Re-fetch activities if the month of displayDate changes

    // Effect to fetch trips for selected date
    useEffect(() => {
        const loadTrips = async () => {
            if (!selectedDate) return;

            setLoadingTrips(true);
            setError(null);
            try {
                const dateStr = selectedDate.toISOString().slice(0, 10);
                const trips = await fetchTripsByDate(dateStr);
                setTripsForSelectedDate(trips);
            } catch (err) {
                setError('Failed to fetch trips for selected date.');
                console.error(err);
            } finally {
                setLoadingTrips(false);
            }
        };
        loadTrips();
    }, [selectedDate]);

    // Determine section title (Past Trips / Upcoming Trips)
    const getTripSectionTitle = () => {
        if (!selectedDate) return "Trips";
        if (selectedDate.getTime() < today.getTime()) {
            return "Past Trips";
        }
        return "Upcoming Trips"; // Default for current and future dates
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col font-sans pb-24"> {/* pb-24 for navbar clearance */}
            {/* Header */}
            <header className="bg-[#1243b8] p-6 shadow-md text-white flex justify-center rounded-[0_0_20px_20px]">
                <h1 className="text-xl font-semibold">My Trips</h1>
            </header>

            {/* Main Content */}
            <main className="p-4 flex-grow">
                {loadingActivities ? (
                    <div className="text-center text-gray-600">Loading calendar activities...</div>
                ) : error ? (
                    <div className="text-center text-red-600">{error}</div>
                ) : (
                    <MyTripsCalendar
                        displayDate={displayDate}
                        setDisplayDate={setDisplayDate}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        activityDates={activityDates}
                        calendarViewMode={calendarViewMode} // Pass view mode
                        setCalendarViewMode={setCalendarViewMode} // Pass setter
                    />
                )}

                {/* Trip List Section */}
                <section className="mt-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">{getTripSectionTitle()}</h2>
                    {loadingTrips ? (
                        <div className="text-center text-gray-600">Loading trips...</div>
                    ) : tripsForSelectedDate.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {tripsForSelectedDate.map(trip => (
                                <MyTripItem key={trip.id} trip={trip} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-4 bg-white rounded-lg shadow-sm">
                            No trips found for this date.
                        </div>
                    )}
                </section>
            </main>

            {/* Bottom Navigation Bar */}
            <BottomNavbar />
        </div>
    );
};

export default MyTripsPage;