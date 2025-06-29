// app/_components/MyTripItem.jsx
import React from 'react';

const MyTripItem = ({ trip }) => {
    return (
        <div className="bg-gray-50 rounded-lg shadow-sm p-4 flex items-center justify-between border border-gray-200">
            <div>
                <p className="text-lg font-semibold text-gray-800">{trip.route}</p>
                <p className="text-sm text-gray-600">{trip.time}</p>
                <p className="text-xs text-gray-500">Coach No: {trip.coachNo}</p>
            </div>
            {/* Optional: Add an arrow or status indicator if needed */}
            {trip.type === 'ongoing' && (
                <span className="text-sm text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded-full">Ongoing</span>
            )}
        </div>
    );
};

export default MyTripItem;