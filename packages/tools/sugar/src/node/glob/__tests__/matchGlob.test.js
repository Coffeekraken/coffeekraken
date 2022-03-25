import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();
var __filename = /* @__PURE__ */ getFilename();
import __matchGlob from "../matchGlob";
describe("sugar.node.glob.matchGlob", () => {
  it("Should resolve the passed glob correctly", async () => {
    const match = __matchGlob("data/myCoolData.txt", `data/**/*`, {
      cwd: __dirname
    });
    expect(match).toBe(true);
  });
  it("Should resolve the passed glob with a content regex correctly", async () => {
    const match = __matchGlob("data/myCoolData.txt", `data/**/*:/.*@namespace.*/gm`, {
      cwd: __dirname
    });
    expect(match).toBe(true);
  });
  it("Should not match the passed glob with a incorrect content regex correctly", async () => {
    const match = __matchGlob("data/myCoolData.txt", `data/**/*:/.*@naspace.*/gm`, {
      cwd: __dirname
    });
    expect(match).toBe(false);
  });
  it("Should not match the passed glob with a correct and incorrect content regex correctly", async () => {
    const match = __matchGlob("data/myCoolData.txt", [`data/**/*:/.*@naspace.*/gm`, `data/**/*:/.*@namespace.*/gm`], {
      cwd: __dirname
    });
    expect(match).toBe(true);
  });
});
