import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginMediaClassesMixinInterface extends __SInterface {
  static get _definition() {
    return {
      query: {
        type: "String",
        default: Object.keys(__STheme.config("media.queries")).join(",")
      },
      mediasOnly: {
        type: "Boolean"
      }
    };
  }
}
function classes_default({
  params,
  atRule,
  getCacheFilePath,
  getRoot,
  postcssApi,
  registerPostProcessor,
  replaceWith
}) {
  const finalParams = __spreadValues({
    query: "",
    mediasOnly: false
  }, params);
  const mediaConfig = __STheme.config("media");
  const medias = finalParams.query ? finalParams.query.split(" ").map((l) => l.trim()) : Object.keys(mediaConfig.queries);
  atRule.replaceWith(`
        /* S-MEDIA-CLASSES:${medias.join(",")} */
        ${atRule.nodes.map((node) => node.toString())}
        /* S-END-MEDIA-CLASSES:${medias.join(",")} */
    `);
  registerPostProcessor((root) => {
    const mediaNodes = [];
    let currentMedias = [];
    root.nodes.forEach((node, i) => {
      if (node.type === "comment" && node.text.includes("S-MEDIA-CLASSES:")) {
        const medias2 = node.text.replace("S-MEDIA-CLASSES:", "").split(",").map((l) => l.trim());
        currentMedias = medias2;
        mediaNodes.push({
          nodes: [],
          medias: medias2
        });
      } else if (node.type === "comment" && node.text.includes("S-END-MEDIA-CLASSES:")) {
        const medias2 = node.text.replace("S-END-MEDIA-CLASSES:", "").split(",").map((l) => l.trim());
        currentMedias = [];
      } else if (currentMedias.length) {
        const mediaNodeObj = mediaNodes.slice(-1)[0];
        mediaNodeObj.nodes.push(node.clone());
      }
    });
    mediaNodes.forEach((mediaObj) => {
      mediaObj.medias.forEach((media) => {
        const mediaRule = new postcssApi.AtRule({
          name: "media",
          params: __STheme.buildMediaQuery(media).replace("@media ", "")
        });
        mediaObj.nodes.forEach((node) => {
          node = node.clone();
          if (node.type === "comment")
            return;
          if (node.selector === ":root")
            return;
          if (!node.selector) {
            mediaRule.append(node);
          } else {
            let sels = node.selector.split(",").map((l) => l.trim());
            sels = sels.map((sel) => {
              const selectors = sel.match(/\.[a-zA-Z0-9_-]+/gm);
              if (!selectors)
                return sel;
              selectors.forEach((selector) => {
                sel = sel.replace(selector, `${selector}___${media}`);
              });
              return sel;
            });
            node.selector = sels.join(",");
            mediaRule.append(node);
          }
        });
        root.append(mediaRule);
      });
    });
  });
}
export {
  classes_default as default,
  postcssSugarPluginMediaClassesMixinInterface as interface
};
