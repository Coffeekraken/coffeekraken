import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();
var __filename = /* @__PURE__ */ getFilename();
import __findUp from "../findUp";
describe("sugar.node.fs.findUp", () => {
  it("Should find a simple file upward correctly", async () => {
    const res = await __findUp("file.jpg", {
      cwd: `${__dirname}/data/subfolder`
    });
    expect(res[0].path).toBe(`${__dirname}/data/file.jpg`);
  });
  it("Should find some files upward using glob correctly", async () => {
    const res = await __findUp("file.*", {
      cwd: `${__dirname}/data/subfolder`
    });
    expect(res.length).toBe(3);
  });
});
