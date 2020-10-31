import React from "react";
import { PhotoData } from "../types/interfaces";
import styled from "styled-components";

// TS issues with styled-components when passing props unless
// SC is defined by type
type PhotItemDiv = {
  currentView: "grid" | "slider";
};

// styled-component decorating phot item
const PhotoItem = styled.div<PhotItemDiv>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: ${(props) => (props.currentView === "grid" ? "250px" : "50vw")};
  margin: 5px;
  flex-wrap: wrap;
  box-sizing: border-box;
  cursor: pointer;
  img {
    max-width: 65%;
    height: auto;
  }
`;

// defining props that will be required to be passed
// data is an optional param on toggleModal
interface Props {
  photoData: PhotoData;
  key: number;
  toggleModal?: (e: React.MouseEvent<HTMLElement>, data?: PhotoData) => void;
  currentView: "grid" | "slider";
  // currentView: React.ElementType | keyof JSX.IntrinsicElements;
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
