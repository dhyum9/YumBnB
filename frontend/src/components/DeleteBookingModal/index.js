import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteBooking } from "../../store/booking";
import './DeleteBookingModal.css'

function DeleteBookingModal({bookingId}) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const onClickDelete = async (e) => {
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

  const onClickCancel = (e) => {
    e.preventDefault();
    closeModal();
  }

  return (
    <div id='booking-delete-button-modal'>
      <h1 style={{margin:'10px'}}>Confirm Delete</h1>
      <div style={{margin: '0px 0px 10px 0px'}}>Are you sure you want to delete this booking and cancel your trip?</div>
      <div>{errors.message && (<p>{errors.message}</p>)}</div>
      <button id='booking-delete-yes-button' onClick={onClickDelete}>Yes (Delete Booking)</button>
      <button id='booking-delete-no-button' onClick={onClickCancel}>No (Keep Booking)</button>
    </div>
  );
}

export default DeleteBookingModal;
