"use strict";

// TODO: More tests
module.exports = __SDocblockParser => {
  describe('sugar.js.docblock.SDocblockParser', () => {
    it('Should parse a simple docblick correctly', () => {
      const docblock = `
      /**
       * @name                  DockblockParser
       * @namespace             sugar.js.docblock
       * @type                  Class
       *
       * This is the main class that expose the methods like "parse", etc...
       * You have to instanciate it by passing a settings object. Here's the available options:
       *
       * @example         js
       * import SDocblockParser from '@coffeekraken/sugar/js/docblock/SSDocblockParser';
       * new SDocblockParser({
       *    // override some settings here...
       * }).parse(myString);
       *
       * @since     2.0.0
       * @author 	Olivier Bossel <olivier.bossel@gmail.com>
       */
      `;
      const parser = new __SDocblockParser();
      const blocks = parser.parse(docblock);
      expect(blocks).toEqual([{
        name: 'DockblockParser',
        namespace: 'sugar.js.docblock',
        type: 'Class',
        description: 'This is the main class that expose the methods like "parse", etc...\n' + "You have to instanciate it by passing a settings object. Here's the available options:",
        example: {
          language: 'js',
          code: "import SDocblockParser from '@coffeekraken/sugar/js/docblock/SSDocblockParser';\n" + ' new SDocblockParser({\n' + '    // override some settings here...\n' + ' }).parse(myString);'
        },
        since: '2.0.0',
        author: {
          name: 'Olivier Bossel',
          email: 'olivier.bossel@gmail.com',
          website: undefined
        },
        _: {
          raw: '/**\n' + '       * @name                  DockblockParser\n' + '       * @namespace             sugar.js.docblock\n' + '       * @type                  Class\n' + '       *\n' + '       * This is the main class that expose the methods like "parse", etc...\n' + "       * You have to instanciate it by passing a settings object. Here's the available options:\n" + '       *\n' + '       * @example         js\n' + "       * import SDocblockParser from '@coffeekraken/sugar/js/docblock/SSDocblockParser';\n" + '       * new SDocblockParser({\n' + '       *    // override some settings here...\n' + '       * }).parse(myString);\n' + '       *\n' + '       * @since     2.0.0\n' + '       * @author \tOlivier Bossel <olivier.bossel@gmail.com>\n' + '       */',
          filepath: null
        }
      }]);
    });
  });
};