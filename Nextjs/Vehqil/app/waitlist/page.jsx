"use client";

import React from "react";

export default function WaitlistPage() {
    return (
        <div className="flex items-center justify-center min-h-screen dotted-background p-6">
            <div className="max-w-lg w-full bg-white p-10 rounded-2xl shadow-2xl text-center mt-18.5">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Join Our Exclusive Waitlist</h2>
                <p className="text-gray-600 mb-6 text-lg">
                    Be the first to know when we launch. Enter your email below to get early access.
                </p>
                <form className="flex flex-col space-y-4">
                    <input
                        type="email"
                        placeholder="Your Email Address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-700"
                    />
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition"
                    >
                        Join Waitlist
                    </button>
                </form>
            </div>
        </div>
    );
}