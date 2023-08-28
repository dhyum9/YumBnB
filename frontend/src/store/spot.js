const LOAD_SPOTS = "spot/loadSpots"
const LOAD_SPOT = "spot/loadSpot"

const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
});

const loadSpot = (spot) => ({
  type: LOAD_SPOT,
  spot
});

export const fetchSpots = () => async dispatch => {
  const res = await fetch(`/api/spots`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpots(data.Spots));
  }
};

export const fetchSpotDetails = (spotId) => async dispatch => {
  const res = await fetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpot(data));
  }
};

const initialState = { allSpots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_SPOTS:
      let allSpots = {};
      action.spots.forEach(spot => {
        allSpots[spot.id] = spot;
      })
      newState = {...state, allSpots};
      return newState;
    case LOAD_SPOT:
      newState = {...state, singleSpot: action.spot};
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
