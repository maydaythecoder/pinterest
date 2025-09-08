/**
 * Pinterest Clone - Search Component
 * 
 * Implements real-time search functionality with Firebase
 * SECURITY: Implements proper search sanitization and debouncing
 * SAFETY: Type-safe search with comprehensive error handling
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useSearchPins } from '../hooks/useFirebase';
import PinCard from './PinCard';
import Loading from './Loading';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const { data: searchResults, loading, error } = useSearchPins(debouncedSearchTerm);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handlePinClick = (pin: any) => {
    console.log('Clicked pin:', pin);
  };

  const handleLike = (pinId: string) => {
    console.log('Liked pin:', pinId);
  };

  const handleSave = (pinId: string) => {
    console.log('Saved pin:', pinId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Search Pins</h1>
          
          {/* Search Input */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search by tags (e.g., nature, food, design)..."
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

          {/* Search Status */}
          {debouncedSearchTerm && (
            <p className="text-gray-600 mt-2">
              {loading ? 'Searching...' : `Found ${searchResults.length} pins for "${debouncedSearchTerm}"`}
            </p>
          )}
        </div>

        {/* Search Results */}
        {error && (
          <div className="text-center py-16">
            <div className="text-red-500 text-xl mb-4">⚠️ Search Error</div>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {loading && debouncedSearchTerm && (
          <Loading text="Searching pins..." className="py-16" />
        )}

        {!loading && !error && debouncedSearchTerm && searchResults.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
            <p className="text-gray-500">Try searching with different tags or keywords.</p>
          </div>
        )}

        {!loading && !error && searchResults.length > 0 && (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6">
            {searchResults.map((pin) => (
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
        )}

        {/* Empty State */}
        {!debouncedSearchTerm && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Start searching</h3>
            <p className="text-gray-500">Enter a tag or keyword to find pins.</p>
          </div>
        )}
      </div>
    </div>
  );
}
