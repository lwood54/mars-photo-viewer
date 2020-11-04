import styled, {keyframes} from "styled-components";

// create keyframes for animation injection
export const anim_center_left = keyframes`
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-71vw, 0);
  }
`;
// apply animations, this will be used when items move to the left
export const CenterLeft = styled.div`
  animation: ${anim_center_left} 500ms ease-in;
  animation-fill-mode: forwards;
  @media (max-width: 750px) {
    animation: ${anim_center_left} 300ms ease-in;
  }
`;

export const anim_center_right = keyframes`
	from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(71vw, 0);
  }
`;
export const CenterRight = styled.div`
  animation: ${anim_center_right} 500ms ease-in;
  animation-fill-mode: forwards;
  @media (max-width: 750px) {
    animation: ${anim_center_right} 300ms ease-in;
  }
`;

// container for slider images
export const SliderSC = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -20px;
  img {
    cursor: auto;
  }
`;

// this will be applied if there is not active animation happening
// need to reset class so animations will occur on next click
export const CenterNormal = styled.div`
  animation: none;
`;

export const ArrowContainerSC = styled.div`
  width: 80%;
  margin: 0 auto 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// setting base arrow characteristics that can be manipulated for arrows
export const ArrowBaseSC = styled.span`
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

export const PrevArrowSC = styled(ArrowBaseSC)`
  transform: rotate(-135deg);
`;

export const NextArrowSC = styled(ArrowBaseSC)`
  transform: rotate(45deg);
`;

export const BasePhotoCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: auto;
  }
`;

export const InfoContainer = styled.div`
  margin: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-sizing: border-box;
`;

export const PhotoDetail = styled.div<{ photoCount?: boolean }>`
  width: 50%;
  margin: 0.5rem;
  margin-bottom: 0;
  margin: ${(props) => (props.photoCount ? "auto" : "0 0.5rem 0.25rem")}; // use auto margin for photo count
  text-align: center;
  min-width: 500px;
`;

// container of the display photo
// padding is required in order to push previous and next divs out of viewport
export const PhotoContainerSC = styled(BasePhotoCont)`
  padding: 0 25%;
  @media (max-width: 800px) {
    padding: 0 55%;
  }
`;