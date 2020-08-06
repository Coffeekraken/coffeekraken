// TODO: More tests

module.exports = (__SDocblockBlock) => {
  describe('sugar.js.docblock.SDocblockBlock', () => {
    const docblock = `
      /**
       * @name                  SDocblockBlock
       * @namespace           js.docblock
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

    it('Should parse a simple docblock correctly', (done) => {
      const docblockBlock = new __SDocblockBlock(docblock);
      const obj = docblockBlock.toObject();
      delete obj.raw;

      expect(obj).toEqual({
        name: 'SDocblockBlock',
        namespace: 'js.docblock',
        type: 'Class',
        description:
          'This is the main class that expose the methods like "parse", etc...\n' +
          "You have to instanciate it by passing a settings object. Here's the available options:",
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
            content:
              '- setting1 (null) {Object}: Something cool\n' +
              '- setting2 (true) {Boolean}: Something cool in boolean style\n'
          }
        },
        example: [
          {
            language: 'js',
            code:
              "import SDocblockBlock from '@coffeekraken/sugar/js/docblock/SSDocblockBlock';\n" +
              'new SDocblockBlock(mySource, {\n' +
              '   // override some settings here...\n' +
              '});'
          }
        ],
        since: '2.0.0',
        author: {
          name: 'Olivier Bossel',
          email: 'olivier.bossel@gmail.com',
          website: undefined
        }
      });

      done();
    });
  });
};
