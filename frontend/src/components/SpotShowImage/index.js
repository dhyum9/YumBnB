import'./SpotShowImage.css';

const SpotShowImage = ({images}) => {
  let previewImageUrl;
  let nonPreviewImages = [];

  images.forEach((imageObj) => {
    imageObj.preview === true ? previewImageUrl = imageObj.url : nonPreviewImages.push(imageObj);
  })

  return (
    <div id='spot-show-images-grid'>
      <div id='spot-show-image-left-col'>
        <img src={previewImageUrl} alt="Pics of the place go here"></img>
      </div>
      <div id='spot-show-image-right-col'>
        {nonPreviewImages.map((nonPreviewImage) => <img key={nonPreviewImage.id} id='right-col-image' src={nonPreviewImage.url} alt="Pics of the place go here"></img>)}
      </div>
    </div>
  );
}

export default SpotShowImage;
