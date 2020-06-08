"use strict";

// TODO: More tests
module.exports = __SDocblockBlock => {
  describe('sugar.js.docblock.SDocblockBlock', () => {
    const docblock = `
      /**
       * @name                  SDocblockBlock
       * @namespace             sugar.js.docblock
       * @type                  Class
       *
       * This is the main class that expose the methods like "parse", etc...
       * You have to instanciate it by passing a settings object. Here's the available options:
       *
       * @param         {String}       source      The docblock source.  Has to be a parsable docblock string
       * @param         {Object}      [settings={}]       A settings object to configure your instance
       * - setting1 (null) {Object}: Something cool
       * - setting2 (true) {Boolean}: Something cool in boolean style
       *
       * @example         js
       * import SDocblockBlock from '@coffeekraken/sugar/js/docblock/SSDocblockBlock';
       * new SDocblockBlock(mySource, {
       *    // override some settings here...
       * });
       *
       * @since     2.0.0
       * @author 	Olivier Bossel <olivier.bossel@gmail.com>
       */
      `;
    it('Should parse a simple docblick correctly', done => {
      const docblockBlock = new __SDocblockBlock(docblock); // console.log(docblockBlock.toMarkdown());

      done();
    });
    return;
    it('Should parse a simple docblick correctly', () => {
      const docblockBlock = new __SDocblockBlock(docblock);
      expect(docblockBlock.object).toEqual({
        name: 'SDocblockBlock',
        namespace: 'sugar.js.docblock',
        type: 'Class',
        description: 'This is the main class that expose the methods like "parse", etc...\n' + "You have to instanciate it by passing a settings object. Here's the available options:",
        param: {
          source: {
            name: 'source',
            type: 'String',
            description: 'The docblock source.',
            default: undefined
          },
          settings: {
            name: 'settings',
            type: 'Object',
            description: 'A settings object to configure your instance',
            default: {},
            content: '- setting1 (null) {Object}: Something cool\n' + '- setting2 (true) {Boolean}: Something cool in boolean style\n'
          }
        },
        example: {
          language: 'js',
          code: "import SDocblockBlock from '@coffeekraken/sugar/js/docblock/SSDocblockBlock';\n" + 'new SDocblockBlock(mySource, {\n' + '   // override some settings here...\n' + '});'
        },
        since: '2.0.0',
        author: {
          name: 'Olivier Bossel',
          email: 'olivier.bossel@gmail.com',
          website: undefined
        },
        raw: '/**\n' + '       * @name                  SDocblockBlock\n' + '       * @namespace             sugar.js.docblock\n' + '       * @type                  Class\n' + '       *\n' + '       * This is the main class that expose the methods like "parse", etc...\n' + "       * You have to instanciate it by passing a settings object. Here's the available options:\n" + '       *\n' + '       * @param         {String}       source      The docblock source.  Has to be a parsable docblock string\n' + '       * @param         {Object}      [settings={}]       A settings object to configure your instance\n' + '       * - setting1 (null) {Object}: Something cool\n' + '       * - setting2 (true) {Boolean}: Something cool in boolean style\n' + '       *\n' + '       * @example         js\n' + "       * import SDocblockBlock from '@coffeekraken/sugar/js/docblock/SSDocblockBlock';\n" + '       * new SDocblockBlock(mySource, {\n' + '       *    // override some settings here...\n' + '       * });\n' + '       *\n' + '       * @since     2.0.0\n' + '       * @author \tOlivier Bossel <olivier.bossel@gmail.com>\n' + '       */'
      });
    });
  });
};