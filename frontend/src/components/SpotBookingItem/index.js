import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "../DeleteReviewModal";
import { useHistory } from "react-router-dom";
import './SpotBookingItem.css';

const SpotBookingItem = ({booking}) => {
  const history = useHistory();

  const convertDate = (date) => {
    const months = {'01': "January", '02': "February", '03': "March", '04': "April", '05': "May", '06': "June", '07': "July", '08': "August", '09': "September", '10': "October", '11': "November", '12': "December"};
    let dateParts = date.split('-');
    let dateMonth = months[dateParts[1]];
    let dateYear = dateParts[0];
    let dateDays = dateParts[2].slice(0, 2);
    return `${dateMonth} ${dateDays}, ${dateYear}`;
  }

  return (
    <div id='user-booking-item' style={{margin:"20px 0"}}>
      <div className='user-booking-item-info'>
        {booking.startDate} - {booking.endDate}
        {/* <div className='user-booking-item-spot-name' onClick={toSpotDetails}>{booking.Spot.name}</div>
        <div className='user-booking-item-owner'>Hosted by {booking.Spot.Owner.firstName} {booking.Spot.Owner.lastName}</div>
        <div className='user-booking-item-date'>{convertDate(booking.startDate)} - {convertDate(booking.endDate)}</div> */}
      </div>
      {/* <div className='fourth-row' style={{display:'flex', justifyContent:'start', margin: '10px -5px'}}>
          <button onClick={onClick} id='update-button'>
            Update
          </button>
          <div id='delete-button'>
            <div id='delete-button-text'>
              <OpenModalMenuItem
                  itemText="Delete"
                  modalComponent={<DeleteReviewModal reviewId={review.id} type={"User"}/>}
              />
            </div>
          </div>
        </div> */}
    </div>
  );
}

export default SpotBookingItem;
