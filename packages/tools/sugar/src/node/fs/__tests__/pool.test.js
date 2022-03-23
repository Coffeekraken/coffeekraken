var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_pool = __toESM(require("../pool"), 1);
var import_s_file = __toESM(require("@coffeekraken/s-file"), 1);
var import_removeSync = __toESM(require("../removeSync"), 1);
var import_packageTmpDir = __toESM(require("../../path/packageTmpDir"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_wait = __toESM(require("../../../shared/time/wait"), 1);
jest.setTimeout(2e4);
describe("sugar.node.fs.pool", () => {
  it("Should correctly start a pool and listen for updates, deletion, etc...", () => {
    return new Promise(async (resolve) => {
      await import_s_sugar_config.default.load();
      const poolTestFolderPath = `${(0, import_packageTmpDir.default)()}/tests/pool`;
      (0, import_removeSync.default)(poolTestFolderPath);
      const initialFile = new import_s_file.default(`${poolTestFolderPath}/initial.txt`, {
        file: {
          checkExistence: false
        }
      });
      initialFile.writeSync("Hello world");
      const newFile = new import_s_file.default(`${poolTestFolderPath}/coco/new.txt`, {
        file: {
          checkExistence: false
        }
      });
      const pool = (0, import_pool.default)(`${poolTestFolderPath}/**/*`, {
        watch: true
      });
      let events = {
        ready: false,
        file: false,
        files: false,
        change: false,
        update: false,
        unlink: false,
        add: false
      };
      pool.on("ready", async (path) => {
        events.ready = true;
        await newFile.write("hello world");
        await (0, import_wait.default)(500);
        await newFile.write("plop");
        await (0, import_wait.default)(500);
        await newFile.unlink();
        await (0, import_wait.default)(500);
        expect(events).toEqual({
          ready: true,
          file: true,
          files: true,
          change: true,
          update: true,
          unlink: true,
          add: true
        });
        resolve(true);
      });
      pool.on("file", (file) => {
        events.file = true;
      });
      pool.on("files", (files) => {
        events.files = true;
      });
      pool.on("change", (file) => {
        events.change = true;
      });
      pool.on("update", (file) => {
        events.update = true;
      });
      pool.on("unlink", (file) => {
        events.unlink = true;
      });
      pool.on("add", (file) => {
        events.add = true;
      });
    });
  });
});
