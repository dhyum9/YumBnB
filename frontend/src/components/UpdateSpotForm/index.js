import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SpotForm from "../SpotForm";
import { useEffect } from "react";
import { fetchSpotDetails } from "../../store/spot";

const UpdateSpotForm = () => {
  //  const { spotId } = useParams();
  //  const dispatch = useDispatch();
   const spot = useSelector((state) => state.spots.singleSpot);

   console.log(spot);

  //  useEffect(() => {
  //   dispatch(fetchSpotDetails(spotId));
  //  }, [dispatch, spotId]);

   return <SpotForm spot={spot} formType={"Update"} />;
};

export default UpdateSpotForm;
