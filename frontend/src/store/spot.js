import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spot/loadSpots"
const LOAD_SPOT = "spot/loadSpot"
const ADD_SPOT = "spot/addSpot"
const REMOVE_SPOT = "spot/removeSpot"

const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
});

const loadSpot = (spot) => ({
  type: LOAD_SPOT,
  spot
});

const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot
});

const removeSpot = (spotId) => ({
  type: REMOVE_SPOT,
  spotId
});

export const fetchSpots = () => async dispatch => {
  const res = await fetch(`/api/spots`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpots(data.Spots));
  }
};

export const fetchUserSpots = () => async dispatch => {
  const res = await fetch(`/api/spots/current`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpots(data.Spots));
  }
};

export const fetchSpotDetails = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpot(data));
  }
};

export const createSpot = (payload) => async dispatch => {
  const res = await csrfFetch(`/api/spots`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const newSpot = await res.json();
    dispatch(addSpot(newSpot));
    return newSpot;
  }
};

export const createSpotImage = (payload, spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const newSpotImage = await res.json();
    return newSpotImage;
  }
};

export const updateSpot = (payload, spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const updatedSpot = await res.json();
    dispatch(addSpot(updatedSpot));
    return updatedSpot;
  }
};

export const deleteSpot = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeSpot(spotId));
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
    case ADD_SPOT:
      newState = {...state, allSpots: {...state.allSpots}};
      newState.allSpots[action.spot.id] = action.spot;
      return newState;
    case REMOVE_SPOT:
      newState = {...state, allSpots: {...state.allSpots}};
      let spotId = action.spotId;
      delete newState.allSpots[spotId];
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
