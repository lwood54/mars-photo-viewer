export interface Camera {
	full_name: string;
	id: number;
	name: string;
	rover_id: number;
}

export interface Rover {
	id: number;
	landing_date: string;
	launch_date: string;
	name: string;
	status: string;
}

export interface PhotoData {
	camera?: Camera;
	earth_date?: string;
	id: number;
	img_src: string;
	rover: Rover;
	sol?: number;
}

export interface FetchedData {
	photos: PhotoData[];
}

export interface PhotoViewerState {
	photoData: PhotoData | null;
	selCamera: string;
	selSol: number;
	selEarthDate: string;
	selRoverType: string;
}
