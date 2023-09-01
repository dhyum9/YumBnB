import { useSelector } from "react-redux";
import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

const SpotReviewItem = ({review}) => {
  const months = {'01': "January", '02': "February", '03': "March", '04': "April", '05': "May", '06': "June", '07': "July", '08': "August", '09': "September", '10': "October", '11': "November", '12': "December"};
  let reviewDateParts = review.createdAt.split('-');
  let reviewMonth = months[reviewDateParts[1]];
  let reviewYear = reviewDateParts[0];
  let currentUserId = useSelector(state => state.session.user.id)

  return (
    <div id='review-item' style={{margin:"20px 0"}}>
      <div>{review.User.firstName}</div>
      <div style={{color:'grey'}}>{reviewMonth} {reviewYear}</div>
      <div style={{fontSize:"14px", marginBottom:"10px"}}>{review.review}</div>
      {review.User.id===currentUserId && (
        <div id='delete-button'>
          <div id='delete-button-text'>
            <OpenModalMenuItem
                itemText="Delete"
                modalComponent={<DeleteReviewModal reviewId={review.id}/>}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SpotReviewItem;
