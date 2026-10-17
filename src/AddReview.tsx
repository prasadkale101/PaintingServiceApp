import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from './components/StarRating';

const AddReview: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || rating === 0 || !comment) {
      setError('Please fill in all fields and select a rating.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, comment }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit review');
      }

      // Redirect to the reviews page after successful submission
      navigate('/reviews');
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting the review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-review-page">
      <h2>Add a Review</h2>
      <form onSubmit={handleSubmit} className="add-review-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Rating *</label>
          <StarRating rating={rating} setRating={setRating} />
        </div>

        <div className="form-group">
          <label htmlFor="comment">Comment *</label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Save Review'}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
