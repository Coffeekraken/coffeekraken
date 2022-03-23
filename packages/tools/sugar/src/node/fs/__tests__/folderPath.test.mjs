import {
  __dirname
} from "../../../../../../chunk-TD77TI6B.mjs";
import __folderPath from "../folderPath";
describe("sugar.node.fs.folderPath", () => {
  it("Should get a simple folder path correctly", () => {
    const path = __folderPath(`${__dirname}/data/file.jpg`);
    expect(path).toBe(`${__dirname}/data`);
  });
  it("Should return false when checking for a non existing folder", () => {
    const path = __folderPath(`${__dirname}/data/file111.jpg`, true);
    expect(path).toBe(false);
  });
});
