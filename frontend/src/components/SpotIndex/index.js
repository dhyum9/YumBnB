import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpots, fetchUserSpots } from '../../store/spot';
import './spotIndex.css'
import SpotIndexItem from '../SpotIndexItem';

const SpotIndex = ({type}) => {
  const dispatch = useDispatch();
  const spotsObj = useSelector(state => state.spots.allSpots);
  const spots = Object.values(spotsObj);

  useEffect(() => {
    if (type==="all"){
      dispatch(fetchSpots());
    } else {
      dispatch(fetchUserSpots());
    }
  }, [dispatch, type, spots]);

  if (spots.length === 0 || !spots) return null;
  return (
    <main id='spots-grid'>
      {spots.map((spot) => {
        return (
          <SpotIndexItem key={spot.id} spot={spot} type={type}/>
        );
      })}
    </main>
  );
}

export default SpotIndex;
