import './spotIndexItem.css'
import { NavLink } from 'react-router-dom';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteSpotModal from '../DeleteSpotModal';


const SpotIndexItem = ({ spot, type }) => {

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
          <NavLink to={`/spots/${spot.id}/edit`}>
            <button id='update-button'>
              Update
            </button>
          </NavLink>
          <div id='delete-button'>
            <div id='delete-button-text'>
              <OpenModalMenuItem
                  itemText="Delete"
                  modalComponent={<DeleteSpotModal spotId={spot.id}/>}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpotIndexItem;
