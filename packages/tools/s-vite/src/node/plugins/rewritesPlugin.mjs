import {
  __toESM
} from "../../../../../chunk-TD77TI6B.mjs";
function rewritesPlugin(rewrites) {
  return {
    name: "rewrites-plugin",
    async transform(src, id) {
      for (let i = 0; i < rewrites.length; i++) {
        let rewriteObj = rewrites[i];
        if (typeof rewriteObj === "string") {
          const { default: re } = await Promise.resolve().then(() => __toESM(require(rewriteObj)));
          rewriteObj = re;
        }
        if (!src.match(rewriteObj.match))
          continue;
        return {
          code: rewriteObj.rewrite(src, id),
          map: null
        };
      }
      return {
        code: src,
        map: null
      };
    }
  };
}
export {
  rewritesPlugin as default
};
