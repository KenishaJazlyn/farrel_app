import React, { useState } from 'react';
import { useRouter } from 'next/router';
import '@/styles/globals.css';

export interface Review {
    reviewId: string;
    userId: string;
    productId: string;
    review: string;
    rating: number;
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const router = useRouter();
  const [currentReviews, setReviews] = useState<Review[]>(reviews);

  const deleteReview = async (reviewId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/delReview/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        console.log('Review berhasil dihapus');
        setReviews(prevReviews => prevReviews.filter(review => review.reviewId !== reviewId));
      } else {
        console.error('Gagal menghapus review:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const editReview = (reviewId: string) => {
    // Redirect to edit page or open edit modal
    router.push(`/editReview/${reviewId}`);
  };

  return (
    <div className="py-12 container mx-auto">
      <h1 className="text-2xl font-bold text-center">Product Reviews</h1>
      {currentReviews.map((review: Review) => (
        <div key={review.reviewId} className="mt-4 bg-white shadow-lg rounded-lg p-4 relative">
          <div className="absolute top-2 right-2 flex">
            <button onClick={() => router.push(`/review/EditReviewPage?id=${review.reviewId}`)} className="p-1 mr-2 hover:bg-gray-200 rounded">
              <svg className="w-6 h-6" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 114.95 0 2.5 2.5 0 010 4.95L12 21H3v-9l10.607-10.607z"></path>
              </svg>
            </button>
            <button onClick={() => deleteReview(review.reviewId)} className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-6 h-6" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
          <h5 className="text-md font-bold">{review.userId}</h5>
          <div className="text-yellow-500">
            {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
          </div>
          <p className="text-gray-600">{review.review}</p>
        </div>
      ))}
    </div>
  );
};  

export default ReviewList;
