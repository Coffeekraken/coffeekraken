import {
  __toESM
} from "../../../../chunk-TD77TI6B.mjs";
import __SBench from "@coffeekraken/s-bench";
import __SSugarJson from "@coffeekraken/s-sugar-json";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __packageCacheDir from "@coffeekraken/sugar/node/path/packageCacheDir";
import __packageRoot from "@coffeekraken/sugar/node/path/packageRoot";
import __STheme from "@coffeekraken/s-theme";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __unquote from "@coffeekraken/sugar/shared/string/unquote";
import __fs from "fs";
import __glob from "glob";
import __path from "path";
import __postcss from "postcss";
import __folderHash from "@coffeekraken/sugar/node/fs/folderHash";
import __getRoot from "./utils/getRoot";
import __folderPath from "@coffeekraken/sugar/node/fs/folderPath";
import __fileHash from "@coffeekraken/sugar/node/fs/fileHash";
import __objectHash from "@coffeekraken/sugar/shared/object/objectHash";
import __writeFileSync from "@coffeekraken/sugar/node/fs/writeFileSync";
let _mixinsPaths;
const mixinsStack = {}, functionsStack = {};
let pluginHash = __folderHash(__path.resolve(__dirname(), "../../.."), {
  include: {
    ctime: true
  }
}), rootDir;
let loadedPromise, alreadyLoaded = false;
const _cacheObjById = {};
pluginHash = "hhh";
const plugin = (settings = {}) => {
  settings = __deepMerge({
    target: "prod",
    inlineImport: true,
    cache: __SSugarConfig.get("postcssSugarPlugin.cache")
  }, settings);
  settings.cache = false;
  if (settings.target !== "vite") {
    settings.cache = false;
  }
  function contentToArray(content) {
    if (content instanceof CssVars) {
      content = content._stack;
    }
    if (!Array.isArray(content))
      content = [content];
    return content;
  }
  function contentToString(content) {
    return contentToArray(content).join("\n");
  }
  function findUp(node, checker) {
    const res = checker(node);
    if (!res && node.parent)
      return findUp(node.parent, checker);
    else if (res)
      return res;
    return;
  }
  const _cacheHashById = {};
  function cache(id, hash, content) {
    if (!settings.cache)
      return content;
    if (!_cacheObjById[id])
      _cacheObjById[id] = {};
    _cacheObjById[id].hash = hash;
    _cacheObjById[id].content = content;
    const cachePath = getCacheFilePath(hash);
    if (!__fs.existsSync(cachePath)) {
      console.log(`<yellow>[cache]</yellow> Caching object "<cyan>${id}</cyan>"`);
      const returned = `
                /* CACHE:${hash} */
                ${Array.isArray(content) ? content.join("\n") : content}
                /* ENDCACHE:${hash} */
            `;
      _cacheObjById[id].return = returned;
    }
    console.log(`<green>[postcss]</green> Object "<cyan>${id}</cyan>" taken from cache`);
    try {
      const returned = __fs.readFileSync(cachePath, "utf8").toString();
      _cacheObjById[id].return = returned;
      return returned;
    } catch (e) {
    }
    return content;
  }
  function getCacheFilePath(cacheId) {
    const fileName = `${cacheId}.css`;
    return `${__packageCacheDir()}/postcssSugarPlugin/${pluginHash}/${fileName}`;
  }
  function applyNoScopes(scopes, fromNode) {
    const noScopeRule = findUp(fromNode, (node) => {
      if ((node == null ? void 0 : node.name) === "sugar.scope.no")
        return node;
      return;
    });
    if (noScopeRule && noScopeRule.params) {
      const noScopes = noScopeRule.params.trim().replace(/^\(/, "").replace(/\)$/, "").split(/[,\s]/).map((l) => l.trim());
      const newScopes = scopes.filter((scope) => {
        return noScopes.indexOf(scope) === -1;
      });
      return newScopes;
    }
    return scopes;
  }
  function commentsNeeded() {
    return settings.target !== "vite";
  }
  function replaceWith(atRule, nodes) {
    nodes = contentToArray(nodes);
    if (atRule.parent) {
      let finalNodes = [];
      nodes.map((n) => typeof n === "string" ? n.trim() : n).forEach((n) => {
        var _a;
        if (typeof n === "string") {
          finalNodes = [
            ...finalNodes,
            ...(_a = __postcss.parse(n).nodes) != null ? _a : []
          ];
        } else {
          finalNodes.push(n);
        }
      });
      for (const node of finalNodes.reverse()) {
        if (!node)
          continue;
        atRule.parent.insertAfter(atRule, node);
      }
    }
    atRule.remove();
  }
  const sharedData = {
    noScopes: []
  };
  const postProcessorsRegisteredFn = [];
  async function _loadFolder(folderPath, type) {
    const paths = __glob.sync(`${folderPath}/**/*.js`, {
      cwd: ""
    });
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const {
        default: fn,
        interface: int,
        dependencies
      } = await Promise.resolve().then(() => __toESM(require(`${path}`)));
      if (type === "mixins") {
        mixinsStack[`${path.replace(`${folderPath}/`, "").replace(/\//gm, ".").replace(/\.js$/, "").toLowerCase()}`] = {
          path,
          mixin: fn,
          interface: int,
          dependencies
        };
        mixinsStack[`${path.replace(`${folderPath}/`, "").replace(/\//gm, ".").replace(/\.js$/, "")}`] = {
          path,
          mixin: fn,
          interface: int,
          dependencies
        };
      } else {
        functionsStack[`${path.replace(`${folderPath}/`, "").replace(/\//gm, ".").replace(/\.js$/, "").toLowerCase()}`] = {
          path,
          fn,
          interface: int,
          dependencies
        };
        functionsStack[`${path.replace(`${folderPath}/`, "").replace(/\//gm, ".").replace(/\.js$/, "")}`] = {
          path,
          fn,
          interface: int,
          dependencies
        };
      }
    }
  }
  async function _processDeclaration(value) {
    var _a;
    const vhMatches = value.match(/(var\(--vh,)?([0-9\.]+)vh(\s|;)?/gm);
    if (vhMatches) {
      vhMatches.forEach((match) => {
        if (match.match(/^var\(--vh,/))
          return;
        const val = match.replace("vh", "");
        value = value.replace(match, `calc(${val} * var(--vh,1vh)) `);
      });
    }
    if (!value.match(/\s?sugar\.[a-zA-Z0-9]+.*/))
      return value;
    const calls = value.match(/sugar\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,){0,999999999999999999999}\)/gm);
    if (!calls || !calls.length)
      return value;
    for (let i = 0; i < calls.length; i++) {
      let sugarStatement = (_a = calls[i]) != null ? _a : "";
      const openingParenthesisCount = (sugarStatement.match(/\(/g) || []).length;
      const closingParenthesisCount = (sugarStatement.match(/\)/g) || []).length;
      if (openingParenthesisCount > closingParenthesisCount) {
        sugarStatement += ")".repeat(openingParenthesisCount - closingParenthesisCount);
      }
      const functionName = sugarStatement.match(/sugar\.([a-zA-Z0-9\.]+)/)[1];
      const paramsStatement = sugarStatement.replace(/sugar\.[a-zA-Z0-9\.]+/, "");
      let fnId = functionName;
      if (!functionsStack[fnId]) {
        fnId = `${fnId}.${fnId.split(".").slice(-1)[0]}`;
      }
      const fnObject = functionsStack[fnId];
      if (!fnObject) {
        throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${fnId}</yellow>" does not exists...`);
      }
      const functionInterface = functionsStack[fnId].interface;
      const params = functionInterface.apply(paramsStatement, {});
      delete params.help;
      try {
        const result = await fnObject.fn({
          params,
          settings
        });
        value = value.replace(sugarStatement, result);
      } catch (e) {
        console.error(e.message);
      }
    }
    return value;
  }
  function _load() {
    if (loadedPromise)
      return loadedPromise;
    loadedPromise = new Promise(async (resolve, reject) => {
      var _a, _b, _c, _d;
      const sugarJsonInstance = new __SSugarJson();
      const sugarJson = await sugarJsonInstance.read();
      for (let i = 0; i < Object.keys(sugarJson).length; i++) {
        const packageName = Object.keys(sugarJson)[i];
        const packageSugarJson = sugarJson[packageName];
        if (!packageSugarJson.postcss)
          continue;
        const mixinsFolders = (_b = (_a = packageSugarJson.postcss.folders) == null ? void 0 : _a.mixins) != null ? _b : [];
        for (let j = 0; j < mixinsFolders.length; j++) {
          const folderObj = mixinsFolders[j];
          if (!folderObj.path)
            continue;
          const finalPath = __path.resolve(packageSugarJson.metas.folderPath, folderObj.path);
          await _loadFolder(finalPath, "mixins");
        }
        const functionsFolders = (_d = (_c = packageSugarJson.postcss.folders) == null ? void 0 : _c.functions) != null ? _d : [];
        for (let j = 0; j < functionsFolders.length; j++) {
          const folderObj = functionsFolders[j];
          if (!folderObj.path)
            continue;
          const finalPath = __path.resolve(packageSugarJson.metas.folderPath, folderObj.path);
          await _loadFolder(finalPath, "functions");
        }
      }
      await _loadFolder(`${__dirname()}/mixins`, "mixins");
      await _loadFolder(`${__dirname()}/functions`, "functions");
      resolve(true);
    });
    return loadedPromise;
  }
  class CssVars {
    constructor(str) {
      this._stack = [];
      if (str)
        this._stack.push(str);
    }
    comment(str) {
      if (!commentsNeeded())
        return this;
      if (typeof str === "function")
        str = str();
      if (Array.isArray(str))
        str = str.join("\n");
      this._stack.push(str);
      return this;
    }
    code(str) {
      if (typeof str === "function")
        str = str();
      if (Array.isArray(str))
        str = str.join("\n");
      this._stack.push(str);
      return this;
    }
    toString() {
      return this._stack.join("\n");
    }
  }
  return {
    postcssPlugin: "sugar",
    async Once(root) {
      var _a, _b;
      __SBench.start("postcssSugarPlugin");
      await _load();
      if ((_b = (_a = root.source) == null ? void 0 : _a.input) == null ? void 0 : _b.from) {
        if (!rootDir) {
          rootDir = __folderPath(root.source.input.from);
        }
        const fileHash = __fileHash(root.source.input.from, {
          include: {
            ctime: true
          }
        });
        const hash = __objectHash({
          fileHash,
          theme: __STheme.hash
        });
      }
    },
    async OnceExit(root) {
      var _a, _b;
      for (let i = 0; i < postProcessorsRegisteredFn.length; i++) {
        const fn = postProcessorsRegisteredFn[i];
        await fn(root);
      }
      const postProcessorsPaths = __glob.sync("**/*.js", {
        cwd: `${__dirname()}/postProcessors`
      });
      for (let i = 0; i < postProcessorsPaths.length; i++) {
        const path = postProcessorsPaths[i];
        const { default: processorFn } = await Promise.resolve().then(() => __toESM(require(`${__dirname()}/postProcessors/${path}`)));
        await processorFn({
          root,
          sharedData
        });
      }
      let cssStr = root.toString();
      const cacheMatches = cssStr.match(/\/\*\sCACHE:[a-zA-Z0-9@\._-]+\s\*\//gm);
      cacheMatches == null ? void 0 : cacheMatches.forEach((cacheStr) => {
        const cacheId = cacheStr.replace("/* CACHE:", "").replace(" */", "").trim();
        const toCache = cssStr.match(new RegExp(`\\/\\*\\sCACHE:${cacheId}\\s\\*\\/(.|\\r|\\t|\\n)*\\/\\*\\sENDCACHE:${cacheId}\\s\\*\\/`, "g"));
        if (!toCache)
          return;
        const cachePath = getCacheFilePath(cacheId);
        const toCacheStr = toCache[0].replace(`/* CACHE:${cacheId} */`, "").replace(`/* ENDCACHE:${cacheId} */`, "");
        __writeFileSync(cachePath, toCacheStr);
      });
      __SBench.end("postcssSugarPlugin").log({
        body: `File: <cyan>${__path.relative(__packageRoot(), (_b = (_a = root.source) == null ? void 0 : _a.input) == null ? void 0 : _b.from)}</cyan>`
      });
    },
    async AtRule(atRule, postcssApi) {
      var _a;
      if (atRule.name.match(/^sugar\./)) {
        let mixinId = atRule.name.replace(/^sugar\./, "");
        if (!mixinsStack[mixinId]) {
          mixinId = `${mixinId}.${mixinId.split(".").slice(-1)[0]}`;
        }
        if (!mixinsStack[mixinId]) {
          throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested sugar mixin "<yellow>${atRule.name}</yellow>" does not exists...`);
        }
        const root = __getRoot(atRule);
        const sourcePath = typeof root.source.input.file === "string" ? __path.dirname(root.source.input.file) : __dirname();
        const mixinFn = mixinsStack[mixinId].mixin;
        const mixinInterface = mixinsStack[mixinId].interface;
        const processedParams = await _processDeclaration(atRule.params);
        const params = mixinInterface.apply(processedParams, {});
        delete params.help;
        let result = await mixinFn({
          params,
          atRule,
          findUp,
          cache,
          CssVars,
          pluginHash,
          getRoot: __getRoot,
          getCacheFilePath,
          commentsNeeded,
          applyNoScopes(scopes = []) {
            return applyNoScopes(scopes, atRule);
          },
          replaceWith(nodes) {
            replaceWith(atRule, nodes);
          },
          atRootStart(css) {
            const root2 = __getRoot(atRule);
            root2.prepend(css);
          },
          atRootEnd(css) {
            const root2 = __getRoot(atRule);
            root2.append(css);
          },
          postcssApi,
          sourcePath,
          sharedData,
          registerPostProcessor(fn) {
            postProcessorsRegisteredFn.push(fn);
          },
          postcss: __postcss,
          settings
        });
        if (result) {
          result = contentToString(result);
          replaceWith(atRule, result);
        }
      } else if (atRule.name.match(/^import/)) {
        if (!settings.inlineImport)
          return;
        if (atRule.params.match(/^url\(/))
          return;
        if (!((_a = atRule.source) == null ? void 0 : _a.input)) {
          throw new Error(`Make sure to import your stylesheets using the "<cyan>@import url(...);</cyan>" syntax and not the "<red>@import '...';</red>" one...`);
        }
        const dirName = typeof atRule.source.input.file === "string" ? __path.dirname(atRule.source.input.file) : __dirname();
        const path = __path.resolve(dirName, __unquote(atRule.params));
        if (!__fs.existsSync(path)) {
          throw new Error(`<red>[postcssSugarPlugin.@import]</red> You try to load the file "<yellow>${path}</yellow>" but this file does not exists`);
        }
        const contentStr = __fs.readFileSync(path, "utf8").toString();
        atRule.after(contentStr);
        atRule.remove();
      }
    },
    async Declaration(decl) {
      if (!decl.prop)
        return;
      decl.value = await _processDeclaration(decl.value);
    }
  };
};
plugin.postcss = true;
const postcss = true;
var postcssSugarPlugin_default = plugin;
export {
  postcssSugarPlugin_default as default,
  postcss
};
