/**
 * Pinterest Clone - Pin Detail Page
 * 
 * Displays detailed view of a single pin
 * SECURITY: Implements proper error handling and loading states
 * SAFETY: Type-safe data fetching with comprehensive validation
 */

'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePin } from '../../hooks/useFirebase';
import Navbar from '../../Sections/Navbar';
import Loading from '../../Components/Loading';
import ErrorBoundary from '../../Components/ErrorBoundary';

export default function PinDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pinId = params.id as string;
  
  const { data: pin, loading, error } = usePin(pinId);

  const handleBack = () => {
    router.back();
  };

  const handleLike = () => {
    // TODO: Implement like functionality
    console.log('Liked pin:', pinId);
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saved pin:', pinId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️ Error loading pin</div>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={handleBack}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!pin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-gray-400 text-xl mb-4">📌</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Pin not found</h3>
            <p className="text-gray-500 mb-4">The pin you're looking for doesn't exist.</p>
            <button 
              onClick={handleBack}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pin Image */}
          <div className="space-y-4">
            <div className="relative group">
              <img
                src={pin.imageUrl}
                alt={pin.title}
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  // Use a data URI for a simple gray placeholder to prevent infinite loops
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDQwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMjAwSDIyNVY0MDBIMTc1VjIwMFoiIGZpbGw9IiNEMUQ1REIiLz4KPHN2Zz4K';
                  e.currentTarget.alt = 'Image not available';
                }}
              />
              
              {/* Action Buttons Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-lg">
                <div className="flex gap-3">
                  <button
                    onClick={handleLike}
                    className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    ❤️ {pin.likes}
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    💾 Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pin Details */}
          <div className="space-y-6">
            {/* Title and Description */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {pin.title}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {pin.description}
              </p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {pin.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
              <img
                src={pin.author.avatar}
                alt={pin.author.name}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  // Use a data URI for a simple gray circle placeholder
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIgZmlsbD0iI0QxRDVEQiIvPgo8L3N2Zz4K';
                }}
              />
              <div>
                <h4 className="font-semibold text-gray-800">{pin.author.name}</h4>
                <p className="text-gray-500 text-sm">Pin creator</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{pin.likes}</div>
                <div className="text-gray-500 text-sm">Likes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{pin.saves}</div>
                <div className="text-gray-500 text-sm">Saves</div>
              </div>
            </div>

            {/* Created Date */}
            <div className="text-gray-500 text-sm">
              Created on {new Date(pin.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
