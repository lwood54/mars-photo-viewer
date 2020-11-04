import React, { useContext, useState, useEffect } from "react";
import { PhotoViewerContext } from "../../PhotoViewerContext";
import { camera, ACTIONS } from "../../types/constants";
import { FormSC, DatesSC, EarthDateSC, SolSC, EquipmentSC, RoverSC, CameraSC } from "./ParamSelector.styles";

function ParamSelector(): JSX.Element {
  // accessing photo viewer 'store' with useContext
  // const [photoViewerState, setPhotoViewerState] = useContext(PhotoViewerContext);
  const { state, dispatch } = useContext(PhotoViewerContext);
  // tracking whether user will be searching based on sol or earth_date
  const [useSol, setUseSol] = useState(true);
  // need to know if component has mounted so initial sol default is not
  // overriddent with useEffect resetting photo viewer state
  const [isMounted, setIsMounted] = useState(false);

  // tracks if user is entering info in either sol or earth_date fields
  // using one will reset the other, tracked when dependency changes
  useEffect(() => {
    if (useSol) {
      dispatch({ type: ACTIONS.SET_EARTH_DATE, payload: "" });
      dispatch({ type: ACTIONS.SET_EARTH_YEAR, payload: "" });
      dispatch({ type: ACTIONS.SET_EARTH_MONTH, payload: "" });
      dispatch({ type: ACTIONS.SET_EARTH_DAY, payload: "" });
    } else if (!useSol) {
      dispatch({ type: ACTIONS.SET_SOL, payload: "" });
    }
  }, [useSol]);

  // if component is already mounted and then user picks earth_date, then set earth_date
  // from the dependencies that are tracked
  useEffect(() => {
    if (isMounted && !useSol) {
      let combDate = `${state.earthYear}-${state.earthMonth}-${state.earthDay}`;
      dispatch({ type: ACTIONS.SET_EARTH_DATE, payload: combDate });
      dispatch({ type: ACTIONS.SET_SOL, payload: "" });
    }
    setIsMounted(true);
  }, [state.earthYear, state.earthMonth, state.earthDay]);

  // handling sol selection
  const handleSolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseSol(true);
    let selNum = e.target.value;
    // if sol input, then earthDate reset
    if (+selNum >= 0) {
      dispatch({ type: ACTIONS.SET_SOL, payload: selNum });
    } else {
      dispatch({ type: ACTIONS.SET_SOL, payload: "" });
    }
  };

  // handle rover camera that is selected by user
  const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: ACTIONS.SET_CAMERA, payload: e.target.value });
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
          dispatch({ type: ACTIONS.SET_EARTH_YEAR, payload: val });
        }
        break;
      case "month": // zero given as option so user can delete to blank
        if (+val >= 0 && +val <= 12) {
          dispatch({ type: ACTIONS.SET_EARTH_MONTH, payload: val });
        }
        break;
      case "day": // further leap year check is done in cust fetch call
        // 29th will crash if allowed to pass on Feb of non leap year
        if (state.earthMonth === "2" && +val <= 29) {
          dispatch({ type: ACTIONS.SET_EARTH_DAY, payload: val });
        } else if (state.earthMonth !== "2" && +val >= 0 && +val <= 31) {
          dispatch({ type: ACTIONS.SET_EARTH_DAY, payload: val });
        }
        break;
    }
  };

  // simple update if rover type was changed
  const handleRoverChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: ACTIONS.SET_ROVER_TYPE, payload: e.target.value });
  };

  return (
    <div>
      <FormSC>
        <DatesSC>
          <label>
            <EarthDateSC>
              <h5>Earth Date</h5>
              <input type="text" name="year" onChange={handleEarthDateChange} placeholder="earth year" value={state.earthYear} />
              <input type="text" name="month" onChange={handleEarthDateChange} placeholder="earth month" value={state.earthMonth} />
              <input type="text" name="day" onChange={handleEarthDateChange} placeholder="earth day" value={state.earthDay} />
            </EarthDateSC>
          </label>
          <label>
            <SolSC>
              <h5>Sol</h5>
              <input type="text" onChange={handleSolChange} placeholder="type a number" value={state.selSol} />
            </SolSC>
          </label>
        </DatesSC>
        <EquipmentSC>
          <label>
            <RoverSC>
              <h5>Rover Name</h5>
              <select name="camera" value={state.selRoverType} onChange={handleRoverChange}>
                <option value="curiosity">Curiosity</option>
                <option value="opportunity">Opportunity</option>
                <option value="spirit">Spirit</option>
              </select>
            </RoverSC>
          </label>
          <label>
            <CameraSC>
              <h5>Camera</h5>
              <select name="camera" value={state.selCamera} onChange={handleCameraChange}>
                <option value={camera.ALL}>{camera.ALL}</option>
                <option value={camera.FHAZ}>{camera.FHAZ}</option>
                <option value={camera.RHAZ}>{camera.RHAZ}</option>
                <option value={camera.MAST}>{camera.MAST}</option>
                <option value={camera.CHEMCAM}>{camera.CHEMCAM}</option>
                <option value={camera.MAHLI}>{camera.MAHLI}</option>
                <option value={camera.MARDI}>{camera.MARDI}</option>
                <option value={camera.NAVCAM}>{camera.NAVCAM}</option>
                <option value={camera.PANCAM}>{camera.PANCAM}</option>
                <option value={camera.MINITES}>{camera.MINITES}</option>
              </select>
            </CameraSC>
          </label>
        </EquipmentSC>
      </FormSC>
    </div>
  );
}

export default ParamSelector;
