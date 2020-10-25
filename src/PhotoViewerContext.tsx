import React, { useState, createContext } from "react";
import { PhotoViewerState } from "./types/interfaces";

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
export const PhotoViewerContext = createContext<any>(defaultPhotoViewerState);

export const PhotoViewerProvider = (props: any) => {
	const [photoViewerState, setPhotoViewerState] = useState(defaultPhotoViewerState);

	return <PhotoViewerContext.Provider value={[photoViewerState, setPhotoViewerState]}>{props.children}</PhotoViewerContext.Provider>;
};
