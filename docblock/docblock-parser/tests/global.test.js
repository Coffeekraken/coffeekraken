const __testingFile = require("./testing-file-global.txt");
const __docblockParser = require("../dist/index");

describe("docblock-parser-php", () => {
  let json;

  beforeAll(done => {
    // parse the file
    json = __docblockParser({
      language: "js"
    }).parse(__testingFile);
    done();
  });

  it("Should get the body from the docblock", done => {
    const block = json[0];
    if (!block.body && block.body !== "Hello World")
      done('The "body" is not getted properly');
    done();
  });
  it("Should process the @abstract tag correctly", done => {
    const block = json[0];
    if (!block.abstract || block.abstract !== true)
      done("The @abstract tag is not processed properly");
    done();
  });
  it("Should process the @author tag correctly", done => {
    const block = json[0];
    if (
      !block.author ||
      block.author.name !== "Olivier Bossel" ||
      block.author.email !== "olivier.bossel@gmail.com" ||
      block.author.url !== "https://olivierbossel.com"
    )
      done("The @author tag is not processed properly");
    done();
  });
  it("Should process the @category tag correctly", done => {
    const block = json[0];
    if (!block.category || block.category !== "Hello World Category")
      done("The @category tag is not processed properly");
    done();
  });
  it("Should process the @class tag correctly", done => {
    const block = json[0];
    if (!block.class || block.class !== true)
      done("The @class tag is not processed properly");
    done();
  });
  it("Should process the @constructor tag correctly", done => {
    const block = json[0];
    if (!block.constructor || block.constructor !== true)
      done("The @constructor tag is not processed properly");
    done();
  });
  it("Should process the @const tag correctly", done => {
    const block = json[0];
    if (!block.const || block.const !== true)
      done("The @const tag is not processed properly");
    done();
  });
  it("Should process the @copyright tag correctly", done => {
    const block = json[0];
    if (
      !block.copyright ||
      block.copyright !== "Copyright (c) 2018, Olivier Bossel"
    )
      done("The @copyright tag is not processed properly");
    done();
  });
  it("Should process the @default tag correctly", done => {
    const block = json[0];
    if (!block.default || block.default !== "Hello World Default")
      done("The @default tag is not processed properly");
    done();
  });
  it("Should process the @deprecated tag correctly", done => {
    const block = json[0];
    if (!block.deprecated || block.deprecated !== true)
      done("The @deprecated tag is not processed properly");
    done();
  });
  it("Should process the @event tag correctly", done => {
    const block = json[0];
    if (!block.event || block.event !== true)
      done("The @event tag is not processed properly");
    done();
  });
  it("Should process the @example tag correctly", done => {
    const block = json[0];
    if (
      !block.example ||
      block.example.language !== "js" ||
      block.example.body !== "var hello = 'world';"
    )
      done("The @example tag is not processed properly");
    done();
  });
  it("Should process the @extends tag correctly", done => {
    const block = json[0];
    if (!block.extends || block.extends !== "Hello World Extends")
      done("The @extends tag is not processed properly");
    done();
  });
  it("Should process the @final tag correctly", done => {
    const block = json[0];
    if (!block.final || block.final !== true)
      done("The @final tag is not processed properly");
    done();
  });
  it("Should process the @global tag correctly", done => {
    const block = json[0];
    if (!block.global || block.global !== true)
      done("The @global tag is not processed properly");
    done();
  });
  it("Should process the @ignore tag correctly", done => {
    const block = json[0];
    if (!block.ignore || block.ignore !== true)
      done("The @ignore tag is not processed properly");
    done();
  });
  it("Should process the @implements tag correctly", done => {
    const block = json[0];
    if (
      !block.implements ||
      block.implements.length !== 3 ||
      block.implements[0] !== "Hello" ||
      block.implements[1] !== "World" ||
      block.implements[2] !== "Implements"
    )
      done("The @implements tag is not processed properly");
    done();
  });
  it("Should process the @interface tag correctly", done => {
    const block = json[0];
    if (!block.interface || block.interface !== true)
      done("The @interface tag is not processed properly");
    done();
  });
  it("Should process the @name tag correctly", done => {
    const block = json[0];
    if (!block.name || block.name !== "Hello World Name")
      done("The @name tag is not processed properly");
    done();
  });
  it("Should process the @override tag correctly", done => {
    const block = json[0];
    if (!block.override || block.override !== true)
      done("The @override tag is not processed properly");
    done();
  });
  it("Should process the @package tag correctly", done => {
    const block = json[0];
    if (!block.package || block.package !== "Hello World Package")
      done("The @package tag is not processed properly");
    done();
  });
  it("Should process the @param tag correctly", done => {
    const block = json[0];
    if (
      !block.params ||
      block.params.length !== 2 ||
      block.params[0].types[0] !== "String" ||
      block.params[0].name !== "$hello" ||
      block.params[0].description !== "Hello World 1" ||
      block.params[1].types[0] !== "String" ||
      block.params[1].name !== "$world" ||
      block.params[1].default !== "'hello world'" ||
      block.params[1].description !== "Hello World 2"
    )
      done("The @param tag is not processed properly");
    done();
  });
  it("Should process the @private tag correctly", done => {
    const block = json[0];
    if (!block.private || block.private !== true)
      done("The @private tag is not processed properly");
    done();
  });
  it("Should process the @prop tag correctly", done => {
    const block = json[0];
    if (!block.prop || block.prop !== true)
      done("The @prop tag is not processed properly");
    done();
  });
  it("Should process the @property tag correctly", done => {
    const block = json[0];
    if (
      !block.properties ||
      block.properties.length !== 2 ||
      block.properties[0].types[0] !== "String" ||
      block.properties[0].name !== "$hello" ||
      block.properties[0].description !== "Hello World 1" ||
      block.properties[1].types[0] !== "String" ||
      block.properties[1].name !== "$hello" ||
      block.properties[1].default !== "'world'" ||
      block.properties[1].description !== "Hello World 2"
    )
      done("The @property tag is not processed properly");
    done();
  });
  it("Should process the @protected tag correctly", done => {
    const block = json[0];
    if (!block.protected || block.protected !== true)
      done("The @protected tag is not processed properly");
    done();
  });
  it("Should process the @public tag correctly", done => {
    const block = json[0];
    if (!block.public || block.public !== true)
      done("The @public tag is not processed properly");
    done();
  });
  it("Should process the @return tag correctly", done => {
    const block = json[0];
    if (
      !block.return ||
      block.return.types[0] !== "String" ||
      block.return.description !== "Hello World Return"
    )
      done("The @return tag is not processed properly");
    done();
  });
  it("Should process the @see tag correctly", done => {
    const block = json[0];
    if (
      !block.see ||
      block.see.url !== "https://google.com" ||
      block.see.label !== "Google"
    )
      done("The @see tag is not processed properly");
    done();
  });
  it("Should process the @setting tag correctly", done => {
    const block = json[0];
    if (!block.setting || block.setting !== true)
      done("The @setting tag is not processed properly");
    done();
  });
  it("Should process the @todo tag correctly", done => {
    const block = json[0];
    if (!block.todo || block.todo !== "Hello World Todo")
      done("The @todo tag is not processed properly");
    done();
  });
  it("Should process the @type tag correctly", done => {
    const block = json[0];
    if (
      !block.types ||
      block.types.length !== 3 ||
      block.types[0] !== "Hello" ||
      block.types[1] !== "World" ||
      block.types[2] !== "Type"
    )
      done("The @type tag is not processed properly");
    done();
  });
});
