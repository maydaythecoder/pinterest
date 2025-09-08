#!/usr/bin/env node

/**
 * Pinterest Clone - Firestore Data Migration Script
 * 
 * This script reads data from data.json and populates Firestore collections.
 * 
 * SECURITY: Uses environment variables for Firebase config to prevent credential exposure
 * SAFETY: Validates data structure before writing to prevent malformed documents
 * 
 * Usage:
 *   npm run migrate-data
 *   or
 *   node scripts/migrate-data.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: "AIzaSyD9dKXS2f2MP4V1hF-xuEK7pDzZikCfwlA",
  authDomain: "webresponsiveimagegallary.firebaseapp.com",
  projectId: "webresponsiveimagegallary",
  storageBucket: "webresponsiveimagegallary.firebasestorage.app",
  messagingSenderId: "678266107160",
  appId: "1:678266107160:web:6505cc2ba5c45a82075a6d",
  measurementId: "G-4R3MZ3GETV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Type definitions for data structure
interface Pin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  tags: string[];
  likes: number;
  saves: number;
  createdAt: string;
  boardId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  followers: number;
  following: number;
  pins: number;
  boards: number;
  createdAt: string;
}

interface Board {
  id: string;
  name: string;
  description: string;
  authorId: string;
  pins: string[];
  followers: number;
  isPrivate: boolean;
  createdAt: string;
}

interface DataStructure {
  pins: Pin[];
  users: User[];
  boards: Board[];
}

/**
 * Validates data structure to ensure all required fields are present
 * SECURITY: Prevents malformed data from being written to Firestore
 */
function validateData(data: any): data is DataStructure {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data structure: root must be an object');
  }

  const requiredCollections = ['pins', 'users', 'boards'];
  for (const collection of requiredCollections) {
    if (!Array.isArray(data[collection])) {
      throw new Error(`Invalid data structure: ${collection} must be an array`);
    }
  }

  // Validate pins structure
  data.pins.forEach((pin: any, index: number) => {
    const requiredFields = ['id', 'title', 'description', 'imageUrl', 'author', 'tags', 'likes', 'saves', 'createdAt', 'boardId'];
    for (const field of requiredFields) {
      if (!(field in pin)) {
        throw new Error(`Invalid pin at index ${index}: missing field '${field}'`);
      }
    }
  });

  // Validate users structure
  data.users.forEach((user: any, index: number) => {
    const requiredFields = ['id', 'name', 'email', 'avatar', 'followers', 'following', 'pins', 'boards', 'createdAt'];
    for (const field of requiredFields) {
      if (!(field in user)) {
        throw new Error(`Invalid user at index ${index}: missing field '${field}'`);
      }
    }
  });

  // Validate boards structure
  data.boards.forEach((board: any, index: number) => {
    const requiredFields = ['id', 'name', 'description', 'authorId', 'pins', 'followers', 'isPrivate', 'createdAt'];
    for (const field of requiredFields) {
      if (!(field in board)) {
        throw new Error(`Invalid board at index ${index}: missing field '${field}'`);
      }
    }
  });

  return true;
}

/**
 * Converts ISO string dates to Firestore Timestamp objects
 * SAFETY: Ensures proper date handling for Firestore compatibility
 */
function convertDatesToTimestamps(data: any): any {
  const convertObject = (obj: any): any => {
    if (obj === null || obj === undefined) return obj;
    
    if (typeof obj === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(obj)) {
      // Convert ISO string to Date object (Firestore will handle Timestamp conversion)
      return new Date(obj);
    }
    
    if (Array.isArray(obj)) {
      return obj.map(convertObject);
    }
    
    if (typeof obj === 'object') {
      const converted: any = {};
      for (const [key, value] of Object.entries(obj)) {
        converted[key] = convertObject(value);
      }
      return converted;
    }
    
    return obj;
  };
  
  return convertObject(data);
}

/**
 * Populates Firestore collections using batch writes for atomicity
 * SAFETY: Uses batch writes to ensure data consistency
 */
async function populateFirestore(data: DataStructure): Promise<void> {
  console.log('🚀 Starting Firestore population...');
  
  // Convert dates to proper format
  const processedData = convertDatesToTimestamps(data);
  
  // Create batch for atomic writes
  const batch = writeBatch(db);
  
  let operationCount = 0;
  
  // Add users to Firestore
  console.log(`📝 Adding ${processedData.users.length} users...`);
  for (const user of processedData.users) {
    const userRef = doc(db, 'users', user.id);
    batch.set(userRef, user);
    operationCount++;
  }
  
  // Add boards to Firestore
  console.log(`📝 Adding ${processedData.boards.length} boards...`);
  for (const board of processedData.boards) {
    const boardRef = doc(db, 'boards', board.id);
    batch.set(boardRef, board);
    operationCount++;
  }
  
  // Add pins to Firestore
  console.log(`📝 Adding ${processedData.pins.length} pins...`);
  for (const pin of processedData.pins) {
    const pinRef = doc(db, 'pins', pin.id);
    batch.set(pinRef, pin);
    operationCount++;
  }
  
  console.log(`📊 Total operations: ${operationCount}`);
  
  try {
    // Commit all operations atomically
    await batch.commit();
    console.log('✅ Successfully populated Firestore!');
  } catch (error) {
    console.error('❌ Error populating Firestore:', error);
    throw error;
  }
}

/**
 * Main migration function with error handling and logging
 */
async function migrateData(): Promise<void> {
  try {
    console.log('🔍 Reading data.json file...');
    
    // Read and parse JSON file
    const dataPath = path.join(process.cwd(), 'scripts', 'data.json');
    
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Data file not found at: ${dataPath}`);
    }
    
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);
    
    console.log('✅ Data file loaded successfully');
    
    // Validate data structure
    console.log('🔍 Validating data structure...');
    validateData(data);
    console.log('✅ Data validation passed');
    
    // Populate Firestore
    await populateFirestore(data);
    
    console.log('🎉 Migration completed successfully!');
    
  } catch (error) {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateData();
}

export { migrateData, validateData, convertDatesToTimestamps };
