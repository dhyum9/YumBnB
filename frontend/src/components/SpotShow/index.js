import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpotDetails } from "../../store/spot";
import { useParams } from "react-router-dom";

const SpotShow = () => {
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots.singleSpot);
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
  }, [dispatch, spotId]);

 return (
  <h1>{spot.id}</h1>
 );
}

export default SpotShow;
