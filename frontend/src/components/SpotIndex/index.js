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
          <div>{spot.address}</div>
        );
      })}
    </main>
  );
}

export default SpotIndex;
