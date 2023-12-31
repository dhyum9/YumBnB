import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotReview, deleteUserReview } from "../../store/review";
import './DeleteReview.css'

function DeleteReviewModal({reviewId, spotId, type}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  let onClickDelete;
  if(type==="Spot"){
    onClickDelete = (e) => {
      e.preventDefault();
      dispatch(deleteSpotReview(reviewId, spotId)).then(closeModal());
    }
  } else if (type==="User"){
    onClickDelete = (e) => {
      e.preventDefault();
      dispatch(deleteUserReview(reviewId)).then(closeModal());
    }
  }

  const onClickCancel = (e) => {
    e.preventDefault();
    closeModal();
  }

  return (
    <div id='review-delete-button-modal'>
      <h1 style={{margin:'10px'}}>Confirm Delete</h1>
      <h3 style={{margin: '0px 0px 10px 0px'}}>Are you sure you want to delete this review?</h3>
      <button id='review-delete-yes-button' onClick={onClickDelete}>Yes(Delete Review)</button>
      <button id='review-delete-no-button' onClick={onClickCancel}>No (Keep Review)</button>
    </div>
  );
}

export default DeleteReviewModal;
