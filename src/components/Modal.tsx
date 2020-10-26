import React from "react";
import styled from "styled-components";
import { PhotoData } from "../types/interfaces";

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
const ModalBackgroundSC = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.75);
	z-index: 10;
`;

interface Props {
	currentData?: PhotoData;
	toggleModal: (e: React.MouseEvent<HTMLElement>, data?: PhotoData) => void;
}

function Modal({ currentData, toggleModal }: Props) {
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
