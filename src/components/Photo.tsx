import React, { useState } from "react";
import { PhotoData } from "../types/interfaces";
import styled from "styled-components";
import Modal from "./Modal";

// styled-component decorating phot item
const PhotoItem = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px;
	border: 1px solid red;
	width: 250px;
	margin: 5px;
	flex-wrap: wrap;
	box-sizing: border-box;
	img {
		max-width: 225px;
		height: auto;
	}
`;

// defining props that will be required to be passed
// data is an optional param on toggleModal
interface Props {
	photoData: PhotoData;
	key: number;
	toggleModal: (e: React.MouseEvent<HTMLElement>, data?: PhotoData) => void;
}

//
function Photo({ photoData, toggleModal }: Props): JSX.Element {
	// take in photo data, display image and content:
	// data to display:

	// passing data back onClick so that PhotoViewer can send the photoData
	// of the selected image to Modal, so Modal can display
	return (
		<div onClick={(e) => toggleModal(e, photoData)}>
			<PhotoItem>
				<img src={photoData.img_src} alt={`${photoData?.rover.name} ${photoData?.earth_date}`} />
			</PhotoItem>
		</div>
	);
}

export default Photo;
