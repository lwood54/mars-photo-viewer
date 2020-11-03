import React from "react";
import { render } from "@testing-library/react";
import Slider from "./Slider";
import Photo from "./Photo";

const mockPhoto1 = {
  camera: {
    full_name: "fhaz",
    id: 55,
    name: "front hazard camera",
    rover_id: 3,
  },
  earth_date: "string",
  id: 123,
  img_src: "photo_src_string",
  rover: {
    id: 22,
    landing_date: "2004-1-1",
    launch_date: "2003-10-5",
    name: "curiosity",
    status: "active",
  },
  sol: 34,
};

const mockPhoto2 = {
  amera: {
    full_name: "fhaz",
    id: 77,
    name: "front hazard camera",
    rover_id: 3,
  },
  earth_date: "2012-3-11",
  id: 345,
  img_src: "photo_src_string",
  rover: {
    id: 33,
    landing_date: "2005-2-2",
    launch_date: "2004-11-15",
    name: "curiosity",
    status: "active",
  },
  sol: 54,
};

const mockPhoto3 = {
  amera: {
    full_name: "front hazard camera",
    id: 88,
    name: "fhaz",
    rover_id: 2,
  },
  earth_date: "2013-4-12",
  id: 456,
  img_src: "another_photo_src_string",
  rover: {
    id: 44,
    landing_date: "2006-3-3",
    launch_date: "2005-12-1",
    name: "opportunity",
    status: "active",
  },
  sol: 876,
};

const mockPhotoArray = [
  <Photo photoData={mockPhoto1} key={1} currentView={"slider"} />,
  <Photo photoData={mockPhoto2} key={2} currentView={"slider"} />,
  <Photo photoData={mockPhoto3} key={3} currentView={"slider"} />,
];

// assert that given some data, slider will render that info
test("given data render slider pic with data", () => {
  const { getByTestId } = render(<Slider photoArray={mockPhotoArray} />);
  const main_view = getByTestId("main-view");
  console.log("main_view: ", main_view.textContent);
});

// test prevArrow click, show display photo as previous index
// test click, then test results of click to see if array moved

// test nextArrow click, show display photo as next index
