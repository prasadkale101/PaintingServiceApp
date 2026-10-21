import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const JobEstimate: React.FC = () => {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const [schedule, setSchedule] = useState<ScheduleWithEstimate | null>(null);
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [estimateAmount, setEstimateAmount] = useState<number>(0);
  const [estimateDescription, setEstimateDescription] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScheduleAndEstimate = async () => {
      try {
        if (!scheduleId) {
          setError('No schedule ID provided');
          setLoading(false);
          return;
        }

        // Fetch schedule details
        const scheduleResponse = await fetch(`/api/schedules/${scheduleId}`);
        if (!scheduleResponse.ok) {
          throw new Error(`Failed to fetch schedule: ${scheduleResponse.status}`);
        }
        const scheduleData: Schedule = await scheduleResponse.json();
        setSchedule(scheduleData);

        // Fetch estimate details
        const estimateResponse = await fetch(`/api/estimates/${scheduleId}`);
        if (!estimateResponse.ok) {
          if (estimateResponse.status === 404) {
            // No estimate exists yet
            setEstimate(null);
            setEstimateAmount(0);
            setEstimateDescription('');
          } else {
            throw new Error(`Failed to fetch estimate: ${estimateResponse.status}`);
          }
        } else {
          const estimateData: Estimate = await estimateResponse.json();
          setEstimate(estimateData);
          setEstimateAmount(estimateData.estimateAmount);
          setEstimateDescription(estimateData.briefDescription);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load schedule and estimate data');
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleAndEstimate();
  }, [scheduleId]);

  const handleSave = async () => {
    if (!scheduleId) return;

    try {
      const estimateData = {
        estimateAmount,
        briefDescription: estimateDescription,
      };

      let response;
      if (estimate) {
        // Update existing estimate
        response = await fetch(`/api/estimates/${scheduleId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(estimateData),
        });
      } else {
        // Create new estimate
        response = await fetch('/api/estimates', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...estimateData,
            scheduleId: parseInt(scheduleId),
          }),
        });
      }

      if (!response.ok) {
        throw new Error(`Failed to save estimate: ${response.status}`);
      }

      // Refresh the estimate data
      const estimateResponse = await fetch(`/api/estimates/${scheduleId}`);
      if (estimateResponse.ok) {
        const estimateData: Estimate = await estimateResponse.json();
        setEstimate(estimateData);
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Error saving estimate:', err);
      setError('Failed to save estimate');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!schedule) {
    return <div className="error">Schedule not found</div>;
  }

  return (
    <div className="job-estimate-container">
      <h2>Job Estimate</h2>

      <div className="schedule-details">
        <h3>Schedule Details</h3>
        <div className="detail-row">
          <label>Name:</label>
          <span>{schedule.name}</span>
        </div>
        <div className="detail-row">
          <label>Email:</label>
          <span>{schedule.email}</span>
        </div>
        <div className="detail-row">
          <label>Phone:</label>
          <span>{schedule.phone}</span>
        </div>
        <div className="detail-row">
          <label>Service Type:</label>
          <span>{schedule.service}</span>
        </div>
        <div className="detail-row">
          <label>Address:</label>
          <span>{schedule.location}</span>
        </div>
        <div className="detail-row">
          <label>Notes:</label>
          <span>{schedule.additional_info || 'N/A'}</span>
        </div>
        <div className="detail-row">
          <label>Created At:</label>
          <span>{new Date(schedule.created_at).toLocaleString()}</span>
        </div>
      </div>

      <div className="estimate-details">
        <h3>Estimate Details</h3>

        {isEditing ? (
          <div className="edit-form">
            <div className="form-row">
              <label>Estimate Amount:</label>
              <input
                type="number"
                value={estimateAmount}
                onChange={(e) => setEstimateAmount(Number(e.target.value))}
                className="estimate-input"
              />
            </div>
            <div className="form-row">
              <label>Brief Description:</label>
              <textarea
                value={estimateDescription}
                onChange={(e) => setEstimateDescription(e.target.value)}
                className="estimate-textarea"
              />
            </div>
            <div className="form-actions">
              <button onClick={handleSave} className="save-button">Save</button>
              <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="view-mode">
            <div className="detail-row">
              <label>Estimate Amount:</label>
              <span>{estimate ? `$${estimate.estimateAmount}` : 'No estimate set'}</span>
            </div>
            <div className="detail-row">
              <label>Brief Description:</label>
              <span>{estimate ? estimate.briefDescription : 'No description provided'}</span>
            </div>
            <div className="form-actions">
              <button
                onClick={() => setIsEditing(true)}
                className="edit-button"
                disabled={!scheduleId}
              >
                Edit Estimate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobEstimate;