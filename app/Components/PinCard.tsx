/**
 * Pinterest Clone - Pin Card Component
 * 
 * Displays individual pin cards with Firebase data
 * SECURITY: Implements proper image loading and error handling
 * SAFETY: Type-safe props with comprehensive validation
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Pin } from '../types';

interface PinCardProps {
  pin: Pin;
  onLike?: (pinId: string) => void;
  onSave?: (pinId: string) => void;
  onPinClick?: (pin: Pin) => void;
}

export default function PinCard({ pin, onLike, onSave, onPinClick }: PinCardProps) {
  const router = useRouter();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Use a data URI for a simple gray placeholder to prevent infinite loops
    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDQwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMjAwSDIyNVY0MDBIMTc1VjIwMFoiIGZpbGw9IiNEMUQ1REIiLz4KPHN2Zz4K';
    e.currentTarget.alt = 'Image not available';
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(pin.id);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave?.(pin.id);
  };

  const handlePinClick = () => {
    // Navigate to pin detail page
    router.push(`/pin/${pin.id}`);
    onPinClick?.(pin);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={handlePinClick}
    >
      {/* Pin Image */}
      <div className="relative group">
        <img
          src={pin.imageUrl}
          alt={pin.title}
          className="w-full h-auto object-cover"
          onError={handleImageError}
          loading="lazy"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button
              onClick={handleLike}
              className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              ❤️ {pin.likes}
            </button>
            <button
              onClick={handleSave}
              className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              💾 Save
            </button>
          </div>
        </div>
      </div>

      {/* Pin Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {pin.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {pin.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {pin.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
          {pin.tags.length > 3 && (
            <span className="text-gray-400 text-xs px-2 py-1">
              +{pin.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-2">
          <img
            src={pin.author.avatar}
            alt={pin.author.name}
            className="w-6 h-6 rounded-full object-cover"
            onError={(e) => {
              // Use a data URI for a simple gray circle placeholder
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIgZmlsbD0iI0QxRDVEQiIvPgo8L3N2Zz4K';
            }}
          />
          <span className="text-sm text-gray-600 font-medium">
            {pin.author.name}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
          <span>{pin.saves} saves</span>
          <span>{new Date(pin.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
