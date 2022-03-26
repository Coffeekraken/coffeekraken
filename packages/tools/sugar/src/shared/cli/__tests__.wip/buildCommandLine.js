module.exports = (__buildCommandLine) => {
  describe("sugar.js.cli.buildCommandLine", () => {
    it("Should build the command line correctly", (done) => {
      const command = __buildCommandLine("php [hostname]:[port] [rootDir] [arguments]", {
        hostname: {
          type: "String",
          description: "Server hostname",
          default: "localhost"
        },
        port: {
          type: "Number",
          description: "Server port",
          default: 8080
        },
        rootDir: {
          type: "String",
          description: "Root directory",
          default: "."
        },
        arg1: {
          type: "Boolean",
          alias: "a",
          description: "Argument 1",
          default: true
        }
      }, {
        port: 8888
      });
      expect(command).toBe("php localhost:8888 . -a");
      done();
    });
  });
};
