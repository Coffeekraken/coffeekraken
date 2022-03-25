var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import __SEventEmitter from "@coffeekraken/s-event-emitter";
import __ensureDirSync from "@coffeekraken/sugar/node/fs/ensureDirSync";
import __extension from "@coffeekraken/sugar/node/fs/extension";
import __getFilename from "@coffeekraken/sugar/node/fs/filename";
import __folderPath from "@coffeekraken/sugar/node/fs/folderPath";
import __readJsonSync from "@coffeekraken/sugar/node/fs/readJsonSync";
import __require from "@coffeekraken/sugar/node/esm/require";
import __onProcessExit from "@coffeekraken/sugar/node/process/onProcessExit";
import __md5 from "@coffeekraken/sugar/shared/crypt/md5";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __toString from "@coffeekraken/sugar/shared/string/toString";
import __uniqid from "@coffeekraken/sugar/shared/string/uniqid";
import __fs from "fs";
import __writeFile from "@coffeekraken/sugar/node/fs/writeFile";
import __writeFileSync from "@coffeekraken/sugar/node/fs/writeFileSync";
import __minimatch from "minimatch";
import __path from "path";
const _SFile = class extends __SEventEmitter {
  constructor(filepath, settings) {
    super(__deepMerge({
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
    this.exists = __fs.existsSync(filepath);
    this.cwd = this.fileSettings.cwd;
    this._name = __getFilename(filepath);
    this.extension = __extension(this.path).toLowerCase();
    this._nameWithoutExt = this.name.replace(`.${this.extension}`, "");
    if (this.fileSettings.checkExistence && !this.exists) {
      throw new Error(`The passed filepath "<cyan>${this.path}</cyan>" does not exist and you have setted the "<yellow>checkExistence</yellow>" setting to <green>true</green>`);
    }
    if (this.fileSettings.sourcesExtensions && this.fileSettings.sourcesExtensions.length) {
      this.fileSettings.sourcesExtensions.forEach((ext) => {
        const replaceReg = new RegExp(`.${this.extension}$`);
        const potentialPath = this.path.replace(replaceReg, `.${ext}`);
        if (__fs.existsSync(potentialPath)) {
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
    const fileName = __getFilename(path);
    for (let i = 0; i < Object.keys(this._registeredClasses).length; i++) {
      const pattern = Object.keys(this._registeredClasses)[i], cls = this._registeredClasses[pattern];
      if (__minimatch(fileName, pattern)) {
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
    if (!__path.isAbsolute(path) && this.fileSettings.cwd && !path.includes(this.fileSettings.cwd)) {
      path = __path.resolve(this.fileSettings.cwd, path);
    }
    return path;
  }
  get relPath() {
    return __path.relative(this.cwd, this.path);
  }
  get dirPath() {
    return __path.dirname(this.path);
  }
  get fileSettings() {
    return this._settings.file;
  }
  get hash() {
    return __md5.encrypt(this.content);
  }
  get stats() {
    if (!this._stats)
      this.update();
    return this._stats;
  }
  get raw() {
    if (this._raw)
      return this._raw;
    this._raw = __fs.readFileSync(this.path, "utf8");
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
    this.exists = __fs.existsSync(this.path);
    if (!this.exists) {
      this._stats = null;
      return;
    }
    const stats = __fs.statSync(this.path);
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
    this._watcher = __fs.watchFile(this.path, {
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
      const __replacePathTokens = __require("@coffeekraken/sugar/node/path/replacePathTokens").default;
      destination = __replacePathTokens(`%tmpDir/files/${this.constructor.name}/${this.nameWithoutExt}.${__uniqid()}.${this.extension}`);
      __onProcessExit(() => {
        try {
          __fs.unlinkSync(destination);
        } catch (e) {
        }
      });
    }
    destination = __path.resolve(destination);
    if (__fs.existsSync(destination)) {
      throw new Error(`<red>[sugar.node.fs.SFile.duplicate]</red> Sorry but a file already exists at "<cyan>${destination}</cyan>"`);
    }
    __ensureDirSync(__folderPath(destination));
    __fs.copyFileSync(this.path, destination);
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
    __fs.writeFileSync(this.path, toSave);
    this._commits = [];
    this._content = void 0;
    return this;
  }
  unlink() {
    return new Promise((resolve, reject) => {
      __fs.unlink(this.path, (error) => {
        if (error)
          return reject(error);
        this.update();
        resolve(true);
      });
    });
  }
  unlinkSync() {
    __fs.unlinkSync(this.path);
    this.update();
    return true;
  }
  read(settings = {}) {
    return new Promise((resolve, reject) => {
      if (this.exists === false) {
        return reject(`You try to read the file "<yellow>${this.path}</yellow>" but this file does not exists on the filesystem`);
      }
      const set = __spreadValues(__spreadValues({}, this.fileSettings.readSettings), settings);
      __fs.readFile(this.path, {
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
      content = __readJsonSync(this.path);
      return content;
    } else {
      content = __fs.readFileSync(this.path, {
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
      data = (_a = __toString(data, {
        beautify: true,
        highlight: false
      })) != null ? _a : "";
      await __writeFile(set.path, data);
      resolve(true);
    });
  }
  writeSync(data, settings = {}) {
    var _a;
    const set = __spreadValues(__spreadProps(__spreadValues({}, this.fileSettings.writeSettings), {
      path: this.path
    }), settings);
    data = (_a = __toString(data, {
      beautify: true,
      highlight: false
    })) != null ? _a : "";
    __writeFileSync(set.path, data);
    this.update();
  }
};
let SFile = _SFile;
SFile._registeredClasses = {};
var SFile_default = SFile;
export {
  SFile_default as default
};
