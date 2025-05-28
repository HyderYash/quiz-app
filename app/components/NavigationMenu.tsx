import React from 'react';
import Link from 'next/link';

interface NavigationMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const NavigationMenu = ({ isOpen, onClose }: NavigationMenuProps) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop inside mobile container */}
            <div
                className="absolute inset-0 bg-black/50 z-40"
                onClick={onClose}
            />

            {/* Menu inside mobile container */}
            <div className="absolute top-0 left-0 h-full w-64 bg-slate-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
                <div className="p-4 border-b border-slate-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-yellow-400">Menu</h2>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/start"
                                className="flex items-center px-4 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                                onClick={onClose}
                            >
                                <svg className="w-5 h-5 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="flex items-center px-4 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                                onClick={onClose}
                            >
                                <svg className="w-5 h-5 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/report-bug"
                                className="flex items-center px-4 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                                onClick={onClose}
                            >
                                <svg className="w-5 h-5 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                Report a Bug
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default NavigationMenu; 