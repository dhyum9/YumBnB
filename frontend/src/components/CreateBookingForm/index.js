import { useParams } from "react-router-dom";
import BookingForm from "../BookingForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpotDetails } from "../../store/spot";

const CreateBookingForm = () => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 2);

  const booking = {
    startDate: startDate,
    endDate: endDate
  };

  return (
    <BookingForm formType={"Create"} booking={booking}/>
  );
}

export default CreateBookingForm;
