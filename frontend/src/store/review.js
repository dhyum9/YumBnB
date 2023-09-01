import { csrfFetch } from "./csrf";

const LOAD_SPOT_REVIEWS = "review/loadSpotReviews"
const LOAD_USER_REVIEWS = "review/loadUserReviews"
const REMOVE_REVIEW = "review/removeReview"

const loadSpotReviews = (spotReviews) => ({
  type: LOAD_SPOT_REVIEWS,
  spotReviews
});

const loadUserReviews = (userReviews) => ({
  type: LOAD_USER_REVIEWS,
  userReviews
});

const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId
});

export const fetchSpotReviews = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpotReviews(data.Reviews));
  }
};

export const fetchUserReviews = () => async dispatch => {
  const res = await fetch(`/api/reviews/current`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadUserReviews(data.Reviews));
  }
};

export const deleteReview = (reviewId) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeReview(reviewId));
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
      case LOAD_USER_REVIEWS:
        let user = {};
        action.userReviews.forEach(userReview => {
          user[userReview.id] = userReview;
        })
        newState = {...state, user};
        return newState;
      case REMOVE_REVIEW:
        newState = {...state, spot: {...state.spot}, user: {...state.user}};
        let reviewId = action.reviewId;
        delete newState.spot[reviewId];
        delete newState.user[reviewId];
        return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
