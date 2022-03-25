import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();
var __filename = /* @__PURE__ */ getFilename();
import __resolveGlob from "../resolveGlob";
describe("sugar.node.glob.resolveGlob", () => {
  it("Should resolve the passed glob correctly", (done) => {
    const files = __resolveGlob(`data/**/*`, {
      cwd: __dirname
    });
    const file = files[0];
    expect(file.path.includes("src/node/glob/__tests__/data/myCoolData.txt")).toBe(true);
    expect(file.cwd.includes("src/node/glob/__tests__")).toBe(true);
    expect(file.relPath).toBe("data/myCoolData.txt");
    done();
  });
});
