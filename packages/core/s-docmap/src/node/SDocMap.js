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
var SDocMap_exports = {};
__export(SDocMap_exports, {
  default: () => SDocMap_default
});
module.exports = __toCommonJS(SDocMap_exports);
var import_s_class = __toESM(require("@coffeekraken/s-class"), 1);
var import_s_docblock = __toESM(require("@coffeekraken/s-docblock"), 1);
var import_s_duration = __toESM(require("@coffeekraken/s-duration"), 1);
var import_s_glob = __toESM(require("@coffeekraken/s-glob"), 1);
var import_s_log = __toESM(require("@coffeekraken/s-log"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_copySync = __toESM(require("@coffeekraken/sugar/node/fs/copySync"), 1);
var import_ensureDirSync = __toESM(require("@coffeekraken/sugar/node/fs/ensureDirSync"), 1);
var import_filename = __toESM(require("@coffeekraken/sugar/node/fs/filename"), 1);
var import_folderPath = __toESM(require("@coffeekraken/sugar/node/fs/folderPath"), 1);
var import_readJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/readJsonSync"), 1);
var import_removeSync = __toESM(require("@coffeekraken/sugar/node/fs/removeSync"), 1);
var import_writeFileSync = __toESM(require("@coffeekraken/sugar/node/fs/writeFileSync"), 1);
var import_writeJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/writeJsonSync"), 1);
var import_install = __toESM(require("@coffeekraken/sugar/node/npm/install"), 1);
var import_jsonSync = __toESM(require("@coffeekraken/sugar/node/package/jsonSync"), 1);
var import_packageRoot = __toESM(require("@coffeekraken/sugar/node/path/packageRoot"), 1);
var import_packageRootDir = __toESM(require("@coffeekraken/sugar/node/path/packageRootDir"), 1);
var import_deepFilter = __toESM(require("@coffeekraken/sugar/shared/object/deepFilter"), 1);
var import_deepMap = __toESM(require("@coffeekraken/sugar/shared/object/deepMap"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_namespaceCompliant = __toESM(require("@coffeekraken/sugar/shared/string/namespaceCompliant"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_SDocmapBuildParamsInterface = __toESM(require("./interface/SDocmapBuildParamsInterface"), 1);
var import_SDocmapInstallSnapshotParamsInterface = __toESM(require("./interface/SDocmapInstallSnapshotParamsInterface"), 1);
var import_SDocMapReadParamsInterface = __toESM(require("./interface/SDocMapReadParamsInterface"), 1);
var import_SDocmapSnapshotParamsInterface = __toESM(require("./interface/SDocmapSnapshotParamsInterface"), 1);
var import_chokidar = __toESM(require("chokidar"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_checkPathWithMultipleExtensions = __toESM(require("@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions"), 1);
function __toLowerCase(l = "") {
  return l.toLowerCase();
}
class SDocMap extends import_s_class.default {
  constructor(settings) {
    super((0, import_deepMerge.default)({
      metas: {
        id: "SDocMap"
      },
      docmap: {
        tagsProxy: {},
        customMenu: {
          styleguide({ key, value, isObject }) {
            if (key.split("/").length > 1 && key.match(/^([a-zA-Z0-9-_@\/]+)?\/styleguide\//))
              return true;
            if (key === "styleguide")
              return true;
            return false;
          }
        }
      }
    }, settings || {}));
    this._entries = {};
    this.docmapSettings.tagsProxy = __spreadValues(__spreadValues({}, this.constructor._registeredTagsProxy), this.docmapSettings.tagsProxy);
    if (!this.constructor.watcher) {
      this.constructor.watcher = import_chokidar.default.watch(import_s_sugar_config.default.get("docmap.read.input"));
      this.constructor.watcher.on("change", () => {
        delete this.constructor._cachedDocmapJson.current;
      });
    }
  }
  static registerTagProxy(tag, processor) {
    this._registeredTagsProxy[tag] = processor;
  }
  get docmapSettings() {
    return this._settings.docmap;
  }
  read(params) {
    return new import_s_promise.default(async ({ resolve, pipe, emit }) => {
      var _a;
      const finalParams = (0, import_deepMerge.default)(import_SDocMapReadParamsInterface.default.defaults(), params != null ? params : {});
      if (finalParams.snapshot) {
        finalParams.input = import_path.default.resolve(finalParams.snapshotDir, finalParams.snapshot, "docmap.json");
      }
      let docmapVersion = (_a = finalParams.snapshot) != null ? _a : "current";
      if (this.constructor._cachedDocmapJson[docmapVersion]) {
        return resolve(this.constructor._cachedDocmapJson[docmapVersion]);
      }
      let docmapRootPath = (0, import_folderPath.default)(finalParams.input);
      if (!import_fs.default.existsSync(finalParams.input)) {
        throw new Error(`<red>[${this.constructor.name}.${this.metas.id}]</red> Sorry but the file "<cyan>${finalParams.input}</cyan>" does not exists...`);
      }
      const packageMonoRoot = (0, import_packageRoot.default)(process.cwd(), true);
      const extendedPackages = [];
      const finalDocmapJson = {
        metas: {
          type: finalParams.snapshot ? "snapshot" : "current",
          snapshot: finalParams.snapshot
        },
        map: {},
        menu: {},
        snapshots: []
      };
      const loadJson = async (packageNameOrPath, currentPath) => {
        var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
        if (extendedPackages.indexOf(packageNameOrPath) !== -1)
          return;
        extendedPackages.push(packageNameOrPath);
        let currentPathDocmapJsonPath, potentialPackagePath = import_path.default.resolve(docmapRootPath, "node_modules", packageNameOrPath, "docmap.json"), potentialRootPackagePath = import_path.default.resolve(packageMonoRoot, "node_modules", packageNameOrPath, "docmap.json");
        if (import_fs.default.existsSync(potentialPackagePath)) {
          currentPathDocmapJsonPath = potentialPackagePath;
        } else if (import_fs.default.existsSync(`${packageNameOrPath}/docmap.json`)) {
          currentPathDocmapJsonPath = `${packageNameOrPath}/docmap.json`;
        } else if (import_fs.default.existsSync(potentialRootPackagePath)) {
          currentPathDocmapJsonPath = potentialRootPackagePath;
        } else {
          emit("log", {
            type: import_s_log.default.TYPE_WARN,
            value: `<red>[read]</red> Sorry but the references docmap path/package "<yellow>${packageNameOrPath}</yellow>" does not exists`
          });
        }
        if (!currentPathDocmapJsonPath)
          return;
        const extendsRootPath = currentPathDocmapJsonPath.replace("/docmap.json", "");
        const packageJsonPath = `${extendsRootPath}/package.json`;
        if (!import_fs.default.existsSync(packageJsonPath)) {
          emit("log", {
            type: import_s_log.default.TYPE_WARN,
            value: `<red>[${this.constructor.name}]</red> Sorry but the package "<yellow>${extendsRootPath}</yellow>" does not have any valid "<cyan>package.json</cyan>" file at his root`
          });
        }
        const currentPackageJson = (0, import_readJsonSync.default)(packageJsonPath);
        const docmapJson = (0, import_readJsonSync.default)(currentPathDocmapJsonPath);
        Object.keys(docmapJson.map).forEach((namespace) => {
          if (docmapJson.map[namespace]) {
            docmapJson.map[namespace].package = {
              name: currentPackageJson.name,
              description: currentPackageJson.description,
              version: currentPackageJson.version,
              license: currentPackageJson.license
            };
          }
        });
        Object.keys((_b = (_a2 = docmapJson.generated) == null ? void 0 : _a2.map) != null ? _b : []).forEach((namespace) => {
          if (docmapJson.generated.map[namespace]) {
            docmapJson.generated.map[namespace].package = {
              name: currentPackageJson.name,
              description: currentPackageJson.description,
              version: currentPackageJson.version,
              license: currentPackageJson.license
            };
          }
        });
        docmapJson.extends = [
          ...(_c = docmapJson.extends) != null ? _c : [],
          ...(_e = (_d = docmapJson.generated) == null ? void 0 : _d.extends) != null ? _e : []
        ];
        docmapJson.map = __spreadValues(__spreadValues({}, (_f = docmapJson.map) != null ? _f : {}), (_h = (_g = docmapJson.generated) == null ? void 0 : _g.map) != null ? _h : {});
        delete docmapJson.generated;
        for (let i = 0; i < docmapJson.extends.length; i++) {
          const extendsPackageName = docmapJson.extends[i];
          await loadJson(extendsPackageName, extendsRootPath);
        }
        for (let i = 0; i < Object.keys(docmapJson.map).length; i++) {
          const namespace = Object.keys(docmapJson.map)[i];
          const obj = docmapJson.map[namespace];
          obj.path = import_path.default.resolve(extendsRootPath, obj.relPath);
          let ext = obj.relPath.split(".").pop();
          obj.path = (_i = (0, import_checkPathWithMultipleExtensions.default)(obj.path, [
            `dev.${ext}`,
            ext
          ])) != null ? _i : obj.path;
          docmapJson.map[namespace] = obj;
        }
        finalDocmapJson.map = __spreadValues(__spreadValues({}, finalDocmapJson.map), (_j = docmapJson.map) != null ? _j : {});
      };
      const docmapJsonFolderPath = (0, import_folderPath.default)(finalParams.input);
      await loadJson(docmapJsonFolderPath, docmapJsonFolderPath);
      if (import_fs.default.existsSync(finalParams.snapshotDir)) {
        const availableSnapshots = import_fs.default.readdirSync(finalParams.snapshotDir);
        finalDocmapJson.snapshots = availableSnapshots;
      } else {
        finalDocmapJson.snapshots = [];
      }
      this._docmapJson = finalDocmapJson;
      finalDocmapJson.menu = this._extractMenu(finalDocmapJson);
      this.constructor._cachedDocmapJson[docmapVersion] = finalDocmapJson;
      resolve(finalDocmapJson);
    }, {
      metas: {
        id: `read`
      }
    });
  }
  _extractMenu(docmapJson = this._docmapJson) {
    const docmapJsonMenuByPackage = {};
    Object.keys(docmapJson.map).forEach((namespace) => {
      const docmapObj = docmapJson.map[namespace];
      if (!docmapObj.menu)
        return;
      if (!docmapJsonMenuByPackage[docmapObj.package.name]) {
        docmapJsonMenuByPackage[docmapObj.package.name] = [];
      }
      docmapJsonMenuByPackage[docmapObj.package.name].push(docmapObj);
    });
    let finalMenu = {
      packages: {},
      tree: {},
      slug: {},
      custom: {}
    };
    const packageJson = (0, import_jsonSync.default)();
    Object.keys(docmapJsonMenuByPackage).forEach((packageName) => {
      const menuObj = this._extractMenuFromDocmapJsonStack(docmapJsonMenuByPackage[packageName]);
      if (packageName === packageJson.name) {
        finalMenu = __spreadValues(__spreadValues({}, finalMenu), menuObj);
      } else {
        const scopedSlugMenu = {};
        Object.keys(menuObj.slug).forEach((slug) => {
          scopedSlugMenu[`/${packageName}${slug}`] = menuObj.slug[slug];
        });
        finalMenu.packages[packageName] = {
          name: packageName,
          tree: (0, import_deepMap.default)(menuObj.tree, ({ prop, value }) => {
            if (prop === "slug")
              return `/${packageName}${value}`;
            return value;
          }),
          slug: scopedSlugMenu
        };
      }
    });
    Object.keys(this.docmapSettings.customMenu).forEach((menuName) => {
      if (!finalMenu.custom[menuName])
        finalMenu.custom[menuName] = {};
      finalMenu.custom[menuName].tree = (0, import_deepFilter.default)(finalMenu.tree, this.docmapSettings.customMenu[menuName]);
      finalMenu.custom[menuName].slug = (0, import_deepFilter.default)(finalMenu.slug, this.docmapSettings.customMenu[menuName]);
      Object.keys(finalMenu.packages).forEach((packageName) => {
        const packageObj = finalMenu.packages[packageName];
        const packageFilteredTree = (0, import_deepFilter.default)(packageObj.tree, this.docmapSettings.customMenu[menuName]);
        finalMenu.custom[menuName].tree = (0, import_deepMerge.default)(finalMenu.custom[menuName].tree, packageFilteredTree);
        const packageFilteredSlug = (0, import_deepFilter.default)(packageObj.slug, this.docmapSettings.customMenu[menuName]);
        finalMenu.custom[menuName].slug = (0, import_deepMerge.default)(finalMenu.custom[menuName].slug, packageFilteredSlug);
      });
    });
    return finalMenu;
  }
  _extractMenuFromDocmapJsonStack(docmapJsonMap) {
    const menuObj = {}, menuObjBySlug = {}, menuObjByPackage = {};
    Object.keys(docmapJsonMap).forEach((namespace) => {
      const docmapObj = docmapJsonMap[namespace];
      if (!docmapObj.menu)
        return;
      const dotPath = docmapObj.menu.tree.map((l) => {
        return __toLowerCase(l);
      }).join(".");
      let currentObj = menuObj;
      dotPath.split(".").forEach((part, i) => {
        if (!currentObj[part]) {
          currentObj[part] = {
            name: docmapObj.menu.tree[i]
          };
        }
        if (i >= dotPath.split(".").length - 1) {
          currentObj[part][docmapObj.name] = {
            name: docmapObj.name,
            slug: docmapObj.menu.slug,
            tree: docmapObj.menu.tree
          };
          menuObjBySlug[docmapObj.menu.slug] = {
            name: docmapObj.name,
            slug: docmapObj.menu.slug,
            tree: docmapObj.menu.tree,
            docmap: docmapObj
          };
        }
        currentObj = currentObj[part];
      });
    });
    return {
      tree: menuObj,
      slug: menuObjBySlug
    };
  }
  build(params) {
    const finalParams = (0, import_deepMerge.default)(import_SDocmapBuildParamsInterface.default.defaults(), params);
    return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
      var _a, _b;
      emit("notification", {
        message: `${this.metas.id} build started`
      });
      let docmapJson = {
        map: {},
        extends: [],
        generated: {
          extends: [],
          map: {}
        }
      };
      const packageRoot = (0, import_packageRootDir.default)();
      const packageMonoRoot = (0, import_packageRoot.default)(process.cwd(), true);
      if (import_fs.default.existsSync(`${packageRoot}/docmap.json`)) {
        const currentDocmapJson = (0, import_readJsonSync.default)(`${packageRoot}/docmap.json`);
        docmapJson = currentDocmapJson;
        docmapJson.generated = {
          extends: [],
          map: {}
        };
      }
      const packageJson = (0, import_jsonSync.default)();
      if (!finalParams.noExtends) {
        emit("log", {
          value: `<yellow>[build]</yellow> Building extends array from existing docmap compliant packages`
        });
        const globs = [
          `${packageRoot}/node_modules/*{0,2}/docmap.json`
        ];
        if (packageRoot !== packageMonoRoot) {
          globs.push(`${packageMonoRoot}/node_modules/*{0,2}/docmap.json`);
        }
        const currentDocmapFiles = import_s_glob.default.resolve(globs, {
          defaultExcludes: false,
          exclude: (_a = finalParams.exclude) != null ? _a : []
        });
        emit("log", {
          value: `<yellow>[build]</yellow> Found <cyan>${currentDocmapFiles.length}</cyan> docmap.json file(s) in dependencies`
        });
        const extendsArray = [];
        currentDocmapFiles.forEach((file) => {
          const currentPackageJson = (0, import_readJsonSync.default)(`${file.dirPath}/package.json`);
          if (currentPackageJson.name === packageJson.name)
            return;
          extendsArray.push(currentPackageJson.name);
        });
        docmapJson.generated.extends = extendsArray.filter((name) => name !== packageJson.name);
      }
      emit("log", {
        value: `<yellow>[build]</yellow> Building map by searching for files inside the current package`
      });
      const filesInPackage = import_s_glob.default.resolve(finalParams.globs.map((glob) => {
        return `${glob}:\\*\\s@namespace`;
      }), {
        cwd: packageRoot,
        exclude: (_b = finalParams.exclude) != null ? _b : []
      });
      emit("log", {
        value: `<yellow>[build]</yellow> Found <cyan>${filesInPackage.length}</cyan> file(s) to parse in package`
      });
      for (let i = 0; i < filesInPackage.length; i++) {
        const file = filesInPackage[i];
        const content = file.raw;
        emit("log", {
          value: `<yellow>[build]</yellow> Parsing file "<cyan>${import_path.default.relative((0, import_packageRootDir.default)(), file.path)}</cyan>"`
        });
        const docblocksInstance = new import_s_docblock.default(content, {
          docblock: {
            renderMarkdown: false,
            filepath: file.path
          }
        });
        await pipe(docblocksInstance.parse());
        const docblocks = docblocksInstance.toObject();
        if (!docblocks || !docblocks.length)
          continue;
        let docblockObj = {};
        const children = {};
        for (let j = 0; j < docblocks.length; j++) {
          const docblock = docblocks[j];
          for (let k = 0; k < Object.keys(finalParams.filters).length; k++) {
            const filterReg = finalParams.filters[Object.keys(finalParams.filters)[k]];
            const value = docblock[Object.keys(finalParams.filters)[k]];
            if (value === void 0)
              continue;
            if (value.match(filterReg))
              break;
          }
          if (docblock.name && docblock.name.slice(0, 1) === "_")
            continue;
          if (docblock.private)
            continue;
          const filename = (0, import_filename.default)(file.path);
          const docblockEntryObj = {};
          for (let l = 0; l < finalParams.tags.length; l++) {
            const tag = finalParams.tags[l];
            if (docblock[tag] === void 0)
              continue;
            if (tag === "namespace")
              docblock[tag] = `${packageJson.name.replace("/", ".")}.${docblock[tag]}`;
            if (this.docmapSettings.tagsProxy[tag]) {
              docblockEntryObj[tag] = await this.docmapSettings.tagsProxy[tag](docblock[tag]);
            } else {
              docblockEntryObj[tag] = docblock[tag];
            }
          }
          const namespaceIdCompliant = (0, import_namespaceCompliant.default)(`${docblock.namespace}.${docblock.name}`);
          if (docblock.namespace && !this._entries[namespaceIdCompliant]) {
            docblockObj = __spreadProps(__spreadValues({}, docblockEntryObj), {
              filename,
              extension: filename.split(".").slice(1)[0],
              relPath: import_path.default.relative((0, import_packageRootDir.default)(), file.path)
            });
            this._entries[namespaceIdCompliant] = docblockObj;
          } else if (docblock.name) {
            children[__toLowerCase(docblock.name)] = docblockEntryObj;
          }
        }
        docblockObj.children = children;
      }
      emit("log", {
        value: `<yellow>[build]</yellow> <green>${Object.keys(this._entries).length}</green> entries gathered for this docMap`
      });
      emit("notification", {
        type: "success",
        message: `${this.metas.id} build success`
      });
      docmapJson.generated.map = this._entries;
      if (finalParams.save) {
        emit("log", {
          value: `<green>[save]</green> File saved <green>successfully</green> under "<cyan>${finalParams.outPath.replace((0, import_packageRootDir.default)() + "/", "")}</cyan>"`
        });
        import_fs.default.writeFileSync(finalParams.outPath, JSON.stringify(docmapJson, null, 4));
      }
      resolve(docmapJson);
    }, {
      metas: {
        id: `build`
      }
    });
  }
  installSnapshot(params) {
    return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
      const finalParams = (0, import_deepMerge.default)(import_SDocmapInstallSnapshotParamsInterface.default.defaults(), params != null ? params : {});
      const duration = new import_s_duration.default();
      const folders = import_s_glob.default.resolve(finalParams.glob, {
        defaultExcludes: false
      });
      if (!folders.length) {
        emit("log", {
          value: `<cyan>[info]</cyan> It seem's that you don't have any snapshot(s) matching the glob "<cyan>${params.glob}</cyan>". Try generating a snapshot first with the command "<yellow>sugar docmap.snapshot</yellow>"`
        });
        return resolve();
      }
      for (let i = 0; i < folders.length; i++) {
        const folderPath = folders[i];
        emit("log", {
          value: `<yellow>[install]</yellow> Installing snapshot <yellow>${import_path.default.relative((0, import_packageRootDir.default)(), folderPath)}</yellow>`
        });
        const packageJson = (0, import_jsonSync.default)();
        const packageMonoRootPath = (0, import_packageRoot.default)(process.cwd(), true);
        const removedDependencies = {}, removedDevDependencies = {};
        if (packageMonoRootPath !== (0, import_packageRoot.default)()) {
          const packageJsonFiles = import_s_glob.default.resolve(`${packageMonoRootPath}/**/package.json`);
          packageJsonFiles.forEach((file) => {
            var _a, _b, _c, _d;
            if (file.dirPath === packageMonoRootPath)
              return;
            if (!((_a = packageJson.dependencies) == null ? void 0 : _a[file.content.name]) && !((_b = packageJson.devDependencies) == null ? void 0 : _b[file.content.name]))
              return;
            if ((_c = packageJson.dependencies) == null ? void 0 : _c[file.content.name]) {
              removedDependencies[file.content.name] = packageJson.dependencies[file.content.name];
              delete packageJson.dependencies[file.content.name];
            }
            if ((_d = packageJson.devDependencies) == null ? void 0 : _d[file.content.name]) {
              removedDevDependencies[file.content.name] = packageJson.devDependencies[file.content.name];
              delete packageJson.devDependencies[file.content.name];
            }
            const packageFolderPath = (0, import_folderPath.default)(file.path);
            const destinationFolderPath = `${folderPath}/node_modules/${file.content.name}`;
            (0, import_ensureDirSync.default)(destinationFolderPath.split("/").slice(0, -1).join("/"));
            try {
              import_fs.default.unlinkSync(destinationFolderPath);
            } catch (e) {
            }
            import_fs.default.symlinkSync(packageFolderPath, destinationFolderPath);
          });
        }
        if (Object.keys(removedDependencies).length || Object.keys(removedDevDependencies).length) {
          (0, import_writeJsonSync.default)(`${folderPath}/package.json`, packageJson);
        }
        await pipe((0, import_install.default)("", {
          cwd: folderPath,
          args: {
            silent: false
          }
        }));
        if (Object.keys(removedDependencies).length || Object.keys(removedDevDependencies).length) {
          packageJson.dependencies = __spreadValues(__spreadValues({}, packageJson.dependencies), removedDependencies);
          packageJson.devDependencies = __spreadValues(__spreadValues({}, packageJson.devDependencies), removedDevDependencies);
          (0, import_writeJsonSync.default)(`${folderPath}/package.json`, packageJson);
        }
        emit("log", {
          value: `<green>[success]</green> Snapshot "<yellow>${import_path.default.relative((0, import_packageRootDir.default)(), folderPath)}</yellow>" installed <green>successfully</green>`
        });
      }
      emit("log", {
        value: `<green>[success]</green> Snapshot(s) installed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`
      });
    }, {
      metas: {
        id: `installSnapshots`
      }
    });
  }
  snapshot(params) {
    return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
      const finalParams = (0, import_deepMerge.default)(import_SDocmapSnapshotParamsInterface.default.defaults(), params);
      const duration = new import_s_duration.default();
      emit("log", {
        value: `<yellow>[snapshot]</yellow> Creating a docmap snapshot. This can take some time so please be patient...`
      });
      if (!import_fs.default.existsSync(`${(0, import_packageRootDir.default)()}/package.json`)) {
        throw new Error(`<red>[${this.constructor.name}.snapshot]</red> Sorry but a package.json file is required in order to create a snapshot...`);
      }
      if (!import_fs.default.existsSync(`${(0, import_packageRootDir.default)()}/docmap.json`)) {
        throw new Error(`<red>[${this.constructor.name}.snapshot]</red> Sorry but a docmap.json file is required in order to create a snapshot...`);
      }
      const packageJson = (0, import_jsonSync.default)();
      const docmapJson = (0, import_readJsonSync.default)(`${(0, import_packageRootDir.default)()}/docmap.json`);
      const outDir = import_path.default.resolve(finalParams.outDir, packageJson.version);
      (0, import_removeSync.default)(outDir);
      (0, import_ensureDirSync.default)(outDir);
      (0, import_copySync.default)(`${(0, import_packageRootDir.default)()}/package.json`, `${outDir}/package.json`);
      (0, import_copySync.default)(`${(0, import_packageRootDir.default)()}/docmap.json`, `${outDir}/docmap.json`);
      try {
        (0, import_copySync.default)(`${(0, import_packageRootDir.default)()}/package-lock.json`, `${outDir}/package-lock.json`);
        (0, import_copySync.default)(`${(0, import_packageRootDir.default)()}/yarn.lock`, `${outDir}/yarn.lock`);
      } catch (e) {
      }
      const fullMap = __spreadValues(__spreadValues({}, docmapJson.map), docmapJson.generated.map);
      Object.keys(fullMap).forEach((namespace) => {
        const docmapObj = fullMap[namespace];
        const path = import_path.default.resolve((0, import_packageRootDir.default)(), docmapObj.relPath);
        let content = import_fs.default.readFileSync(path, "utf8").toString();
        if (docmapObj.type === "markdown") {
        } else {
          const docblock = new import_s_docblock.default(content, {
            docblock: {
              renderMarkdown: false
            }
          });
          content = docblock.toString();
        }
        (0, import_writeFileSync.default)(import_path.default.resolve(outDir, docmapObj.relPath), content);
      });
      emit("log", {
        value: `<green>[save]</green> Snapshot saved under "<cyan>${import_path.default.relative(process.cwd(), outDir)}</cyan>"`
      });
      emit("log", {
        value: `<green>[success]</green> Snapshot generated <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`
      });
      resolve();
    }, {
      metas: {
        id: `snapshot`
      }
    });
  }
}
SDocMap.interfaces = {};
SDocMap._cachedDocmapJson = {};
SDocMap._registeredTagsProxy = {};
var SDocMap_default = SDocMap;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
