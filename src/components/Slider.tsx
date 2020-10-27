import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const slideLeft = keyframes`
  from {
    /* transform: rotate(0deg); */
    transform: translate(0,0);
		opacity: 1;
  }

  to {
    transform: translate(-100vw,0);
		opacity: 0;
  }
`;

const SliderSC = styled.div`
	display: flex;
	justify-content: space-between;
	height: 80vh;
`;

const PrevArrow = styled.div`
	width: 20px;
	height: 100px;
	border: 1px solid red;
`;

const NextArrow = styled.div`
	width: 20px;
	height: 100px;
	border: 1px solid green;
`;

const PhotoContainer = styled.div`
	width: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: ${slideLeft} 1s linear;
	animation-fill-mode: forwards;
`;

// TODO: apply a class to both exiting and entering photos,
// the exiting photo will add class that will fade out at the same
// rate that the entering photo will fade in, will probably need to
// add the class using the className.join(),

// Slider will take an array of Photos
function Slider({ photoArray }: { photoArray: JSX.Element[] }): JSX.Element {
	const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

	const handlePrev = () => {
		console.log("photoArray length: ", photoArray.length);
		console.log("inside handlePrev: ", currentPhotoIndex);
		if (currentPhotoIndex === 0) {
			setCurrentPhotoIndex(photoArray.length - 1);
		} else {
			setCurrentPhotoIndex(currentPhotoIndex - 1);
		}
	};

	const handleNext = () => {
		console.log("photoArray length: ", photoArray.length);
		console.log("inside handleNext: ", currentPhotoIndex);
		if (currentPhotoIndex === photoArray.length - 1) {
			setCurrentPhotoIndex(0);
		} else {
			setCurrentPhotoIndex(currentPhotoIndex + 1);
		}
	};

	return (
		<SliderSC>
			<PrevArrow onClick={handlePrev} />
			{photoArray ? <PhotoContainer>{photoArray[currentPhotoIndex]}</PhotoContainer> : "No results, please enter different parameters."}
			<NextArrow onClick={handleNext} />
		</SliderSC>
	);
}

export default Slider;
