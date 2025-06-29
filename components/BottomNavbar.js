// app/_components/BottomNavbar.jsx
'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

const BottomNavbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { name: 'Home', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7-7 7 7M19 10v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ), path: '/' },
        { name: 'My trips', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.206 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.794 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.794 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.206 18 16.5 18s-3.332.477-4.5 1.253" />
            </svg>
        ), path: '/my-trips' }, // Placeholder path
        { name: 'Scan', icon: (
            <svg width="45px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_429_11130)">
            <path d="M20 12H4" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M16 3.99976H18C19.1046 3.99976 20 4.89519 20 5.99976V7.99976" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M8 19.9998L6 19.9998C4.89543 19.9998 4 19.1043 4 17.9998L4 15.9998" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M20 15.9998V17.9998C20 19.1043 19.1046 19.9998 18 19.9998H16" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M4 7.99976L4 5.99976C4 4.89519 4.89543 3.99976 6 3.99976L8 3.99976" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
            <defs>
            <clipPath id="clip0_429_11130">
            <rect width="24" height="24" fill="white"></rect>
            </clipPath>
            </defs>
            </svg>
        ), path: '/scan-qr', isSpecial: true }, // Placeholder path
        { name: 'Notification', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
        ), path: '/notifications' }, // Placeholder path
        { name: 'Profile', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ), path: '/profile' }, // Placeholder path
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 py-2 sm:py-0">
            <div className="flex justify-around items-center h-full max-w-lg mx-auto">
                {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => item.isSpecial ? location.href = item.path : router.push(item.path)}
                        className={`flex flex-col items-center justify-center text-xs font-medium px-2 py-1 sm:py-3 rounded-full transition-colors duration-200
                                    ${item.isSpecial ? 'w-16 h-16 -mt-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg text-white ring-4 ring-white' : ''}
                                    ${pathname === item.path && !item.isSpecial ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                    >
                        {item.icon}
                        {!item.isSpecial && <span className="mt-1">{item.name}</span>}
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default BottomNavbar;