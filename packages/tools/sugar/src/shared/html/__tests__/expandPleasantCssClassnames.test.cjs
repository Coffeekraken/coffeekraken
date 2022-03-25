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
var import_expandPleasantCssClassnames = __toESM(require("../expandPleasantCssClassnames"));
describe("sugar.shared.html.expandPleasantCssClassnames", () => {
  it("Should expand simple html content successfully", () => {
    const html = `

            <body class="something:cool">
                <h1 class="s-typo:h1 s-font:40:bold">
                    Hello world
                </h1>
                <p class="s-typo:p s-font:20 @desktop s-typo:h2:bold">
                    Other thing
                <p>
                <template>
                    <h1 class="s-typo\\:something"></h1>
                </template>
            </body>
            
        `;
    const processed = (0, import_expandPleasantCssClassnames.default)(html);
    expect(processed.includes("s-typo:something")).toBe(true);
    expect(processed.includes("something something--cool")).toBe(true);
    expect(processed.includes("s-typo s-typo--h1 s-font s-font--40 s-font--bold")).toBe(true);
    expect(processed.includes('"s-typo s-typo--p s-font s-font--20 s-typo___desktop s-typo--h2___desktop s-typo--bold___desktop')).toBe(true);
  });
});
