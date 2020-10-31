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
  min-height: 70vh;
  max-height: 80vh;
  background: white;
  border-radius: 5px;
  padding: 15px 15px 25px;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  overflow: hidden;
  img {
    height: auto;
    width: 35rem;
    @media (max-width: 900px) {
      width: 90%;
    }
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
  justify-content: center;
  box-sizing: border-box;
  @media (max-width: 600px) {
    justify-content: left;
  }
`;

const PhotoDetail = styled.div`
  width: 50%;
  margin: 0.5rem;
  margin-bottom: 0;
  text-align: center;
  min-width: 500px;
  @media (max-width: 600px) {
    min-width: 100%;
    text-align: left;
  }
`;

const XBox = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    font-weight: 500;
  }
  &:active {
    font-weight: 100;
  }
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
        <XBox onClick={toggleModal}>X</XBox>
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
        <img src={currentData?.img_src} alt={`${currentData?.rover.name} ${currentData?.earth_date}`} />
      </ModalSC>
    </div>
  );
}

export default Modal;
