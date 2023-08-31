import { useSelector, useDispatch } from "react-redux";
import SpotShowImage from "../SpotShowImage";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSpotDetails } from "../../store/spot";
import { fetchSpotReviews } from "../../store/review";
import './SpotShow.css'
import SpotReviewItem from "../SpotReviewItem";

const SpotShow = () => {
  const dispatch = useDispatch();
  const {spotId} = useParams();
  const spot = useSelector(state => state.spots.singleSpot);
  const reviewsObj = useSelector(state => state.reviews.spot);
  const reviews = Object.values(reviewsObj);

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
                <i class="fa-solid fa-star"></i>
                <div>{spot.avgStarRating}</div>
              </div>
              <span>&#183;</span>
              <div style={{textAlign: "center", marginLeft:"5px"}}>{spot.numReviews} reviews</div>
            </div>
          </div>
          <div id='fourth-right-second'>
            <button onClick={onClick}>Reserve</button>
          </div>
        </div>
      </div>
    </div>
    <hr></hr>
    {reviews && (
      <section id='review-section'>
      <div id='review-section-header'>
        <div style={{display:'flex', alignItems:'center', marginRight:'12px'}}>
          <i class="fa-solid fa-star"></i>
          <div>{spot.avgStarRating}</div>
        </div>
        <span>&#183;</span>
        <div style={{textAlign: "center", marginLeft:'12px'}}>{spot.numReviews} reviews</div>
      </div>
        {reviews.map((review) => {
          return (
            <SpotReviewItem review={review}/>
          );
        })}
      </section>
    )}
  </main>
 );
}

export default SpotShow;
