import React, { useState, useEffect } from "react";
import {
  PhotoDetail,
  ArrowContainerSC,
  PrevArrowSC,
  NextArrowSC,
  SliderSC,
  BasePhotoCont,
  CenterLeft,
  CenterRight,
  CenterNormal,
  PhotoContainerSC,
  InfoContainer,
} from "./Slider.styles";

// Slider will take an array of Photos
function Slider({ photoArray }: { photoArray: JSX.Element[] }): JSX.Element {
  // copying photo array so it can be mutated and displayed as user clicks prev or next
  const [basePhotoArray, setBasePhotoArray] = useState<Array<JSX.Element>>(photoArray);
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
      setBasePhotoArray(photoArray);
    }
  }, [photoArray]);

  // const clickRight = (prevArray: JSX.Element[] | null): JSX.Element[] | null => {
  const clickRight = () => {
    // take array param, move all items to left, 0 goes to end
    let array: JSX.Element[] | null = null;
    if (basePhotoArray) {
      array = [...basePhotoArray];
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
    let timeOut = window.innerWidth <= 750 ? 300 : 500;
    setTimeout(() => {
      setMoveLeft(false);
      setBasePhotoArray(array ?? []);
    }, timeOut);
    if (photoCount === basePhotoArray.length) {
      setPhotoCount(1);
    } else {
      setPhotoCount(photoCount + 1);
    }
  };
  // const clickLeft = (prevArray: JSX.Element[] | null): JSX.Element[] | null => {
  const clickLeft = () => {
    let array: JSX.Element[] | null = null;
    if (basePhotoArray) {
      array = [...basePhotoArray];
      let lastItem = array.pop();
      array.unshift(lastItem!);
    }
    // similar functionality as clickRight, but array mutation was handles slightly differently
    setMoveLeft(false);
    setMoveRight(true);
    let timeOut = window.innerWidth <= 750 ? 300 : 500;
    setTimeout(() => {
      setMoveRight(false);
      setBasePhotoArray(array ?? []);
    }, timeOut);
    if (photoCount === 1) {
      setPhotoCount(basePhotoArray.length);
    } else {
      setPhotoCount(photoCount - 1);
    }
  };
  // different styled components are displayed based on required animation and current
  // motion status
  return (
    <>
      <PhotoDetail photoCount>
        {/* {photoCount} / {basePhotoArray ? basePhotoArray.length : 0} */}
        {photoCount} / {basePhotoArray && basePhotoArray.length}
      </PhotoDetail>
      <ArrowContainerSC>
        <PrevArrowSC onClick={moveLeft || moveRight ? () => false : clickLeft}></PrevArrowSC>
        <NextArrowSC onClick={moveLeft || moveRight ? () => false : clickRight}></NextArrowSC>
      </ArrowContainerSC>
      {basePhotoArray?.length > 2 ? (
        <SliderSC>
          <BasePhotoCont>
            {moveLeft ? (
              <CenterLeft>{basePhotoArray && basePhotoArray[basePhotoArray.length - 1]}</CenterLeft>
            ) : moveRight ? (
              <CenterRight>{basePhotoArray && basePhotoArray[basePhotoArray.length - 1]}</CenterRight>
            ) : (
              <CenterNormal>{basePhotoArray && basePhotoArray[basePhotoArray.length - 1]}</CenterNormal>
            )}
          </BasePhotoCont>
          <PhotoContainerSC data-testid="main-view">
            {moveLeft ? (
              <CenterLeft>{basePhotoArray && basePhotoArray[0]}</CenterLeft>
            ) : moveRight ? (
              <CenterRight>{basePhotoArray && basePhotoArray[0]}</CenterRight>
            ) : (
              <CenterNormal>{basePhotoArray && basePhotoArray[0]}</CenterNormal>
            )}
          </PhotoContainerSC>
          <BasePhotoCont>
            {moveLeft ? (
              <CenterLeft>{basePhotoArray && basePhotoArray[1]}</CenterLeft>
            ) : moveRight ? (
              <CenterRight>{basePhotoArray && basePhotoArray[1]}</CenterRight>
            ) : (
              <CenterNormal>{basePhotoArray && basePhotoArray[1]}</CenterNormal>
            )}
          </BasePhotoCont>
        </SliderSC>
      ) : (
        <SliderSC>
          <div>{basePhotoArray && basePhotoArray[0]}</div>
          <div>{basePhotoArray && basePhotoArray[1]}</div>
        </SliderSC>
      )}

      <InfoContainer>
        <PhotoDetail>
          <strong>Rover:</strong> {basePhotoArray && basePhotoArray[0]?.props.photoData.rover.name}
        </PhotoDetail>
        <PhotoDetail>
          <strong>Camera: </strong>
          {basePhotoArray && basePhotoArray[0]?.props.photoData.camera.full_name}
        </PhotoDetail>
        <PhotoDetail>
          <strong>Earth Date: </strong>
          {basePhotoArray && basePhotoArray[0]?.props.photoData.earth_date}
        </PhotoDetail>
      </InfoContainer>
    </>
  );
}

export default Slider;
