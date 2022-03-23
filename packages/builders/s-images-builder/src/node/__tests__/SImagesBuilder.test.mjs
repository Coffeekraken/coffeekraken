import {
  __dirname
} from "../../../../../chunk-TD77TI6B.mjs";
import __SImagesBuilder from "../SImagesBuilder";
import __packageTmpDir from "@coffeekraken/sugar/node/path/packageTmpDir";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
describe("@coffeekraken.s-images-builder.SImagesBuilder", () => {
  it("Should compress simple jpg files correctly", async () => {
    await __SSugarConfig.load();
    const outDir = `${__packageTmpDir()}/SImagesBuilder/tests`;
    const builder = new __SImagesBuilder({
      imagesBuilder: {
        resolveGlob: {
          defaultExcludes: false
        }
      }
    });
    const promise = builder.build({
      glob: "**/*.jpg",
      inDir: `${__dirname}/__data__/`,
      outDir,
      quality: 20,
      width: 100,
      webp: false
    });
    promise.on("log", (log) => {
      console.log(log.value);
    });
    await promise;
  });
});
