import React from 'react';
import CircularProgressBar from './CircularProgressBar';

const TripSummaryCard = ({ title, count, total, percentage, progressColor }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center min-h-[140px] w-full">
            <h3 className="text-md font-semibold text-gray-700 mb-2">{title}</h3>
            <div className="flex items-center space-x-4">
                <div className="text-3xl font-bold text-gray-800">{count}</div>
                <CircularProgressBar
                    percentage={percentage}
                    progressColor={progressColor}
                    size={80}
                    strokeWidth={8}
                />
            </div>
            <p className="text-sm text-gray-500 mt-2">Total in 130 days</p> {/* Hardcoded as per image */}
        </div>
    );
};

export default TripSummaryCard;