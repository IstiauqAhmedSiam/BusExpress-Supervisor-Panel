import React from 'react';

const TripCard = ({ trip, type = 'upcoming' }) => {
    const isOngoing = type === 'ongoing';
    return (
        <div className={`bg-white rounded-lg shadow-md p-4 flex items-center justify-between transition-transform duration-300`}>
            <div className="flex items-center space-x-4">
                {/* Bus Icon */}
                    {
                        isOngoing
                        ? 
                        <img src="/assets/icon/ongoing-trip.png" />
                        :
                        <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 4a2 2 0 00-2 2v6a2 2 0 002 2l1.096-.439A7 7 0 0010 18a7 7 0 005.904-4.439L17 14a2 2 0 002-2V6a2 2 0 00-2-2H3zm2 4a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 10-2 0 1 1 0 002 0zm-2 4a1 1 0 10-2 0 1 1 0 002 0zm5-1a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    }
                    
                <div>
                    <p className="text-lg font-semibold text-gray-800">{trip.route}</p>
                    <p className="text-sm text-gray-600">{trip.time}</p>
                    <p className="text-sm text-gray-500">Coach No: {trip.coachNo}</p>
                </div>
            </div>
            {isOngoing && (
                <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default TripCard;