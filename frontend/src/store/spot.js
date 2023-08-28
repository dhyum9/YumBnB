const LOAD_SPOTS = "spot/loadSpots"

const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
});

export const fetchSpots = () => async dispatch => {
  const res = await fetch(`/api/spots`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpots(data.Spots));
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
    default:
      return state;
  }
};

export default spotsReducer;
