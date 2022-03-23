import {
  __spreadProps,
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
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
