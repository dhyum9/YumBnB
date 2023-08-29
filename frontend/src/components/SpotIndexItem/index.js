import { useDispatch } from 'react-redux';
import './spotIndexItem.css'
import { NavLink } from 'react-router-dom';
import { deleteSpot, fetchUserSpots } from '../../store/spot';

const SpotIndexItem = ({ spot, type }) => {
  const dispatch = useDispatch();

  const onClickDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spot.id));
  }

  return (
    <div id='spot-card'>
      <NavLink to={`/spots/${spot.id}`} exact={true}>
        <div>
          <img src={spot.previewImage} alt='Preview SpotImage goes here'></img>
          <div className='second-row'>
            <div>{spot.city}, {spot.state}</div>
            <div>
              <i className="fa-solid fa-star"></i>
              {spot.avgRating}
            </div>
          </div>
          <div className='third-row'>
            ${spot.price} night
          </div>
        </div>
      </NavLink>
      {type==="usersOnly" && (
        <div className='fourth-row'>
          <button id='update-button'>
            Update
          </button>
          <button onClick={onClickDelete} id='delete-button'>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default SpotIndexItem;
