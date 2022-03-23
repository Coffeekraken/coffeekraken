import __getTagNameFromHtmlClass from "../getTagNameFromHtmlClass";
describe("sugar.js.html.getTagNameFromHtmlClass", () => {
  it("Should get back the correct tagname from passed classes", (done) => {
    expect(__getTagNameFromHtmlClass(HTMLAnchorElement)).toBe("a");
    expect(__getTagNameFromHtmlClass(HTMLLinkElement)).toBe("link");
    done();
  });
});
