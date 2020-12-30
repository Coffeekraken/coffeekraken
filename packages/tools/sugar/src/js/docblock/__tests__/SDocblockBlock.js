"use strict";
// TODO: More tests
module.exports = function (__SDocblockBlock) {
    describe('sugar.js.docblock.SDocblockBlock', function () {
        var docblock = "\n      /**\n       * @name                  SDocblockBlock\n       * @namespace           js.docblock\n       * @type                  Class\n       *\n       * This is the main class that expose the methods like \"parse\", etc...\n       * You have to instanciate it by passing a settings object. Here's the available options:\n       *\n       * @param         {String}       source      The docblock source.  Has to be a parsable docblock string\n       * @param         {Object}      [settings={}]       A settings object to configure your instance\n       * - setting1 (null) {Object}: Something cool\n       * - setting2 (true) {Boolean}: Something cool in boolean style\n       *\n       * @example         js\n       * import SDocblockBlock from '@coffeekraken/sugar/js/docblock/SSDocblockBlock';\n       * new SDocblockBlock(mySource, {\n       *    // override some settings here...\n       * });\n       *\n       * @since     2.0.0\n       * @author \tOlivier Bossel <olivier.bossel@gmail.com>\n       */\n      ";
        it('Should parse a simple docblock correctly', function (done) {
            var docblockBlock = new __SDocblockBlock(docblock);
            var obj = docblockBlock.toObject();
            delete obj.raw;
            expect(obj).toEqual({
                name: 'SDocblockBlock',
                namespace: 'js.docblock',
                type: 'Class',
                description: 'This is the main class that expose the methods like "parse", etc...\n' +
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
                        content: '- setting1 (null) {Object}: Something cool\n' +
                            '- setting2 (true) {Boolean}: Something cool in boolean style\n'
                    }
                },
                example: [
                    {
                        language: 'js',
                        code: "import SDocblockBlock from '@coffeekraken/sugar/js/docblock/SSDocblockBlock';\n" +
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
//# sourceMappingURL=SDocblockBlock.js.map