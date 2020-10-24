import React, { useEffect, useState } from "react";
import { PhotoData } from "../types/interfaces";

function Photo() {
	let [photoList, setPhotoList] = useState([]);
	let [data, setData] = useState({});
	let [sampImg, setSampImg] = useState("");

	useEffect(() => {
		fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=ho6NPUw7FBguQ4Nsju6c0NKaBS8x6joZjffiuxo6")
			.then((response) => response.json())
			.then((data) => {
				setData(data);
				let shortList = data.photos.slice(0, 10);
				console.log("shortList[0]", shortList[0]);
				setPhotoList(shortList);
				setSampImg(shortList[0].img_src);
			});
	}, []);

	const photoEls = photoList.map((photo: PhotoData, i: number) => {
		return <img src={photo.img_src} alt="" key={photo.id} />;
	});

	return <div>{photoEls}</div>;
}

export default Photo;
