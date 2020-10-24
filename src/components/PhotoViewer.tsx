import React, { useEffect, useContext } from "react";
import { PhotoViewerContext } from "../PhotoViewerContext";
import { fetchPhotoData } from "../helpers";
import ParamSelector from "./ParamSelector";

function PhotoViewer() {
	const [photoViewerState, setPhotoViewerState] = useContext(PhotoViewerContext);

	// run once on mount
	useEffect(() => {
		fetchPhotoData(photoViewerState.selCamera, photoViewerState.selSol, photoViewerState.selRoverType, photoViewerState.selEarthDate);
	}, []);

	const handleSearch = () => {
		console.log("handling search");
		fetchPhotoData(photoViewerState.selCamera, photoViewerState.selSol, photoViewerState.selRoverType, photoViewerState.selEarthDate);
	};

	return (
		<div>
			<h1>Mars Photo Viewer</h1>
			<ParamSelector />
			<h3>camera type: {photoViewerState.selCamera}</h3>
			<h3>{photoViewerState.selSol ? photoViewerState.selSol : "picked Earth Date"}</h3>
			<h3>rover type: {photoViewerState.selRoverType}</h3>
			<h3>{photoViewerState.selEarthDate ? photoViewerState.selEarthDate : "picked sol"}</h3>
			<button onClick={handleSearch}>search</button>
		</div>
	);
}

export default PhotoViewer;
