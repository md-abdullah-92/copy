import React, { useState } from 'react';
import { FaStar, FaUser } from 'react-icons/fa';
import { useAddComment } from '@/hooks/useAddComment';
interface Comment {
  id: number;
  user: string;
  rating: number;
  text: string;
  date: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState<string>('');
  const [rating, setRating] = useState<number>(5);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleRatingChange = (rating: number) => {
    setRating(rating);
  };

  const handleSubmit = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(), // Unique ID for the comment
        user: 'Anonymous',
        rating: rating,
        text: newComment,
        date: new Date().toLocaleDateString(),
      };

      onAddComment(comment);
      setNewComment('');
      setRating(5);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

      {/* Display Existing Comments */}
      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-4">
            <FaUser className="text-gray-500" />
            <div>
              <div className="flex items-center mb-1">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-yellow-500 ${index < comment.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-gray-600 text-sm ml-2">{comment.date}</span>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Comment */}
      <div>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write your review..."
          className="w-full p-2 border rounded-md mb-4"
        />
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
              onClick={() => handleRatingChange(index + 1)}
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
