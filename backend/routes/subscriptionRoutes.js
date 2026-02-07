import express from 'express';
import Subscription from '../models/Subscription.js';
import Course from '../models/Course.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Valid promo code for Black Friday: 50% discount
const VALID_PROMO_CODE = 'BFSALE25';
const PROMO_DISCOUNT = 0.5; // 50%

/**
 * POST /subscribe
 * Subscribe to a course
 * - Free courses: subscribe directly
 * - Paid courses: require valid promo code (BFSALE25) for 50% discount
 */
router.post('/', protect, async (req, res) => {
  try {
    const { courseId, promoCode } = req.body;
    const userId = req.user._id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Course ID is required',
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check if already subscribed
    const existing = await Subscription.findOne({ userId, courseId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Already subscribed to this course',
      });
    }

    let pricePaid = course.price;

    if (course.price > 0) {
      // Paid course - require valid promo code
      if (!promoCode) {
        return res.status(400).json({
          success: false,
          message: 'Promo code is required for paid courses',
        });
      }

      if (promoCode.toUpperCase() !== VALID_PROMO_CODE) {
        return res.status(400).json({
          success: false,
          message: 'Invalid promo code',
        });
      }

      // Apply 50% discount
      pricePaid = Math.round(course.price * (1 - PROMO_DISCOUNT) * 100) / 100;
    }

    const subscription = await Subscription.create({
      userId,
      courseId,
      pricePaid,
    });

    // Populate course details for response
    await subscription.populate('courseId');

    res.status(201).json({
      success: true,
      data: subscription,
      message: 'Successfully subscribed!',
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Already subscribed to this course',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

/**
 * GET /my-courses
 * Get user's subscribed courses
 */
router.get('/my-courses', protect, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.user._id })
      .populate('courseId')
      .sort({ subscribedAt: -1 });

    res.json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

/**
 * GET /check/:courseId
 * Check if user is subscribed to a course
 */
router.get('/check/:courseId', protect, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      userId: req.user._id,
      courseId: req.params.courseId,
    });

    res.json({
      success: true,
      subscribed: !!subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

export default router;
