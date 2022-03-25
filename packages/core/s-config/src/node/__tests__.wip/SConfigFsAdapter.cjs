var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var SConfigFsAdapter_exports = {};
__export(SConfigFsAdapter_exports, {
  default: () => SConfigFsAdapter_default
});
module.exports = __toCommonJS(SConfigFsAdapter_exports);
var SConfigFsAdapter_default = (__SConfig, __SConfigFsAdapter) => {
  const config = new __SConfig("myCoolConfig", {
    adapters: [
      new __SConfigFsAdapter({
        name: "something",
        defaultConfigPath: __dirname + "/default.[filename]",
        appConfigPath: __dirname + "/app.[filename]",
        userConfigPath: __dirname + "/user.[filename]"
      })
    ],
    allowNew: true
  });
  describe("sugar.node.config.adapters.SConfigFsAdapter", () => {
    it("Should load, set, save and get correctly the config from the filesystem", async () => {
      expect(config.get("")).toEqual({
        hello: "world",
        other: {
          cool: "Yop yop Nelson"
        },
        something: {
          cool: "Hello world"
        }
      });
      await config.set("something.cool", "Hello world");
      await config.set("other.cool", "Yop yop Nelson");
      expect(config.get("something")).toEqual({ cool: "Hello world" });
    });
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
