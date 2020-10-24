import React, { useEffect, useState } from "react";
import { PhotoData } from "../types/interfaces";

const api_key = "ho6NPUw7FBguQ4Nsju6c0NKaBS8x6joZjffiuxo6";
const roverType = "curiosity";
// const roverType = "opportunity";
// const roverType = "spirit";

function Photo() {
	let [photoList, setPhotoList] = useState([]);

	// TODO: create context that stores selected parameters
	// temporarily create some state in here
	// create 2 fetch functions, one for sol param and one for earth_date param

	useEffect(() => {
		fetchPhotoData("all", 500, roverType);
	}, []);

	const fetchPhotoData = (camera: string, sol: number, roverType: string) => {
		// can modify camera, sol, earth_date, and roverType
		// fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/photos?sol=1000&camera=chemcam&api_key=${api_key}`)
		fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/photos?earth_date=2015-6-3&camera=mast&api_key=${api_key}`)
			.then((response) => response.json())
			.then((data) => {
				console.log("data: ", data.photos);
				// data will need to be a context as well to store this in the store
				setPhotoList(data.photos);
			});
	};

	const photoEls = photoList.map((photo: PhotoData, i: number) => {
		return <img src={photo.img_src} alt="" key={photo.id} />;
	});

	return <div>{photoEls}</div>;
}

export default Photo;
