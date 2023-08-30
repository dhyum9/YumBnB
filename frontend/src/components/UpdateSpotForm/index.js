import { useSelector } from "react-redux";
import SpotForm from "../SpotForm";

const UpdateSpotForm = () => {
   const spot = useSelector((state) => state.spots.singleSpot);

   return <SpotForm spot={spot} formType={"Update"} />;
};

export default UpdateSpotForm;
