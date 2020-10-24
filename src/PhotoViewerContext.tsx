import React, { useState, createContext } from "react";
import { PhotoViewerState } from "./types/interfaces";

const defaultPhotoViewerState: PhotoViewerState = {
	photoData: null,
	selCamera: "fhaz",
	selSol: 21,
	selRoverType: "curiosity",
	selEarthDate: "",
};
export const PhotoViewerContext = createContext<any>(defaultPhotoViewerState);

export const PhotoViewerProvider = (props: any) => {
	const [photoViewerState, setPhotoViewerState] = useState(defaultPhotoViewerState);

	return <PhotoViewerContext.Provider value={[photoViewerState, setPhotoViewerState]}>{props.children}</PhotoViewerContext.Provider>;
};
