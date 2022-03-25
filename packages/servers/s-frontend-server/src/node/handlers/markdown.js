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
import __SPromise from "@coffeekraken/s-promise";
import __SViewRenderer from "@coffeekraken/s-view-renderer";
import __SMarkdownBuilder from "@coffeekraken/s-markdown-builder";
import { page404 } from "@coffeekraken/s-view-renderer";
function markdown(req, res, settings = {}) {
  return new __SPromise(async ({ resolve, reject, pipe, pipeErrors }) => {
    var _a, _b;
    const docmap = new __SDocMap();
    const docmapJson = await docmap.read();
    const menu = docmapJson.menu;
    let html;
    let slugObj = menu.slug[req.url];
    if (!slugObj) {
      Object.keys((_a = menu.packages) != null ? _a : {}).forEach((packageName) => {
        if (slugObj)
          return;
        const packageObj = menu.packages[packageName];
        slugObj = packageObj.slug[req.url];
      });
    }
    if (slugObj) {
      const builder = new __SMarkdownBuilder();
      const res2 = await pipe(builder.build({
        inPath: slugObj.docmap.path,
        target: "html",
        save: false
      }));
      if (res2 instanceof Error) {
        throw res2;
      }
      html = res2[0].code;
    }
    if (!html) {
      const error = await page404(__spreadProps(__spreadValues({}, res.templateData || {}), {
        title: `Markdown "${req.url}" not found`,
        body: `The markdown "${req.url}" you requested does not exists...`
      }));
      res.type("text/html");
      res.status(404);
      res.send(error.value);
      return reject(error.value);
    }
    const viewInstance = new __SViewRenderer("pages.markdown.markdown");
    const result = await viewInstance.render(__spreadProps(__spreadValues({}, (_b = res.templateData) != null ? _b : {}), {
      body: html
    }));
    res.status(200);
    res.type("text/html");
    res.send(result.value);
    resolve(result.value);
  });
}
export {
  markdown as default
};
