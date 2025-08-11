import React from "react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left section - Logo and navigation */}
        <div className="flex items-center space-x-6">
          {/* Pinterest logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 rounded-full hover:bg-gray-100 font-semibold text-black transition-colors">
              Home
            </button>
            <button className="px-4 py-2 rounded-full hover:bg-gray-100 font-semibold text-black transition-colors">
              Explore
            </button>
            <button className="px-4 py-2 rounded-full hover:bg-gray-100 font-semibold text-black transition-colors">
              Create
            </button>
          </div>
        </div>

        {/* Center section - Search bar */}
        <div className="flex-1 max-w-2xl mx-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for ideas"
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-black placeholder-gray-500"
            />
          </div>
        </div>

        {/* Right section - User actions */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <button
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
            title="Notifications"
            aria-label="View notifications"
          >
            <svg
              className="w-6 h-6 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </button>

          {/* Messages */}
          <button
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
            title="Messages"
            aria-label="View messages"
          >
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>

          {/* Profile */}
          <button className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors flex items-center justify-center">
            <span className="text-black font-semibold text-sm">U</span>
          </button>

          {/* Menu */}
          <button
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
            title="Menu"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
