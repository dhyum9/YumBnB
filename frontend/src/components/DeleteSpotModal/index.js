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
    <div id='delete-button-modal'>
      <h1 style={{margin:'10px'}}>Confirm Delete</h1>
      <h3 style={{margin: '0px'}}>Are you sure you want to remove this spot?</h3>
      <div id='buttons-row'>
        <button id='yes-button' onClick={onClickDelete}>Yes(Delete Spot)</button>
        <button id='no-button' onClick={onClickCancel}>No (Keep Spot)</button>
      </div>
    </div>
  );
}

export default DeleteSpotModal;
