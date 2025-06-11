"use client";
import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
    return (
        <div className="h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4 overflow-y-auto">
            <div className="max-w-md mx-auto">
                <Link href="/start" className="inline-flex items-center text-yellow-400 mb-6">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>

                <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>

                <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700 space-y-4 text-slate-300 text-sm leading-relaxed">
                    <p>
                        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our services.
                    </p>

                    <h2 className="text-lg font-semibold text-white">1. Information We Collect</h2>
                    <p>
                        We may collect personal information such as your name, email address, and any other details you provide when using our services.
                    </p>

                    <h2 className="text-lg font-semibold text-white">2. How We Use Your Information</h2>
                    <p>
                        We use your information to provide and improve our services, respond to inquiries, and communicate with you regarding updates or important notices.
                    </p>

                    <h2 className="text-lg font-semibold text-white">3. Sharing Your Information</h2>
                    <p>
                        We do not sell or share your personal information with third parties except as required by law or with your explicit consent.
                    </p>


                </div>
            </div>
        </div>
    );
}
