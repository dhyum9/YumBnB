import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from '../../store/spot';
import './DeleteSpot.css'

function DeleteSpotModal({spotId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();


  const onClickDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spotId)).then(closeModal);
  }

  const onClickCancel = (e) => {
    e.preventDefault();
    closeModal();
  }

  return (
    <div id='spot-delete-button-modal'>
      <h1 style={{margin:'10px'}}>Confirm Delete</h1>
      <div style={{margin: '0px 0px 10px 0px'}}>Are you sure you want to remove this spot from the listings?</div>
      <button id='spot-delete-yes-button' onClick={onClickDelete}>Yes(Delete Spot)</button>
      <button id='spot-delete-no-button' onClick={onClickCancel}>No (Keep Spot)</button>
    </div>
  );
}

export default DeleteSpotModal;
