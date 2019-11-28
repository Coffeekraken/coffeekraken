import domReady from "../../../src/js/dom/domReady";
import { doesNotReject } from "assert";
describe("domReady", () => {
  it("Should detect when DOM is ready", done => {
    domReady().then(() => {
      done();
    });
  });
});
