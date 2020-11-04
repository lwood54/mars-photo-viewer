import React, { useReducer, Reducer, createContext } from "react";
import { PhotoViewerState } from "./types/interfaces";
import { ACTIONS } from "./types/constants";

// creating a 'store' or context, which can be accessed regardless of parent/child relationship
// and passing of props
// App is wrapped in the provider, which gives all children access to context

// setting some default values for the photo viewer app
const defaultPhotoViewerState: PhotoViewerState = {
  photoData: null,
  selCamera: "fhaz",
  selSol: 54,
  selEarthDate: "",
  earthYear: "",
  earthMonth: "",
  earthDay: "",
  selRoverType: "curiosity",
};
const reducer = (state: PhotoViewerState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case ACTIONS.SET_PHOTO_DATA:
      return { ...state, photoData: action.payload };
    case ACTIONS.SET_CAMERA:
      return { ...state, selCamera: action.payload };
    case ACTIONS.SET_SOL:
      return { ...state, selSol: action.payload };
    case ACTIONS.SET_EARTH_DATE:
      return { ...state, selEarthDate: action.payload };
    case ACTIONS.SET_EARTH_YEAR:
      return { ...state, earthYear: action.payload };
    case ACTIONS.SET_EARTH_MONTH:
      return { ...state, earthMonth: action.payload };
    case ACTIONS.SET_EARTH_DAY:
      return { ...state, earthDay: action.payload };
    case ACTIONS.SET_ROVER_TYPE:
      return { ...state, selRoverType: action.payload };
    default:
      return state;
  }
};
// defines context which can be passed
// export const PhotoViewerContext = createContext<any>(defaultPhotoViewerState);
export const PhotoViewerContext = createContext<any>(defaultPhotoViewerState);

// creating a provider wrapper that will provide initial state
export const PhotoViewerProvider: React.FC = (props): JSX.Element => {
  // creating state within provider, so this can be managed at the context lever
  // const [photoViewerState, setPhotoViewerState] = useState(defaultPhotoViewerState);
  const [state, dispatch] = useReducer<Reducer<PhotoViewerState, { type: string; payload: any }>>(reducer, defaultPhotoViewerState);

  // return <PhotoViewerContext.Provider value={[photoViewerState, setPhotoViewerState]}>{props.children}</PhotoViewerContext.Provider>;
  return <PhotoViewerContext.Provider value={{ state, dispatch }}>{props.children}</PhotoViewerContext.Provider>;
};
