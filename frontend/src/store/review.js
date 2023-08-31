import { csrfFetch } from "./csrf";

const LOAD_SPOT_REVIEWS = "spot/loadSpotReviews"

const loadSpotReviews = (spotReviews) => ({
  type: LOAD_SPOT_REVIEWS,
  spotReviews
});

export const fetchSpotReviews = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpotReviews(data.Reviews));
  }
};

const initialState = { spot: {}, user: {} };

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_SPOT_REVIEWS:
      let spot = {};
      action.spotReviews.forEach(spotReview => {
        spot[spotReview.id] = spotReview;
      })
      newState = {...state, spot};
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
