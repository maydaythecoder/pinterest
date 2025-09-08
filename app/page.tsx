"use client";

import React from 'react'
import Navbar from './Sections/Navbar'
import Feed from './Sections/Feed'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Feed />
    </div>
  );
}
