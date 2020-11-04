import React from "react";
import { PhotoData } from "../../types/interfaces";
import { viewOptions } from "../../types/constants";
import { PhotoItem } from "./Photo.styles";

// defining props that will be required to be passed
// data is an optional param on toggleModal
interface Props {
  photoData: PhotoData;
  key: number;
  toggleModal?: (e: React.MouseEvent<HTMLElement>, data?: PhotoData) => void;
  currentView: viewOptions.GRID | viewOptions.SLIDER;
  // I thought this is most specific type which is even safer than string
  // so this would technically be of type string grid or type string slider
}

//
function Photo({ photoData, toggleModal, currentView }: Props): JSX.Element {
  // take in photo data, display image and content:
  // data to display:

  // passing data back onClick so that PhotoViewer can send the photoData
  // of the selected image to Modal, so Modal can display
  return (
    <div onClick={toggleModal ? (e) => toggleModal(e, photoData) : () => false}>
      <PhotoItem currentView={currentView}>
        <img src={photoData.img_src} alt={`${photoData?.rover.name} ${photoData?.earth_date}`} loading="lazy" />
      </PhotoItem>
    </div>
  );
}

export default Photo;
