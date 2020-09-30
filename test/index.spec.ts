import { youGotServed } from "./../src";
import { expect } from "chai";

describe("log", () => {
  it("Should welcome the dickhead with a very nice message", () => {
    expect(youGotServed()).equals("You Got Served, Dickhead!");
  });
});
