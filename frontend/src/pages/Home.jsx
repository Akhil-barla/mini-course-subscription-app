import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import Layout from '../components/Layout';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        if (data.success) {
          setCourses(data.data);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Black Friday Courses
        </h1>
        <p className="text-dark-400">
          Discover our curated collection. Use BFSALE25 for 50% off paid courses.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course._id}
            to={`/courses/${course._id}`}
            className="card group block"
          >
            <div className="aspect-video overflow-hidden bg-dark-800">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                  course.price === 0
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-primary-500/20 text-primary-400'
                }`}
              >
                {course.price === 0 ? 'Free' : `$${course.price}`}
              </span>
              <h2 className="font-display font-semibold text-lg text-white mb-2 line-clamp-2">
                {course.title}
              </h2>
              <p className="text-dark-400 text-sm line-clamp-2">
                {course.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
