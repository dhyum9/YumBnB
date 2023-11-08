import { csrfFetch } from "./csrf";
// import { fetchSpotDetails } from "./spot";

const LOAD_SPOT_BOOKINGS = "booking/loadSpotBookings"
const LOAD_USER_BOOKINGS = "booking/loadUserBookings"
const LOAD_BOOKING = "booking/loadBooking"
const REMOVE_BOOKING = "booking/removeBooking"

const loadSpotBookings = (spotBookings) => ({
  type: LOAD_SPOT_BOOKINGS,
  spotBookings
});

const loadUserBookings = (userBookings) => ({
  type: LOAD_USER_BOOKINGS,
  userBookings
});

const loadBooking = (booking) => ({
  type: LOAD_BOOKING,
  booking
});

const removeBooking = (bookingId) => ({
  type: REMOVE_BOOKING,
  bookingId
});

export const fetchSpotBookings = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpotBookings(data.Bookings));
  }
};

export const fetchUserBookings = () => async dispatch => {
  const res = await fetch(`/api/bookings/current`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadUserBookings(data.Bookings));
  }
};

export const fetchBookingDetails = (bookingId) => async dispatch => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadBooking(data));
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

export const updateBooking = (payload, bookingId) => async dispatch => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const updatedBooking = await res.json();
    return updatedBooking;
  }
};

export const deleteBooking = (bookingId) => async dispatch => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeBooking(bookingId));
    // await dispatch(fetchSpotDetails(spotId));
    return bookingId;
  }
};

// export const deleteUserReview = (reviewId) => async dispatch => {
//   const res = await csrfFetch(`/api/reviews/${reviewId}`, {
//     method: 'DELETE'
//   });

//   if (res.ok) {
//     dispatch(removeReview(reviewId));
//     return reviewId;
//   }
// };

const initialState = { spot: {}, user: {}, singleBooking: {} };

const bookingsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_SPOT_BOOKINGS:
      let spot = {};
      action.spotBookings.forEach(spotBooking => {
        spot[spotBooking.id] = spotBooking;
      })
      newState = {...state, spot};
      return newState;
    case LOAD_USER_BOOKINGS:
      let user = {};
      action.userBookings.forEach(userBooking => {
        user[userBooking.id] = userBooking;
      })
      newState = {...state, user};
      return newState;
    case LOAD_BOOKING:
      newState = {...state, singleBooking: action.booking};
      return newState;
    case REMOVE_BOOKING:
      newState = {...state, spot: {...state.spot}, user: {...state.user}};
      let bookingId = action.bookingId;
      delete newState.spot[bookingId];
      delete newState.user[bookingId];
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;
