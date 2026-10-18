import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSection: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication from localStorage
    localStorage.removeItem('isAdminAuthenticated');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="admin-section">
      <h2>Admin Section</h2>
      <p>This page is a placeholder for future admin functionality.</p>
      <button onClick={handleLogout} className="btn">Logout</button>
    </div>
  );
};

export default AdminSection;
