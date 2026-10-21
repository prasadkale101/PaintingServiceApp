import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Schedule {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  location: string;
  additional_info: string | null;
  created_at: string;
}

const AdminSection: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        console.log('Attempting to fetch schedules from /api/schedule');
        const response = await fetch('/api/schedule');
        console.log('Fetch response status:', response.status);
        console.log('Fetch response headers:', response.headers);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Fetch error response text:', errorText);
          throw new Error(`Failed to fetch schedules: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched schedules data:', data);

        // Handle case where data might be null or not an array
        if (!Array.isArray(data)) {
          console.warn('Received data is not an array:', data);
          setSchedules([]);
        } else {
          setSchedules(data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching schedules:', err);
        setError(`Failed to fetch schedules: ${(err as Error).message}. Make sure the backend server is running.`);
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const handleLogout = () => {
    // Remove authentication from localStorage
    localStorage.removeItem('isAdminAuthenticated');
    // Redirect to login page
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="admin-section">
        <h2>Admin Section</h2>
        <p>Loading schedules...</p>
        <p className="error-message">If this takes too long, make sure the backend server is running on port 3000.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-section">
        <h2>Admin Section</h2>
        <p className="error-message">{error}</p>
        <p className="error-message">Troubleshooting steps:</p>
        <ul className="error-message">
          <li>Make sure the backend server is running on port 3000</li>
          <li>Check that the database is properly connected</li>
          <li>Verify the API endpoint is accessible at /api/schedule</li>
        </ul>
        <button onClick={handleLogout} className="btn">Logout</button>
      </div>
    );
  }

  return (
    <div className="admin-section">
      <h2>Admin Section</h2>
      <h3>Schedule Requests</h3>
      {schedules.length === 0 ? (
        <p>No schedule requests found.</p>
      ) : (
        <div className="schedule-table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Name12</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td><a href={`/job-estimate/${schedule.id}`} className="schedule-name-link">{schedule.name}</a></td>
                  <td>{schedule.email}</td>
                  <td>{schedule.phone}</td>
                  <td>{schedule.service}</td>
                  <td>{schedule.preferred_date ? new Date(schedule.preferred_date).toLocaleDateString() : 'N/A'}</td>
                  <td>{schedule.preferred_time}</td>
                  <td>{schedule.location}</td>
                  <td>{schedule.created_at ? new Date(schedule.created_at).toLocaleString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button onClick={handleLogout} className="btn">Logout</button>
    </div>
  );
};

export default AdminSection;
