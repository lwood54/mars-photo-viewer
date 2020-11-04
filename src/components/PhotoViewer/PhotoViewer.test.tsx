import React from "react";
import { render, cleanup } from "@testing-library/react";
import PhotoViewer from "./PhotoViewer";
import { PhotoViewerProvider } from "../../PhotoViewerContext";

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
