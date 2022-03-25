import __replacePackageJsonTokens from "../replacePackageJsonTokens";
describe("@coffeekraken.sugar.node.meta.replacePackageJsonTokens", () => {
  it("Should replace tokens correctly", () => {
    const res = __replacePackageJsonTokens(`
            Hello %packageJson.name

            Hope you are doing well...
            "%packageJson.description"

            Best regards
            %packageJson.author (%packageJson.version)
        `);
    expect(res.match(/%packageJson\./gm)).toBe(null);
  });
});
