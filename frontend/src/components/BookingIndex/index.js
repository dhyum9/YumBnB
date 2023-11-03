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

  let futureBookings = [];
  let pastBookings = [];

  let now = new Date();

  for (let booking of bookings){
    const startDate = new Date(`${booking.startDate}T00:00`);
    if (startDate <= now) {
      pastBookings.push(booking);
    } else {
      futureBookings.push(booking);
    }
  }

  console.log("PAST BOOKINGS: ", pastBookings);
  console.log("FUTURE BOOKINGS: ", futureBookings);

  return (
    <main id='manage-bookings-container'>
      <h1>Manage Bookings</h1>
      {futureBookings.reverse().map((booking) => {
        return (
          <UserBookingItem key={booking.id} booking={booking}/>
        );
      })}
      <h3>Where you've been</h3>
      {pastBookings.reverse().map((booking) => {
        return (
          <UserBookingItem key={booking.id} booking={booking}/>
        );
      })}
    </main>
  );
}

export default BookingIndex;
