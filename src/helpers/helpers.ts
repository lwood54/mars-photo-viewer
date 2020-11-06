import { ACTIONS } from "../types/constants";
import { PhotoViewerState, Action } from "../types/interfaces";

export const fetchPhotoData = async (camera: string, sol: number, roverType: string, earthDate: string) => {
  const api_key = "ho6NPUw7FBguQ4Nsju6c0NKaBS8x6joZjffiuxo6";
  // create string that can be concatenated depending on user selections
  let apiString = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/photos?`;
  if (earthDate) {
    // need to split string in order to check each secdtion matches required
    // pattern so api call doesn't cause app to crash
    const earthDateArr = earthDate.split("-");
    const [year, month, day] = earthDateArr;
    // this confirms string passes check so api call won't crash
    // checking for leap year was required and checking for months that have 30 vs 31 days
    let readyToSubmit = dateCheck(year, month, day);
    if (readyToSubmit) {
      // check earth_date first
      apiString += `&earth_date=${earthDate}`;
    }
  } else if (sol >= 0) {
    apiString += `sol=${sol}`;
  }
  if (camera !== "all") {
    apiString += `&camera=${camera}`;
  }
  apiString += `&api_key=${api_key}`;
  let response = await fetch(`${apiString}`);
  const result = await response.json();
  return result;
};

// application required check for leap year because api request breaks
// if feb 29th on non leap year day selected, or 30th/31st months
export const isLeapYear = (year: string) => {
  const yearNum = +year;
  if (yearNum % 100 === 0) {
    if (yearNum % 400 === 0) {
      return true;
    } else return false;
  } else if (yearNum % 4 === 0) {
    return true;
  } else return false;
};

// check will prevent non functionining string to get applied to api call
export const dateCheck = (year: string, month: string, day: string) => {
  const yearNum = +year;
  const monthNum = +month;
  const dayNum = +day;
  if (yearNum >= 2004 && yearNum <= 2030) {
    if (isLeapYear(year) && monthNum === 2) {
      if (dayNum >= 1 && dayNum <= 29) {
        return true;
      }
      return false;
    } else if (isMonthOf31(monthNum)) {
      if (dayNum >= 1 && dayNum <= 31) {
        return true;
      }
      return false;
    } else if (monthNum === 2) {
      if (dayNum >= 1 && dayNum <= 28) {
        return true;
      }
      return false;
    } else {
      if (dayNum >= 1 && dayNum <= 30) {
        return true;
      }
      return false;
    }
  }
  return false;
};

const isMonthOf31 = (month: number) => {
  return month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12;
};

export const reducer = (state: PhotoViewerState, action: Action) => {
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
