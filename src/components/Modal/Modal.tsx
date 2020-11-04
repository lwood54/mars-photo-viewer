import React from "react";
import { PhotoData } from "../../types/interfaces";
import { ModalBackgroundSC, ModalSC, InfoContainer, XBox, PhotoDetail } from "./Modal.styles";

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
          <PhotoDetail data-testid="rover-data">
            <strong>Rover:</strong> {currentData?.rover.name}
          </PhotoDetail>
          <PhotoDetail data-testid="camera-data">
            <strong>Camera: </strong>
            {currentData?.camera?.full_name}
          </PhotoDetail>
          <PhotoDetail>
            <strong>Earth Date: </strong>
            {currentData?.earth_date}
          </PhotoDetail>
        </InfoContainer>
        <img data-testid="img-data" src={currentData?.img_src} alt={`${currentData?.rover.name} ${currentData?.earth_date}`} />
      </ModalSC>
    </div>
  );
}

export default Modal;
