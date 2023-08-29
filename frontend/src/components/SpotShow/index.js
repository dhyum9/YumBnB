import { useSelector, useDispatch } from "react-redux";
import SpotShowImage from "../SpotShowImage";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSpotDetails } from "../../store/spot";

const SpotShow = () => {
  const dispatch = useDispatch();
  const {spotId} = useParams();
  const spot = useSelector(state => state.spots.singleSpot);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId))
  },[dispatch, spotId]);

  if(Object.keys(spot).length === 0) {
    return null;
  }

 return (
  <div>
    <h1>{spot.name}</h1>
    <div>{spot.city}, {spot.state}, {spot.country}</div>
    <div>
      Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
    </div>
    <div id="images-grid">
      {spot.SpotImages.map((spotImage) => {
        return (
          <SpotShowImage url={spotImage.url} key={spotImage.id}/>
        );
      })}
    </div>
  </div>
 );
}

export default SpotShow;
