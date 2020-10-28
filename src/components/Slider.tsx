import React, { useState, useEffect } from "react";
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

const PrevArrowSC = styled.button`
	width: 20px;
	/* height: 100px; */
	border: 1px solid red;
`;

const NextArrowSC = styled.button`
	width: 20px;
	/* height: 100px; */
	border: 1px solid green;
`;

const PhotoContainerSC = styled.div`
	width: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
	/* animation: ${slideLeft} 1s linear;
	animation-fill-mode: forwards; */
`;

const QuickSC = styled.div`
	display: flex;
	flex-wrap: wrap;
	/* flex-direction: column; */
`;

// TODO: apply a class to both exiting and entering photos,
// the exiting photo will add class that will fade out at the same
// rate that the entering photo will fade in, will probably need to
// add the class using the className.join(),

// Slider will take an array of Photos
function Slider({ photoArray }: { photoArray: JSX.Element[] }): JSX.Element {
	// const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
	const [baseArray, setBaseArray] = useState<Array<JSX.Element>>(photoArray);
	// this will just be an array of the first 3 elements from the baseArray, which
	// will be mutated, shuffled right and left
	const [dispArray, setDispArray] = useState<Array<JSX.Element>>();

	useEffect(() => {
		// process array to show only have first, next, and last items
		setDispArray(prepForDisp(photoArray));
		if (photoArray) {
			setBaseArray(photoArray);
		}
	}, [photoArray]);

	// const clickRight = (prevArray: JSX.Element[] | null): JSX.Element[] | null => {
	const clickRight = () => {
		// take array param, move all items to left, 0 goes to end
		let array: JSX.Element[] | null = null;
		if (baseArray) {
			console.log("clickRight");
			array = [...baseArray];
			let firstItem = array.splice(0, 1);
			array.push(firstItem[0]);
		}
		setBaseArray(array);
		setDispArray(prepForDisp(array));
		// return array;
	};
	// const clickLeft = (prevArray: JSX.Element[] | null): JSX.Element[] | null => {
	const clickLeft = () => {
		let array: JSX.Element[] | null = null;
		if (baseArray) {
			console.log("clickLeft ?");
			array = [...baseArray];
			let lastItem = array.pop();
			console.log("lastItem: ", lastItem);
			array.unshift(lastItem!);
		}
		setBaseArray(array);
		setDispArray(prepForDisp(array));
		// return array;
	};
	const prepForDisp = (array: JSX.Element[] | null): JSX.Element[] | null => {
		let prevItem: JSX.Element;
		let currentItem: JSX.Element;
		let nextItem: JSX.Element;
		let dispArray: JSX.Element[] | null = null;
		if (array) {
			prevItem = array[array.length - 1];
			currentItem = array[0];
			nextItem = array[1];
			dispArray = [currentItem, nextItem, prevItem];
		}
		return dispArray;
	};

	return (
		<SliderSC>
			<PrevArrowSC onClick={clickLeft} />
			<QuickSC>
				{dispArray ? <PhotoContainerSC>{dispArray[2]}</PhotoContainerSC> : null}
				{dispArray ? <PhotoContainerSC>{dispArray[0]}</PhotoContainerSC> : "No results, please change parameters."}
				{dispArray ? <PhotoContainerSC>{dispArray[1]}</PhotoContainerSC> : null}
			</QuickSC>
			<NextArrowSC onClick={clickRight} />
		</SliderSC>
	);
}

export default Slider;
