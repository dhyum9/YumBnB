import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "../DeleteReviewModal";

const UserBookingItem = ({booking}) => {
  const months = {'01': "January", '02': "February", '03': "March", '04': "April", '05': "May", '06': "June", '07': "July", '08': "August", '09': "September", '10': "October", '11': "November", '12': "December"};
  let bookingDateParts = booking.createdAt.split('-');
  let bookingMonth = months[bookingDateParts[1]];
  let bookingYear = bookingDateParts[0];

  const onClick = () => {
    alert("Feature Coming Soon...");
  };

  return (
    <div id='booking-item' style={{margin:"20px 0"}}>
      <div>{booking.Spot.name}</div>
      <div style={{color:'grey'}}>{bookingMonth} {bookingYear}</div>
      {/* <div style={{fontSize:"14px", overflowWrap:"break-word"}}>{review.review}</div> */}
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

export default UserBookingItem;
