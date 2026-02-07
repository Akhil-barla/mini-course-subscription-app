import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
    },
    price: {
      type: Number,
      required: true,
      default: 0, // 0 = free
      min: 0,
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);
