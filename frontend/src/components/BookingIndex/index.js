import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserReviewItem from '../UserReviewItem';
import { fetchUserReviews } from '../../store/review';
import './BookingIndex.css';

const BookingIndex = () => {
  const dispatch = useDispatch();
  const reviewsObj = useSelector(state => state.reviews.user);
  const reviews = Object.values(reviewsObj);

  useEffect(() => {
    dispatch(fetchUserReviews());
  }, [dispatch]);

  return (
    <main id='manage-bookings-container'>
      <h1>Manage Bookings</h1>
      {reviews.reverse().map((review) => {
        return (
          <UserReviewItem review={review}/>
        );
      })}
    </main>
  );
}

export default BookingIndex;
