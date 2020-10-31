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
const CenterLeft = styled.div`
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
const CenterRight = styled.div`
  animation: ${anim_center_right} 500ms ease-in;
  animation-fill-mode: forwards;
`;

// container for slider images
const SliderSC = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -20px;
  img {
    cursor: auto;
  }
`;

// this will be applied if there is not active animation happening
// need to reset class so animations will occur on next click
const CenterNormal = styled.div`
  animation: none;
`;

const ArrowContainerSC = styled.div`
  width: 80%;
  margin: 0 auto 0.5rem;
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
  &:hover {
    border-top: 3px solid #000;
    border-right: 3px solid #000;
  }
  &:active {
    border-top: 2px solid #000;
    border-right: 2px solid #000;
  }
`;

const PrevArrowSC = styled(ArrowBaseSC)`
  transform: rotate(-135deg);
`;

const NextArrowSC = styled(ArrowBaseSC)`
  transform: rotate(45deg);
`;

const BasePhotoCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: auto;
  }
`;

const InfoContainer = styled.div`
  margin: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-sizing: border-box;
`;

const PhotoDetail = styled.div<{ photoCount?: boolean }>`
  width: 50%;
  margin: 0.5rem;
  margin-bottom: 0;
  margin: ${(props) => (props.photoCount ? "auto" : "0 0.5rem 0.25rem")}; // use auto margin for photo count
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
      <PhotoDetail photoCount>
        {photoCount} / {baseArray ? baseArray.length : 0}
      </PhotoDetail>
      <ArrowContainerSC>
        <PrevArrowSC onClick={moveLeft || moveRight ? () => false : clickLeft}></PrevArrowSC>
        <NextArrowSC onClick={moveLeft || moveRight ? () => false : clickRight}></NextArrowSC>
      </ArrowContainerSC>
      {baseArray?.length > 2 ? (
        <SliderSC>
          <BasePhotoCont>
            {moveLeft ? (
              <CenterLeft>{baseArray ? baseArray[baseArray.length - 1] : undefined}</CenterLeft>
            ) : moveRight ? (
              <CenterRight>{baseArray ? baseArray[baseArray.length - 1] : undefined}</CenterRight>
            ) : (
              <CenterNormal>{baseArray ? baseArray[baseArray.length - 1] : undefined}</CenterNormal>
            )}
          </BasePhotoCont>
          <PhotoContainerSC>
            {moveLeft ? (
              <CenterLeft>{baseArray ? baseArray[0] : undefined}</CenterLeft>
            ) : moveRight ? (
              <CenterRight>{baseArray ? baseArray[0] : undefined}</CenterRight>
            ) : (
              <CenterNormal>{baseArray ? baseArray[0] : undefined}</CenterNormal>
            )}
          </PhotoContainerSC>
          <BasePhotoCont>
            {moveLeft ? (
              <CenterLeft>{baseArray ? baseArray[1] : undefined}</CenterLeft>
            ) : moveRight ? (
              <CenterRight>{baseArray ? baseArray[1] : undefined}</CenterRight>
            ) : (
              <CenterNormal>{baseArray ? baseArray[1] : undefined}</CenterNormal>
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
