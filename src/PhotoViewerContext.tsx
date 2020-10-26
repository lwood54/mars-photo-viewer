import React, { useState, createContext } from "react";
import { PhotoViewerState } from "./types/interfaces";

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
// defines context which can be passed
export const PhotoViewerContext = createContext<any>(defaultPhotoViewerState);

export const PhotoViewerProvider = (props: any) => {
	// creating state within provider, so this can be managed at the context lever
	const [photoViewerState, setPhotoViewerState] = useState(defaultPhotoViewerState);

	return <PhotoViewerContext.Provider value={[photoViewerState, setPhotoViewerState]}>{props.children}</PhotoViewerContext.Provider>;
};
