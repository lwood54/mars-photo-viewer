import React from "react";
import { render } from "@testing-library/react";
import Modal from "./Modal";

const fakeData = {
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

test("modal gets rendered with different data", () => {
  const handleToggle = jest.fn();
  const { getByTestId } = render(<Modal toggleModal={handleToggle} currentData={fakeData} />);
  const rover_data = getByTestId("rover-data");
  const camera_data = getByTestId("camera-data");

  expect(rover_data.textContent).toBe("Rover: curiosity");
  expect(camera_data.textContent).toBe("Camera: fhaz");
});
