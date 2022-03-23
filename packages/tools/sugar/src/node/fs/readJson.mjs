import {
  __toESM
} from "../../../../../chunk-TD77TI6B.mjs";
import __fs from "fs";
function readJson(path) {
  if (!__fs.existsSync(path)) {
    throw new Error(`<red>[readJson]</red> Sorry but the passed file path "<cyan>${path}</cyan>" does not exists...`);
  }
  return new Promise(async (resolve, reject) => {
    const json = (await Promise.resolve().then(() => __toESM(require(path)))).default;
    resolve(json);
  });
}
export {
  readJson as default
};
