import { useSelector, useDispatch } from "react-redux";
import SpotShowImage from "../SpotShowImage";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSpotDetails } from "../../store/spot";
import { fetchSpotReviews } from "../../store/review";
import './SpotShow.css'
import SpotReviewItem from "../SpotReviewItem";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import PostReviewModal from "../PostReviewModal";
import MapContainer from "../Maps";

const SpotShow = () => {
  const dispatch = useDispatch();
  const {spotId} = useParams();
  const spot = useSelector(state => state.spots.singleSpot);
  const reviewsObj = useSelector(state => state.reviews.spot);
  const reviews = Object.values(reviewsObj);
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
    dispatch(fetchSpotReviews(spotId));
  },[dispatch, spotId]);

  if(Object.keys(spot).length === 0) {
    return null;
  }

  const onClick = () => {
    alert("Feature Coming Soon...");
  };

  //Checks if we need a Post-Your-Review button
  let currentUserId;
  let postReviewSwitch = true;
  if(currentUser) {
    currentUserId = currentUser.id;
    reviews.forEach((review) => {
      if (review.User.id === currentUserId) postReviewSwitch = false;
    })
    if(spot.Owner.id === currentUserId) postReviewSwitch = false;
  } else {
    postReviewSwitch = false;
  }

 return (
  <main id='spot-details-container'>
    <h1>{spot.name}</h1>
    <div id='spot-details-second-row'>{spot.city}, {spot.state}, {spot.country}</div>
    <div id="spot-details-third-row">
      <SpotShowImage images={spot.SpotImages}/>
    </div>
    <div id="spot-details-fourth-row">
      <div id='fourth-row-left-col'>
        <div id="host-information">
          Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
        </div>
        <div id='spot-information'>
          {spot.description}
        </div>
      </div>
      <div id='fourth-row-right-col'>
        <div id='square-reserve-container'>
          <div id='fourth-right-first'>
            <div>${spot.price} <span style={{fontSize:"16px", display:"inline-block"}}> night</span></div>
            <div id='review-info'>
              <div style={{display:'flex', alignItems:'center', marginRight:"5px"}}>
                <i className="fa-solid fa-star" style={{marginRight:"3px"}}></i>
                {spot.avgStarRating ? (<div>{Number.parseFloat(spot.avgStarRating).toFixed(2)}</div>) : (<div>New</div>)}
              </div>
              {spot.numReviews > 0 && (
                <>
                  <span>&#183;</span>
                  {spot.numReviews === 1 ? (
                    <div style={{textAlign: "center", marginLeft:"5px"}}>{spot.numReviews} review</div>
                  ) : (
                    <div style={{textAlign: "center", marginLeft:"5px"}}>{spot.numReviews} reviews</div>
                  )}
                </>
              )}
            </div>
          </div>
          <div id='fourth-right-second'>
            <button onClick={onClick}>Reserve</button>
          </div>
        </div>
      </div>
    </div>
    <hr></hr>
    <div className='spot-show-google-map-section'>
      <div className='spot-show-google-map-header'>Where you'll be</div>
      <MapContainer />
    </div>
    <hr></hr>
    {reviews && (
      <section id='review-section'>
      <div id='review-section-header'>
        <div style={{display:'flex', alignItems:'center', marginRight:'12px'}}>
          <i className="fa-solid fa-star" style={{marginRight:"10px"}} ></i>
          {spot.avgStarRating ? (<div>{Number.parseFloat(spot.avgStarRating).toFixed(2)}</div>) : (<div>New</div>)}
        </div>
        {spot.numReviews > 0 && (
                <>
                  <span>&#183;</span>
                  {spot.numReviews === 1 ? (
                    <div style={{textAlign: "center", marginLeft:"12px"}}>{spot.numReviews} review</div>
                  ) : (
                    <div style={{textAlign: "center", marginLeft:"12px"}}>{spot.numReviews} reviews</div>
                  )}
                </>
              )}
      </div>
      { postReviewSwitch && (
        <div id='post-your-review-button'>
          <div id='post-your-review-button-text'>
            <OpenModalMenuItem
                itemText="Post Your Review"
                modalComponent={<PostReviewModal spotId={spot.id}/>}
            />
          </div>
        </div>
      )}
      {(postReviewSwitch && spot.numReviews === 0) && (
        <div style={{marginTop:'15px'}}>Be the first to post a review!</div>
      )}
        {reviews.reverse().map((review) => {
          return (
            <SpotReviewItem key={review.id} currentUserId={currentUserId} review={review} spotId={spot.id}/>
          );
        })}
      </section>
    )}
  </main>
 );
}

export default SpotShow;
