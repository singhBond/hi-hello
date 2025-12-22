import React from "react";

export const Header = () => (
  <div className="flex flex-col items-center text-center py-6 px-4 bg-black relative overflow-hidden">
    
    {/* Flame Border Effect (Simulated with radial gradients or an image) */}
    <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
       {/* You can replace this div with an actual flame pattern image if available */}
       <div className="w-full h-full border-[24px] border-orange-600 blur-sm opacity-30 animate-pulse "></div>
    </div>

    {/* Content Container */}
    <div className="z-10 w-full max-w-2xl flex flex-col items-center">
      
      {/* Main Title Section */}
      <div className="flex items-center justify-center gap-2 mb-1">
        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter flex items-center" 
            style={{ fontFamily: "sans-serif" }}>
          HI-HELL
          <img src="/emoji.png" alt="emoji" className="h-16 w-16 " />
         
        </h1>
      </div>

      {/* Tagline: Fast Food */}
      <div className="italic text-yellow-400 text-xl md:text-3xl font-serif -mt-2">
        Fast Food
      </div>

      {/* Yellow Pill Header: Birthday | Mess Available */}
      <div className="mt-4 bg-yellow-400 px-10  rounded-full shadow-md">
        <p className="text-black text-sm md:text-lg font-bold uppercase tracking-tight">
          Birthday | Mess Available Here
        </p>
      </div>

      {/* Delivery & Contact Section */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-900/20 px-3   rounded">
       Home Delivery Available
          </span>
          <img src="delivers.png" alt="scooter" className="h-6 invert opacity-80" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 mt-1">
          <p className="text-yellow-500 font-mono text-xl md:text-2xl font-bold">
            📞 +91 9693206902
          </p>
        </div>

        <p className="text-gray-400 text-[10px] md:text-xs uppercase tracking-widest border-t border-gray-800 pt-2 mt-2">
          Accepting Online Orders: <span className="text-white">10:00 AM - 8:00 PM</span>
        </p>
      </div>
    </div>
  </div>
);