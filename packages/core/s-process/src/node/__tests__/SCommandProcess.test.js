import __SCommandProcess from "../SCommandProcess";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
describe("s-process.SCommandProcess", () => {
  it("Should execute a simple command correctly", async () => {
    await __SSugarConfig.load();
    const pro = new __SCommandProcess();
    const res = await pro.run({
      command: "ls -la"
    });
    expect(res.state).toBe("success");
    expect(res.duration > 0).toBe(true);
    expect(res.value.length && res.value.length > 0).toBe(true);
  });
});
