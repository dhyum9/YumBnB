import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserBookingItem from '../UserBookingItem';
import { fetchUserBookings } from '../../store/booking';
import './BookingIndex.css';
import { useHistory } from 'react-router-dom';

const BookingIndex = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const toHome = () => {
    history.push("/");
  }

  return (
    <main id='manage-bookings-container'>
      <h1>Manage Bookings</h1>
      {futureBookings.length === 0 && (
        <div className='no-bookings-banner'>
          <div className='no-bookings-banner-text'>
            <div className='no-bookings-banner-heading'>
              No trips booked...yet!
            </div>
            <div className='no-bookings-banner-subheading'>
              Time to dust off your bags and start planning your next adventure.
            </div>
            <button onClick={toHome} className='no-bookings-banner-button'>
              Start searching
            </button>
          </div>
          <img className='no-bookings-banner-image' src='https://a0.muscache.com/im/pictures/d727f355-3f10-44b5-9750-d1efca2438fc.jpg'></img>
        </div>
      )}
      {futureBookings.reverse().map((booking) => {
        return (
          <UserBookingItem key={booking.id} booking={booking} type={'future'}/>
        );
      })}
      <h3>Where you've been</h3>
      {pastBookings.reverse().map((booking) => {
        return (
          <UserBookingItem key={booking.id} booking={booking} type={'past'}/>
        );
      })}
    </main>
  );
}

export default BookingIndex;
