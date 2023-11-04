import { useParams } from "react-router-dom";
import BookingForm from "../BookingForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpotDetails } from "../../store/spot";

const CreateBookingForm = () => {
  const startDate = null;
  const endDate = null;

  const booking = {
    startDate,
    endDate
  };

  return (
    <BookingForm formType={"Create"} booking={booking}/>
  );
}

export default CreateBookingForm;
