import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

/**
 * GET /courses
 * Fetch all courses
 */
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

/**
 * GET /courses/:id
 * Fetch single course by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }
    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

export default router;
