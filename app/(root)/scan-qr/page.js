// app/scan-qr/page.jsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { useRouter } from 'next/navigation';

const QrScannerPage = () => {
    const router = useRouter();
    const html5QrcodeScannerRef = useRef(null); // Ref to store the scanner instance
    const [scanResult, setScanResult] = useState('');
    const [scanError, setScanError] = useState('');
    const [isScannerReady, setIsScannerReady] = useState(false); // State to track scanner readiness

    useEffect(() => {
        // Ensure the scanner is initialized only once per component mount
        if (!html5QrcodeScannerRef.current) {
            const scanner = new Html5QrcodeScanner(
                "qrcode-reader", // ID of the HTML element where the scanner will render
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    disableFlip: false,
                    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
                },
                /* verbose= */ false
            );

            // Store the scanner instance in the ref immediately after creation
            html5QrcodeScannerRef.current = scanner;

            const onScanSuccess = (decodedText, decodedResult) => {
                console.log(`QR Code scanned: ${decodedText}`, decodedResult);
                setScanResult(decodedText);
                setScanError('');

                router.push(`/scanned-ticket/${JSON.parse(decodedText).ticketId}`);

                html5QrcodeScannerRef.current.clear();
            };

            const onScanError = (errorMessage) => {
                // console.warn(`QR Scan error: ${errorMessage}`);
                // Avoid setting state here unless you want constant re-renders or specific error messages.
            };

            // Render the scanner. Catch any immediate errors during startup.
            scanner.render(onScanSuccess, onScanError)
        }

        // Cleanup function for when the component unmounts
        return () => {
            // Only attempt to clear if a scanner instance exists in the ref
            const currentScanner = html5QrcodeScannerRef.current;
            if (currentScanner) {
                // Check if the scanner is currently scanning before calling clear()
                if (currentScanner.isScanning) {
                    currentScanner.clear().then(() => {
                        console.log("Scanner successfully stopped on component unmount.");
                    }).catch(err => {
                        // This specific error ("removeChild on Node: The node to be removed is not a child")
                        // often occurs here during hot-reloads or rapid unmounts if the DOM element
                        // is removed by React before html5-qrcode can clean up its own internal elements.
                        // Catching it prevents app crash.
                        console.error("Failed to stop scanner on component unmount (may be expected during fast navigation/dev):", err);
                    });
                }
                // Always clear the ref regardless of `clear()` success to ensure re-initialization on next mount
                html5QrcodeScannerRef.current = null;
            }
        };
    }, [router]); // `router` is a dependency as `onScanSuccess` uses it.

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col font-sans">
            <header className="bg-blue-700 p-4 shadow-md text-white flex items-center">
                <button onClick={() => {router.back()}} className="mr-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h1 className="text-xl font-semibold flex-grow">Scan QR Code</h1>
            </header>

            <main className="flex-grow p-4 flex flex-col items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Point your camera at a QR code</h2>
                    <div id="qrcode-reader" className="w-full h-[300px] overflow-hidden rounded-md flex flex-col items-center justify-center border-none">
                        {/* Show loading message only if scanner is not ready and no error */}
                        {!isScannerReady && !scanError && (
                            <p className="text-gray-500">Initializing camera...</p>
                        )}
                        {/* Show error message if `scanError` is set */}
                        {scanError && (
                            <p className="text-red-600 font-semibold text-center">{scanError}</p>
                        )}
                    </div>

                    {scanResult && (
                        <p className="mt-4 text-green-600 font-semibold">Scanned: {scanResult}</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default QrScannerPage;