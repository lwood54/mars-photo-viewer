import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { PhotoViewerContext } from "../PhotoViewerContext";
import { fetchPhotoData } from "../helpers";
import ParamSelector from "./ParamSelector";
import { PhotoData } from "../types/interfaces";
import Photo from "./Photo";
import Modal from "./Modal";

const PhotosContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
	box-sizing: border-box;
	margin: 5px;
`;

function PhotoViewer() {
	const [photoViewerState, setPhotoViewerState] = useContext(PhotoViewerContext);
	const [modalOpen, setModalOpen] = useState(false);
	const [currentData, setCurrentData] = useState({});

	// run once on mount
	useEffect(() => {
		getData(photoViewerState.selCamera, photoViewerState.selSol, photoViewerState.selRoverType, photoViewerState.selEarthDate);
	}, []);

	const getData = async (camera: string, sol: number, roverType: string, earthDate: string) => {
		const data = await fetchPhotoData(camera, sol, roverType, earthDate);
		setPhotoViewerState({ ...photoViewerState, photoData: data });
	};

	const handleSearch = () => {
		getData(photoViewerState.selCamera, photoViewerState.selSol, photoViewerState.selRoverType, photoViewerState.selEarthDate);
	};

	const toggleModal = (e: React.MouseEvent<HTMLElement>, data?: PhotoData) => {
		console.log("toggle modal", e);
		console.log("specific photo data: ", data);
		setCurrentData(data);
		setModalOpen(!modalOpen);
	};

	const photoEls =
		photoViewerState.photoData &&
		photoViewerState.photoData.photos.map((photo: PhotoData, i: number) => {
			return <Photo photoData={photo} key={photo.id} toggleModal={toggleModal} />;
		});

	return (
		<div>
			{modalOpen ? <Modal toggleModal={toggleModal} currentData={currentData} /> : null}
			<h1>Mars Photo Viewer</h1>
			<ParamSelector />
			<button onClick={handleSearch}>search</button>
			<PhotosContainer>{photoEls}</PhotosContainer>
		</div>
	);
}

export default PhotoViewer;
