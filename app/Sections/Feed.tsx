/**
 * Pinterest Clone - Feed Component
 * 
 * Displays pins feed with Firebase data integration
 * SECURITY: Implements proper loading states and error handling
 * SAFETY: Type-safe data fetching with comprehensive validation
 */

'use client';

import React, { useState, useMemo } from 'react';
import { usePins } from '../hooks/useFirebase';
import PinCard from '../Components/PinCard';
import { Pin } from '../types';

export default function Feed() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Create a stable options object to prevent infinite re-renders
  const options = useMemo(() => ({ limit: 20 }), []);
  const { data: pins, loading, error, hasMore, loadMore } = usePins(options);

  const handleLike = (pinId: string) => {
    // TODO: Implement like functionality
    console.log('Liked pin:', pinId);
  };

  const handleSave = (pinId: string) => {
    // TODO: Implement save functionality
    console.log('Saved pin:', pinId);
  };

  const handlePinClick = (pin: Pin) => {
    // PinCard component now handles navigation internally
    console.log('Clicked pin:', pin);
  };

  if (loading && pins.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            <span className="ml-4 text-gray-600">Loading pins...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️ Error loading pins</div>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Discover</h1>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search pins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Pins Grid */}
        {pins.length > 0 ? (
          <>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6">
              {pins.map((pin) => (
                <div key={pin.id} className="break-inside-avoid mb-6">
                  <PinCard
                    pin={pin}
                    onLike={handleLike}
                    onSave={handleSave}
                    onPinClick={handlePinClick}
                  />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Loading...' : 'Load More Pins'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">📌</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No pins found</h3>
            <p className="text-gray-500">Be the first to create a pin!</p>
          </div>
        )}
      </div>
    </div>
  );
}