import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

const VALID_PROMO = 'BFSALE25';
const DISCOUNT = 0.5;

function CourseDetailsContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const discountedPrice =
    course?.price > 0 && promoApplied
      ? Math.round(course.price * (1 - DISCOUNT) * 100) / 100
      : null;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/courses/${id}`);
        if (data.success) {
          setCourse(data.data);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Course not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, navigate]);

  useEffect(() => {
    if (!isAuthenticated || !course) return;
    const checkSubscription = async () => {
      try {
        const { data } = await api.get(`/subscribe/check/${id}`);
        if (data.subscribed) setIsSubscribed(true);
      } catch {
        // ignore
      }
    };
    checkSubscription();
  }, [id, isAuthenticated, course]);

  const applyPromo = () => {
    if (promoCode.toUpperCase() === VALID_PROMO) {
      setPromoApplied(true);
      toast.success('Promo code applied! 50% off');
    } else {
      toast.error('Invalid promo code');
    }
  };

  const canSubscribe = course?.price === 0 || (course?.price > 0 && promoApplied);

  const handleSubscribe = async () => {
    if (!canSubscribe || subscribing) return;
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/courses/${id}` } } });
      return;
    }

    setSubscribing(true);
    try {
      const payload = { courseId: id };
      if (course.price > 0) payload.promoCode = VALID_PROMO;
      const { data } = await api.post('/subscribe', payload);
      if (data.success) {
        toast.success('Successfully subscribed!');
        setIsSubscribed(true);
        navigate('/my-courses');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Subscription failed');
    } finally {
      setSubscribing(false);
    }
  };

  if (loading || !course) {
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
      <div className="max-w-4xl mx-auto">
        <div className="card overflow-hidden">
          <div className="aspect-video bg-dark-800">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                course.price === 0
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-primary-500/20 text-primary-400'
              }`}
            >
              {course.price === 0 ? 'Free' : `$${course.price}`}
            </span>
            <h1 className="font-display text-3xl font-bold text-white mb-4">
              {course.title}
            </h1>
            <p className="text-dark-300 mb-8 whitespace-pre-line">
              {course.description}
            </p>

            {isSubscribed ? (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
                You're subscribed to this course. View it in{' '}
                <button
                  onClick={() => navigate('/my-courses')}
                  className="underline font-semibold"
                >
                  My Courses
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {course.price > 0 && (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter promo code (BFSALE25)"
                      className="input-field flex-1"
                      disabled={promoApplied}
                    />
                    <button
                      onClick={applyPromo}
                      disabled={promoApplied}
                      className="btn-secondary whitespace-nowrap"
                    >
                      {promoApplied ? 'Applied' : 'Apply Promo'}
                    </button>
                  </div>
                )}

                {course.price > 0 && promoApplied && (
                  <div className="flex items-center gap-4 text-dark-300">
                    <span className="line-through">${course.price}</span>
                    <span className="text-green-400 font-semibold">
                      ${discountedPrice} (50% off)
                    </span>
                  </div>
                )}

                <button
                  onClick={handleSubscribe}
                  disabled={!canSubscribe || subscribing}
                  className="btn-primary"
                >
                  {subscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default function CourseDetails() {
  return <CourseDetailsContent />;
}
