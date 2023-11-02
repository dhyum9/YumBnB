import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotReview, deleteUserReview } from "../../store/review";
import './DeleteBookingModal.css'
import { deleteBooking } from "../../store/booking";

function DeleteBookingModal({bookingId, type}) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  let onClickDelete;

  if(type==="Spot"){
    onClickDelete = (e) => {
      e.preventDefault();
      // dispatch(deleteSpotReview(reviewId, spotId)).then(closeModal());
    }
  } else if (type==="User"){
    onClickDelete = async (e) => {
      e.preventDefault();
      const bookingDeleted = await dispatch(deleteBooking(bookingId))
      .catch(async(res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors(data);
        }
      });
      if (bookingDeleted) closeModal();
    }
  }

  const onClickCancel = (e) => {
    e.preventDefault();
    closeModal();
  }

  return (
    <div id='booking-delete-button-modal'>
      <h1 style={{margin:'10px'}}>Confirm Delete</h1>
      <h3 style={{margin: '0px 0px 10px 0px'}}>Are you sure you want to delete this booking?</h3>
      <div>{errors.message && (<p>{errors.message}</p>)}</div>
      <button id='booking-delete-yes-button' onClick={onClickDelete}>Delete</button>
      <button id='booking-delete-no-button' onClick={onClickCancel}>Cancel</button>
    </div>
  );
}

export default DeleteBookingModal;
