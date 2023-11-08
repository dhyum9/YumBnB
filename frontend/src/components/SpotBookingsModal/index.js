import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpotBookings } from '../../store/booking';
import SpotBookingItem from '../SpotBookingItem';
import './SpotBookingsModal.css';

const SpotBookingsModal = ({ spotId }) => {
  const dispatch = useDispatch();
  const bookingsObj = useSelector(state => state.bookings.spot);
  const spotBookings = Object.values(bookingsObj);

  useEffect(() => {
    dispatch(fetchSpotBookings(spotId));
  },[dispatch, spotId]);

  return (
    <main id='spot-bookings-modal-container'>
      <h1 id='spot-bookings-modal-header'>Upcoming Bookings</h1>
      {spotBookings.length > 0 ?
        <ul>
          {spotBookings.reverse().map((booking) => {
            return (
              <SpotBookingItem key={booking.id} booking={booking}/>
            );
          })}
        </ul> :
        <div id='spot-bookings-no-bookings'>No bookings have been made...yet!</div>
      }
    </main>
  );
}

export default SpotBookingsModal;
