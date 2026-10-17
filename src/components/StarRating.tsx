import React from 'react';

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          style={{
            cursor: 'pointer',
            color: star <= rating ? '#ffc107' : '#e4e5e9',
            fontSize: '1.5rem',
          }}
          onClick={() => setRating(star)}
          aria-label={`Set rating ${star}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
