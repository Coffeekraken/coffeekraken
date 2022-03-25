import __getHtmlClassFromTagName from "../getHtmlClassFromTagName";
describe("sugar.js.html.getHtmlClassFromTagName", () => {
  it("Should get back the correct HTMLElement class from passed tags", (done) => {
    expect(__getHtmlClassFromTagName("a")).toBe(window.HTMLAnchorElement);
    expect(__getHtmlClassFromTagName("img")).toBe(window.HTMLImageElement);
    done();
  });
});
