import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteBookingModal from "../DeleteBookingModal";
import './UserBookingItem.css';
import { useHistory } from "react-router-dom";

const UserBookingItem = ({booking}) => {
  const history = useHistory();

  const convertDate = (date) => {
    const months = {'01': "January", '02': "February", '03': "March", '04': "April", '05': "May", '06': "June", '07': "July", '08': "August", '09': "September", '10': "October", '11': "November", '12': "December"};
    let dateParts = date.split('-');
    let dateMonth = months[dateParts[1]];
    let dateYear = dateParts[0];
    let dateDays = dateParts[2].slice(0, 2);
    return `${dateMonth} ${dateDays}, ${dateYear}`;
  }

  const toSpotDetails = () => {
    history.push(`/spots/${booking.spotId}`)
  }

  const toEditBooking = () => {
    history.push(`/spot/${booking.spotId}/bookings/${booking.id}/edit`);
  }

  return (
    <div id='user-booking-item' style={{margin:"20px 0"}}>
      <img className='user-booking-item-img' src={booking.Spot.previewImage} onClick={toSpotDetails}></img>
      <div className='user-booking-item-info'>
        <div className='user-booking-item-spot-name' onClick={toSpotDetails}>{booking.Spot.name}</div>
        <div className='user-booking-item-owner'>Hosted by {booking.Spot.Owner.firstName} {booking.Spot.Owner.lastName}</div>
        <div className='user-booking-item-date'>{convertDate(booking.startDate)} - {convertDate(booking.endDate)}</div>
        <div className='user-booking-item-button-row'>
            <button onClick={toEditBooking} id='update-button'>
              Update
            </button>
            <div id='delete-button'>
              <div id='delete-button-text'>
                <OpenModalMenuItem
                    itemText="Delete"
                    modalComponent={<DeleteBookingModal bookingId={booking.id}/>}
                />
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default UserBookingItem;
