import __STheme from "../STheme";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
describe("s-theme.node.STheme", () => {
  it("Should instanciate correctly the default theme", async () => {
    await __SSugarConfig.load();
    new __STheme();
  });
  it("Should throw an error if the passed theme does not exists", (done) => {
    try {
      new __STheme("IDontExists");
    } catch (e) {
      done();
    }
  });
  it("Should loop correctly on colors", (done) => {
    const theme = new __STheme();
    let isError = false;
    theme.loopOnColors(({ name, value }) => {
      if (!name || !value)
        isError = true;
    });
    expect(isError).toBe(false);
    done();
  });
  it("Should loop correctly on colors and stop when return -1 or false", (done) => {
    const theme = new __STheme();
    let i = 0;
    theme.loopOnColors(({ name, value }) => {
      i++;
      if (i >= 10)
        return false;
    });
    expect(i).toBe(10);
    done();
  });
});
