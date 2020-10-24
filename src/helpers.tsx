export const fetchPhotoData = async (camera: string, sol: number, roverType: string, earthDate: string) => {
	const api_key = "ho6NPUw7FBguQ4Nsju6c0NKaBS8x6joZjffiuxo6";
	let apiString = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/photos?`;

	if (sol >= 0) {
		apiString += `sol=${sol}`;
	} else if (earthDate) {
		apiString += `&earth_date=${earthDate}`;
	}
	if (camera) {
		apiString += `&camera=${camera}`;
	}
	apiString += `&api_key=${api_key}`;
	console.log("api string: ", apiString);
	let response = await fetch(`${apiString}`);
	const result = await response.json();
	console.log("result from fetchPhotoData: ", result);
	return result;
};
