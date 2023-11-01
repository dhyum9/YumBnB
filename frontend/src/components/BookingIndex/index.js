import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserBookingItem from '../UserBookingItem';
import { fetchUserBookings } from '../../store/booking';
import './BookingIndex.css';

const BookingIndex = () => {
  const dispatch = useDispatch();
  const bookingsObj = useSelector(state => state.bookings.user);
  const bookings = Object.values(bookingsObj);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  return (
    <main id='manage-bookings-container'>
      <h1>Manage Bookings</h1>
      {bookings.reverse().map((booking) => {
        return (
          <UserBookingItem key={booking.id} booking={booking}/>
        );
      })}
    </main>
  );
}

export default BookingIndex;
