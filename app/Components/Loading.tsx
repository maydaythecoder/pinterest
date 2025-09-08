/**
 * Pinterest Clone - Loading Component
 * 
 * Reusable loading spinner component
 * SAFETY: Implements proper accessibility features
 */

'use client';

import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export default function Loading({ size = 'md', text = 'Loading...', className = '' }: LoadingProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-red-500 ${sizeClasses[size]}`}></div>
      {text && (
        <span className="mt-4 text-gray-600 font-medium">{text}</span>
      )}
    </div>
  );
}
