import {
  __dirname
} from "../../../../../chunk-TD77TI6B.mjs";
import __SProcess from "../SProcess";
import __MyProcess from "./MyProcess";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
jest.setTimeout(3e4);
describe("s-process", () => {
  it("Should start a simple process correctly", async () => {
    await __SSugarConfig.load();
    const pro = new __MyProcess({
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
    const pro = new __MyProcess({
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
    const pro = await __SProcess.from("ls -la");
    const res = await pro.run();
    expect(res.state).toBe("success");
  });
  it("Should initiate correctly a file path based process", async () => {
    await __SSugarConfig.load();
    const pro = await __SProcess.from(`${__dirname}/functionBasedProcess`);
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
    await __SSugarConfig.load();
    const pro = await __SProcess.from(`${__dirname}/functionBasedProcess`, {
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
