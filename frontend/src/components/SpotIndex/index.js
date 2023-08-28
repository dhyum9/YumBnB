import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpots } from '../../store/spot';
import './spotIndex.css'
import SpotIndexItem from '../SpotIndexItem';

const SpotIndex = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector(state => state.spots.allSpots);
  const spots = Object.values(spotsObj);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <main id='spots-grid'>
      {spots.map((spot) => {
        return (
          <SpotIndexItem key={spot.id} spot={spot}/>
        );
      })}
    </main>
  );
}

export default SpotIndex;
