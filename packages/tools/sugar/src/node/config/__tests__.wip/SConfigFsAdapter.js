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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (__SConfig, __SConfigFsAdapter) => {
    const config = new __SConfig('myCoolConfig', {
        adapters: [
            new __SConfigFsAdapter({
                name: 'something',
                defaultConfigPath: __dirname + '/default.[filename]',
                appConfigPath: __dirname + '/app.[filename]',
                userConfigPath: __dirname + '/user.[filename]'
            })
        ],
        allowNew: true
    });
    describe('sugar.node.config.adapters.SConfigFsAdapter', () => {
        it('Should load, set, save and get correctly the config from the filesystem', (done) => __awaiter(void 0, void 0, void 0, function* () {
            expect(config.get('')).toEqual({
                hello: 'world',
                other: {
                    cool: 'Yop yop Nelson'
                },
                something: {
                    cool: 'Hello world'
                }
            });
            yield config.set('something.cool', 'Hello world');
            yield config.set('other.cool', 'Yop yop Nelson');
            expect(config.get('something')).toEqual({ cool: 'Hello world' });
            done();
        }));
    });
};
//# sourceMappingURL=SConfigFsAdapter.js.map