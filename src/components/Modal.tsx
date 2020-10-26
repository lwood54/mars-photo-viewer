import React from "react";
import styled from "styled-components";
import { PhotoData } from "../types/interfaces";

// styled-component that creates a fixed position pop up modal
// to display selected image data
const ModalSC = styled.div`
	position: fixed;
	top: 10vh;
	left: 10%;
	width: 80%;
	max-height: 80vh;
	background: white;
	border-radius: 5px;
	z-index: 100;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	overflow: scroll;
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
				<h1>This is a modal.</h1>
				<img src={currentData?.img_src} alt={`${currentData?.rover.name} ${currentData?.earth_date}`} />
			</ModalSC>
		</div>
	);
}

export default Modal;
