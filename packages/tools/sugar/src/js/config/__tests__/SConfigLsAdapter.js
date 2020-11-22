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
module.exports = (__SConfig, __SConfigLsAdapter) => {
    const config = new __SConfig('myCoolConfig', {
        adapters: [
            new __SConfigLsAdapter({
                name: 'something',
                defaultConfig: {
                    adapter: 'ls',
                    joy: {
                        hello: 'world'
                    }
                }
            })
        ],
        allowNew: true
    });
    describe('sugar.js.config.adapters.SConfigLsAdapter', () => {
        it('Should load, set, save and get correctly the config from the localStorage', (done) => __awaiter(void 0, void 0, void 0, function* () {
            config.set('something.cool', 'Hello world');
            config.load();
            expect(config.get('something')).toEqual({ cool: 'Hello world' });
            done();
        }));
    });
};
