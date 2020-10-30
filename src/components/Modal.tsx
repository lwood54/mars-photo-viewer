import React from "react";
import styled from "styled-components";
import { PhotoData } from "../types/interfaces";

// styled-component that creates a fixed position pop up modal
// to display selected image data
const ModalSC = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 10vh;
  left: 10%;
  width: 80%;
  max-height: 80vh;
  background: white;
  border-radius: 5px;
  padding: 15px;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  overflow: hidden;
  & > img {
    height: auto;
    width: 65%;
  }
`;
// background allows user to still see list of images, darkens
const ModalBackgroundSC = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;

const InfoContainer = styled.div`
  margin: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-sizing: border-box;
`;

const PhotoDetail = styled.div`
  width: 50%;
  margin: 0.5rem;
  margin-bottom: 0;
  text-align: center;
  min-width: 500px;
`;

// creating type interface that helps define props, currentData is optional
interface Props {
  currentData?: PhotoData;
  toggleModal: (e: React.MouseEvent<HTMLElement>, data?: PhotoData) => void;
}

// destructuring the used variables from props and defining type with created interface
function Modal({ currentData, toggleModal }: Props): JSX.Element {
  return (
    <div>
      <ModalBackgroundSC onClick={toggleModal} />
      <ModalSC>
        <img src={currentData?.img_src} alt={`${currentData?.rover.name} ${currentData?.earth_date}`} />
        <InfoContainer>
          <PhotoDetail>
            <strong>Rover:</strong> {currentData?.rover.name}
          </PhotoDetail>
          <PhotoDetail>
            <strong>Camera: </strong>
            {currentData?.camera?.full_name}
          </PhotoDetail>
          <PhotoDetail>
            <strong>Earth Date: </strong>
            {currentData?.earth_date}
          </PhotoDetail>
        </InfoContainer>
      </ModalSC>
    </div>
  );
}

export default Modal;
