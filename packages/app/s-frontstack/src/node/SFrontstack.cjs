var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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
var SFrontstack_exports = {};
__export(SFrontstack_exports, {
  default: () => SFrontstack
});
module.exports = __toCommonJS(SFrontstack_exports);
var import_s_class = __toESM(require("@coffeekraken/s-class"), 1);
var import_s_duration = __toESM(require("@coffeekraken/s-duration"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_SFrontstackActionInterface = __toESM(require("./interface/SFrontstackActionInterface"), 1);
var import_SFrontstackRecipeParamsInterface = __toESM(require("./interface/SFrontstackRecipeParamsInterface"), 1);
var import_SFrontstackListParamsInterface = __toESM(require("./interface/SFrontstackListParamsInterface"), 1);
var import_SFrontstackNewParamsInterface = __toESM(require("./interface/SFrontstackNewParamsInterface"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_s_sugar_json = __toESM(require("@coffeekraken/s-sugar-json"), 1);
var import_argsToString = __toESM(require("@coffeekraken/sugar/shared/cli/argsToString"), 1);
var import_s_process = __toESM(require("@coffeekraken/s-process"), 1);
var import_stripAnsi = __toESM(require("@coffeekraken/sugar/shared/string/stripAnsi"), 1);
var import_s_log = __toESM(require("@coffeekraken/s-log"), 1);
var import_cli = __toESM(require("@coffeekraken/cli"), 1);
var import_filter = __toESM(require("@coffeekraken/sugar/shared/object/filter"), 1);
var import_commandExists = __toESM(require("@coffeekraken/sugar/node/command/commandExists"), 1);
class SFrontstack extends import_s_class.default {
  get frontstackSettings() {
    return this._settings.frontstack;
  }
  constructor(settings) {
    super((0, import_deepMerge.default)({
      frontstack: {}
    }, settings != null ? settings : {}));
  }
  new(params) {
    return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
      const frontstackConfig = import_s_sugar_config.default.get("frontstack");
      const recipesObj = (0, import_filter.default)(frontstackConfig.recipes, (key, recipeObj2) => {
        var _a;
        return ((_a = recipeObj2.stacks) == null ? void 0 : _a.new) !== void 0;
      });
      const finalParams = import_SFrontstackNewParamsInterface.default.apply(params);
      const availableRecipes = Object.keys(recipesObj);
      const recipe = await emit("ask", {
        type: "autocomplete",
        message: "Please select one of the available recipes",
        choices: availableRecipes
      });
      if (!recipe)
        process.exit();
      const recipeObj = recipesObj[recipe];
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `Starting project creation using the "<yellow>${recipe}</yellow>" recipe...`
      });
      resolve(pipe(this.recipe({
        recipe,
        stack: "new"
      })));
    }).bind(this);
  }
  action(params) {
    return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
      var _a, _b, _c, _d, _e, _f;
      const frontstackConfig = import_s_sugar_config.default.get("frontstack");
      const actionsObj = frontstackConfig.actions;
      const finalParams = import_SFrontstackActionInterface.default.apply(params);
      const availableActions = Object.keys(actionsObj);
      if (availableActions.indexOf(finalParams.action) === -1) {
        throw new Error(`<red>[${this.constructor.name}.action]</red> Sorry but the requested action "<yellow>${finalParams.action}</yellow>" does not exists. Here's the list of available action(s):
${availableActions.map((r) => `- <yellow>${r}</yellow>`).join("\n")}`);
      }
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `Starting frontstack process using "<yellow>${finalParams.action}</yellow>" action`
      });
      const actionObj = actionsObj[finalParams.action];
      const processManager = new import_s_process.SProcessManager({});
      pipe(processManager);
      const finalCommand = import_cli.default.replaceTokens((_a = actionObj.command) != null ? _a : actionObj.process);
      const actionId = (_b = actionObj.id) != null ? _b : finalParams.action;
      const pro = await import_s_process.default.from(finalCommand);
      processManager.attachProcess(actionId, pro, {});
      processManager.run(actionId, (_d = (_c = finalParams.params) != null ? _c : actionObj.params) != null ? _d : {}, (_f = (_e = actionObj.settings) == null ? void 0 : _e.process) != null ? _f : {});
    }, {}).bind(this);
  }
  recipe(params) {
    const processesPromises = [];
    const duration = new import_s_duration.default();
    return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      const frontstackConfig = import_s_sugar_config.default.get("frontstack");
      const recipesObj = frontstackConfig.recipes;
      const actionsObj = frontstackConfig.actions;
      const finalParams = import_SFrontstackRecipeParamsInterface.default.apply(params);
      const sugarJson = new import_s_sugar_json.default().current();
      if (!finalParams.recipe) {
        if (sugarJson.recipe)
          finalParams.recipe = sugarJson.recipe;
      }
      if (!finalParams.recipe) {
        finalParams.recipe = frontstackConfig.defaultRecipe;
      }
      if (!finalParams.recipe) {
        throw new Error(`<red>[recipe]</red> Sorry but it seems that you missed to pass a recipe to use or that you don't have any "<cyan>sugar.json</cyan>" file at the root of your project with a "<yellow>recipe</yellow>" property that define which recipe to use for this project...`);
      }
      if (!recipesObj[finalParams.recipe]) {
        throw new Error(`<red>[recipe]</red> Sorry but the specified "<yellow>${finalParams.recipe}</yellow>" recipe does not exists. Here's the available ones: <green>${Object.keys(recipesObj).join(", ")}</green>`);
      }
      if (!finalParams.stack) {
        if (!recipesObj[finalParams.recipe].defaultStack) {
          throw new Error(`<red>[recipe]</red> Sorry but you MUST specify a "<yellow>stack</yellow>" to use in the requested "<cyan>${finalParams.recipe}</cyan>" recipe`);
        }
        finalParams.stack = recipesObj[finalParams.recipe].defaultStack;
      }
      const recipeObj = recipesObj[finalParams.recipe];
      if ((_a = sugarJson.frontstack) == null ? void 0 : _a[finalParams.stack]) {
        for (let [key, value] of Object.entries((_b = sugarJson.frontstack) == null ? void 0 : _b[finalParams.stack])) {
          if (!frontstackConfig.actions[value.action]) {
            throw new Error(`The requested action "<yellow>${value.action}</yellow>" does not exists in the config.frontstack.actions stack... Here's the available ones: <green>${Object.keys(frontstackConfig.actions).join(",")}</green>`);
          }
          recipeObj.stacks[finalParams.stack].actions[`sugarJson-${value.action}`] = (0, import_deepMerge.default)(Object.assign({}, frontstackConfig.actions[value.action], value));
          delete recipeObj.stacks[finalParams.stack].actions[`sugarJson-${value.action}`].action;
        }
      }
      if (!recipeObj.stacks || !Object.keys(recipeObj.stacks).length) {
        throw new Error(`<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}</yellow>" configuration object missed the requested "<yellow>stacks</yellow>" property that list the stacks to execute`);
      }
      if (!recipeObj.stacks[finalParams.stack]) {
        throw new Error(`<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}.stacks</yellow>" configuration object missed the requested "<yellow>${finalParams.stack}</yellow>" stack`);
      }
      if (!recipeObj.stacks[finalParams.stack].actions || !Object.keys(recipeObj.stacks[finalParams.stack].actions).length) {
        throw new Error(`<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}.stacks.${finalParams.stack}.actions</yellow>" configuration object missed the requested "<yellow>actions</yellow>" property that list the actions to execute`);
      }
      if (recipeObj.requirements) {
        if (recipeObj.requirements.commands) {
          for (let i = 0; i < recipeObj.requirements.commands.length; i++) {
            emit("log", {
              type: import_s_log.default.TYPE_VERBOSE,
              value: `<yellow>[requirements]</yellow> Checking for the "<magenta>${recipeObj.requirements.commands[i]}</magenta>" command to exists...`
            });
            const version = await (0, import_commandExists.default)(recipeObj.requirements.commands[i]);
            if (!version) {
              throw new Error(`<red>[requirements]</red> Sorry but the command "<yellow>${recipeObj.requirements.commands[i]}</yellow>" is required but it does not exists.`);
            } else {
              emit("log", {
                type: import_s_log.default.TYPE_VERBOSE,
                value: `<green>[requirements]</green> Command "<magenta>${recipeObj.requirements.commands[i]}</magenta>" available in version <cyan>${(0, import_stripAnsi.default)(String(version).replace("\n", ""))}</cyan>.`
              });
            }
          }
        }
      }
      const stackObj = recipeObj.stacks[finalParams.stack];
      if (!finalParams.runInParallel) {
        finalParams.runInParallel = (_c = stackObj.runInParallel) != null ? _c : false;
      }
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `Starting frontstack process`
      });
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Recipe : <yellow>${finalParams.recipe}</yellow>`
      });
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Stack  : <cyan>${finalParams.stack}</cyan>`
      });
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Run in parallel : ${finalParams.runInParallel ? "<green>true</green>" : "<red>false</red>"}`
      });
      let sharedParams = Object.assign({}, finalParams);
      delete sharedParams.recipe;
      delete sharedParams.stack;
      delete sharedParams.help;
      if (stackObj.sharedParams) {
        sharedParams = __spreadValues(__spreadValues({}, stackObj.sharedParams), sharedParams);
      }
      const processManager = new import_s_process.SProcessManager({
        processManager: {
          runInParallel: finalParams.runInParallel
        }
      });
      pipe(processManager, {
        overrideEmitter: true
      });
      if (stackObj.actions) {
        for (let i = 0; i < Object.keys(stackObj.actions).length; i++) {
          const actionName = Object.keys(stackObj.actions)[i];
          if (finalParams.exclude && finalParams.exclude.indexOf(actionName) !== -1) {
            emit("log", {
              type: import_s_log.default.TYPE_VERBOSE,
              value: `Excluding the action "<yellow>${actionName}</yellow>"`
            });
            return;
          }
          let actionObj = stackObj.actions[actionName];
          if (actionObj.extends) {
            if (!actionsObj[actionObj.extends]) {
              throw new Error(`<red>[action]</red> Your action "<yellow>${actionName}</yellow>" tries to extends the "<cyan>${actionObj.extends}</cyan>" action that does not exists... Here's the available actions at this time: <green>${Object.keys(actionsObj).join(",")}</green>`);
            }
            emit("log", {
              type: import_s_log.default.TYPE_VERBOSE,
              value: `<yellow>\u25CB</yellow> <magenta>extends</magenta> : Your action "<yellow>${actionName}</yellow>" extends the "<cyan>${actionObj.extends}</cyan>" one`
            });
            actionObj = (0, import_deepMerge.default)(Object.assign({}, actionsObj[actionObj.extends]), actionObj);
          }
          let actionSpecificParams = {}, actionParams = {};
          if (actionObj.action && !actionObj.process && !actionObj.command) {
            actionSpecificParams = (_d = actionObj.params) != null ? _d : {};
            actionObj = actionObj.action;
          }
          actionParams = (_e = actionObj.params) != null ? _e : {};
          const finalActionParams = (0, import_deepMerge.default)(actionParams, actionSpecificParams);
          const sharedParamsStr = (0, import_argsToString.default)(sharedParams).trim();
          const actionId = (_f = actionObj.id) != null ? _f : actionName;
          let finalCommand = ((_g = actionObj.command) != null ? _g : actionObj.process).trim() + " " + sharedParamsStr;
          finalCommand = import_cli.default.replaceTokens(finalCommand, finalActionParams);
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `<yellow>\u25CB</yellow> <yellow>${actionName}</yellow> : <cyan>${finalCommand}</cyan>`
          });
          const pro = await import_s_process.default.from(finalCommand, {
            process: {
              before: actionObj.before,
              after: actionObj.after
            }
          });
          const finalProcessManagerParams = __spreadValues(__spreadValues({}, sharedParams), (_h = actionObj.params) != null ? _h : {});
          processManager.attachProcess(actionId, pro, {});
          const processPro = processManager.run(actionId, finalProcessManagerParams, (_j = (_i = actionObj.settings) == null ? void 0 : _i.process) != null ? _j : {});
          if (!processesPromises.includes(processPro)) {
            processesPromises.push(processPro);
          }
          if (!finalParams.runInParallel) {
            await processPro;
          }
        }
      }
      await Promise.all(processesPromises);
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<green>[success]</green> All actions have been executed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`
      });
      resolve(processesPromises);
    }, {}).bind(this);
  }
  listRecipes() {
    const recipes = import_s_sugar_config.default.get("frontstack.recipes");
    return recipes;
  }
  list(params) {
    return new import_s_promise.default(({ resolve, reject, emit }) => {
      const recipes = this.listRecipes();
      const finalParams = import_SFrontstackListParamsInterface.default.apply(params);
      let recipe, stack;
      if (finalParams.recipe) {
        recipe = finalParams.recipe.split(".")[0];
        stack = finalParams.recipe.split(".")[1];
      }
      if (!recipe) {
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `Available recipe(s) list:`
        });
        let largerName = "";
        for (const name in recipes) {
          if (name.length > largerName.length)
            largerName = name;
        }
        for (const [name, obj] of Object.entries(recipes)) {
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `- <cyan>${name}</cyan>${" ".repeat(largerName.length - name.length)} : ${obj.description}`
          });
        }
        return resolve(recipes);
      }
      if (recipe) {
        if (!recipes[recipe]) {
          throw new Error(`<red>[SFrontstack.list]</red> Sorry but the recipe "<yellow>${recipe}</yellow> does not exists...`);
        }
      }
      if (recipe && !stack) {
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `Stacks list for the recipe "<yellow>${recipe}</yellow>":`
        });
        let largerName = "";
        for (const name in recipes[recipe].stacks) {
          if (name.length > largerName.length)
            largerName = name;
        }
        for (const [name, obj] of Object.entries(recipes[recipe].stacks)) {
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `- <cyan>${name}</cyan>${" ".repeat(largerName.length - name.length)} : ${obj.description}`
          });
        }
        return resolve(recipes[recipe]);
      }
      if (stack) {
        if (!recipes[recipe].stacks[stack]) {
          throw new Error(`<red>[SFrontstack.list]</red> Sorry but the stack "<yellow>${stack}</yellow> does not exists in the recipe "<cyan>${recipe}</cyan>"...`);
        }
      }
      if (recipe && stack) {
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `Actions list for the recipe "<yellow>${recipe}</yellow> and the stack "<cyan>${stack}</cyan>":`
        });
        let largerName = "";
        for (const name in recipes[recipe].stacks[stack].actions) {
          if (name.length > largerName.length)
            largerName = name;
        }
        for (const [name, obj] of Object.entries(recipes[recipe].stacks[stack].actions)) {
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `- <cyan>${name}</cyan>${" ".repeat(largerName.length - name.length)} : ${obj.description}`
          });
        }
        return resolve(recipes[recipe].stacks[stack]);
      }
    }, {
      metas: {
        id: "SFrontstack.list"
      }
    });
  }
}
SFrontstack.interfaces = {
  startParams: import_SFrontstackActionInterface.default
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
