import './spotIndexItem.css'

const SpotIndexItem = ({ spot }) => {
  return (
    <div id='spot-card'>
      <img src={spot.previewImage} alt='Preview SpotImage goes here'></img>
      <div className='second-row'>
        <div>{spot.city}, {spot.state}</div>
        <div>
          <i class="fa-solid fa-star"></i>
          {spot.avgRating}
        </div>
      </div>
      <div className='third-row'>
        ${spot.price} night
      </div>
    </div>
  );
}

export default SpotIndexItem;
