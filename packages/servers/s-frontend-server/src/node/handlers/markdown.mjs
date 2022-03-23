import {
  __spreadProps,
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
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
