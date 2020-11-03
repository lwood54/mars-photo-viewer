import { isLeapYear, dateCheck } from "./helpers";

test("confirm a leap year returns true", () => {
  expect(isLeapYear("2020")).toBeTruthy();
});

test("confirm non leap year returns false", () => {
  expect(isLeapYear("2018")).toBeFalsy();
});

test("leap year day on wrong year to return falsy", () => {
  expect(dateCheck("2019", "2", "29")).toBeFalsy();
});

test("leap year day on correct year to return truthy", () => {
  expect(dateCheck("2012", "2", "29")).toBeTruthy();
});

test("correct date in range to return truthy", () => {
  expect(dateCheck("2020", "3", "11")).toBeTruthy();
});
