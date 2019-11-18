const __testingFile = require("./testing-file-scss.txt");
const __docblockParser = require("../dist/index");

describe("docblock-parser-scss", () => {
  let json;

  beforeAll(done => {
    // parse the file
    json = __docblockParser({
      language: "scss"
    }).parse(__testingFile);
    done();
  });

  it("Should get the mixin name from the next line", done => {
    const block = json[0];
    if (!block.mixin || !block.name || block.name !== "hello-world")
      done("The mixin name has not been getted properly");
    done();
  });

  it("Should get the function name from the next line", done => {
    const block = json[1];
    if (!block.function || !block.name || block.name !== "hello-world")
      done("The function name has not been getted properly");
    done();
  });

  it("Should get the variable name and default value from the next line", done => {
    const block = json[2];
    if (
      !block.name ||
      !block.default ||
      block.name !== "$helloWorld" ||
      block.default !== "Hello World"
    )
      done("The variable name and default have not been getted properly");
    done();
  });
});
