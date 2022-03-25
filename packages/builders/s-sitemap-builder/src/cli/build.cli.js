import __SPromise from "@coffeekraken/s-promise";
import __SSitemapBuilder from "../node/SSitemapBuilder";
var build_cli_default = (stringArgs = "") => {
  return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
    const sitemap = new __SSitemapBuilder();
    const buildPromise = sitemap.build(stringArgs);
    pipe(buildPromise);
    resolve(await buildPromise);
  });
};
export {
  build_cli_default as default
};
