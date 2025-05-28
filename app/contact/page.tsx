import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
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
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                            <textarea
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white h-32"
                                placeholder="Your message..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-700">
                        <h2 className="text-lg font-semibold mb-4">Other Ways to Reach Us</h2>
                        <div className="space-y-3">
                            <div className="flex items-center text-slate-300">
                                <svg className="w-5 h-5 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>support@quizwinz.com</span>
                            </div>
                            <div className="flex items-center text-slate-300">
                                <svg className="w-5 h-5 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                </svg>
                                <span>Live Chat Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 