import styled from "styled-components";

// styled-component
export const PhotosContainerSC: React.FC = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin: 5px;
`;

export const TitleSC = styled.h1`
  text-align: center;
  margin-bottom: 0;
`;

export const ViewerControllerSC = styled.div`
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

export const GridViewSC = styled.div`
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

export const InsideGridBox = styled.div`
  height: 15px;
  width: 15px;
  margin: 0;
  border: 0.5px solid black;
  border-radius: 3px;
`;

export const SliderButtonShell = styled.div`
  height: 40px;
  width: 65px;
  position: relative;
  right: 5px;
  border-right: 2px solid black;
  border-left: 2px solid black;
  display: flex;
  justify-content: center;
  cursor: pointer;
  &:hover {
    border-right: 4px solid black;
    border-left: 4px solid black;
  }
`;

export const InsideSliderShell = styled.div`
  width: 35px;
  height: 35px;
  margin: 0;
  border: 2px solid black;
`;

export const NoResultsSC = styled.h2`
  margin-top: 20px;
  text-align: center;
`;