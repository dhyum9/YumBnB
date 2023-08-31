import SpotForm from "../SpotForm";

const CreateSpotForm = () => {
  const spot = {
    address: '',
    city: '',
    state: '',
    country: '',
    name: '',
    description: '',
    price: '',
    SpotImages: []
  };

  return (
    <SpotForm formType={"Create"} spot={spot}/>
  );
}

export default CreateSpotForm;
