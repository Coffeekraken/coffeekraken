import {
  __spreadProps,
  __spreadValues
} from "../../../../chunk-TD77TI6B.mjs";
import __SClass from "@coffeekraken/s-class";
import __SDocblock from "@coffeekraken/s-docblock";
import __SDuration from "@coffeekraken/s-duration";
import __SGlob from "@coffeekraken/s-glob";
import __SLog from "@coffeekraken/s-log";
import __SPromise from "@coffeekraken/s-promise";
import __copySync from "@coffeekraken/sugar/node/fs/copySync";
import __ensureDirSync from "@coffeekraken/sugar/node/fs/ensureDirSync";
import __getFilename from "@coffeekraken/sugar/node/fs/filename";
import __folderPath from "@coffeekraken/sugar/node/fs/folderPath";
import __readJsonSync from "@coffeekraken/sugar/node/fs/readJsonSync";
import __removeSync from "@coffeekraken/sugar/node/fs/removeSync";
import __writeFileSync from "@coffeekraken/sugar/node/fs/writeFileSync";
import __writeJsonSync from "@coffeekraken/sugar/node/fs/writeJsonSync";
import __npmInstall from "@coffeekraken/sugar/node/npm/install";
import __packageJsonSync from "@coffeekraken/sugar/node/package/jsonSync";
import __packageRoot from "@coffeekraken/sugar/node/path/packageRoot";
import __packageRootDir from "@coffeekraken/sugar/node/path/packageRootDir";
import __deepFilter from "@coffeekraken/sugar/shared/object/deepFilter";
import __deepMap from "@coffeekraken/sugar/shared/object/deepMap";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __namespaceCompliant from "@coffeekraken/sugar/shared/string/namespaceCompliant";
import __fs from "fs";
import __path from "path";
import __SDocmapBuildParamsInterface from "./interface/SDocmapBuildParamsInterface";
import __SDocmapInstallSnapshotParamsInterface from "./interface/SDocmapInstallSnapshotParamsInterface";
import __SDocMapReadParamsInterface from "./interface/SDocMapReadParamsInterface";
import __SDocmapSnapshotParamsInterface from "./interface/SDocmapSnapshotParamsInterface";
import __chokidar from "chokidar";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __checkPathWithMultipleExtensions from "@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions";
function __toLowerCase(l = "") {
  return l.toLowerCase();
}
class SDocMap extends __SClass {
  constructor(settings) {
    super(__deepMerge({
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
      this.constructor.watcher = __chokidar.watch(__SSugarConfig.get("docmap.read.input"));
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
    return new __SPromise(async ({ resolve, pipe, emit }) => {
      var _a;
      const finalParams = __deepMerge(__SDocMapReadParamsInterface.defaults(), params != null ? params : {});
      if (finalParams.snapshot) {
        finalParams.input = __path.resolve(finalParams.snapshotDir, finalParams.snapshot, "docmap.json");
      }
      let docmapVersion = (_a = finalParams.snapshot) != null ? _a : "current";
      if (this.constructor._cachedDocmapJson[docmapVersion]) {
        return resolve(this.constructor._cachedDocmapJson[docmapVersion]);
      }
      let docmapRootPath = __folderPath(finalParams.input);
      if (!__fs.existsSync(finalParams.input)) {
        throw new Error(`<red>[${this.constructor.name}.${this.metas.id}]</red> Sorry but the file "<cyan>${finalParams.input}</cyan>" does not exists...`);
      }
      const packageMonoRoot = __packageRoot(process.cwd(), true);
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
        let currentPathDocmapJsonPath, potentialPackagePath = __path.resolve(docmapRootPath, "node_modules", packageNameOrPath, "docmap.json"), potentialRootPackagePath = __path.resolve(packageMonoRoot, "node_modules", packageNameOrPath, "docmap.json");
        if (__fs.existsSync(potentialPackagePath)) {
          currentPathDocmapJsonPath = potentialPackagePath;
        } else if (__fs.existsSync(`${packageNameOrPath}/docmap.json`)) {
          currentPathDocmapJsonPath = `${packageNameOrPath}/docmap.json`;
        } else if (__fs.existsSync(potentialRootPackagePath)) {
          currentPathDocmapJsonPath = potentialRootPackagePath;
        } else {
          emit("log", {
            type: __SLog.TYPE_WARN,
            value: `<red>[read]</red> Sorry but the references docmap path/package "<yellow>${packageNameOrPath}</yellow>" does not exists`
          });
        }
        if (!currentPathDocmapJsonPath)
          return;
        const extendsRootPath = currentPathDocmapJsonPath.replace("/docmap.json", "");
        const packageJsonPath = `${extendsRootPath}/package.json`;
        if (!__fs.existsSync(packageJsonPath)) {
          emit("log", {
            type: __SLog.TYPE_WARN,
            value: `<red>[${this.constructor.name}]</red> Sorry but the package "<yellow>${extendsRootPath}</yellow>" does not have any valid "<cyan>package.json</cyan>" file at his root`
          });
        }
        const currentPackageJson = __readJsonSync(packageJsonPath);
        const docmapJson = __readJsonSync(currentPathDocmapJsonPath);
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
          obj.path = __path.resolve(extendsRootPath, obj.relPath);
          let ext = obj.relPath.split(".").pop();
          obj.path = (_i = __checkPathWithMultipleExtensions(obj.path, [
            `dev.${ext}`,
            ext
          ])) != null ? _i : obj.path;
          docmapJson.map[namespace] = obj;
        }
        finalDocmapJson.map = __spreadValues(__spreadValues({}, finalDocmapJson.map), (_j = docmapJson.map) != null ? _j : {});
      };
      const docmapJsonFolderPath = __folderPath(finalParams.input);
      await loadJson(docmapJsonFolderPath, docmapJsonFolderPath);
      if (__fs.existsSync(finalParams.snapshotDir)) {
        const availableSnapshots = __fs.readdirSync(finalParams.snapshotDir);
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
    const packageJson = __packageJsonSync();
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
          tree: __deepMap(menuObj.tree, ({ prop, value }) => {
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
      finalMenu.custom[menuName].tree = __deepFilter(finalMenu.tree, this.docmapSettings.customMenu[menuName]);
      finalMenu.custom[menuName].slug = __deepFilter(finalMenu.slug, this.docmapSettings.customMenu[menuName]);
      Object.keys(finalMenu.packages).forEach((packageName) => {
        const packageObj = finalMenu.packages[packageName];
        const packageFilteredTree = __deepFilter(packageObj.tree, this.docmapSettings.customMenu[menuName]);
        finalMenu.custom[menuName].tree = __deepMerge(finalMenu.custom[menuName].tree, packageFilteredTree);
        const packageFilteredSlug = __deepFilter(packageObj.slug, this.docmapSettings.customMenu[menuName]);
        finalMenu.custom[menuName].slug = __deepMerge(finalMenu.custom[menuName].slug, packageFilteredSlug);
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
    const finalParams = __deepMerge(__SDocmapBuildParamsInterface.defaults(), params);
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
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
      const packageRoot = __packageRootDir();
      const packageMonoRoot = __packageRoot(process.cwd(), true);
      if (__fs.existsSync(`${packageRoot}/docmap.json`)) {
        const currentDocmapJson = __readJsonSync(`${packageRoot}/docmap.json`);
        docmapJson = currentDocmapJson;
        docmapJson.generated = {
          extends: [],
          map: {}
        };
      }
      const packageJson = __packageJsonSync();
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
        const currentDocmapFiles = __SGlob.resolve(globs, {
          defaultExcludes: false,
          exclude: (_a = finalParams.exclude) != null ? _a : []
        });
        emit("log", {
          value: `<yellow>[build]</yellow> Found <cyan>${currentDocmapFiles.length}</cyan> docmap.json file(s) in dependencies`
        });
        const extendsArray = [];
        currentDocmapFiles.forEach((file) => {
          const currentPackageJson = __readJsonSync(`${file.dirPath}/package.json`);
          if (currentPackageJson.name === packageJson.name)
            return;
          extendsArray.push(currentPackageJson.name);
        });
        docmapJson.generated.extends = extendsArray.filter((name) => name !== packageJson.name);
      }
      emit("log", {
        value: `<yellow>[build]</yellow> Building map by searching for files inside the current package`
      });
      const filesInPackage = __SGlob.resolve(finalParams.globs.map((glob) => {
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
          value: `<yellow>[build]</yellow> Parsing file "<cyan>${__path.relative(__packageRootDir(), file.path)}</cyan>"`
        });
        const docblocksInstance = new __SDocblock(content, {
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
          const filename = __getFilename(file.path);
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
          const namespaceIdCompliant = __namespaceCompliant(`${docblock.namespace}.${docblock.name}`);
          if (docblock.namespace && !this._entries[namespaceIdCompliant]) {
            docblockObj = __spreadProps(__spreadValues({}, docblockEntryObj), {
              filename,
              extension: filename.split(".").slice(1)[0],
              relPath: __path.relative(__packageRootDir(), file.path)
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
          value: `<green>[save]</green> File saved <green>successfully</green> under "<cyan>${finalParams.outPath.replace(__packageRootDir() + "/", "")}</cyan>"`
        });
        __fs.writeFileSync(finalParams.outPath, JSON.stringify(docmapJson, null, 4));
      }
      resolve(docmapJson);
    }, {
      metas: {
        id: `build`
      }
    });
  }
  installSnapshot(params) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
      const finalParams = __deepMerge(__SDocmapInstallSnapshotParamsInterface.defaults(), params != null ? params : {});
      const duration = new __SDuration();
      const folders = __SGlob.resolve(finalParams.glob, {
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
          value: `<yellow>[install]</yellow> Installing snapshot <yellow>${__path.relative(__packageRootDir(), folderPath)}</yellow>`
        });
        const packageJson = __packageJsonSync();
        const packageMonoRootPath = __packageRoot(process.cwd(), true);
        const removedDependencies = {}, removedDevDependencies = {};
        if (packageMonoRootPath !== __packageRoot()) {
          const packageJsonFiles = __SGlob.resolve(`${packageMonoRootPath}/**/package.json`);
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
            const packageFolderPath = __folderPath(file.path);
            const destinationFolderPath = `${folderPath}/node_modules/${file.content.name}`;
            __ensureDirSync(destinationFolderPath.split("/").slice(0, -1).join("/"));
            try {
              __fs.unlinkSync(destinationFolderPath);
            } catch (e) {
            }
            __fs.symlinkSync(packageFolderPath, destinationFolderPath);
          });
        }
        if (Object.keys(removedDependencies).length || Object.keys(removedDevDependencies).length) {
          __writeJsonSync(`${folderPath}/package.json`, packageJson);
        }
        await pipe(__npmInstall("", {
          cwd: folderPath,
          args: {
            silent: false
          }
        }));
        if (Object.keys(removedDependencies).length || Object.keys(removedDevDependencies).length) {
          packageJson.dependencies = __spreadValues(__spreadValues({}, packageJson.dependencies), removedDependencies);
          packageJson.devDependencies = __spreadValues(__spreadValues({}, packageJson.devDependencies), removedDevDependencies);
          __writeJsonSync(`${folderPath}/package.json`, packageJson);
        }
        emit("log", {
          value: `<green>[success]</green> Snapshot "<yellow>${__path.relative(__packageRootDir(), folderPath)}</yellow>" installed <green>successfully</green>`
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
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
      const finalParams = __deepMerge(__SDocmapSnapshotParamsInterface.defaults(), params);
      const duration = new __SDuration();
      emit("log", {
        value: `<yellow>[snapshot]</yellow> Creating a docmap snapshot. This can take some time so please be patient...`
      });
      if (!__fs.existsSync(`${__packageRootDir()}/package.json`)) {
        throw new Error(`<red>[${this.constructor.name}.snapshot]</red> Sorry but a package.json file is required in order to create a snapshot...`);
      }
      if (!__fs.existsSync(`${__packageRootDir()}/docmap.json`)) {
        throw new Error(`<red>[${this.constructor.name}.snapshot]</red> Sorry but a docmap.json file is required in order to create a snapshot...`);
      }
      const packageJson = __packageJsonSync();
      const docmapJson = __readJsonSync(`${__packageRootDir()}/docmap.json`);
      const outDir = __path.resolve(finalParams.outDir, packageJson.version);
      __removeSync(outDir);
      __ensureDirSync(outDir);
      __copySync(`${__packageRootDir()}/package.json`, `${outDir}/package.json`);
      __copySync(`${__packageRootDir()}/docmap.json`, `${outDir}/docmap.json`);
      try {
        __copySync(`${__packageRootDir()}/package-lock.json`, `${outDir}/package-lock.json`);
        __copySync(`${__packageRootDir()}/yarn.lock`, `${outDir}/yarn.lock`);
      } catch (e) {
      }
      const fullMap = __spreadValues(__spreadValues({}, docmapJson.map), docmapJson.generated.map);
      Object.keys(fullMap).forEach((namespace) => {
        const docmapObj = fullMap[namespace];
        const path = __path.resolve(__packageRootDir(), docmapObj.relPath);
        let content = __fs.readFileSync(path, "utf8").toString();
        if (docmapObj.type === "markdown") {
        } else {
          const docblock = new __SDocblock(content, {
            docblock: {
              renderMarkdown: false
            }
          });
          content = docblock.toString();
        }
        __writeFileSync(__path.resolve(outDir, docmapObj.relPath), content);
      });
      emit("log", {
        value: `<green>[save]</green> Snapshot saved under "<cyan>${__path.relative(process.cwd(), outDir)}</cyan>"`
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
export {
  SDocMap_default as default
};
