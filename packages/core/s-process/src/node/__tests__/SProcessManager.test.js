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
var import_MyProcess = __toESM(require("./MyProcess"), 1);
var import_SProcessManager = __toESM(require("../SProcessManager"), 1);
var import_wait = __toESM(require("@coffeekraken/sugar/shared/time/wait"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
jest.setTimeout(3e4);
describe("s-process.SProcessManager", () => {
  it("Should handle a simple process correctly", async () => {
    await import_s_sugar_config.default.load();
    const manager = new import_SProcessManager.default();
    const pro = new import_MyProcess.default();
    manager.attachProcess("main", pro);
    const res = await manager.run("main");
    await (0, import_wait.default)(10);
    expect(res.value).toEqual({
      param1: "Hello",
      param2: true,
      isChildProcess: true,
      crash: false,
      crashTimeout: 100
    });
  });
  it("Should handle a simple process that crash correctly", async () => {
    const manager = new import_SProcessManager.default();
    const pro = new import_MyProcess.default({
      crash: true
    });
    let restarted = 0;
    manager.attachProcess("main", pro, {
      restart: {
        delay: 10,
        before: (lastProcessObj) => {
          restarted++;
          if (restarted >= 3)
            return false;
          return lastProcessObj;
        }
      }
    });
    const res = await manager.run("main");
    await (0, import_wait.default)(10);
    expect(res.length).toBe(3);
    expect(res[0].state).toBe("error");
  });
  it("Should handle a simple process with a maxTimes to 2 and that crash correctly", async () => {
    const manager = new import_SProcessManager.default();
    const pro = new import_MyProcess.default({
      crash: true
    });
    manager.attachProcess("main", pro, {
      restart: {
        maxTimes: 2,
        delay: 10
      }
    });
    const res = await manager.run("main");
    await (0, import_wait.default)(10);
    expect(res.length).toBe(2);
    expect(res[0].state).toBe("error");
  });
  it("Should handle a simple process with a maxEvery to 500 and that crash correctly", async () => {
    const manager = new import_SProcessManager.default();
    const pro = new import_MyProcess.default({
      crash: true
    });
    manager.attachProcess("main", pro, {
      restart: {
        maxEvery: 500,
        delay: 10
      }
    });
    const res = await manager.run("main");
    await (0, import_wait.default)(10);
    expect(res.length).toBe(1);
    expect(res[0].state).toBe("error");
  });
});
