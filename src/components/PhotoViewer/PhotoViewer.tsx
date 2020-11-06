import React, { useEffect, useContext, useState } from "react";
import { PhotoViewerContext } from "../../PhotoViewerContext";
import { fetchPhotoData } from "../../helpers/helpers";
import ParamSelector from "../ParamSelector/ParamSelector";
import { PhotoData } from "../../types/interfaces";
import Photo from "../Photo/Photo";
import Modal from "../Modal/Modal";
import Slider from "../Slider/Slider";
import SearchButton from "../SearchButton/SearchButton";
import { ACTIONS, viewOptions } from "../../types/constants";
import {
  TitleSC,
  ViewerControllerSC,
  SliderButtonShell,
  InsideSliderShell,
  GridViewSC,
  InsideGridBox,
  PhotosContainerSC,
  NoResultsSC,
} from "./PhotoViewer.styles";

function PhotoViewer(): JSX.Element {
  // using context to call/store data that can be accessed outside of parent/child nodes
  const { state, dispatch } = useContext(PhotoViewerContext);
  // need to track whether modal should be open
  const [modalOpen, setModalOpen] = useState(false);
  // setting currentData that is selected when images are clicked on
  // data will be sent to Modal for display
  const [currentData, setCurrentData] = useState<PhotoData | undefined>();
  // state determines grid or slider view
  const [currentView, setCurrentView] = useState<viewOptions.GRID | viewOptions.SLIDER>(viewOptions.SLIDER);

  // run once on mount
  useEffect(() => {
    getData(state.selCamera, state.selSol, state.selRoverType, state.selEarthDate);
  }, []);

  // imported fetchPhotoData helper function, needed additional asyn function
  // in order to await the results of the fetch function call
  const getData = async (camera: string, sol: number, roverType: string, earthDate: string) => {
    const data = await fetchPhotoData(camera, sol, roverType, earthDate);
    // data is set when response returns
    dispatch({ type: ACTIONS.SET_PHOTO_DATA, payload: data });
  };

  // calls function to execute on search button press
  const handleSearch = () => {
    getData(state.selCamera, state.selSol, state.selRoverType, state.selEarthDate);
  };

  // function that toggles modal, but also accepts optional data argument that
  // can set currentData, which will be passed to the modal
  const toggleModal = (e: React.MouseEvent<HTMLElement>, data?: PhotoData) => {
    setCurrentData(data);
    setModalOpen(!modalOpen);
  };

  const toggleGridView = () => {
    setCurrentView(currentView === viewOptions.GRID ? viewOptions.SLIDER : viewOptions.GRID);
  };

  // creating an array of photo elements to display when fetch returns results
  const photoEls: JSX.Element[] =
    state.photoData && // checking if data is truthy before mapping
    state.photoData.photos.map((photo: PhotoData, i: number) => {
      // returning individual photo item, passing toggle function help collect
      // data used on whichever photo will be clicked
      return (
        <Photo photoData={photo} key={photo.id} toggleModal={currentView === viewOptions.GRID ? toggleModal : undefined} currentView={currentView} />
      );
    });

  return (
    <div>
      {modalOpen ? <Modal toggleModal={toggleModal} currentData={currentData} /> : null}
      <TitleSC>Mars Photo Viewer</TitleSC>
      <ParamSelector />
      <ViewerControllerSC>
        {currentView === viewOptions.GRID ? (
          <SliderButtonShell onClick={toggleGridView}>
            <InsideSliderShell />
          </SliderButtonShell>
        ) : (
          <GridViewSC onClick={toggleGridView}>
            <InsideGridBox />
            <InsideGridBox />
            <InsideGridBox />
            <InsideGridBox />
          </GridViewSC>
        )}
        <SearchButton handleClick={handleSearch} />
      </ViewerControllerSC>
      {state.photoData?.photos.length >= 1 ? (
        currentView === viewOptions.GRID ? (
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
