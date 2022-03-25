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
import __SDocblock from "@coffeekraken/s-docblock";
import __SDocMap from "@coffeekraken/s-docmap";
import __SPromise from "@coffeekraken/s-promise";
import __SViewRenderer, { page404 } from "@coffeekraken/s-view-renderer";
import __scrapeUrl from "@coffeekraken/sugar/node/og/scrapeUrl";
let _docmapJson;
function doc(req, res, settings = {}) {
  return new __SPromise(async ({ resolve, reject, pipe }) => {
    const docMap = new __SDocMap();
    const requestedNamespace = req.params["0"].trim();
    const readPromise = docMap.read();
    pipe(readPromise);
    _docmapJson = await readPromise;
    if (!_docmapJson.map[requestedNamespace]) {
      const html = await page404(__spreadProps(__spreadValues({}, res.templateData || {}), {
        title: `Documentation "${requestedNamespace}" not found`,
        body: `The documentation "${requestedNamespace}" you requested does not exists...`
      }));
      res.type("text/html");
      res.status(404);
      res.send(html.value);
      return reject(html.value);
    }
    const docblocksInstance = new __SDocblock(_docmapJson.map[requestedNamespace].path, {});
    await docblocksInstance.parse();
    const docblocks = docblocksInstance.toObject();
    if (!docblocks.length) {
      const html = await page404(__spreadProps(__spreadValues({}, res.templateData || {}), {
        title: `Documentation "${requestedNamespace}" not found`,
        body: `The documentation "${requestedNamespace}" you requested does not exists...`
      }));
      res.type("text/html");
      res.status(404);
      res.send(html.value);
      return reject(html.value);
    }
    await new Promise((resolve2, reject2) => {
      let pendingRequests = 0;
      docblocks.forEach((block, i) => {
        if (block.see) {
          block.see.forEach((seeObj, j) => {
            pendingRequests++;
            __scrapeUrl(seeObj.url).then((results) => {
              seeObj.og = results;
              pendingRequests--;
              if (!pendingRequests) {
                resolve2();
              }
            }).catch((error) => {
              pendingRequests--;
              if (!pendingRequests) {
                resolve2();
              }
            });
          });
        } else {
          if (i === docblocks.length - 1 && !pendingRequests) {
            resolve2();
          }
        }
      });
    });
    const docView = new __SViewRenderer("pages.doc.doc");
    const pageHtml = await docView.render(__spreadProps(__spreadValues({}, res.templateData || {}), {
      docblocks
    }));
    res.type("text/html");
    res.status(200);
    res.send(pageHtml.value);
    resolve(pageHtml.value);
  });
}
export {
  doc as default
};
