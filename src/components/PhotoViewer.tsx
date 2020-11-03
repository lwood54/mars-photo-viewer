import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { PhotoViewerContext } from "../PhotoViewerContext";
import { fetchPhotoData } from "../helpers";
import ParamSelector from "./ParamSelector";
import { PhotoData } from "../types/interfaces";
import Photo from "./Photo";
import Modal from "./Modal";
import Slider from "./Slider";
import SearchButton from "./SearchButton";

// styled-component
const PhotosContainerSC: React.FC = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin: 5px;
`;

const TitleSC = styled.h1`
  text-align: center;
  margin-bottom: 0;
`;

const ViewerControllerSC = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  justify-content: space-around;
  @media (max-width: 1000px) {
    width: 650px;
  }
  @media (max-width: 665px) {
    width: 500px;
  }
`;

const GridViewSC = styled.div`
  height: 50px;
  width: 50px;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-top: 7px;
  position: relative;
  top: -10px;
  right: 0px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    & > div {
      background-color: black;
      border-color: white;
    }
  }
`;
const InsideGridBox = styled.div`
  height: 15px;
  width: 15px;
  margin: 0;
  border: 0.5px solid black;
  border-radius: 3px;
`;

const SliderButtonShell = styled.div`
  height: 40px;
  width: 65px;
  position: relative;
  /* top: -10px; */
  right: 5px;
  /* border: 1px solid black; */
  border-right: 2px solid black;
  border-left: 2px solid black;
  display: flex;
  justify-content: center;
  /* box-sizing: border-box; */
  cursor: pointer;
  &:hover {
    border-right: 4px solid black;
    border-left: 4px solid black;
  }
`;
const InsideSliderShell = styled.div`
  width: 35px;
  height: 35px;
  margin: 0;
  border: 2px solid black;
`;

const NoResultsSC = styled.h2`
  margin-top: 20px;
  text-align: center;
`;

function PhotoViewer(): JSX.Element {
  // using context to call/store data that can be accessed outside of parent/child nodes
  const [photoViewerState, setPhotoViewerState] = useContext(PhotoViewerContext);
  // need to track whether modal should be open
  const [modalOpen, setModalOpen] = useState(false);
  // setting currentData that is selected when images are clicked on
  // data will be sent to Modal for display
  const [currentData, setCurrentData] = useState({});
  // state determines grid or slider view
  const [currentView, setCurrentView] = useState(false);

  // run once on mount
  useEffect(() => {
    getData(photoViewerState.selCamera, photoViewerState.selSol, photoViewerState.selRoverType, photoViewerState.selEarthDate);
  }, []);

  // imported fetchPhotoData helper function, needed additional asyn function
  // in order to await the results of the fetch function call
  const getData = async (camera: string, sol: number, roverType: string, earthDate: string) => {
    const data = await fetchPhotoData(camera, sol, roverType, earthDate);
    // data is set when response returns
    setPhotoViewerState({ ...photoViewerState, photoData: data });
  };

  // calls function to execute on search button press
  const handleSearch = () => {
    getData(photoViewerState.selCamera, photoViewerState.selSol, photoViewerState.selRoverType, photoViewerState.selEarthDate);
  };

  // function that toggles modal, but also accepts optional data argument that
  // can set currentData, which will be passed to the modal
  const toggleModal = (e: React.MouseEvent<HTMLElement>, data?: PhotoData) => {
    setCurrentData(data);
    setModalOpen(!modalOpen);
  };

  const toggleGridView = () => {
    setCurrentView(currentView === "grid" ? "slider" : "grid");
  };

  // creating an array of photo elements to display when fetch returns results
  const photoEls: JSX.Element[] =
    photoViewerState.photoData && // checking if data is truthy before mapping
    photoViewerState.photoData.photos.map((photo: PhotoData, i: number) => {
      // returning individual photo item, passing toggle function help collect
      // data used on whichever photo will be clicked
      return <Photo photoData={photo} key={photo.id} toggleModal={currentView === "grid" ? toggleModal : undefined} currentView={currentView} />;
    });

  return (
    <div>
      {modalOpen ? <Modal toggleModal={toggleModal} currentData={currentData} /> : null}
      <TitleSC>Mars Photo Viewer</TitleSC>
      <ParamSelector />
      <ViewerControllerSC>
        {currentView === "grid" ? (
          <SliderButtonShell onClick={toggleGridView}>
            <InsideSliderShell />
          </SliderButtonShell>
        ) : (
          // <SliderButtonSC onClick={toggleGridView}>Slider</SliderButtonSC>
          <GridViewSC onClick={toggleGridView}>
            <InsideGridBox />
            <InsideGridBox />
            <InsideGridBox />
            <InsideGridBox />
          </GridViewSC>
        )}
        <SearchButton handleClick={handleSearch} />
      </ViewerControllerSC>
      {photoViewerState.photoData?.photos.length >= 1 ? (
        currentView === "grid" ? (
          <PhotosContainerSC>{photoEls}</PhotosContainerSC>
        ) : (
          <Slider photoArray={photoEls} />
        )
      ) : (
        <NoResultsSC>No Results, please try different parameters.</NoResultsSC>
      )}
    </div>
  );
}

export default PhotoViewer;
