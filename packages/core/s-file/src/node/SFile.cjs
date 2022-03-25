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
var SFile_exports = {};
__export(SFile_exports, {
  default: () => SFile_default
});
module.exports = __toCommonJS(SFile_exports);
var import_s_event_emitter = __toESM(require("@coffeekraken/s-event-emitter"), 1);
var import_ensureDirSync = __toESM(require("@coffeekraken/sugar/node/fs/ensureDirSync"), 1);
var import_extension = __toESM(require("@coffeekraken/sugar/node/fs/extension"), 1);
var import_filename = __toESM(require("@coffeekraken/sugar/node/fs/filename"), 1);
var import_folderPath = __toESM(require("@coffeekraken/sugar/node/fs/folderPath"), 1);
var import_readJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/readJsonSync"), 1);
var import_require = __toESM(require("@coffeekraken/sugar/node/esm/require"), 1);
var import_onProcessExit = __toESM(require("@coffeekraken/sugar/node/process/onProcessExit"), 1);
var import_md5 = __toESM(require("@coffeekraken/sugar/shared/crypt/md5"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_toString = __toESM(require("@coffeekraken/sugar/shared/string/toString"), 1);
var import_uniqid = __toESM(require("@coffeekraken/sugar/shared/string/uniqid"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_writeFile = __toESM(require("@coffeekraken/sugar/node/fs/writeFile"), 1);
var import_writeFileSync = __toESM(require("@coffeekraken/sugar/node/fs/writeFileSync"), 1);
var import_minimatch = __toESM(require("minimatch"), 1);
var import_path = __toESM(require("path"), 1);
const _SFile = class extends import_s_event_emitter.default {
  constructor(filepath, settings) {
    super((0, import_deepMerge.default)({
      file: {
        checkExistence: true,
        cwd: process.cwd(),
        shrinkSizesTo: 4,
        watch: {
          pollingInterval: 500
        },
        writeSettings: {
          encoding: "utf8",
          flag: void 0,
          mode: 1638,
          cast: true,
          path: void 0
        },
        readSettings: {
          encoding: "utf8",
          flag: void 0,
          cast: true
        },
        processors: {
          content: [],
          save: []
        }
      }
    }, settings || {}));
    this.sourcesFiles = {};
    this._stats = {};
    this._commits = [];
    this._path = filepath;
    Object.defineProperty(this, "_stats", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: null
    });
    this.exists = import_fs.default.existsSync(filepath);
    this.cwd = this.fileSettings.cwd;
    this._name = (0, import_filename.default)(filepath);
    this.extension = (0, import_extension.default)(this.path).toLowerCase();
    this._nameWithoutExt = this.name.replace(`.${this.extension}`, "");
    if (this.fileSettings.checkExistence && !this.exists) {
      throw new Error(`The passed filepath "<cyan>${this.path}</cyan>" does not exist and you have setted the "<yellow>checkExistence</yellow>" setting to <green>true</green>`);
    }
    if (this.fileSettings.sourcesExtensions && this.fileSettings.sourcesExtensions.length) {
      this.fileSettings.sourcesExtensions.forEach((ext) => {
        const replaceReg = new RegExp(`.${this.extension}$`);
        const potentialPath = this.path.replace(replaceReg, `.${ext}`);
        if (import_fs.default.existsSync(potentialPath)) {
          this.sourcesFiles[ext] = _SFile.new(potentialPath);
        }
      });
    }
    if (this.fileSettings.watch !== false) {
      this.watch();
    }
  }
  static registerClass(pattern, cls) {
    let patternsArray = [];
    if (Array.isArray(pattern))
      patternsArray = pattern;
    else if (typeof pattern === "string") {
      patternsArray = pattern.split(",").map((l) => l.trim());
    }
    patternsArray.forEach((pat) => {
      this._registeredClasses[pat.toLowerCase()] = cls;
    });
  }
  static new(path, settings) {
    const fileName = (0, import_filename.default)(path);
    for (let i = 0; i < Object.keys(this._registeredClasses).length; i++) {
      const pattern = Object.keys(this._registeredClasses)[i], cls = this._registeredClasses[pattern];
      if ((0, import_minimatch.default)(fileName, pattern)) {
        return new cls(path, settings);
      }
    }
    return new _SFile(path, settings);
  }
  get name() {
    return this._name;
  }
  get nameWithoutExt() {
    return this._nameWithoutExt;
  }
  get path() {
    let path = this._path;
    if (!import_path.default.isAbsolute(path) && this.fileSettings.cwd && !path.includes(this.fileSettings.cwd)) {
      path = import_path.default.resolve(this.fileSettings.cwd, path);
    }
    return path;
  }
  get relPath() {
    return import_path.default.relative(this.cwd, this.path);
  }
  get dirPath() {
    return import_path.default.dirname(this.path);
  }
  get fileSettings() {
    return this._settings.file;
  }
  get hash() {
    return import_md5.default.encrypt(this.content);
  }
  get stats() {
    if (!this._stats)
      this.update();
    return this._stats;
  }
  get raw() {
    if (this._raw)
      return this._raw;
    this._raw = import_fs.default.readFileSync(this.path, "utf8");
    return this._raw;
  }
  get content() {
    if (this._content)
      return this._content;
    this._content = this.readSync();
    for (let i = 0; i < this.fileSettings.processors.content.length; i++) {
      this._content = this.fileSettings.processors.content[i](this._content);
    }
    return this._content;
  }
  set content(value) {
    this._commits.push({
      time: Date.now(),
      data: value
    });
    this._content = value;
  }
  get commits() {
    return this._commits;
  }
  toObject(readContent = true) {
    const obj = {
      exists: this.exists,
      cwd: this.cwd,
      path: this.path,
      relPath: this.relPath,
      name: this.name,
      extension: this.extension,
      dirPath: this.dirPath,
      stats: this.stats
    };
    if (readContent)
      obj.content = this.readSync();
    return obj;
  }
  update() {
    this._content = void 0;
    this.exists = import_fs.default.existsSync(this.path);
    if (!this.exists) {
      this._stats = null;
      return;
    }
    const stats = import_fs.default.statSync(this.path);
    this._stats = stats;
    this._stats.bytes = stats.size;
    this._stats.gbytes = stats.size * 1e-8;
    this._stats.mbytes = stats.size * 1e-6;
    this._stats.kbytes = stats.size * 1e-3;
    if (this.fileSettings.shrinkSizesTo) {
      this._stats.bytes = Number(this._stats.bytes.toFixed(this.fileSettings.shrinkSizesTo));
      this._stats.kbytes = Number(this._stats.kbytes.toFixed(this.fileSettings.shrinkSizesTo));
      this._stats.mbytes = Number(this._stats.mbytes.toFixed(this.fileSettings.shrinkSizesTo));
      this._stats.gbytes = Number(this._stats.gbytes.toFixed(this.fileSettings.shrinkSizesTo));
    }
  }
  watch() {
    if (this._watcher)
      return;
    this._watcher = import_fs.default.watchFile(this.path, {
      interval: this.fileSettings.watch && this.fileSettings.watch.pollingInterval ? this.fileSettings.watch.pollingInterval : 1e3
    }, (event) => {
      this.update();
      this.emit("update", this);
    });
    setTimeout(() => {
      this.emit("watch", this);
    });
  }
  unwatch() {
    if (!this._watcher)
      return;
    this._watcher.close();
    this._watcher = void 0;
    this.emit("unwatch", this);
  }
  toString() {
    return this.path;
  }
  duplicate(to) {
    return new Promise((resolve) => {
      const newFile = this.duplicateSync(to);
      resolve(newFile);
    });
  }
  duplicateSync(to) {
    let destination = to;
    if (!to) {
      const __replacePathTokens = (0, import_require.default)("@coffeekraken/sugar/node/path/replacePathTokens").default;
      destination = __replacePathTokens(`%tmpDir/files/${this.constructor.name}/${this.nameWithoutExt}.${(0, import_uniqid.default)()}.${this.extension}`);
      (0, import_onProcessExit.default)(() => {
        try {
          import_fs.default.unlinkSync(destination);
        } catch (e) {
        }
      });
    }
    destination = import_path.default.resolve(destination);
    if (import_fs.default.existsSync(destination)) {
      throw new Error(`<red>[sugar.node.fs.SFile.duplicate]</red> Sorry but a file already exists at "<cyan>${destination}</cyan>"`);
    }
    (0, import_ensureDirSync.default)((0, import_folderPath.default)(destination));
    import_fs.default.copyFileSync(this.path, destination);
    const newFileInstance = new this.constructor(destination, this._settings);
    return newFileInstance;
  }
  save() {
    return new Promise((resolve, reject) => {
      const res = this.saveSync();
      resolve(res);
    });
  }
  saveSync() {
    if (!this.commits.length)
      return this;
    let toSave = this.content;
    if (this.fileSettings.processors.save.length) {
      for (let i = 0; i < this.fileSettings.processors.save.length; i++) {
        toSave = this.fileSettings.processors.save[i](toSave);
      }
    }
    if (typeof toSave !== "string") {
      try {
        const res = JSON.stringify(toSave, null, 4);
        toSave = res;
      } catch (e) {
        if (typeof toSave !== "string" && toSave.toString && typeof toSave.toString === "function") {
          toSave = toSave.toString();
        }
      }
    }
    import_fs.default.writeFileSync(this.path, toSave);
    this._commits = [];
    this._content = void 0;
    return this;
  }
  unlink() {
    return new Promise((resolve, reject) => {
      import_fs.default.unlink(this.path, (error) => {
        if (error)
          return reject(error);
        this.update();
        resolve(true);
      });
    });
  }
  unlinkSync() {
    import_fs.default.unlinkSync(this.path);
    this.update();
    return true;
  }
  read(settings = {}) {
    return new Promise((resolve, reject) => {
      if (this.exists === false) {
        return reject(`You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`);
      }
      const set = __spreadValues(__spreadValues({}, this.fileSettings.readSettings), settings);
      import_fs.default.readFile(this.path, {
        encoding: set.encoding,
        flag: set.flag
      }, (error, data) => {
        if (error)
          return reject(error);
        if (this.extension === "json" && set.cast) {
          console.log("RRR", data.toString());
          return resolve(JSON.parse(data.toString()));
        }
        resolve(data.toString());
      });
    });
  }
  readSync(settings = {}) {
    if (this.exists === false) {
      throw new Error(`You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`);
    }
    const set = __spreadValues(__spreadValues({}, this.fileSettings.readSettings), settings);
    let content;
    if (this.extension === "json" && set.cast) {
      content = (0, import_readJsonSync.default)(this.path);
      return content;
    } else {
      content = import_fs.default.readFileSync(this.path, {
        encoding: set.encoding,
        flag: set.flag
      });
    }
    if (set.cast) {
      try {
        return JSON.parse(content.toString());
      } catch (e) {
        return content.toString();
      }
    }
    return content.toString();
  }
  write(data, settings = {}) {
    return new Promise(async (resolve, reject) => {
      var _a;
      const set = __spreadValues(__spreadProps(__spreadValues({}, this.fileSettings.writeSettings), {
        path: this.path
      }), settings);
      data = (_a = (0, import_toString.default)(data, {
        beautify: true,
        highlight: false
      })) != null ? _a : "";
      await (0, import_writeFile.default)(set.path, data);
      resolve(true);
    });
  }
  writeSync(data, settings = {}) {
    var _a;
    const set = __spreadValues(__spreadProps(__spreadValues({}, this.fileSettings.writeSettings), {
      path: this.path
    }), settings);
    data = (_a = (0, import_toString.default)(data, {
      beautify: true,
      highlight: false
    })) != null ? _a : "";
    (0, import_writeFileSync.default)(set.path, data);
    this.update();
  }
};
let SFile = _SFile;
SFile._registeredClasses = {};
var SFile_default = SFile;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
