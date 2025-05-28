import React from 'react';

const Advertisement = () => {
    return (
        <div className="w-full bg-slate-800 border-b border-slate-700 py-1.5 px-2 text-center">
            {/* Smaller ad space that matches app theme */}
            <div className="max-w-[320px] mx-auto h-[50px] bg-slate-700/50 rounded-lg flex items-center justify-center border border-slate-600">
                <div className="text-xs font-medium text-slate-300 flex items-center gap-2">
                    <span className="text-yellow-400">Ad</span>
                    <span className="text-slate-400">Advertisement Space</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default Advertisement; 