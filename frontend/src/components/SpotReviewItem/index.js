import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

const SpotReviewItem = ({review, currentUserId, spotId}) => {
  const months = {'01': "January", '02': "February", '03': "March", '04': "April", '05': "May", '06': "June", '07': "July", '08': "August", '09': "September", '10': "October", '11': "November", '12': "December"};
  let reviewDateParts = review.createdAt.split('-');
  let reviewMonth = months[reviewDateParts[1]];
  let reviewYear = reviewDateParts[0];

  return (
    <div id='review-item' style={{margin:"20px 0"}}>
      <div>{review.User.firstName}</div>
      <div style={{color:'grey'}}>{reviewMonth} {reviewYear}</div>
      <div style={{fontSize:"14px", marginBottom:"10px", overflowWrap:"break-word"}}>{review.review}</div>
      {review.User.id===currentUserId && (
        <div id='delete-button'>
          <div id='delete-button-text'>
            <OpenModalMenuItem
                itemText="Delete"
                modalComponent={<DeleteReviewModal spotId={spotId} reviewId={review.id} type={"Spot"}/>}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SpotReviewItem;
