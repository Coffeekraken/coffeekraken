import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __deepMap from "@coffeekraken/sugar/shared/object/deepMap";
import __packageRoot from "@coffeekraken/sugar/node/path/packageRoot";

export default async function () {
  const packageRoot = __packageRoot(),
    monoRoot = __packageRoot(process.cwd(), {
      highest: true,
    });
  const viteConfig = __deepMap(
    __SSugarConfig.get("vite"),
    ({ prop, value }) => {
      if (typeof value === "string") {
        value = value.replace(packageRoot, "");
        value = value.replace(monoRoot, "");
        if (value.match(/^\//)) {
          value = value.replace(/^\//, "");
        }
      }
      return value;
    }
  );

  delete viteConfig.server;
  delete viteConfig.rewrites;

  return {
    viteConfig,
  };
}
