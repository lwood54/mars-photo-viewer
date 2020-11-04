import React from "react";
import { render, cleanup } from "@testing-library/react";
import PhotoViewer from "./PhotoViewer";
import { PhotoViewerProvider } from "../../PhotoViewerContext";
import { PhotoViewerState } from "../../types/interfaces";
import { ACTIONS } from "../../types/constants";

// // sample search params
// const stateResultingInSomeData: PhotoViewerState = {
//   photoData: null,
//   selCamera: "fhaz",
//   selSol: 54,
//   selEarthDate: "",
//   earthYear: "",
//   earthMonth: "",
//   earthDay: "",
//   selRoverType: "curiosity",
// };

// const stateResultingInNoData: PhotoViewerState = {
//   photoData: null,
//   selCamera: "mast",
//   selSol: 5,
//   selEarthDate: "",
//   earthYear: "",
//   earthMonth: "",
//   earthDay: "",
//   selRoverType: "opportunity",
// };

afterEach(cleanup);

// NOTE: must pass context to test component
test("renders PhotoViewer component", () => {
  render(
    <PhotoViewerProvider>
      <PhotoViewer />
    </PhotoViewerProvider>
  );
});

test("shows text if no search results", () => {
  const wrapper = render(
    <PhotoViewerProvider>
      <PhotoViewer />
    </PhotoViewerProvider>
  );
  expect(wrapper.getByText("No Results, please try different parameters.")).toBeInTheDocument();
});

test("search button is a button", () => {
  const { getByTestId } = render(
    <PhotoViewerProvider>
      <PhotoViewer />
    </PhotoViewerProvider>
  );
  const searchButton = getByTestId("search-button");
  expect(searchButton.tagName).toBe("BUTTON");
});