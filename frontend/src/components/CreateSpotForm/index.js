import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spot';

const CreateSpotForm = () => {
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState('');
  const [imageUrl4, setImageUrl4] = useState('');
  const [imageUrl5, setImageUrl5] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      address,
      city,
      state,
      country,
      lat: latitude,
      lng: longitude,
      name,
      description,
      price
    };

    console.log(payload);

    const createdSpot = await dispatch(createSpot(payload));

    if (createdSpot) {
      history.push(`/spots/${createdSpot.id}`);
    }
  };

  return (
    <section className="">
      <form onSubmit={handleSubmit} style={{width: "600px", margin:"auto", display:"flex", flexDirection:"column", alignItems:"center"}}>
        <h2>Create a new Spot</h2>
        <label>
          Country
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
        </label>
        <label>
          Street Address
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </label>
        <label>
          City
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </label>
        <label>
          State
          <input
            type="text"
            placeholder="STATE"
            value={state}
            onChange={e => setState(e.target.value)}
          />
        </label>
        <label>
          Latitude
          <input
            type="number"
            min="-90"
            max="90"
            placeholder="Latitude"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
        </label>
        <label>
          Longitude
          <input
            type="number"
            min="-180"
            max="180"
            placeholder="Longitude"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
        </label>
        <label>
          Describe your place to guests
          <textarea
            placeholder="Please write at least 30 characters"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>
        <label>
          Create a title for your spot
          <input
            type="text"
            placeholder="Name of your spot"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label>
          Set a base price for your spot
          <input
            type="number"
            placeholder="Price per night (USD)"
            min="0"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </label>
        <label>
          Liven up your spot with photos
          <input
            type="text"
            placeholder="Preview Image Url"
            value={previewImageUrl}
            onChange={e => setPreviewImageUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image Url"
            value={imageUrl2}
            onChange={e => setImageUrl2(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image Url"
            value={imageUrl3}
            onChange={e => setImageUrl3(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image Url"
            value={imageUrl4}
            onChange={e => setImageUrl4(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image Url"
            value={imageUrl5}
            onChange={e => setImageUrl5(e.target.value)}
          />
        </label>
        <button type='submit'>Create Spot</button>
      </form>
    </section>
  );
}

export default CreateSpotForm;


  // const pokeTypes = useSelector(state => state.pokemon.types);

  // useEffect(() => {
  //   dispatch(getPokemonTypes());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (pokeTypes.length && !type) {
  //     setType(pokeTypes[0]);
  //   }
  // }, [pokeTypes, type]);
