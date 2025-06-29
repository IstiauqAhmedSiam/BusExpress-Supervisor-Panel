// app/notifications/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BottomNavbar from '@/components/BottomNavbar';

// Dummy notification data (same as before)
const initialNotifications = [
    {
        id: 'notif-001',
        type: 'success', // 'success', 'info', 'warning', 'error'
        title: 'Ticket Verified!',
        message: 'Ticket for seat C3 on trip Dhaka-Coxs Bazar (4:50 AM, 11 May 25) has been successfully verified.',
        timestamp: '2025-06-29T06:30:00Z',
        read: false,
    },
    {
        id: 'notif-002',
        type: 'info',
        title: 'New Trip Scheduled',
        message: 'A new trip from Dhaka to Sylhet has been added for 10:00 AM, 15 Jul 25.',
        timestamp: '2025-06-28T18:00:00Z',
        read: false,
    },
    {
        id: 'notif-003',
        type: 'warning',
        title: 'Upcoming System Maintenance',
        message: 'Our services will be temporarily unavailable for maintenance on 2025-07-01, 2:00 AM - 4:00 AM.',
        timestamp: '2025-06-27T09:15:00Z',
        read: true,
    },
    {
        id: 'notif-006',
        type: 'info',
        title: 'Profile Updated',
        message: 'Your profile information has been successfully updated.',
        timestamp: '2025-06-24T08:20:00Z',
        read: true,
    },
];

const NotificationPage = () => {
    const router = useRouter();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setNotifications(initialNotifications);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const markAllAsRead = () => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notif => ({ ...notif, read: true }))
        );
    };

    const toggleReadStatus = (id) => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notif =>
                notif.id === id ? { ...notif, read: !notif.read } : notif
            )
        );
    };

    // Helper to get icon and color based on notification type, adjusted for the new design
    const getNotificationStyle = (type, read) => {
        let iconBgColor = '';
        let iconColor = '';
        let icon = null;

        switch (type) {
            case 'success':
                iconBgColor = 'bg-green-100'; // Lighter background
                iconColor = 'text-green-600'; // More vibrant icon color
                icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                break;
            case 'info':
                iconBgColor = 'bg-blue-100';
                iconColor = 'text-blue-600';
                icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                break;
            case 'warning':
                iconBgColor = 'bg-yellow-100';
                iconColor = 'text-yellow-600';
                icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.306 18c-.77 1.333.192 3 1.732 3z" /></svg>;
                break;
            case 'error':
                iconBgColor = 'bg-red-100';
                iconColor = 'text-red-600';
                icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                break;
            default:
                iconBgColor = 'bg-gray-100';
                iconColor = 'text-gray-600';
                icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                break;
        }

        return { iconBgColor, iconColor, icon };
    };

    const unreadCount = notifications.filter(notif => !notif.read).length;

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <BottomNavbar />
            
            {/* Header - Modernized */}
            <header className="bg-blue-700 text-white p-6 shadow-sm flex items-center justify-between">
                <div className="flex items-center">
                    <h1 className="text-xl font-semibold">Notifications</h1>
                </div>
                {/* Optional: More options icon if needed, similar to the image */}
                {unreadCount > 0 && (
                     <button
                        onClick={markAllAsRead}
                        className="text-blue-600 font-medium text-sm px-3 py-1 rounded-md hover:bg-blue-50 transition-colors hidden"
                    >
                        Mark All Read
                    </button>
                )}
            </header>

            <main className="flex-grow p-4 md:p-6 lg:p-8 max-w-2xl mx-auto w-full">
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <p className="text-gray-600">Loading notifications...</p>
                    </div>
                ) : (
                    <>
                        {notifications.length === 0 ? (
                            <div className="text-center text-gray-500 mt-8 py-10 px-4 bg-white rounded-lg shadow-sm">
                                <p className="text-lg">You&apos;re all caught up!</p>
                                <p className="text-sm mt-2">No new notifications at the moment.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {notifications.map(notif => {
                                    const { iconBgColor, iconColor, icon } = getNotificationStyle(notif.type, notif.read);
                                    const date = new Date(notif.timestamp);
                                    
                                    // Formatting time relative to current date (e.g., "24min ago", "Yesterday, 17:35")
                                    const now = new Date();
                                    const diffMs = now - date;
                                    const diffMinutes = Math.round(diffMs / (1000 * 60));
                                    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
                                    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

                                    let timeAgo;
                                    if (diffMinutes < 1) {
                                        timeAgo = "just now";
                                    } else if (diffMinutes < 60) {
                                        timeAgo = `${diffMinutes}min ago`;
                                    } else if (diffHours < 24) {
                                        timeAgo = `${diffHours}h ago`;
                                    } else if (diffDays === 1) {
                                        timeAgo = `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`;
                                    } else {
                                        timeAgo = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                    }

                                    return (
                                        <div
                                            key={notif.id}
                                            className={`flex items-start p-4 rounded-lg bg-white shadow-sm ${notif.read ? 'opacity-70' : ''} transition-all duration-200 ease-in-out cursor-pointer hover:shadow-md`}
                                            onClick={() => toggleReadStatus(notif.id)}
                                        >
                                            <div className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full ${iconBgColor} ${iconColor} mr-4`}>
                                                {icon}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-center mb-1">
                                                    <h3 className={`font-semibold text-base ${notif.read ? 'text-gray-600' : 'text-gray-800'}`}>
                                                        {notif.title}
                                                    </h3>
                                                    <p className="text-xs text-gray-400 ml-auto">{timeAgo}</p>
                                                </div>
                                                <p className={`text-sm ${notif.read ? 'text-gray-500' : 'text-gray-700'}`}>
                                                    {notif.message}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default NotificationPage;