import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();
var __filename = /* @__PURE__ */ getFilename();
import __dep from "../../dependencyList";
describe("sugar.node.fs.dependencyList", () => {
  it("Should get correctly the dependencies from the passed file", async () => {
    const deps = await __dep(`${__dirname}/data/index.js`);
    expect(deps.list[0]).toBe(`${__dirname}/data/dependency.js`);
  });
  it("Should watch correctly an update on the dependencies files", async () => {
    const deps = __dep(`${__dirname}/data/index.js`, {
      watch: true
    });
    deps.on("update");
    expect(deps.list[0]).toBe(`${__dirname}/data/dependency.js`);
  });
});
