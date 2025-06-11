"use client"
import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add your actual form submission logic (API call, etc.)
        setFormSubmitted(true);
    };

    return (
        <div className="h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4 overflow-y-auto">
            <div className="max-w-md mx-auto">
                <Link href="/start" className="inline-flex items-center text-yellow-400 mb-6">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>

                <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

                <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
                    {formSubmitted ? (
                        <div className="text-center text-lg text-yellow-400 font-semibold">
                            Thanks for contacting us! We'll get back to you soon.
                        </div>
                    ) : (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                                <textarea
                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white h-32"
                                    placeholder="Your message..."
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-yellow-400 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
