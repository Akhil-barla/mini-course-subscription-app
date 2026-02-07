/**
 * Seed script - Creates dummy users and mock courses
 * Run: node scripts/seed.js (from backend directory)
 * Or: npm run seed (from root)
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import User from '../models/User.js';
import Course from '../models/Course.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-course-subscription';

const dummyUsers = [
  { name: 'Test User 1', email: 'test1@gmail.com', password: 'password123' },
  { name: 'Test User 2', email: 'test2@gmail.com', password: 'password123' },
  { name: 'Admin User', email: 'admin@gmail.com', password: 'admin123' },
];

const mockCourses = [
  {
    title: 'Complete React Masterclass',
    description: 'Learn React from scratch to advanced. Build modern web applications with hooks, context, and best practices. Includes projects and real-world examples.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
  },
  {
    title: 'Node.js Backend Development',
    description: 'Master Node.js and Express. Build REST APIs, authentication, databases, and deploy to production. Perfect for full-stack developers.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
  },
  {
    title: 'MongoDB & Mongoose Fundamentals',
    description: 'Deep dive into MongoDB and Mongoose ODM. Schema design, queries, aggregations, and best practices for NoSQL databases.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400',
  },
  {
    title: 'Tailwind CSS - From Zero to Hero',
    description: 'Build beautiful, responsive UIs with Tailwind CSS. Utility-first approach, components, dark mode, and production optimization.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    title: 'JWT Authentication Complete Guide',
    description: 'Implement secure JWT authentication in your apps. Access tokens, refresh tokens, middleware, and security best practices.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=400',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, {
      family: 4, // Force IPv4 - fixes Windows SSL/TLS issues with MongoDB Atlas
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out to preserve)
    await User.deleteMany({});
    await Course.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create users with hashed passwords
    const hashedUsers = await Promise.all(
      dummyUsers.map(async (u) => ({
        name: u.name,
        email: u.email,
        password: await bcrypt.hash(u.password, 12),
      }))
    );
    await User.insertMany(hashedUsers);
    console.log('✅ Created 3 dummy users');

    // Create courses
    await Course.insertMany(mockCourses);
    console.log('✅ Created 5 mock courses');

    console.log('\n📋 Dummy Users:');
    console.log('   test1@gmail.com / password123');
    console.log('   test2@gmail.com / password123');
    console.log('   admin@gmail.com / admin123');
    console.log('\n🎉 Seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
