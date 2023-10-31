import { csrfFetch } from "./csrf";
// import { fetchSpotDetails } from "./spot";

// const LOAD_SPOT_REVIEWS = "review/loadSpotReviews"
const LOAD_USER_BOOKINGS = "booking/loadUserBookings"
// const REMOVE_REVIEW = "review/removeReview"

// const loadSpotReviews = (spotReviews) => ({
//   type: LOAD_SPOT_REVIEWS,
//   spotReviews
// });

const loadUserBookings = (userBookings) => ({
  type: LOAD_USER_BOOKINGS,
  userBookings
});

// const removeReview = (reviewId) => ({
//   type: REMOVE_REVIEW,
//   reviewId
// });

// export const fetchSpotReviews = (spotId) => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadSpotReviews(data.Reviews));
//   }
// };

export const fetchUserBookings = () => async dispatch => {
  const res = await fetch(`/api/bookings/current`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadUserBookings(data.Bookings));
  }
};

export const createBooking = (payload, spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const newBooking = await res.json();
    return newBooking;
  }
};

// export const deleteSpotReview = (reviewId, spotId) => async dispatch => {
//   const res = await csrfFetch(`/api/reviews/${reviewId}`, {
//     method: 'DELETE'
//   });

//   if (res.ok) {
//     dispatch(removeReview(reviewId));
//     await dispatch(fetchSpotDetails(spotId));
//     return reviewId;
//   }
// };

// export const deleteUserReview = (reviewId) => async dispatch => {
//   const res = await csrfFetch(`/api/reviews/${reviewId}`, {
//     method: 'DELETE'
//   });

//   if (res.ok) {
//     dispatch(removeReview(reviewId));
//     return reviewId;
//   }
// };

const initialState = { spot: {}, user: {} };

const bookingsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    // case LOAD_SPOT_REVIEWS:
    //   let spot = {};
    //   action.spotReviews.forEach(spotReview => {
    //     spot[spotReview.id] = spotReview;
    //   })
    //   newState = {...state, spot};
    //   return newState;
      case LOAD_USER_BOOKINGS:
        let user = {};
        action.userBookings.forEach(userBooking => {
          user[userBooking.id] = userBooking;
        })
        newState = {...state, user};
        return newState;
      // case REMOVE_REVIEW:
      //   newState = {...state, spot: {...state.spot}, user: {...state.user}};
      //   let reviewId = action.reviewId;
      //   delete newState.spot[reviewId];
      //   delete newState.user[reviewId];
      //   return newState;
    default:
      return state;
  }
};

export default bookingsReducer;
