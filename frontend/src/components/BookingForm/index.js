import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { createSpot, createSpotImage, updateSpot, fetchSpotDetails } from '../../store/spot';
import './BookingForm.css';

const BookingForm = ({spot, booking, formType}) => {
  const [startDate, setStartDate] = useState(booking.startDate);
  const [endDate, setEndDate] = useState(booking.endDate);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  // useEffect(() => {
  //   setStartDate(booking.startDate);
  //   setEndDate(booking.endDate);
  // }, [dispatch, booking]);

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

  const convertDate = (date) => {
    const months = {
      'Jan': "01",
      'Feb': "02",
      'Mar': "03",
      'Apr': "04",
      'May': "05",
      'Jun': "06",
      'Jul': "07",
      'Aug': "08",
      'Sep': "09",
      'Oct': "10",
      'Nov': "11",
      'Dec': "12"};
    let dateParts = String(date).split(" ");
    return `${dateParts[3]}-${months[dateParts[1]]}-${dateParts[2]}`
  }

  let previewImageUrl;

  spot.SpotImages.forEach((imageObj) => {
    if (imageObj.preview === true) {
      previewImageUrl = imageObj.url;
    }
  })

  return (
    <div>
      <form id='create-spot-form'>
        {formType==="Create" ? <h3>Confirm your Booking</h3> : <h3>Edit your Booking</h3>}
        <div>
          START DATE
          <DatePicker
            selectsStart
            selected={startDate}
            onChange={date => setStartDate(date)}
            startDate={startDate}
            monthsShown={3}
            isClearable
          />
        </div>
        <div>
          END DATE
          <DatePicker
            selectsEnd
            selected={endDate}
            onChange={date => setEndDate(date)}
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            monthsShown={3}
            isClearable
          />
        </div>
        {formType==="Create" ? <button type='submit' id='create-spot-button'>Create Booking</button> : <button type='submit' id='create-spot-button'>Update Booking</button>}
      </form>
      <div>
        For {spot.name}
      </div>
      <div>
        {Number.parseFloat(spot.avgStarRating).toFixed(2)}
      </div>
      <div>
        {spot.numReviews}
      </div>
      <div>
        <img src={previewImageUrl}></img>
      </div>
    </div>
  );
}

export default BookingForm;
