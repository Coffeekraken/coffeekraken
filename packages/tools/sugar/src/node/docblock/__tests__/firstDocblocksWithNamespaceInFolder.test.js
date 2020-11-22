"use strict";
const __firstDocblocksWithNamespaceInFolder = require('../firstDocblocksWithNamespaceInFolder');
describe('sugar.node.docblock.firstDocblocksWithNamespaceInFolder', () => {
    it('Should search and extract the first docblock correctly', async (done) => {
        const firstDocblocksWithNamespaceInFolder = await __firstDocblocksWithNamespaceInFolder(`${__dirname}/doc`);
        expect(firstDocblocksWithNamespaceInFolder['some.thing.something']).toEqual({
            name: 'something',
            namespace: 'some.thing',
            description: 'This is something',
            param: {
                param1: {
                    name: 'param1',
                    type: 'Object',
                    description: 'This is the parameter 1',
                    default: undefined
                },
                param2: {
                    name: 'param2',
                    type: 'Number',
                    description: 'This is the parameter 2',
                    default: 10
                }
            },
            since: '2.0.0',
            author: {
                name: 'Olivier Bossel',
                email: 'olivier.bossel@gmail.com',
                website: 'https://olivierbossel.com'
            },
            path: 'somethinf.md'
        });
        expect(firstDocblocksWithNamespaceInFolder['other.thing.coco.otherThing']).toEqual({
            name: 'otherThing',
            namespace: 'other.thing.coco',
            description: 'This is another thing',
            param: {
                param1: {
                    name: 'param1',
                    type: 'Object',
                    description: 'This is the parameter 1',
                    default: undefined
                },
                param2: {
                    name: 'param2',
                    type: 'Number',
                    description: 'This is the parameter 2',
                    default: 10
                }
            },
            since: '2.0.0',
            author: {
                name: 'Olivier Bossel',
                email: 'olivier.bossel@gmail.com',
                website: 'https://olivierbossel.com'
            },
            path: 'child/other.md'
        });
        done();
    });
});
