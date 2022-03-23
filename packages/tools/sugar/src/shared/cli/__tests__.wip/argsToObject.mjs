module.exports = (__argsToObject) => {
  describe("sugar.js.cli.argsToObject", () => {
    it("Should process the passed args object correctly", (done) => {
      const object = __argsToObject("-a Yop", {
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
      expect(object).toEqual({ arg1: "Yop", boolArg: false, objArg: {} });
      done();
    });
  });
};
