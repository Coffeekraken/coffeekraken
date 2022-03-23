import "../../../../chunk-TD77TI6B.mjs";
import __SDocmap from "@coffeekraken/s-docmap";
import __SPromise from "@coffeekraken/s-promise";
import __fileHash from "@coffeekraken/sugar/node/fs/fileHash";
import __fs from "fs";
import __SLog from "@coffeekraken/s-log";
function sitemap() {
  return new __SPromise(async ({ resolve, reject, emit }) => {
    const items = [
      {
        loc: "/config/explorer"
      }
    ];
    const hashesByPath = {};
    const docmapInstance = new __SDocmap();
    const docmapJson = await docmapInstance.read();
    for (let [namespace, docmapObj] of Object.entries(docmapJson.map)) {
      let hash = hashesByPath[docmapObj.path];
      if (!hash) {
        if (!__fs.existsSync(docmapObj.path)) {
          emit("log", {
            type: __SLog.TYPE_WARN,
            value: `<red>[sitemap]</red> The file "<cyan>${docmapObj.path}</cyan>" has been skipped cause it does not exists...`
          });
        } else {
          hash = __fileHash(docmapObj.path);
          hashesByPath[docmapObj.path] = hash;
        }
      }
      items.push({
        loc: `/api/${namespace}`,
        integrity: hash
      });
    }
    resolve(items);
  });
}
export {
  sitemap as default
};
