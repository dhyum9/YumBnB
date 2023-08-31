import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReview } from "../../store/review";
import './DeleteReview.css'

function DeleteReviewModal({reviewId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();


  const onClickDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReview(reviewId)).then(closeModal);
  }

  const onClickCancel = (e) => {
    e.preventDefault();
    closeModal();
  }

  return (
    <div id='delete-button-modal'>
      <h1 style={{margin:'10px'}}>Confirm Delete</h1>
      <h3 style={{margin: '0px'}}>Are you sure you want to remove this review?</h3>
      <div id='buttons-row'>
        <button id='yes-button' onClick={onClickDelete}>Yes(Delete Review)</button>
        <button id='no-button' onClick={onClickCancel}>No (Keep Review)</button>
      </div>
    </div>
  );
}

export default DeleteReviewModal;
