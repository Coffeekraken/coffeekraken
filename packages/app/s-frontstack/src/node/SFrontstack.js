var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import __SClass from "@coffeekraken/s-class";
import __SDuration from "@coffeekraken/s-duration";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __SFrontstackActionInterface from "./interface/SFrontstackActionInterface";
import __SFrontstackRecipeParamsInterface from "./interface/SFrontstackRecipeParamsInterface";
import __SFrontstackListParamsInterface from "./interface/SFrontstackListParamsInterface";
import __SFronstackNewParamsInterface from "./interface/SFrontstackNewParamsInterface";
import __SPromise from "@coffeekraken/s-promise";
import __SSugarJson from "@coffeekraken/s-sugar-json";
import __argsToString from "@coffeekraken/sugar/shared/cli/argsToString";
import __SProcess, {
  SProcessManager as __SProcessManager
} from "@coffeekraken/s-process";
import __stripAnsi from "@coffeekraken/sugar/shared/string/stripAnsi";
import __SLog from "@coffeekraken/s-log";
import __SSugarCli from "@coffeekraken/cli";
import __filter from "@coffeekraken/sugar/shared/object/filter";
import __commandExists from "@coffeekraken/sugar/node/command/commandExists";
class SFrontstack extends __SClass {
  get frontstackSettings() {
    return this._settings.frontstack;
  }
  constructor(settings) {
    super(__deepMerge({
      frontstack: {}
    }, settings != null ? settings : {}));
  }
  new(params) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
      const frontstackConfig = __SSugarConfig.get("frontstack");
      const recipesObj = __filter(frontstackConfig.recipes, (key, recipeObj2) => {
        var _a;
        return ((_a = recipeObj2.stacks) == null ? void 0 : _a.new) !== void 0;
      });
      const finalParams = __SFronstackNewParamsInterface.apply(params);
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
        type: __SLog.TYPE_INFO,
        value: `Starting project creation using the "<yellow>${recipe}</yellow>" recipe...`
      });
      resolve(pipe(this.recipe({
        recipe,
        stack: "new"
      })));
    }).bind(this);
  }
  action(params) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
      var _a, _b, _c, _d, _e, _f;
      const frontstackConfig = __SSugarConfig.get("frontstack");
      const actionsObj = frontstackConfig.actions;
      const finalParams = __SFrontstackActionInterface.apply(params);
      const availableActions = Object.keys(actionsObj);
      if (availableActions.indexOf(finalParams.action) === -1) {
        throw new Error(`<red>[${this.constructor.name}.action]</red> Sorry but the requested action "<yellow>${finalParams.action}</yellow>" does not exists. Here's the list of available action(s):
${availableActions.map((r) => `- <yellow>${r}</yellow>`).join("\n")}`);
      }
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: `Starting frontstack process using "<yellow>${finalParams.action}</yellow>" action`
      });
      const actionObj = actionsObj[finalParams.action];
      const processManager = new __SProcessManager({});
      pipe(processManager);
      const finalCommand = __SSugarCli.replaceTokens((_a = actionObj.command) != null ? _a : actionObj.process);
      const actionId = (_b = actionObj.id) != null ? _b : finalParams.action;
      const pro = await __SProcess.from(finalCommand);
      processManager.attachProcess(actionId, pro, {});
      processManager.run(actionId, (_d = (_c = finalParams.params) != null ? _c : actionObj.params) != null ? _d : {}, (_f = (_e = actionObj.settings) == null ? void 0 : _e.process) != null ? _f : {});
    }, {}).bind(this);
  }
  recipe(params) {
    const processesPromises = [];
    const duration = new __SDuration();
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      const frontstackConfig = __SSugarConfig.get("frontstack");
      const recipesObj = frontstackConfig.recipes;
      const actionsObj = frontstackConfig.actions;
      const finalParams = __SFrontstackRecipeParamsInterface.apply(params);
      const sugarJson = new __SSugarJson().current();
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
          recipeObj.stacks[finalParams.stack].actions[`sugarJson-${value.action}`] = __deepMerge(Object.assign({}, frontstackConfig.actions[value.action], value));
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
              type: __SLog.TYPE_VERBOSE,
              value: `<yellow>[requirements]</yellow> Checking for the "<magenta>${recipeObj.requirements.commands[i]}</magenta>" command to exists...`
            });
            const version = await __commandExists(recipeObj.requirements.commands[i]);
            if (!version) {
              throw new Error(`<red>[requirements]</red> Sorry but the command "<yellow>${recipeObj.requirements.commands[i]}</yellow>" is required but it does not exists.`);
            } else {
              emit("log", {
                type: __SLog.TYPE_VERBOSE,
                value: `<green>[requirements]</green> Command "<magenta>${recipeObj.requirements.commands[i]}</magenta>" available in version <cyan>${__stripAnsi(String(version).replace("\n", ""))}</cyan>.`
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
        type: __SLog.TYPE_INFO,
        value: `Starting frontstack process`
      });
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Recipe : <yellow>${finalParams.recipe}</yellow>`
      });
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Stack  : <cyan>${finalParams.stack}</cyan>`
      });
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Run in parallel : ${finalParams.runInParallel ? "<green>true</green>" : "<red>false</red>"}`
      });
      let sharedParams = Object.assign({}, finalParams);
      delete sharedParams.recipe;
      delete sharedParams.stack;
      delete sharedParams.help;
      if (stackObj.sharedParams) {
        sharedParams = __spreadValues(__spreadValues({}, stackObj.sharedParams), sharedParams);
      }
      const processManager = new __SProcessManager({
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
              type: __SLog.TYPE_VERBOSE,
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
              type: __SLog.TYPE_VERBOSE,
              value: `<yellow>\u25CB</yellow> <magenta>extends</magenta> : Your action "<yellow>${actionName}</yellow>" extends the "<cyan>${actionObj.extends}</cyan>" one`
            });
            actionObj = __deepMerge(Object.assign({}, actionsObj[actionObj.extends]), actionObj);
          }
          let actionSpecificParams = {}, actionParams = {};
          if (actionObj.action && !actionObj.process && !actionObj.command) {
            actionSpecificParams = (_d = actionObj.params) != null ? _d : {};
            actionObj = actionObj.action;
          }
          actionParams = (_e = actionObj.params) != null ? _e : {};
          const finalActionParams = __deepMerge(actionParams, actionSpecificParams);
          const sharedParamsStr = __argsToString(sharedParams).trim();
          const actionId = (_f = actionObj.id) != null ? _f : actionName;
          let finalCommand = ((_g = actionObj.command) != null ? _g : actionObj.process).trim() + " " + sharedParamsStr;
          finalCommand = __SSugarCli.replaceTokens(finalCommand, finalActionParams);
          emit("log", {
            type: __SLog.TYPE_INFO,
            value: `<yellow>\u25CB</yellow> <yellow>${actionName}</yellow> : <cyan>${finalCommand}</cyan>`
          });
          const pro = await __SProcess.from(finalCommand, {
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
        type: __SLog.TYPE_INFO,
        value: `<green>[success]</green> All actions have been executed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`
      });
      resolve(processesPromises);
    }, {}).bind(this);
  }
  listRecipes() {
    const recipes = __SSugarConfig.get("frontstack.recipes");
    return recipes;
  }
  list(params) {
    return new __SPromise(({ resolve, reject, emit }) => {
      const recipes = this.listRecipes();
      const finalParams = __SFrontstackListParamsInterface.apply(params);
      let recipe, stack;
      if (finalParams.recipe) {
        recipe = finalParams.recipe.split(".")[0];
        stack = finalParams.recipe.split(".")[1];
      }
      if (!recipe) {
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `Available recipe(s) list:`
        });
        let largerName = "";
        for (const name in recipes) {
          if (name.length > largerName.length)
            largerName = name;
        }
        for (const [name, obj] of Object.entries(recipes)) {
          emit("log", {
            type: __SLog.TYPE_INFO,
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
          type: __SLog.TYPE_INFO,
          value: `Stacks list for the recipe "<yellow>${recipe}</yellow>":`
        });
        let largerName = "";
        for (const name in recipes[recipe].stacks) {
          if (name.length > largerName.length)
            largerName = name;
        }
        for (const [name, obj] of Object.entries(recipes[recipe].stacks)) {
          emit("log", {
            type: __SLog.TYPE_INFO,
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
          type: __SLog.TYPE_INFO,
          value: `Actions list for the recipe "<yellow>${recipe}</yellow> and the stack "<cyan>${stack}</cyan>":`
        });
        let largerName = "";
        for (const name in recipes[recipe].stacks[stack].actions) {
          if (name.length > largerName.length)
            largerName = name;
        }
        for (const [name, obj] of Object.entries(recipes[recipe].stacks[stack].actions)) {
          emit("log", {
            type: __SLog.TYPE_INFO,
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
  startParams: __SFrontstackActionInterface
};
export {
  SFrontstack as default
};
