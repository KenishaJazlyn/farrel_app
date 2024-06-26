import React, { useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Header from '@/components/Header';
import ReviewList, { Review } from '@/components/review/ReviewList';
import '@/app/globals.css';

const API_URL = 'http://localhost:8080/api/reviewProduct'; // Ganti dengan URL API Anda

interface ReviewPageProps {
  reviews: Review[];
  idProduct: string;
}

const ReviewPage: React.FC<ReviewPageProps> = ({ reviews, idProduct }) => {
  const [reviewsState, setReviews] = useState<Review[]>(reviews); // Use a clearer state variable name

  return (
    <div>
      <ReviewList reviews={reviewsState}  />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ReviewPageProps> = async (context) => {
  // Use context to extract idProduct from the URL path or query string
  const { params } = context;
  const idProduct = params?.idProduct as string; // Ensure you have idProduct as a part of your dynamic route [idProduct].tsx

  try {
    const response = await fetch(`${API_URL}/${idProduct}`);
    const reviews: Review[] = await response.json();
    return {
      props: {
        reviews,
        idProduct,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        reviews: [],
        idProduct,
      },
    };
  }
};

export default ReviewPage;
