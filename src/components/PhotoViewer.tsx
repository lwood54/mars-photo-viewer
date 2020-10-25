import React, { useEffect, useContext } from "react";
import { PhotoViewerContext } from "../PhotoViewerContext";
import { fetchPhotoData } from "../helpers";
import ParamSelector from "./ParamSelector";
import { PhotoData } from "../types/interfaces";

function PhotoViewer() {
	const [photoViewerState, setPhotoViewerState] = useContext(PhotoViewerContext);

	// run once on mount
	useEffect(() => {
		getData(photoViewerState.selCamera, photoViewerState.selSol, photoViewerState.selRoverType, photoViewerState.selEarthDate);
	}, []);

	const getData = async (camera: string, sol: number, roverType: string, earthDate: string) => {
		const data = await fetchPhotoData(camera, sol, roverType, earthDate);
		setPhotoViewerState({ ...photoViewerState, photoData: data });
	};

	const handleSearch = () => {
		console.log("handling search");
		getData(photoViewerState.selCamera, photoViewerState.selSol, photoViewerState.selRoverType, photoViewerState.selEarthDate);
	};

	const photoEls =
		photoViewerState.photoData &&
		photoViewerState.photoData.photos.map((photo: PhotoData, i: number) => {
			return <img src={photo.img_src} alt="" key={photo.id} />;
		});

	return (
		<div>
			<h1>Mars Photo Viewer</h1>
			<ParamSelector />
			<h3>camera type: {photoViewerState.selCamera}</h3>
			<h3>{photoViewerState.selSol >= 0 ? photoViewerState.selSol : "picked Earth Date"}</h3>
			<h3>rover type: {photoViewerState.selRoverType}</h3>
			<h3>
				{photoViewerState.earthYear !== "" || photoViewerState.earthMonth !== "" || photoViewerState.earthDay !== ""
					? photoViewerState.selEarthDate
					: "picked sol"}
			</h3>
			<button onClick={handleSearch}>search</button>
			<div>{photoEls}</div>
		</div>
	);
}

export default PhotoViewer;
