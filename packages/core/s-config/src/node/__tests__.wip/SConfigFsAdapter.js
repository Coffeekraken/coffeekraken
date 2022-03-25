import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();
var __filename = /* @__PURE__ */ getFilename();
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
export {
  SConfigFsAdapter_default as default
};
