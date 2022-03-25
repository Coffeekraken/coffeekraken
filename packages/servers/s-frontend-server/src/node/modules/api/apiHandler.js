var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import __namespaceCompliant from "@coffeekraken/sugar/shared/string/namespaceCompliant";
import __SDocMap from "@coffeekraken/s-docmap";
import __SDocblock from "@coffeekraken/s-docblock";
import __SPromise from "@coffeekraken/s-promise";
import __fs from "fs";
import __SViewRenderer from "@coffeekraken/s-view-renderer";
import { page404 } from "@coffeekraken/s-view-renderer";
function api(req, res, settings = {}) {
  return new __SPromise(async ({ resolve, reject }) => {
    const docmap = new __SDocMap();
    const docmapJson = await docmap.read();
    const namespace = req.path.replace(/^\/api\//, "").trim();
    const docmapObj = docmapJson.map[namespace];
    if (!docmapObj || !__fs.existsSync(docmapObj.path)) {
      const error = await page404(__spreadProps(__spreadValues({}, res.templateData || {}), {
        title: `API "${req.path}" not found`,
        body: `The API item "${req.path}" you requested does not exists...`
      }));
      res.type("text/html");
      res.status(404);
      res.send(error.value);
      return reject(error.value);
    }
    const docblocksInstance = new __SDocblock(docmapObj.path, {
      docblock: {
        renderMarkdown: true,
        filter: (docblock) => {
          if (__namespaceCompliant(`${docblock.namespace}.${docblock.name}`) === namespace) {
            return true;
          }
          return false;
        }
      }
    });
    await docblocksInstance.parse();
    const docblocks = docblocksInstance.toObject();
    const docView = new __SViewRenderer("pages.api.api");
    const pageHtml = await docView.render(__spreadProps(__spreadValues({}, res.templateData || {}), {
      docblocks
    }));
    res.status(200);
    res.type("text/html");
    res.send(pageHtml.value);
    resolve(pageHtml.value);
  });
}
export {
  api as default
};
