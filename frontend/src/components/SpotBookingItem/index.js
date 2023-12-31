import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteBookingModal from "../DeleteBookingModal";
import './SpotBookingItem.css';

const SpotBookingItem = ({booking}) => {

  const convertDate = (date) => {
    const months = {'01': "January", '02': "February", '03': "March", '04': "April", '05': "May", '06': "June", '07': "July", '08': "August", '09': "September", '10': "October", '11': "November", '12': "December"};
    let dateParts = date.split('-');
    let dateMonth = months[dateParts[1]];
    let dateYear = dateParts[0];
    let dateDays = dateParts[2].slice(0, 2);
    return `${dateMonth} ${dateDays}, ${dateYear}`;
  }

  return (
    <li id='spot-booking-item'>
      <div className='spot-booking-item-user-info'>{booking.User.firstName} {booking.User.lastName}</div>
      <div className='spot-booking-item-date'>{convertDate(booking.startDate)} - {convertDate(booking.endDate)}</div>
      <div className='spot-booking-item-button-row'>
          <div id='delete-button'>
            <div id='delete-button-text'>
              <OpenModalMenuItem
                  itemText="Delete"
                  modalComponent={<DeleteBookingModal bookingId={booking.id}/>}
              />
            </div>
          </div>
      </div>
    </li>
  );
}

export default SpotBookingItem;
