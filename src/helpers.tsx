export const fetchPhotoData = async (camera: string, sol: number = 0, roverType: string, earthDate: string) => {
	const api_key = "ho6NPUw7FBguQ4Nsju6c0NKaBS8x6joZjffiuxo6";
	let apiString = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/photos?`;
	if (earthDate) {
		const earthDateArr = earthDate.split("-");
		const year = earthDateArr[0];
		const month = earthDateArr[1];
		const day = earthDateArr[2];
		let readyToSubmit = dateCheck(year, month, day);
		if (readyToSubmit) {
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
	if (+year >= 1997 && +year <= 2030) {
		if (isLeapYear(year) && month === "2") {
			if (+day >= 1 && +day <= 29) {
				return true;
			} else return false;
		} else if (month === "1" || month === "3" || month === "5" || month === "7" || month === "8" || month === "10" || month === "12") {
			if (+day >= 1 && +day <= 31) {
				return true;
			} else return false;
		} else if (month === "2") {
			if (+day >= 1 && +day <= 28) {
				return true;
			} else return false;
		} else {
			if (+day >= 1 && +day <= 30) {
				return true;
			} else return false;
		}
	} else {
		return false;
	}
};
