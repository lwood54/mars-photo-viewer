import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const anim_center_left = keyframes`
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-71vw, 0);
  }
`;
const Center_left = styled.div`
	animation: ${anim_center_left} 500ms ease-in;
	animation-fill-mode: forwards;
`;

const anim_center_right = keyframes`
	from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(71vw, 0);
  }
`;
const Center_right = styled.div`
	animation: ${anim_center_right} 500ms ease-in;
	animation-fill-mode: forwards;
`;

const SliderSC = styled.div`
	display: flex;
	justify-content: center;
	overflow: hidden;
`;

const Center_normal = styled.div`
	animation: none;
`;

const ArrowContainerSC = styled.div`
	width: 80%;
	margin: auto;
	display: flex;
	justify-content: space-between;
`;

const ArrowBaseSC = styled.span`
	display: inline-block;
	width: 15px;
	height: 15px;
	border-top: 2px solid #000;
	border-right: 2px solid #000;
	cursor: pointer;
`;

const PrevArrowSC = styled(ArrowBaseSC)`
	transform: rotate(-135deg);
`;

const NextArrowSC = styled(ArrowBaseSC)`
	transform: rotate(45deg);
`;

const PhotoContainerSC = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 25%;
	img {
		width: 100%;
	}
`;

// Slider will take an array of Photos
function Slider({ photoArray }: { photoArray: JSX.Element[] }): JSX.Element {
	const [baseArray, setBaseArray] = useState<Array<JSX.Element>>(photoArray);
	// this will just be an array of the first 3 elements from the baseArray, which
	// will be mutated, shuffled right and left
	const [moveLeft, setMoveLeft] = useState(false);
	const [moveRight, setMoveRight] = useState(false);

	useEffect(() => {
		// process array to show only have first, next, and last items
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
		setMoveRight(false);
		setMoveLeft(true);
		setTimeout(() => {
			setMoveLeft(false);
			setBaseArray(array);
		}, 500);
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
		setMoveLeft(false);
		setMoveRight(true);
		setTimeout(() => {
			setMoveRight(false);
			setBaseArray(array);
		}, 500);
	};
	// const prepForDisp = (array: JSX.Element[] | null): JSX.Element[] | null => {
	// 	let prevItem: JSX.Element;
	// 	let currentItem: JSX.Element;
	// 	let nextItem: JSX.Element;
	// 	let dispArray: JSX.Element[] | null = null;
	// 	if (array) {
	// 		prevItem = array[array.length - 1];
	// 		currentItem = array[0];
	// 		nextItem = array[1];
	// 		dispArray = [currentItem, nextItem, prevItem];
	// 	}
	// 	return dispArray;
	// };

	return (
		<div>
			<SliderSC>
				{moveLeft ? (
					<Center_left>{baseArray ? baseArray[baseArray.length - 1] : undefined}</Center_left>
				) : moveRight ? (
					<Center_right>{baseArray ? baseArray[baseArray.length - 1] : undefined}</Center_right>
				) : (
					<Center_normal>{baseArray ? baseArray[baseArray.length - 1] : undefined}</Center_normal>
				)}
				<PhotoContainerSC>
					{moveLeft ? (
						<Center_left>{baseArray ? baseArray[0] : undefined}</Center_left>
					) : moveRight ? (
						<Center_right>{baseArray ? baseArray[0] : undefined}</Center_right>
					) : (
						<Center_normal>{baseArray ? baseArray[0] : undefined}</Center_normal>
					)}
				</PhotoContainerSC>
				{moveLeft ? (
					<Center_left>{baseArray ? baseArray[1] : undefined}</Center_left>
				) : moveRight ? (
					<Center_right>{baseArray ? baseArray[1] : undefined}</Center_right>
				) : (
					<Center_normal>{baseArray ? baseArray[1] : undefined}</Center_normal>
				)}
			</SliderSC>
			<ArrowContainerSC>
				<PrevArrowSC onClick={moveLeft || moveRight ? () => false : clickLeft}></PrevArrowSC>
				<NextArrowSC onClick={moveLeft || moveRight ? () => false : clickRight}></NextArrowSC>
			</ArrowContainerSC>
		</div>
	);
}

export default Slider;
