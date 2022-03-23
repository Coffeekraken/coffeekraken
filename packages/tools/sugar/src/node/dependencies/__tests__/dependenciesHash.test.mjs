import "../../../../../../chunk-TD77TI6B.mjs";
import __dependenciesHash from "../dependenciesHash";
import __dirname from "../../fs/dirname";
describe("sugar.node.dependencies.dependenciesHash", () => {
  it("Should generate the same dependency hash for the same dependencies object", async () => {
    const hash1 = await __dependenciesHash({
      data: {
        something: "cool",
        another: "hello"
      }
    });
    const hash2 = await __dependenciesHash({
      data: {
        something: "cool",
        another: "hello"
      }
    });
    expect(hash1).toBe(hash2);
  });
  it("Should generate the same dependency hash for the same dependencies object without recursiveness", async () => {
    const hash1 = await __dependenciesHash({
      files: [`${__dirname()}/data/image1.png`],
      data: {
        something: "cool",
        another: "hello"
      }
    });
    const hash2 = await __dependenciesHash({
      files: [`${__dirname()}/data/image1.png`],
      data: {
        something: "cool",
        another: "hello"
      }
    });
    expect(hash1).toBe(hash2);
  });
  it("Should generate the same dependency hash for the same dependencies object with recursiveness", async () => {
    const hash1 = await __dependenciesHash({
      files: [
        `${__dirname()}/data/image1.png`,
        `${__dirname()}/data/testIndex.js`
      ],
      data: {
        something: "cool",
        another: "hello"
      }
    });
    const hash2 = await __dependenciesHash({
      files: [
        `${__dirname()}/data/image1.png`,
        `${__dirname()}/data/testIndex.js`
      ],
      data: {
        something: "cool",
        another: "hello"
      }
    });
    expect(hash1).toBe(hash2);
  });
});
