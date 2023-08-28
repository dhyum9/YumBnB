const LOAD_SPOTS = "spot/loadSpots"

const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
});

export const fetchSpots = () => async dispatch => {
  const response = await fetch(`/api/spots`);

  if (response.ok) {
    const spots = await response.json();
    dispatch(loadSpots(spots));
  }
};

const initialState = { allSpots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_SPOTS:
      const allSpots = {};
      action.spots.forEach(spot => {
        newState[spot.id] = spot;
      })
      newState = {...state, allSpots};
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
