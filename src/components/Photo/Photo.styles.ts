import styled from "styled-components";
import {viewOptions} from "../../types/constants";

// TS issues with styled-components when passing props unless
// SC is defined by type
type PhotoItemDiv = {
  currentView: viewOptions.GRID | viewOptions.SLIDER;
};

// styled-component decorating phot item
export const PhotoItem = styled.div<PhotoItemDiv>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: ${(props) => (props.currentView === viewOptions.GRID ? "250px" : "50vw")};
  min-height: ${(props) => (props.currentView === viewOptions.GRID ? "auto" : "500px")};
  margin: 5px;
  flex-wrap: wrap;
  box-sizing: border-box;
  cursor: pointer;
  img {
    max-width: ${(props) => (props.currentView === viewOptions.GRID ? "100%" : "65%")};
    height: auto;
    @media (min-width: 1775px) {
      max-width: ${(props) => (props.currentView === viewOptions.GRID ? "100%" : "550px")};
    }
    @media (max-width: 1300px) {
      max-width: ${(props) => (props.currentView === viewOptions.GRID ? "auto" : "400px")};
    }
    @media (max-width: 775px) {
      /* max-width: ${(props) => (props.currentView === viewOptions.GRID ? "auto" : "350px")}; */
      width: 100%;
    }
  }
`;