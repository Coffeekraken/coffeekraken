import {
  __dirname
} from "../../../../../chunk-TD77TI6B.mjs";
import __SFile from "../SFile";
describe("s-file.SFile", () => {
  it("Should instanciate correctly a simple json file", () => {
    const file = new __SFile(`${__dirname}/test.json`);
    const json = file.toObject();
    expect(json.exists).toBe(true);
    expect(json.extension).toBe("json");
    expect(json.content).toEqual({
      something: "cool"
    });
    expect(json.path).not.toBeUndefined();
    expect(json.cwd).not.toBeUndefined();
    expect(json.dirPath).not.toBeUndefined();
    expect(json.stats).not.toBeUndefined();
    expect(json.relPath).toBe("packages/core/s-file/src/node/__tests__/test.json");
    expect(json.name).toBe("test.json");
  });
});
