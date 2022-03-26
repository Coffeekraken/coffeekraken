module.exports = (__argsToString) => {
  describe("sugar.js.cli.argsToString", () => {
    it("Should process the passed args object correctly", (done) => {
      const string = __argsToString({
        arg1: "Hello world",
        boolArg: true,
        objArg: {
          content: "Nelson"
        },
        arrayArg: ["item0", "item 1", "item 2"]
      }, {
        arg1: {
          type: "String",
          description: "Something",
          alias: "a",
          default: "Plop"
        },
        boolArg: {
          type: "Boolean",
          description: "Something",
          alias: "b",
          default: false
        },
        objArg: {
          type: "Object",
          description: "Something",
          default: {}
        },
        arrayArg: {
          type: "Array",
          description: "Something"
        }
      });
      expect(string).toBe(`-a "Hello world" -b  --objArg "{'content':'Nelson'}" --arrayArg "['item0','item 1','item 2']"`);
      done();
    });
  });
};
