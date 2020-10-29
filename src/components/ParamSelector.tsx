import React, { useContext, useState, useEffect } from "react";
import { PhotoViewerContext } from "../PhotoViewerContext";
import styled from "styled-components";

const FormSC = styled.form`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
`;

const ParamBase = styled.div`
	width: 100%;
	margin: 10px;
	select {
		margin-left: 3px;
		padding: 3px;
	}
	input {
		margin-left: 3px;
		padding: 3px;
	}
`;

const EquipmentSC = styled.div`
	width: 30%;
`;

const CameraSC = styled(ParamBase)``;

const RoverSC = styled(ParamBase)``;

const DatesSC = styled.div`
	width: 65%;
`;

const SolSC = styled(ParamBase)``;
const EarthDateSC = styled(ParamBase)``;

function ParamSelector(): JSX.Element {
	// using enum to make clear that these values are required and should not be changed
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

	// accessing photo viewer 'store' with useContext
	const [photoViewerState, setPhotoViewerState] = useContext(PhotoViewerContext);
	// tracking whether user will be searching based on sol or earth_date
	const [useSol, setUseSol] = useState(true);
	// need to know if component has mounted so initial sol default is not
	// overriddent with useEffect resetting photo viewer state
	const [isMounted, setIsMounted] = useState(false);

	// tracks if user is entering info in either sol or earth_date fields
	// using one will reset the other, tracked when dependency changes
	useEffect(() => {
		if (useSol) {
			setPhotoViewerState({ ...photoViewerState, selEarthDate: "", earthYear: "", earthMonth: "", earthDay: "" });
		} else if (!useSol) {
			setPhotoViewerState({ ...photoViewerState, selSol: "" });
		}
	}, [useSol]);

	// if component is already mounted and then user picks earth_date, then set earth_date
	// from the dependencies that are tracked
	useEffect(() => {
		if (isMounted && !useSol) {
			let combDate = `${photoViewerState.earthYear}-${photoViewerState.earthMonth}-${photoViewerState.earthDay}`;
			setPhotoViewerState({ ...photoViewerState, selEarthDate: combDate, selSol: "" });
		}
		setIsMounted(true);
	}, [photoViewerState.earthYear, photoViewerState.earthMonth, photoViewerState.earthDay]);

	// handling sol selection
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

	// handle rover camera that is selected by user
	const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPhotoViewerState({ ...photoViewerState, selCamera: e.target.value });
	};

	// handling earth_date selection fields, checking which field is used, then
	// progressing accordingly with basic validation check.
	// NOTE: further earth_date string check is done in custom fatch call
	const handleEarthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// first of these 3 rovers to land: Spirit (Jan 4, 2004)
		setUseSol(false);
		const val = e.target.value;
		const name = e.target.name;
		switch (name) {
			case "year": // making sure year is long enough and with a certain range
				if (val.length <= 4 && +val <= 2030) {
					setPhotoViewerState({ ...photoViewerState, earthYear: val });
				}
				break;
			case "month": // zero given as option so user can delete to blank
				if (+val >= 0 && +val <= 12) {
					setPhotoViewerState({ ...photoViewerState, earthMonth: val });
				}
				break;
			case "day": // further leap year check is done in cust fetch call
				// 29th will crash if allowed to pass on Feb of non leap year
				if (photoViewerState.earthMonth === "2" && +val <= 29) {
					setPhotoViewerState({ ...photoViewerState, earthDay: val });
				} else if (photoViewerState.earthMonth !== "2" && +val >= 0 && +val <= 31) {
					setPhotoViewerState({ ...photoViewerState, earthDay: val });
				}
				break;
		}
	};

	// simple update if rover type was changed
	const handleRoverChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPhotoViewerState({ ...photoViewerState, selRoverType: e.target.value });
	};

	return (
		<div>
			<FormSC>
				<EquipmentSC>
					<label>
						<RoverSC>
							Rover Name
							<select name="camera" value={photoViewerState.selRoverType} onChange={handleRoverChange}>
								<option value="curiosity">Curiosity</option>
								<option value="opportunity">Opportunity</option>
								<option value="spirit">Spirit</option>
							</select>
						</RoverSC>
					</label>
					<label>
						<CameraSC>
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
						</CameraSC>
					</label>
				</EquipmentSC>
				<DatesSC>
					<label>
						<EarthDateSC>
							Earth Date
							<input type="text" name="year" onChange={handleEarthDateChange} placeholder="earth year" value={photoViewerState.earthYear} />
							<input type="text" name="month" onChange={handleEarthDateChange} placeholder="earth month" value={photoViewerState.earthMonth} />
							<input type="text" name="day" onChange={handleEarthDateChange} placeholder="earth day" value={photoViewerState.earthDay} />
						</EarthDateSC>
					</label>
					<label>
						<SolSC>
							Sol
							<input type="text" onChange={handleSolChange} placeholder="type a number" value={photoViewerState.selSol} />
						</SolSC>
					</label>
				</DatesSC>
			</FormSC>
		</div>
	);
}

export default ParamSelector;
