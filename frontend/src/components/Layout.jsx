import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <header className="border-b border-dark-700 bg-dark-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="font-display font-bold text-xl text-white">
            Mini Course
            <span className="text-primary-500 ml-1">BF</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className="text-dark-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/my-courses"
                  className="text-dark-300 hover:text-white transition-colors"
                >
                  My Courses
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
