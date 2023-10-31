import { useParams } from "react-router-dom";
import BookingForm from "../BookingForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpotDetails } from "../../store/spot";

const CreateBookingForm = () => {
  const startDate = new Date();
  const endDate = new Date();

  const booking = {
    startDate,
    endDate
  };

  return (
    <BookingForm formType={"Create"} booking={booking}/>
  );
}

export default CreateBookingForm;
