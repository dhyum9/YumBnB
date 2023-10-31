import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "../DeleteReviewModal";

const UserBookingItem = ({booking}) => {

  const convertDate = (date) => {
    const months = {'01': "January", '02': "February", '03': "March", '04': "April", '05': "May", '06': "June", '07': "July", '08': "August", '09': "September", '10': "October", '11': "November", '12': "December"};
    let dateParts = date.split('-');
    let dateMonth = months[dateParts[1]];
    let dateYear = dateParts[0];
    let dateDays = dateParts[2].slice(0, 2);
    return `${dateMonth} ${dateDays}, ${dateYear}`;
  }

  return (
    <div id='booking-item' style={{margin:"20px 0"}}>
      <img src={booking.Spot.previewImage}></img>
      <div>{booking.Spot.name}</div>
      <div style={{color:'grey'}}>{convertDate(booking.startDate)} - {convertDate(booking.endDate)}</div>
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
