import React from "react";
import SearchButton from "./SearchButton";
import { fireEvent, render } from "@testing-library/react";

test("click on search button calls function", () => {
  const handleClick = jest.fn();
  const { getByTestId } = render(<SearchButton handleClick={handleClick} />);
  fireEvent.click(getByTestId("search-button"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
