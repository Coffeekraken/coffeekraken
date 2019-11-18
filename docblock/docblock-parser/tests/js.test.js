const __testingFile = require("./testing-file-js.txt");
const __docblockParser = require("../dist/index");

describe("docblock-parser-js", () => {
  let json;

  beforeAll(done => {
    // parse the file
    json = __docblockParser({
      language: "js"
    }).parse(__testingFile);
    done();
  });

  it("Should get the name from the nextLineAnalyzer", done => {
    const block = json[0];
    if (!block.name || block.name !== "helloWorld")
      done("The name is not getted properly from the next line");
    done();
  });
  it('Should get the "static" keyword from the next line', done => {
    const block = json[1];
    if (!block.static || block.static !== true)
      done("The static keyword is not getted properly from the next line");
    done();
  });
  it('Should get the property "hello" with the default value "world" from the next line correctly', done => {
    const block = json[2];
    if (!block.name || block.name !== "hello")
      done("The name has not been getted properly");
    if (!block.default || block.default !== "world")
      done("The default value has not been getted properly");
    done();
  });
  it('Should get the property with equal sign "hello" with the default value "world" from the next line correctly', done => {
    const block = json[3];
    if (!block.name || block.name !== "hello")
      done("The name has not been getted properly");
    if (!block.default || block.default !== "world")
      done("The default value has not been getted properly");
    done();
  });
  it("Should get the extends and implements from the next line correctly", done => {
    const block = json[4];
    if (
      block.name !== "HelloWorld" ||
      !block.extends ||
      block.extends !== "Hello" ||
      !block.implements ||
      block.implements.length !== 2 ||
      block.implements[0] !== "Hello" ||
      block.implements[1] !== "World"
    )
      done("The extends or implements are not getted properly");
    done();
  });
});
