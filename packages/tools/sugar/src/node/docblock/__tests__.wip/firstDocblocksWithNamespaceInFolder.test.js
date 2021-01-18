"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const __firstDocblocksWithNamespaceInFolder = require('../firstDocblocksWithNamespaceInFolder');
describe('sugar.node.docblock.firstDocblocksWithNamespaceInFolder', () => {
    it('Should search and extract the first docblock correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const firstDocblocksWithNamespaceInFolder = yield __firstDocblocksWithNamespaceInFolder(`${__dirname}/doc`);
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
    }));
});
//# sourceMappingURL=firstDocblocksWithNamespaceInFolder.test.js.map