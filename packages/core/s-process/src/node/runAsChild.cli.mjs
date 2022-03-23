import {
  __spreadProps,
  __spreadValues
} from "../../../../chunk-TD77TI6B.mjs";
import __parseArgs from "@coffeekraken/sugar/shared/cli/parseArgs.js";
import __SProcess from "@coffeekraken/s-process";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
(async () => {
  var _a, _b, _c;
  await __SSugarConfig.load();
  const stringArgs = process.argv.slice(1).map((arg) => {
    if (arg.slice(0, 2) !== "--" && arg.slice(0, 1) !== "-") {
      return `"${arg}"`;
    }
    return arg;
  }).join(" ") || "";
  const args = __parseArgs(stringArgs);
  delete args[-1];
  if (!args._settings.processPath) {
    throw `Sorry but to use this endpoint you have to specify at least a "--processPath" parameter...`;
  }
  const settings = Object.assign({}, args._settings);
  const processPath = settings.processPath;
  delete settings.processPath;
  delete args["0"];
  delete args._settings;
  const pro = await __SProcess.from(processPath, {
    process: __spreadProps(__spreadValues({}, settings), {
      runAsChild: false
    })
  });
  if (pro && pro.run) {
    const proPromise = pro.run(args);
    const res = await proPromise;
    try {
      console.log(JSON.stringify(res.value));
    } catch (e) {
      console.log((_c = (_b = (_a = res.value) == null ? void 0 : _a.toString) == null ? void 0 : _b.call(_a)) != null ? _c : res.value);
    }
    process.exit(0);
  }
})();
