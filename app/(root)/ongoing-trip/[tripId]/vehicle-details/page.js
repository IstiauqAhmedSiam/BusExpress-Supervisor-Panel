// app/vehicle-details/[tripId]/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

// Component for Vehicle Details section
const VehicleDetailsSection = ({ vehicle }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-blue-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Vehicle Details</h2>
            <div className="space-y-3 text-gray-700">
                <div className="flex justify-between items-center">
                    <span className="font-semibold">Bus Number</span>
                    <span>{vehicle.busNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold">Bus Route</span>
                    <span>{vehicle.busRoute}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Seats</span>
                    <span>{vehicle.totalSeats}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold">Coach No.</span>
                    <span>{vehicle.coachNo}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold">Coach Type</span>
                    <span>{vehicle.coachType}</span>
                </div>
            </div>
        </div>
    );
};

// Component for Driver Profile section
const DriverProfileSection = ({ driver }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Driver Profile</h2>
            <div className="flex items-center space-x-4">
                <img
                    src={'https://placehold.co/100x100/A0D9D9/000000?text=FH'} // Placeholder image
                    alt="Driver Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                    <p className="text-lg font-semibold text-gray-800">{driver.name}</p>
                    <p className="text-sm text-gray-600">{driver.contact}</p>
                </div>
            </div>
        </div>
    );
};


const VehicleDetailsPage = () => {
    const router = useRouter();
    const { tripId } = useParams(); // Get tripId from URL, if passed

    const [vehicleData, setVehicleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                // Simulate API call for vehicle details
                await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

                // Dummy data based on image_fa43fc.png
                const dummyData = {
                    vehicle: {
                        busNumber: '68 - ch - 15',
                        busRoute: 'Coxs 68b',
                        totalSeats: 48,
                        coachNo: '5866513921515',
                        coachType: 'AC'
                    },
                    driver: {
                        name: 'MD. Fardin Hasan',
                        contact: '017625 - 154861',
                        profilePicUrl: 'https://via.placeholder.com/150x150?text=Driver+Pic' // Placeholder image
                    }
                };
                setVehicleData(dummyData);
            } catch (err) {
                setError('Failed to load vehicle details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        // You might use tripId here to fetch specific data
        // For this demo, we'll just load dummy data regardless of tripId
        fetchVehicleDetails();
    }, [tripId]); // Dependency on tripId, though not strictly used in dummy fetch

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
                <p className="text-gray-700 text-lg">Loading vehicle details...</p>
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

    if (!vehicleData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
                <p className="text-gray-700 text-lg">No vehicle data found.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col font-sans">
            {/* Header */}
            <header className="bg-blue-700 p-4 shadow-md text-white flex items-center">
                <button onClick={() => router.back()} className="mr-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h1 className="text-xl font-semibold flex-grow">Vehicle Details</h1>
            </header>

            <main className="p-4 flex-grow">
                <VehicleDetailsSection vehicle={vehicleData.vehicle} />
                <DriverProfileSection driver={vehicleData.driver} />
            </main>
        </div>
    );
};

export default VehicleDetailsPage;