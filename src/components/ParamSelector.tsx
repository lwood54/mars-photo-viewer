import React, { useContext } from "react";
import { PhotoViewerContext } from "../PhotoViewerContext";

function ParamSelector() {
	const [photoViewerState, setPhotoViewerState] = useContext(PhotoViewerContext);

	const handleSolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhotoViewerState({ ...photoViewerState, selSol: +e.target.value });
	};

	const handleCameraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhotoViewerState({ ...photoViewerState, selCamera: e.target.value });
	};

	const handleEarthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("handling earth date change");
	};

	const handleRoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhotoViewerState({ ...photoViewerState, selRoverType: e.target.value });
	};

	// TODO: change input selections to drop downs, try out ENUMS
	// TODO: make clear user needs to pick date by sol or earth date, one will override the other

	return (
		<div>
			<form>
				<label>
					Camera
					<input type="text" onChange={handleCameraChange} />
				</label>
				<label>
					Sol
					<input type="text" onChange={handleSolChange} />
				</label>
				<label>
					Earth Date
					<input type="text" onChange={handleEarthDateChange} />
				</label>
				<label>
					Rover Name
					<input type="text" onChange={handleRoverChange} />
				</label>
			</form>
		</div>
	);
}

export default ParamSelector;
