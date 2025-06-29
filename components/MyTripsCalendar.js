// app/_components/MyTripsCalendar.jsx
import React, { useState, useEffect, useCallback } from 'react';

const MyTripsCalendar = ({
    displayDate,          // This date represents the current month or week being displayed
    setDisplayDate,
    selectedDate,
    setSelectedDate,
    activityDates,
    calendarViewMode,     // 'month' or 'week'
    setCalendarViewMode   // Function to change view mode
}) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today for comparison

    const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    // Helper to get the start of the week (Monday) for any given date
    const getStartOfWeek = useCallback((date) => {
        const d = new Date(date);
        const day = d.getDay(); // 0 for Sunday, 1 for Monday...
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
        return new Date(d.getFullYear(), d.getMonth(), diff);
    }, []);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonthIndex = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        let day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1; // Convert Sunday (0) to 6, others (1-6) to 0-5
    };

    const handlePrev = useCallback(() => {
        if (calendarViewMode === 'month') {
            setDisplayDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
        } else { // week view
            setDisplayDate(prev => {
                const newDate = new Date(prev);
                newDate.setDate(prev.getDate() - 7);
                return newDate;
            });
        }
    }, [calendarViewMode, setDisplayDate]);

    const handleNext = useCallback(() => {
        if (calendarViewMode === 'month') {
            setDisplayDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
        } else { // week view
            setDisplayDate(prev => {
                const newDate = new Date(prev);
                newDate.setDate(prev.getDate() + 7);
                return newDate;
            });
        }
    }, [calendarViewMode, setDisplayDate]);

    const handleDateClick = useCallback((date) => {
        setSelectedDate(date);
    }, [setSelectedDate]);

    const renderDayCell = (date) => {
        if (!date) return <div className="p-2"></div>; // Empty cell for spacing

        const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        normalizedDate.setHours(0, 0, 0, 0); // Normalize for comparison

        const isToday = normalizedDate.getTime() === today.getTime();
        const isSelected = selectedDate && normalizedDate.getTime() === selectedDate.getTime();
        const hasActivity = activityDates.includes(`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${date.getDate()}`);
        
        return (
            <div
                key={normalizedDate.toDateString()} // Use date string as key for uniqueness
                className={`relative p-2 flex flex-col items-center justify-center cursor-pointer rounded-full transition-colors duration-200
                            ${isSelected ? 'bg-blue-600 text-white font-bold shadow-md' :
                               isToday ? 'bg-blue-100 text-blue-800 font-semibold' :
                               'text-gray-800 hover:bg-gray-100'}
                `}
                onClick={() => handleDateClick(normalizedDate)}
            >
                {normalizedDate.getDate()}
                {hasActivity && !isSelected && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                )}
                {hasActivity && isSelected && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 bg-white rounded-full"></span>
                )}
            </div>
        );
    };

    const renderMonthView = () => {
        const numDays = getDaysInMonth(displayDate);
        const firstDayIndex = getFirstDayOfMonthIndex(displayDate);
        const days = [];

        // Fill leading empty cells
        for (let i = 0; i < firstDayIndex; i++) {
            days.push(renderDayCell(null)); // Pass null for empty cells
        }

        // Fill days of the month
        for (let day = 1; day <= numDays; day++) {
            const date = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
            days.push(renderDayCell(date));
        }
        return days;
    };

    const renderWeekView = () => {
        const weekDays = [];
        const startOfWeek = getStartOfWeek(displayDate); // Get Monday of the current week

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            weekDays.push(renderDayCell(date));
        }
        return weekDays;
    };

    // Determine the title based on view mode
    const headerTitle = calendarViewMode === 'month'
        ? displayDate.toLocaleString('en-US', { month: 'long', year: 'numeric' }) //
        : `${getStartOfWeek(displayDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(getStartOfWeek(displayDate).setDate(getStartOfWeek(displayDate).getDate() + 6)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            {/* Month/Year or Week Navigation */}
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePrev} className="p-2 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h3 className="text-lg font-semibold text-gray-800">
                    {headerTitle}
                </h3>
                <button onClick={handleNext} className="p-2 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* View options: Month / Week */}
            <div className="flex justify-between items-center mb-4 bg-gray-100 rounded-md p-1 gap-5">
                <button
                    onClick={() => { setCalendarViewMode('month'); setDisplayDate(today); }} // Reset to today's month
                    className={`flex-1 py-2 px-4 rounded-md font-medium shadow-sm flex items-center justify-center space-x-2 transition-colors duration-200
                                ${calendarViewMode === 'month' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Month</span>
                </button>
                <button
                    onClick={() => { setCalendarViewMode('week'); setDisplayDate(today); }} // Reset to today's week
                    className={`flex-1 py-2 px-4 rounded-md font-medium shadow-sm flex items-center justify-center space-x-2 transition-colors duration-200
                                ${calendarViewMode === 'week' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zM12 7v14" />
                    </svg>
                    <span>Week</span>
                </button>
            </div>

            {/* Days of Week Headers */}
            <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-500 mb-2">
                {daysOfWeek.map(day => (
                    <div key={day} className="p-2">{day}</div>
                ))}
            </div>

            {/* Calendar Grid - Conditional Rendering */}
            <div className="grid grid-cols-7 gap-1 text-center">
                {calendarViewMode === 'month' ? renderMonthView() : renderWeekView()}
            </div>
        </div>
    );
};

export default MyTripsCalendar;