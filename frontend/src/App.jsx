import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import CourseDetails from './pages/CourseDetails';
import MyCourses from './pages/MyCourses';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      <Route path="/my-courses" element={<MyCourses />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
