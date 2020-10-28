import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { PhotoViewerContext } from "../PhotoViewerContext";
import { fetchPhotoData } from "../helpers";
import ParamSelector from "./ParamSelector";
import { PhotoData } from "../types/interfaces";
import Photo from "./Photo";
import Modal from "./Modal";
import Slider from "./Slider";

// styled-component
const PhotosContainerSC: React.FC = styled.div`
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
	box-sizing: border-box;
	margin: 5px;
`;

function PhotoViewer(): JSX.Element {
	// using context to call/store data that can be accessed outside of parent/child nodes
	const [photoViewerState, setPhotoViewerState] = useContext(PhotoViewerContext);
	// need to track whether modal should be open
	const [modalOpen, setModalOpen] = useState(false);
	// setting currentData that is selected when images are clicked on
	// data will be sent to Modal for display
	const [currentData, setCurrentData] = useState({});
	// state determines grid or slider view
	const [currentView, setCurrentView] = useState(false);

	// run once on mount
	useEffect(() => {
		getData(photoViewerState.selCamera, photoViewerState.selSol, photoViewerState.selRoverType, photoViewerState.selEarthDate);
	}, []);

	// imported fetchPhotoData helper function, needed additional asyn function
	// in order to await the results of the fetch function call
	const getData = async (camera: string, sol: number, roverType: string, earthDate: string) => {
		const data = await fetchPhotoData(camera, sol, roverType, earthDate);
		// data is set when response returns
		// TODO: handle message display if response is empty or null
		setPhotoViewerState({ ...photoViewerState, photoData: data });
	};

	// calls function to execute on search button press
	const handleSearch = () => {
		getData(photoViewerState.selCamera, photoViewerState.selSol, photoViewerState.selRoverType, photoViewerState.selEarthDate);
	};

	// function that toggles modal, but also accepts optional data argument that
	// can set currentData, which will be passed to the modal
	const toggleModal = (e: React.MouseEvent<HTMLElement>, data?: PhotoData) => {
		console.log("toggle modal", e);
		console.log("specific photo data: ", data);
		setCurrentData(data);
		setModalOpen(!modalOpen);
	};

	const toggleGridView = () => {
		console.log("testing");
		setCurrentView(currentView === "grid" ? "slider" : "grid");
	};

	// creating an array of photo elements to display when fetch returns results
	const photoEls: JSX.Element[] =
		photoViewerState.photoData && // checking if data is truthy before mapping
		photoViewerState.photoData.photos.map((photo: PhotoData, i: number) => {
			// returning individual photo item, passing toggle function help collect
			// data used on whichever photo will be clicked
			return <Photo photoData={photo} key={photo.id} toggleModal={currentView === "grid" ? toggleModal : undefined} currentView={currentView} />;
		});

	return (
		<div>
			{modalOpen ? <Modal toggleModal={toggleModal} currentData={currentData} /> : null}
			<h1>Mars Photo Viewer</h1>
			<ParamSelector />
			<button onClick={handleSearch}>search</button>
			<button onClick={toggleGridView}>{currentView === "grid" ? "Slider" : "Grid"}</button>
			{currentView === "grid" ? <PhotosContainerSC>{photoEls}</PhotosContainerSC> : <Slider photoArray={photoEls} />}
		</div>
	);
}

export default PhotoViewer;
