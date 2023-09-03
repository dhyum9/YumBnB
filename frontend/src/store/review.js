import { csrfFetch } from "./csrf";
import { fetchSpotDetails } from "./spot";

const LOAD_SPOT_REVIEWS = "review/loadSpotReviews"
const LOAD_USER_REVIEWS = "review/loadUserReviews"
// const ADD_REVIEW = "review/addReview"
const REMOVE_REVIEW = "review/removeReview"

const loadSpotReviews = (spotReviews) => ({
  type: LOAD_SPOT_REVIEWS,
  spotReviews
});

const loadUserReviews = (userReviews) => ({
  type: LOAD_USER_REVIEWS,
  userReviews
});

// const addReview = (review) => ({
//   type: ADD_REVIEW,
//   review
// });

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

export const createReview = (payload, spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const newReview = await res.json();
    // await dispatch(addReview(newReview));
    dispatch(fetchSpotReviews(spotId));
    return newReview;
  }
};

export const deleteSpotReview = (reviewId, spotId) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeReview(reviewId));
    await dispatch(fetchSpotDetails(spotId));
    return reviewId;
  }
};

export const deleteUserReview = (reviewId) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeReview(reviewId));
    return reviewId;
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
      // case ADD_REVIEW:
      //   newState = {...state, spot: {...state.spot}, user: {...state.user}};
      //   newState.spot[action.review.id] = action.review;
      //   newState.user[action.review.id] = action.review;
      //   return newState;
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
