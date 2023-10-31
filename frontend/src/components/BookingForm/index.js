import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
// import { DateRangePicker } from 'react-dates';
// import { createSpot, createSpotImage, updateSpot, fetchSpotDetails } from '../../store/spot';
import './BookingForm.css';

const BookingForm = ({booking, formType}) => {
  const [startDate, setStartDate] = useState(booking.startDate);
  const [endDate, setEndDate] = useState(booking.endDate);
  const [focusedInput, setFocusedInput] = useState(null);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setStartDate(booking.startDate);
    setEndDate(booking.endDate);
  }, [dispatch, booking]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setErrors({});

  //   const payload = {
  //     ...booking,
  //     startDate,
  //     endDate
  //   };

  //   if(formType==='Create'){
  //     const createdSpot = await dispatch(createSpot(payload))
  //     .catch(async(res) => {
  //       const data = await res.json();
  //       if (data && data.errors) {
  //         setErrors(data.errors);
  //       }
  //     });

  //     if (createdSpot) {
  //       for (let spotImage of spotImagePayload){
  //         await dispatch(createSpotImage(spotImage, createdSpot.id))
  //       }
  //       await dispatch(fetchSpotDetails(createdSpot.id));
  //       history.push(`/spots/${createdSpot.id}`);
  //     }
  //   } else if (formType==='Update'){
  //     const updatedSpot = await dispatch(updateSpot(payload, spot.id))
  //     .catch(async(res) => {
  //       const data = await res.json();
  //       if (data && data.errors) {
  //         setErrors(data.errors);
  //       }
  //     });

  //     if (updatedSpot) {
  //       await dispatch(fetchSpotDetails(updatedSpot.id));
  //       history.push(`/spots/${updatedSpot.id}`);
  //     }
  //   }

  // };

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <section>
      <form id='create-spot-form'>
        {formType==="Create" ? <h3>Confirm your Booking</h3> : <h3>Edit your Booking</h3>}
        {/* <div id='date-picker'>
          <DateRangePicker
            startDate={startDate}
            startDateId="date_picker_start_date_id"
            endDate={endDate}
            endDateId="date_picker_end_date_id"
            onDatesChange={handleDatesChange}
            focusedInput={focusedInput}
            onFocusChange={focusedInput => setFocusedInput(focusedInput)}
          />
        </div> */}
        {formType==="Create" ? <button type='submit' id='create-spot-button'>Create Booking</button> : <button type='submit' id='create-spot-button'>Update Booking</button>}
      </form>
    </section>
  );
}

export default BookingForm;
