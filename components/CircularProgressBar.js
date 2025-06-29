// app/_components/CircularProgressBar.jsx
import React from 'react';

const CircularProgressBar = ({ percentage, size = 80, strokeWidth = 8, circleColor = '#e0e0e0', progressColor = '#3DCC72' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="transform -rotate-90" // Rotate to start from top
        >
            {/* Background circle */}
            <circle
                stroke={circleColor}
                fill="transparent"
                strokeWidth={strokeWidth}
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            {/* Progress circle */}
            <circle
                stroke={progressColor}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference + ' ' + circumference}
                strokeDashoffset={offset}
                strokeLinecap="round" // Makes the end of the stroke rounded
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
             {/* Text for percentage */}
             <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize={size / 4} // Adjust font size based on component size
                fontWeight="bold"
                fill={progressColor}
                className="transform rotate-90 origin-center" // Rotate text back to normal
            >
                {`${percentage}%`}
            </text>
        </svg>
    );
};

export default CircularProgressBar;