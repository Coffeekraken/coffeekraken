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
var import_SProcess = __toESM(require("../SProcess"), 1);
var import_MyProcess = __toESM(require("./MyProcess"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
jest.setTimeout(3e4);
describe("s-process", () => {
  it("Should start a simple process correctly", async () => {
    await import_s_sugar_config.default.load();
    const pro = new import_MyProcess.default({
      param1: "World"
    }, {});
    const result = await pro.run({
      param2: false
    });
    expect(result.state).toBe("success");
    expect(result.value).toEqual({
      param1: "World",
      param2: false,
      crash: false,
      crashTimeout: 100,
      isChildProcess: true
    });
  });
  it("Should start a simple process as child correctly", async () => {
    const pro = new import_MyProcess.default({
      param1: "World"
    }, {
      process: {
        runAsChild: true
      }
    });
    const result = await pro.run({
      param2: false
    });
    expect(result.state).toBe("success");
    expect(result.value).toEqual({
      param1: "World",
      param2: false,
      crash: false,
      crashTimeout: 100,
      isChildProcess: true
    });
  });
  it("Should initiate correctly a command based process", async () => {
    const pro = await import_SProcess.default.from("ls -la");
    const res = await pro.run();
    expect(res.state).toBe("success");
  });
  it("Should initiate correctly a file path based process", async () => {
    await import_s_sugar_config.default.load();
    const pro = await import_SProcess.default.from(`${__dirname}/functionBasedProcess`);
    const res = await pro.run({
      something: "cool"
    });
    expect(res.state).toBe("success");
    expect(res.value.something).toBe("cool");
    expect(res.value.state).toBe("success");
    const res1 = await pro.run({
      something: "else"
    });
    expect(res1.state).toBe("success");
    expect(res1.value.something).toBe("else");
    expect(res1.value.state).toBe("success");
  });
  it("Should initiate correctly a file path based process as a child process", async () => {
    await import_s_sugar_config.default.load();
    const pro = await import_SProcess.default.from(`${__dirname}/functionBasedProcess`, {
      process: {
        runAsChild: true
      }
    });
    const res = await pro.run({
      something: "cool"
    });
    expect(res.state).toBe("success");
    expect(res.value.something).toBe("cool");
    expect(res.value.state).toBe("success");
    expect(res.value.isChildProcess).toBe(true);
  });
});
