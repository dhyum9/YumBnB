import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpots, fetchUserSpots } from '../../store/spot';
import './spotIndex.css'
import SpotIndexItem from '../SpotIndexItem';
import { NavLink } from 'react-router-dom';

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
  }, [dispatch, type]);

  return (
    <div id='spots-index'>
      {type==="usersOnly" && (
        <>
          <h1 id="manage-spots-heading">Manage Your Spots</h1>
          {spots.length === 0 && (
            <NavLink exact={true} to="/spots">
              <button id='manage-spots-create-button'>Create a New Spot</button>
            </NavLink>
          )}
        </>
      )}
      <main id='spots-grid'>
        {spots.reverse().map((spot) => {
          return (
            <SpotIndexItem key={spot.id} spot={spot} type={type}/>
          );
        })}
      </main>
    </div>
  );
}

export default SpotIndex;
