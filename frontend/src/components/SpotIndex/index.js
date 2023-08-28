import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpots } from '../../store/spot';

const SpotIndex = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector(state => state.spots.allSpots);
  const spots = Object.values(spotsObj);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch])

  return (
    <main>
      {spots.map((spot) => {
        return (
          <div>
            <img src={spot.previewImage}></img>
            <div>
              <div>{spot.city}, {spot.state}</div>
              <div>
                <i class="fa-solid fa-star"></i>
                {spot.avgRating}
              </div>
            </div>
            <div>
              ${spot.price} night
            </div>
          </div>
        );
      })}
    </main>
  );
}

export default SpotIndex;
