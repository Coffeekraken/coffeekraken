import __SPromise from "@coffeekraken/s-promise";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
import __execPhp from "@coffeekraken/sugar/node/php/execPhp";
import __unique from "@coffeekraken/sugar/shared/array/unique";
import __fs from "fs";
import __path from "path";
import __SViewRendererBladeEngineSettingsInterface from "./interface/SViewRendererEngineBladeSettingsInterface";
class SViewRendererEngineBlade {
  constructor(settings) {
    this.settings = {};
    this.settings = settings != null ? settings : {};
  }
  render(viewPath, data = {}, viewRendererSettings) {
    return new __SPromise(({ resolve, reject, emit }) => {
      if (!__fs.existsSync(viewPath)) {
        return reject(`It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`);
      }
      if (!__fs.existsSync(viewRendererSettings.cacheDir)) {
        __fs.mkdirSync(viewRendererSettings.cacheDir, { recursive: true });
      }
      let viewDotPath = viewPath;
      __unique([...viewRendererSettings.rootDirs]).forEach((path) => {
        viewDotPath = viewDotPath.replace(`${path}/`, "");
      });
      viewDotPath = viewDotPath.split("/").join(".").replace(".blade.php", "");
      resolve(__execPhp(__path.resolve(__dirname(), "../php/compile.php"), {
        rootDirs: __unique([...viewRendererSettings.rootDirs]),
        viewDotPath,
        data,
        cacheDir: viewRendererSettings.cacheDir
      }, {
        paramsThroughFile: true
      }));
    }, {
      eventEmitter: {
        bind: this
      }
    });
  }
}
SViewRendererEngineBlade.id = "blade";
SViewRendererEngineBlade.extensions = ["blade.php"];
SViewRendererEngineBlade.settingsInterface = __SViewRendererBladeEngineSettingsInterface;
export {
  SViewRendererEngineBlade as default
};
