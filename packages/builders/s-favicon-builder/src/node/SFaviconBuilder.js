import __SBuilder from "@coffeekraken/s-builder";
import __SPromise from "@coffeekraken/s-promise";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SFaviconBuilderBuildParamsInterface from "./interface/SFaviconBuilderBuildParamsInterface";
import __favicons from "favicons";
import __fs from "fs";
import __SLog from "@coffeekraken/s-log";
import __path from "path";
import __packageRoot from "@coffeekraken/sugar/node/path/packageRoot";
import __writeFileSync from "@coffeekraken/sugar/node/fs/writeFileSync";
import __packageSyncJson from "@coffeekraken/sugar/node/package/jsonSync";
class SFaviconBuilder extends __SBuilder {
  get faviconBuilderSettings() {
    return this._settings.faviconBuilder;
  }
  constructor(settings) {
    super(__deepMerge({
      faviconBuilder: {}
    }, settings != null ? settings : {}));
  }
  _build(params, settings) {
    return new __SPromise(async ({ resolve, reject, emit }) => {
      var _a, _b, _c;
      params = __SFaviconBuilderBuildParamsInterface.apply(params != null ? params : {});
      const packageJson = __packageSyncJson(process.cwd(), {
        standardize: true
      });
      const finalSettings = __deepMerge({
        path: `/${__path.relative(__packageRoot(), params.outDir)}`,
        appName: packageJson.name,
        appShortName: packageJson.name,
        appDescription: packageJson.description,
        developerName: (_a = packageJson.author) == null ? void 0 : _a.name,
        developerURL: (_b = packageJson.author) == null ? void 0 : _b.url,
        dir: "auto",
        lang: "en-US",
        background: "#fff",
        theme_color: "#fff",
        appleStatusBarStyle: "black-translucent",
        display: "standalone",
        orientation: "any",
        scope: "/",
        start_url: "/?homescreen=1",
        version: "1.0",
        logging: false,
        pixel_art: false,
        loadManifestWithCredentials: false,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: true,
          favicons: true,
          firefox: true,
          windows: true,
          yandex: true
        }
      }, this.faviconBuilderSettings, settings != null ? settings : {}, (_c = params.settings) != null ? _c : {});
      if (!__fs.existsSync(params.input)) {
        throw new Error(`The input favicon file "<cyan>${params.input}</cyan>" does not exists...`);
      }
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<yellow>[favicon]</yellow> Start generating your favicon files...`
      });
      __favicons(params.input, finalSettings, (error, response) => {
        if (error) {
          return reject(error.message);
        }
        response.images.forEach((imageObj) => {
          emit("log", {
            type: __SLog.TYPE_INFO,
            value: `<yellow>[favicon]</yellow> Saving file "<cyan>${__path.relative(__packageRoot(), params.outDir)}/${imageObj.name}</cyan>"`
          });
          __writeFileSync(`${params.outDir}/${imageObj.name}`, imageObj.contents);
        });
        response.files.forEach((fileObj) => {
          emit("log", {
            type: __SLog.TYPE_INFO,
            value: `<yellow>[favicon]</yellow> Saving file "<cyan>${__path.relative(__packageRoot(), params.outDir)}/${fileObj.name}</cyan>"`
          });
          __writeFileSync(`${params.outDir}/${fileObj.name}`, fileObj.contents);
        });
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<yellow>[favicon]</yellow> Saving file "<cyan>${__path.relative(__packageRoot(), params.outDir)}/favicon.html</cyan>"`
        });
        __writeFileSync(`${params.outDir}/favicon.html`, response.html.join("\n"));
        resolve();
      });
    }, {
      metas: {
        id: this.constructor.name
      }
    });
  }
}
export {
  SFaviconBuilder as default
};
