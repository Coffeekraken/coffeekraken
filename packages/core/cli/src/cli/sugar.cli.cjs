#!/usr/bin/env node --trace-warnings --trace-uncaught --no-warnings --es-module-specifier-resolution node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var sugar_cli_exports = {};
__export(sugar_cli_exports, {
  default: () => SSugarCli
});
module.exports = __toCommonJS(sugar_cli_exports);
var import_s_bench = __toESM(require("@coffeekraken/s-bench"), 1);
var import_s_env = __toESM(require("@coffeekraken/s-env"), 1);
var import_s_event_emitter = __toESM(require("@coffeekraken/s-event-emitter"), 1);
var import_s_stdio = __toESM(require("@coffeekraken/s-stdio"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_s_sugar_json = __toESM(require("@coffeekraken/s-sugar-json"), 1);
var import_node = require("@coffeekraken/sugar/node/index");
var import_childProcess = __toESM(require("@coffeekraken/sugar/node/is/childProcess"), 1);
var import_spawn = __toESM(require("@coffeekraken/sugar/node/process/spawn"), 1);
var import_sugarBanner = __toESM(require("@coffeekraken/sugar/shared/ascii/sugarBanner"), 1);
var import_jsonSync = __toESM(require("@coffeekraken/sugar/node/package/jsonSync"), 1);
var import_parseArgs = __toESM(require("@coffeekraken/sugar/shared/cli/parseArgs"), 1);
var import_argsToString = __toESM(require("@coffeekraken/sugar/shared/cli/argsToString"), 1);
var import_wait = __toESM(require("@coffeekraken/sugar/shared/time/wait"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_fs_extra = __toESM(require("fs-extra"), 1);
var import_path = __toESM(require("path"), 1);
var import_replaceTokens = __toESM(require("@coffeekraken/sugar/node/token/replaceTokens"), 1);
var import_s_log = __toESM(require("@coffeekraken/s-log"), 1);
var import_parseHtml = __toESM(require("@coffeekraken/sugar/shared/console/parseHtml"), 1);
var import_SSugarCliParamsInterface = __toESM(require("./interface/SSugarCliParamsInterface"), 1);
const cliParams = import_SSugarCliParamsInterface.default.apply(process.argv.slice(2).join(" "));
if (cliParams.bench) {
  import_s_bench.default.filter(cliParams.bench === true ? "*" : cliParams.bench);
}
if (!import_s_log.default[`PRESET_${cliParams.logPreset.toUpperCase()}`]) {
  console.log(`The log preset "${cliParams.logPreset}" does not exists... Here's the list of available presets:
${import_s_log.default.PRESETS.map((preset) => {
    return `- ${preset}
`;
  }).join("")}`);
  cliParams.logPreset = "default";
}
import_s_log.default.filter(import_s_log.default[`PRESET_${cliParams.logPreset.toUpperCase()}`]);
class SSugarCli {
  constructor() {
    this._availableCli = {
      defaultByStack: {},
      endpoints: {}
    };
    this._availableInteractiveCli = {};
    import_s_bench.default.start("sugar.cli");
    if (process.env.TREAT_AS_MAIN) {
      this._treatAsMain = true;
      process.env.TREAT_AS_MAIN = false;
    }
    this.packageJson = (0, import_jsonSync.default)();
    this.args = this._parseArgs(process.argv);
    this._setNodeEnv();
    (async () => {
      import_s_bench.default.step("sugar.cli", "beforeLoadConfig");
      await (0, import_wait.default)(10);
      const config = await import_s_sugar_config.default.load();
      this._proxyConsole();
      import_s_bench.default.step("sugar.cli", "afterLoadConfig");
      import_s_bench.default.step("sugar.cli", "beforeClearTmpDir");
      import_fs_extra.default.emptyDirSync(import_s_sugar_config.default.get("storage.package.tmpDir"));
      import_s_bench.default.step("sugar.cli", "afterClearTmpDir");
      this._eventEmitter = new import_s_event_emitter.default({
        metas: {
          id: "Sugar"
        }
      });
      if ((0, import_childProcess.default)()) {
        this._eventEmitter.pipeTo(process);
      }
      this._eventEmitter.on("writeLog", (logObj) => {
        this.writeLog(logObj.value);
      });
      import_s_bench.default.step("sugar.cli", "beforeLoadSugarJson");
      const sugarJsonInstance = new import_s_sugar_json.default();
      this._sugarJsons = await sugarJsonInstance.read();
      import_s_bench.default.step("sugar.cli", "afterLoadSugarJson");
      import_s_bench.default.step("sugar.cli", "beforeLoadAvailableCli");
      await this._getAvailableCli();
      import_s_bench.default.step("sugar.cli", "afterLoadAvailableCli");
      if (this.args.isHelp) {
        this._displayHelp(this.args.stack, this.args.action);
        return;
      }
      if (!this.args.stack && !this.args.action && !this.args.params) {
        this._interactivePrompt();
        return;
      }
      import_s_bench.default.step("sugar.cli", "beforeProcess");
      import_s_bench.default.end("sugar.cli", {
        log: true
      });
      await this._process();
      import_s_bench.default.step("sugar.cli", "afterProcess");
    })();
  }
  static get command() {
    const command = process.argv[1];
    return command.split("/").pop();
  }
  static replaceTokens(command, params) {
    command = command.replace("[arguments]", params ? (0, import_argsToString.default)(params) : "");
    command = (0, import_replaceTokens.default)(command);
    command = command.replace(/%sugar/gm, SSugarCli.command);
    command = this.replaceSugarCommandForDev(command);
    return command;
  }
  static replaceSugarCommandForDev(command) {
    if (!command.match(/^sugar\s/))
      return command;
    return command.replace(/^sugar/, this.command);
  }
  _setNodeEnv() {
    if (process.env.JEST_WORKER_ID)
      return;
    if (this.args.params.env) {
      switch (this.args.params.env) {
        case "dev":
        case "development":
          process.env.NODE_ENV = "development";
          break;
        case "prod":
        case "production":
          process.env.NODE_ENV = "production";
          break;
        case "test":
          process.env.NODE_ENV = "test";
          break;
        default:
          throw new Error(`<red>[sugar]</red> Sorry but the passed env "<yellow>${this.args.params.env}</yellow>" is not supported. Valid values are "<green>dev,development,prod,production,test</green>"`);
          break;
      }
    } else {
      process.env.NODE_ENV = "development";
    }
  }
  _parseArgs(argv = process.argv) {
    var _a, _b;
    const args = {};
    args.command = argv && argv[2] ? argv[2].split(" ")[0] : "";
    args.stack = args.command.split(".")[0];
    if (!((_a = args.stack) == null ? void 0 : _a.match(/^[a-zA-Z0-9]+$/)))
      args.stack = void 0;
    args.action = args.command.split(".")[1] || null;
    if (!((_b = args.action) == null ? void 0 : _b.match(/^[a-zA-Z0-9]+$/)))
      args.action = void 0;
    const a = argv.slice(3).map((arg) => {
      if (arg.includes(" ")) {
        return `"${arg}"`;
      } else if (arg.slice(0, 2) !== "--" && arg.slice(0, 1) !== "-" && arg.split(" ").length > 1) {
        return `"${arg}"`;
      }
      return arg;
    }).join(" ") || "";
    args.args = a;
    args.params = (0, import_parseArgs.default)(a);
    args.isHelp = false;
    if (!args.stack && !args.action)
      args.isHelp = true;
    const lastArg = argv.slice(-1)[0];
    if (lastArg.match(/\s?(-h$|--help$)/))
      args.isHelp = true;
    return args;
  }
  _proxyConsole() {
    if (process.env.NODE_ENV === "test")
      return;
    const originalConsole = {};
    ["log", "warn", "error", "trace"].forEach((method) => {
      originalConsole[method] = console[method];
      console[method] = (...args) => {
        args.forEach((value, i) => {
          if (typeof value === "string") {
            args[i] = (0, import_parseHtml.default)(args[i]);
          }
        });
        originalConsole[method](...args);
      };
    });
  }
  _initStdio(def = true, websocket = true) {
    if (this._isStdioNeeded()) {
      if (def) {
        this._stdio = import_s_stdio.default.existingOrNew("default", this._eventEmitter, import_s_stdio.default.NO_UI);
      }
    }
  }
  _isStdioNeeded() {
    return !(0, import_childProcess.default)() || this._treatAsMain;
  }
  _getCliObj() {
    var _a, _b;
    const defaultStackAction = this._availableCli.defaultByStack[this.args.stack];
    if (!this._availableCli.endpoints[`${this.args.stack}.${(_a = this.args.action) != null ? _a : defaultStackAction}`]) {
      this._displayHelpAfterError();
      process.exit(0);
    }
    let cliObj = this._availableCli.endpoints[`${this.args.stack}.${(_b = this.args.action) != null ? _b : defaultStackAction}`];
    return cliObj;
  }
  async _process() {
    let cliObj = this._getCliObj();
    let argv = [process.argv[0], process.argv[1], process.argv[2]];
    if (cliObj.command && cliObj.command.match(/^sugard?\s/)) {
      const p = (0, import_parseArgs.default)(cliObj.command);
      argv[2] = p["1"];
      argv = [...argv.slice(0, 3), ...process.argv.slice(2)];
      this.args = this._parseArgs(argv);
      cliObj = this._getCliObj();
    }
    if (cliObj.processPath) {
      const { default: processFn, sugarCliSettings } = await Promise.resolve().then(() => __toESM(require(cliObj.processPath)));
      this._initStdio(true, true);
      await (0, import_wait.default)(100);
      if (!(0, import_childProcess.default)()) {
        this._newStep();
      }
      let args = this.args.args;
      if (cliObj.interfacePath) {
        const { default: int } = await Promise.resolve().then(() => __toESM(require(cliObj.interfacePath)));
        args = int.apply(this.args.args);
      }
      const proPromise = processFn(args);
      this._eventEmitter.pipe(proPromise, {});
      proPromise.on("chdir", (directory) => {
        if (!import_fs.default.existsSync(directory))
          return;
        proPromise.emit("log", {
          value: `<yellow>[process]</yellow> Changing directory to <cyan>${directory}</cyan>`
        });
        process.chdir(directory);
      });
      await proPromise;
      await (0, import_wait.default)(1e3);
      process.exit(0);
    } else if (cliObj.command) {
      this._initStdio(true, true);
      const promise = (0, import_spawn.default)(SSugarCli.replaceTokens(cliObj.command), [], {});
      this._eventEmitter.pipe(promise);
      const res = await promise;
      process.exit(0);
    }
  }
  async _getAvailableCli() {
    for (let i = 0; i < Object.keys(this._sugarJsons).length; i++) {
      const packageName = Object.keys(this._sugarJsons)[i];
      const sugarJson = this._sugarJsons[packageName];
      const packageJson = (await Promise.resolve().then(() => __toESM(require(sugarJson.metas.path.replace("/sugar.json", "/package.json"))))).default;
      if (!sugarJson.cli)
        continue;
      sugarJson.cli.forEach((cliObj) => {
        if (!cliObj.actions) {
          throw new Error(`The sugar.json file of the package "<yellow>${packageName}</yellow>"is missing the "cli.actions" object`);
        }
        if (cliObj.interactive) {
          Object.keys(cliObj.interactive).forEach((interactiveName) => {
            const interactiveObj = cliObj.interactive[interactiveName];
            if (interactiveObj.scope === "package" && !import_s_env.default.packageJson) {
              return;
            }
            const cliPath = import_path.default.resolve(sugarJson.metas.path.replace(/\/sugar\.json$/, ""), interactiveObj.process);
            let interfacePath;
            if (interactiveObj.interface) {
              interfacePath = import_path.default.resolve(sugarJson.metas.path.replace(/\/sugar\.json$/, ""), interactiveObj.interface);
            }
            if (!import_fs.default.existsSync(cliPath))
              throw new Error(`[sugar.cli] Sorry but the references interactive cli file "${cliPath}" does not exists...`);
            this._availableInteractiveCli[`${cliObj.stack}.${interactiveName}`] = __spreadProps(__spreadValues({}, interactiveObj), {
              processPath: cliPath,
              interfacePath
            });
          });
        }
        Object.keys(cliObj.actions).forEach((action) => {
          if (action.match(/\s/)) {
            throw new Error(`The action "<yellow>${action}</yellow>" seems to have some spaces in his id... Please correct that.`);
          }
          const actionObj = cliObj.actions[action];
          let processPath, command;
          if (actionObj.command && !actionObj.process) {
            command = SSugarCli.replaceTokens(actionObj.command);
          } else {
            processPath = import_path.default.resolve(sugarJson.metas.path.replace(/\/sugar\.json$/, ""), actionObj.process);
            if (!import_fs.default.existsSync(processPath)) {
              throw new Error(`[sugar.cli] Sorry but the references cli file "${processPath}" does not exists...`);
            }
          }
          let interfacePath;
          if (actionObj.interface) {
            interfacePath = import_path.default.resolve(sugarJson.metas.folderPath, actionObj.interface);
          }
          if (!this.args.action && cliObj.defaultAction && action === cliObj.defaultAction) {
            this._availableCli.defaultByStack[cliObj.stack] = action;
          }
          this._availableCli.endpoints[`${cliObj.stack}.${action}`] = __spreadProps(__spreadValues({
            packageJson
          }, actionObj), {
            processPath,
            command,
            interfacePath
          });
        });
      });
    }
    return true;
  }
  ask(askObj) {
    return this._eventEmitter.emit("ask", askObj);
  }
  log(log) {
    if (typeof log === "string") {
      this._eventEmitter.emit("log", {
        value: log
      });
      return;
    }
    this._eventEmitter.emit("log", __spreadValues({}, log));
  }
  async _run(command) {
    const promise = (0, import_spawn.default)(command, [], {
      shell: true
    });
    promise.on("*", (data) => {
      this.log(data.value);
    });
    const res = await promise;
    return res;
  }
  _newStep() {
    const packageJson = this.packageJson;
    const logStr = [
      ...(0, import_sugarBanner.default)({
        borders: false,
        marginLeft: 1,
        paddingBottom: 1,
        version: `CLI <cyan>v${packageJson.version}</cyan>`
      }).split("\n"),
      `This process is running in the ${process.env.NODE_ENV === "production" ? "<green>production</green>" : process.env.NODE_ENV === "test" ? "<cyan>test</cyan>" : "<yellow>development</yellow>"} environment`,
      !import_s_env.default.packageJson ? `This process is running <yellow>outside of an existing package</yellow>.` : "",
      !import_s_env.default.packageJson ? `Not all the features will be available...` : "",
      ""
    ].filter((l) => l !== "").forEach((l) => {
      this.log({
        clear: false,
        decorators: false,
        value: l
      });
    });
  }
  writeLog(log) {
    let currentLog = "";
    if (import_fs.default.existsSync(`${process.cwd()}/sugar.log`)) {
      currentLog = import_fs.default.readFileSync(`${process.cwd()}/sugar.log`, "utf8").toString();
      currentLog += "\n\n";
    }
    currentLog += log;
    import_fs.default.writeFileSync(`${process.cwd()}/sugar.log`, currentLog);
  }
  safeExec(command, settings) {
    const promise = (0, import_spawn.default)(command, [], __spreadValues({
      shell: true
    }, settings != null ? settings : {}));
    return promise;
  }
  exec(command, settings) {
    const promise = (0, import_spawn.default)(command, [], __spreadValues({
      shell: true
    }, settings != null ? settings : {}));
    this._eventEmitter.pipe(promise);
    return promise;
  }
  async _displayHelp() {
    this._initStdio(true, false);
    await (0, import_wait.default)(100);
    this._newStep();
    if (this.args.stack && this.args.action) {
      const commandObj = this._availableCli.endpoints[`${this.args.stack}.${this.args.action}`];
      this.log(` Action <cyan>${this.args.stack}.${this.args.action}</cyan>`);
      this.log(`<yellow>${"-".repeat(process.stdout.columns - 2)}</yellow>`);
      this.log(``);
      this.log(`${commandObj.description}`);
      this.log(`Package: <yellow>${commandObj.packageJson.name}</yellow> (<cyan>v${commandObj.packageJson.version}</cyan>)`);
      this.log(``);
      this.log(`<yellow>\u2588\u2588</yellow>   <yellow>sugar</yellow> <cyan>${this.args.stack}.${this.args.action}</cyan> <magenta>[arguments]</magenta>`);
      this.log(``);
      if (commandObj.interfacePath) {
        const { default: int } = await Promise.resolve().then(() => __toESM(require(commandObj.interfacePath)));
        Object.entries(int.definition).forEach(([arg, argObj]) => {
          this.log(`   <cyan>${arg}</cyan> ${argObj.alias ? `(<magenta>-${argObj.alias}</magenta>)` : ""}`);
          this.log(`   ${argObj.description}`);
          if (argObj.default !== void 0) {
            this.log(`   Default: <magenta>${argObj.default}</magenta>`);
          }
          this.log(``);
        });
      }
      await (0, import_wait.default)(1e3);
      process.exit(0);
    }
    const sortedByStack = {};
    Object.keys(this._availableCli.endpoints).forEach((stackAction) => {
      const _stack = stackAction.split(".")[0];
      const _action = stackAction.split(".")[1];
      if (this.args.stack && _stack !== this.args.stack)
        return;
      if (!sortedByStack[_stack])
        sortedByStack[_stack] = {};
      sortedByStack[_stack][_action] = this._availableCli.endpoints[stackAction];
    });
    this.log(`Stacks and actions list:`);
    Object.keys(sortedByStack).forEach((stack) => {
      const stackObj = sortedByStack[stack];
      this.log(`<cyan>${stack}</cyan>`);
      Object.keys(stackObj).forEach((action) => {
        const actionObj = stackObj[action];
        if (this._availableCli.defaultByStack[stack] === action) {
          actionObj.default = true;
        }
        this.log(`  <magenta>${action}</magenta>${" ".repeat(20 - action.length)}: ${actionObj.description}`);
      });
    });
    await (0, import_wait.default)(1e3);
    process.exit(0);
  }
  _displayHelpAfterError() {
    var _a;
    const logArray = [];
    logArray.push(`<red>Sorry</red> but the requested "<cyan>${this.args.stack}.${(_a = this.args.action) != null ? _a : "default"}</cyan>" command does not exists...`);
    logArray.push(`Here's the list of <green>available commands</green> in your context:`);
    logArray.push(" ");
    this.log(logArray.join("\n"));
    this._displayHelp();
  }
}
if (!global._sugarCli && process.env.NODE_ENV !== "test") {
  global._sugarCli = new SSugarCli();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
