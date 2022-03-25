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
import __SDocMap from "@coffeekraken/s-docmap";
import __SDocblock from "@coffeekraken/s-docblock";
import __SPromise from "@coffeekraken/s-promise";
import __fs from "fs";
import __SLog from "@coffeekraken/s-log";
import __SViewRenderer from "@coffeekraken/s-view-renderer";
import { page404 } from "@coffeekraken/s-view-renderer";
import __scrapeUrl from "@coffeekraken/sugar/node/og/scrapeUrl";
import __SBench from "@coffeekraken/s-bench";
function styleguide(req, res, settings = {}) {
  return new __SPromise(async ({ resolve, reject, emit }) => {
    __SBench.start("handlers.styleguide");
    __SBench.step("handlers.styleguide", "beforeDocmapRead");
    const docmap = new __SDocMap();
    const docmapJson = await docmap.read();
    const styleguideMenu = docmapJson.menu.custom.styleguide;
    __SBench.step("handlers.styleguide", "afterDocmapRead");
    const styleguideObj = styleguideMenu.slug[req.path];
    if (!styleguideObj || !__fs.existsSync(styleguideObj.docmap.path)) {
      const error = await page404(__spreadProps(__spreadValues({}, res.templateData || {}), {
        title: `Styleguide "${req.path}" not found`,
        body: `The styleguide "${req.path}" you requested does not exists...`
      }));
      res.type("text/html");
      res.status(404);
      res.send(error.value);
      return reject(error.value);
    }
    const finalReqPath = `/styleguide/${req.path.split("/styleguide/")[1]}`;
    __SBench.step("handlers.styleguide", "beforeDocblockParsing");
    const docblocksInstance = new __SDocblock(styleguideObj.docmap.path, {
      docblock: {
        renderMarkdown: false,
        filterByTag: {
          menu: (value) => {
            if (!value || typeof value !== "string")
              return false;
            const parts = value.split(/\s{2,99999999}/);
            if (parts.length >= 2 && parts[1] === finalReqPath)
              return true;
            return false;
          }
        }
      }
    });
    await docblocksInstance.parse();
    const docblocks = docblocksInstance.toObject();
    if (docblocks.length) {
      if (docblocks[0].see) {
        for (let i = 0; i < docblocks[0].see.length; i++) {
          emit("log", {
            type: __SLog.TYPE_INFO,
            value: `<yellow>[og]</yellow> Scraping opengraph from url "<cyan>${docblocks[0].see[i].url}</cyan>"`
          });
          docblocks[0].see[i].og = await __scrapeUrl(docblocks[0].see[i].url);
        }
      }
    }
    __SBench.step("handlers.styleguide", "afterDocblockParsing");
    __SBench.step("handlers.styleguide", "beforeViewRendering");
    const docView = new __SViewRenderer("pages.styleguide.styleguide");
    const pageHtml = await docView.render(__spreadProps(__spreadValues({}, res.templateData || {}), {
      docblocks
    }));
    __SBench.step("handlers.styleguide", "afterViewRendering");
    __SBench.end("handlers.styleguide", {}).log();
    res.status(200);
    res.type("text/html");
    res.send(pageHtml.value);
    resolve(pageHtml.value);
  });
}
export {
  styleguide as default
};
