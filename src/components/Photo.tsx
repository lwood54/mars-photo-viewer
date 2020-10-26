import React, { useState } from "react";
import { PhotoData } from "../types/interfaces";
import styled from "styled-components";
import Modal from "./Modal";

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

interface Props {
	photoData: PhotoData;
	key: number;
	toggleModal: (e: React.MouseEvent<HTMLElement>, data?: PhotoData) => void;
}

function Photo({ photoData, toggleModal }: Props) {
	// take in photo data, display image and content:
	// data to display:

	return (
		<div onClick={(e) => toggleModal(e, photoData)}>
			<PhotoItem>
				<img src={photoData.img_src} alt={`${photoData.rover.name} ${photoData.camera?.name}`} />
			</PhotoItem>
		</div>
	);
}

export default Photo;
