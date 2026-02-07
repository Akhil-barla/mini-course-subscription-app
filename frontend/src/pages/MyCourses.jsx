import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

function MyCoursesContent() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const { data } = await api.get('/subscribe/my-courses');
        if (data.success) {
          setSubscriptions(data.data);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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
          My Courses
        </h1>
        <p className="text-dark-400">
          Your subscribed courses
        </p>
      </div>

      {subscriptions.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-dark-400 mb-4">No courses subscribed yet.</p>
          <Link to="/" className="btn-primary inline-block">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((sub) => (
            <div key={sub._id} className="card overflow-hidden">
              <div className="aspect-video bg-dark-800">
                <img
                  src={sub.courseId?.image}
                  alt={sub.courseId?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="font-display font-semibold text-lg text-white mb-2 line-clamp-2">
                  {sub.courseId?.title}
                </h2>
                <p className="text-dark-400 text-sm mb-3">
                  Subscribed {formatDate(sub.subscribedAt)}
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    sub.pricePaid === 0
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-primary-500/20 text-primary-400'
                  }`}
                >
                  {sub.pricePaid === 0 ? 'Free' : `Paid $${sub.pricePaid}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default function MyCourses() {
  return (
    <ProtectedRoute>
      <MyCoursesContent />
    </ProtectedRoute>
  );
}
