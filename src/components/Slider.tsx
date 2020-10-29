import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// create keyframes for animation injection
const anim_center_left = keyframes`
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-71vw, 0);
  }
`;
// apply animations, this will be used when items move to the left
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

// container for slider images
const SliderSC = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  max-height: 500px;
`;

// this will be applied if there is not active animation happening
// need to reset class so animations will occur on next click
const Center_normal = styled.div`
  animation: none;
`;

const ArrowContainerSC = styled.div`
  width: 80%;
  margin: 1rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// setting base arrow characteristics that can be manipulated for arrows
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

const NoSliderSC = styled.div`
  /* width: 100px;
	margin: auto; */
`;

const BasePhotoCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  margin: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const PhotoDetail = styled.div`
  width: 50%;
  margin: 0.5rem;
  text-align: center;
  min-width: 500px;
`;

// container of the display photo
// padding is required in order to push previous and next divs out of viewport
const PhotoContainerSC = styled(BasePhotoCont)`
  padding: 0 25%;
`;

// Slider will take an array of Photos
function Slider({ photoArray }: { photoArray: JSX.Element[] }): JSX.Element {
  // copying photo array so it can be mutated and displayed as user clicks prev or next
  const [baseArray, setBaseArray] = useState<Array<JSX.Element>>(photoArray);
  // tracking whether elements are in the act of moving, which will disable click functions
  // as well as determine containers/classes to be used for animation purposes
  const [moveLeft, setMoveLeft] = useState<boolean>(false);
  const [moveRight, setMoveRight] = useState<boolean>(false);
  // tracking which image user is on because array is mutated
  const [photoCount, setPhotoCount] = useState(1);

  useEffect(() => {
    // process array to show only have first, next, and last items
    if (photoArray) {
      setPhotoCount(1);
      setBaseArray(photoArray);
    }
  }, [photoArray]);

  // const clickRight = (prevArray: JSX.Element[] | null): JSX.Element[] | null => {
  const clickRight = () => {
    // take array param, move all items to left, 0 goes to end
    let array: JSX.Element[] | null = null;
    if (baseArray) {
      array = [...baseArray];
      let firstItem = array.splice(0, 1);
      array.push(firstItem[0]);
    }
    // ensuring flag is reset
    setMoveRight(false);
    // flagging movement
    setMoveLeft(true);
    // need to wait for animation to progress, then setting the shuffled array
    // which will display photos in their new locations, which are the same spots
    // that the animations end
    setTimeout(() => {
      setMoveLeft(false);
      setBaseArray(array);
    }, 500);
    if (photoCount === baseArray.length) {
      setPhotoCount(1);
    } else {
      setPhotoCount(photoCount + 1);
    }
  };
  // const clickLeft = (prevArray: JSX.Element[] | null): JSX.Element[] | null => {
  const clickLeft = () => {
    let array: JSX.Element[] | null = null;
    if (baseArray) {
      array = [...baseArray];
      let lastItem = array.pop();
      array.unshift(lastItem!);
    }
    // similar functionality as clickRight, but array mutation was handles slightly differently
    setMoveLeft(false);
    setMoveRight(true);
    setTimeout(() => {
      setMoveRight(false);
      setBaseArray(array);
    }, 500);
    if (photoCount === 1) {
      setPhotoCount(baseArray.length);
    } else {
      setPhotoCount(photoCount - 1);
    }
  };
  // different styled components are displayed based on required animation and current
  // motion status
  return (
    <div>
      <ArrowContainerSC>
        <PrevArrowSC onClick={moveLeft || moveRight ? () => false : clickLeft}></PrevArrowSC>
        <NextArrowSC onClick={moveLeft || moveRight ? () => false : clickRight}></NextArrowSC>
      </ArrowContainerSC>
      {baseArray?.length > 2 ? (
        <SliderSC>
          <BasePhotoCont>
            {moveLeft ? (
              <Center_left>{baseArray ? baseArray[baseArray.length - 1] : undefined}</Center_left>
            ) : moveRight ? (
              <Center_right>{baseArray ? baseArray[baseArray.length - 1] : undefined}</Center_right>
            ) : (
              <Center_normal>{baseArray ? baseArray[baseArray.length - 1] : undefined}</Center_normal>
            )}
          </BasePhotoCont>
          <PhotoContainerSC>
            {moveLeft ? (
              <Center_left>{baseArray ? baseArray[0] : undefined}</Center_left>
            ) : moveRight ? (
              <Center_right>{baseArray ? baseArray[0] : undefined}</Center_right>
            ) : (
              <Center_normal>{baseArray ? baseArray[0] : undefined}</Center_normal>
            )}
          </PhotoContainerSC>
          <BasePhotoCont>
            {moveLeft ? (
              <Center_left>{baseArray ? baseArray[1] : undefined}</Center_left>
            ) : moveRight ? (
              <Center_right>{baseArray ? baseArray[1] : undefined}</Center_right>
            ) : (
              <Center_normal>{baseArray ? baseArray[1] : undefined}</Center_normal>
            )}
          </BasePhotoCont>
        </SliderSC>
      ) : (
        <SliderSC>
          <div>{baseArray ? baseArray[0] : null}</div>
          <div>{baseArray ? baseArray[1] : null}</div>
        </SliderSC>
      )}

      <InfoContainer>
        <PhotoDetail>
          {photoCount} / {baseArray ? baseArray.length : 0}
        </PhotoDetail>
        <PhotoDetail>
          <strong>Rover:</strong> {baseArray ? baseArray[0]?.props.photoData.rover.name : ""}
        </PhotoDetail>
        <PhotoDetail>
          <strong>Camera: </strong>
          {baseArray ? baseArray[0]?.props.photoData.camera.full_name : ""}
        </PhotoDetail>
        <PhotoDetail>
          <strong>Earth Date: </strong>
          {baseArray ? baseArray[0]?.props.photoData.earth_date : ""}
        </PhotoDetail>
      </InfoContainer>
    </div>
  );
}

export default Slider;
