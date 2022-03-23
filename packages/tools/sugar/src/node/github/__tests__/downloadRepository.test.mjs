import "../../../../../../chunk-TD77TI6B.mjs";
import __downloadRepository from "../downloadRepository";
import __tmpDir from "../../path/systemTmpDir";
describe("sugar.node.github.downloadRepository", () => {
  it("Should download a repository successfully", async () => {
    const repo = await __downloadRepository("Coffeekraken/download-test-repo", {
      branch: "main"
    });
    expect(repo).toEqual({
      dest: `${__tmpDir()}/downloads/coffeekraken-download-test-repo-main.zip`
    });
  }, 999999);
  it("Should download a repository and unzip it successfully", async () => {
    const repo = await __downloadRepository("Coffeekraken/download-test-repo", {
      branch: "main",
      unzip: true
    });
    expect(repo).toEqual({
      dest: `${__tmpDir()}/downloads/coffeekraken-download-test-repo-main`
    });
  }, 999999);
});
