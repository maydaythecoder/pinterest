"use client";

import React from 'react'
import Card from './Components/card'
import Navbar from './Components/Sections/Navbar'
export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>main content</h1>
      <h1>footer</h1>
      <Card />
    </div>
  );
}
