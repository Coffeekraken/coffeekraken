"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jYmxvY2tCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsbUJBQW1CO0FBRW5CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BDLFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUU7UUFDaEQsTUFBTSxRQUFRLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJkLENBQUM7UUFFSixFQUFFLENBQUMsMENBQTBDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN0RCxNQUFNLGFBQWEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNyQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFFZixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNsQixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixTQUFTLEVBQUUsYUFBYTtnQkFDeEIsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsV0FBVyxFQUNULHVFQUF1RTtvQkFDdkUsd0ZBQXdGO2dCQUMxRixLQUFLLEVBQUU7b0JBQ0wsTUFBTSxFQUFFO3dCQUNOLElBQUksRUFBRSxRQUFRO3dCQUNkLElBQUksRUFBRSxRQUFRO3dCQUNkLFdBQVcsRUFBRSxzQkFBc0I7d0JBQ25DLE9BQU8sRUFBRSxTQUFTO3FCQUNuQjtvQkFDRCxRQUFRLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLElBQUksRUFBRSxRQUFRO3dCQUNkLFdBQVcsRUFBRSw4Q0FBOEM7d0JBQzNELE9BQU8sRUFBRSxFQUFFO3dCQUNYLE9BQU8sRUFDTCw4Q0FBOEM7NEJBQzlDLGdFQUFnRTtxQkFDbkU7aUJBQ0Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQO3dCQUNFLFFBQVEsRUFBRSxJQUFJO3dCQUNkLElBQUksRUFDRixpRkFBaUY7NEJBQ2pGLGtDQUFrQzs0QkFDbEMsd0NBQXdDOzRCQUN4QyxLQUFLO3FCQUNSO2lCQUNGO2dCQUNELEtBQUssRUFBRSxPQUFPO2dCQUNkLE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixLQUFLLEVBQUUsMEJBQTBCO29CQUNqQyxPQUFPLEVBQUUsU0FBUztpQkFDbkI7YUFDRixDQUFDLENBQUM7WUFFSCxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==