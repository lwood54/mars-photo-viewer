import React, { useContext, useState, useEffect } from "react";
import { PhotoViewerContext } from "../PhotoViewerContext";
import { isLeapYear } from "../helpers";

function ParamSelector() {
	enum camera {
		all = "all",
		fhaz = "fhaz",
		rhaz = "rhaz",
		mast = "mast",
		chemcam = "chemcam",
		mahli = "mahli",
		mardi = "mardi",
		navcam = "navcam",
		pancam = "pancam",
		minites = "minites",
	}

	const [photoViewerState, setPhotoViewerState] = useContext(PhotoViewerContext);
	const [useSol, setUseSol] = useState(true);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		if (useSol) {
			setPhotoViewerState({ ...photoViewerState, selEarthDate: "", earthYear: "", earthMonth: "", earthDay: "" });
		} else if (!useSol) {
			setPhotoViewerState({ ...photoViewerState, selSol: "" });
		}
	}, [useSol]);

	useEffect(() => {
		console.log("running constantly?");
		if (isMounted && !useSol) {
			let combDate = `${photoViewerState.earthYear}-${photoViewerState.earthMonth}-${photoViewerState.earthDay}`;
			setPhotoViewerState({ ...photoViewerState, selEarthDate: combDate, selSol: "" });
		}
		setIsMounted(true);
	}, [photoViewerState.earthYear, photoViewerState.earthMonth, photoViewerState.earthDay]);

	const handleSolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUseSol(true);
		let selNum = e.target.value;
		// if sol input, then earthDate reset
		if (+selNum >= 0) {
			setPhotoViewerState({ ...photoViewerState, selSol: selNum });
		} else {
			setPhotoViewerState({ ...photoViewerState, selSol: "" });
		}
	};

	const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPhotoViewerState({ ...photoViewerState, selCamera: e.target.value });
	};

	const handleEarthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// earth date landing of first mars rover: July 4, 1997
		setUseSol(false);
		const val = e.target.value;
		const name = e.target.name;
		switch (name) {
			case "year":
				if (val.length <= 4 && +val <= 2030) {
					setPhotoViewerState({ ...photoViewerState, earthYear: val });
				}
				break;
			case "month":
				if (+val >= 0 && +val <= 12) {
					setPhotoViewerState({ ...photoViewerState, earthMonth: val });
				}
				break;
			case "day":
				if (photoViewerState.earthMonth === "2" && +val <= 29) {
					setPhotoViewerState({ ...photoViewerState, earthDay: val });
				} else if (photoViewerState.earthMonth !== "2" && +val >= 0 && +val <= 31) {
					setPhotoViewerState({ ...photoViewerState, earthDay: val });
				}
				break;
		}
	};

	const handleRoverChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPhotoViewerState({ ...photoViewerState, selRoverType: e.target.value });
	};

	return (
		<div>
			<form>
				<label>
					Camera
					<select name="camera" value={photoViewerState.selCamera} onChange={handleCameraChange}>
						<option value={camera.all}>{camera.all}</option>
						<option value={camera.fhaz}>{camera.fhaz}</option>
						<option value={camera.rhaz}>{camera.rhaz}</option>
						<option value={camera.mast}>{camera.mast}</option>
						<option value={camera.chemcam}>{camera.chemcam}</option>
						<option value={camera.mahli}>{camera.mahli}</option>
						<option value={camera.mardi}>{camera.mardi}</option>
						<option value={camera.navcam}>{camera.navcam}</option>
						<option value={camera.pancam}>{camera.pancam}</option>
						<option value={camera.minites}>{camera.minites}</option>
					</select>
				</label>
				<label>
					Sol
					<input type="text" onChange={handleSolChange} placeholder="type a number" value={photoViewerState.selSol} />
				</label>
				<label>
					Earth Date
					<input type="text" name="year" onChange={handleEarthDateChange} placeholder="earth year" value={photoViewerState.earthYear} />
					<input type="text" name="month" onChange={handleEarthDateChange} placeholder="earth month" value={photoViewerState.earthMonth} />
					<input type="text" name="day" onChange={handleEarthDateChange} placeholder="earth day" value={photoViewerState.earthDay} />
				</label>
				<label>
					Rover Name
					{/* <input type="text" onChange={handleRoverChange} /> */}
					<select name="camera" value={photoViewerState.selCamera} onChange={handleRoverChange}>
						<option value="curiosity">Curiosity</option>
						<option value="opportunity">Opportunity</option>
						<option value="spirit">Spirit</option>
					</select>
				</label>
			</form>
		</div>
	);
}

export default ParamSelector;
