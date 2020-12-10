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
module.exports = (__bladePhp) => {
    describe('sugar.node.template.bladePhp', () => {
        it('Should compile the passed blade view correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield __bladePhp('default', {
                title: 'Hello world',
                settings: {}
            }, {
                rootDir: __dirname + '/views'
            });
            expect(result.length).toBe(256);
            done();
        }));
    });
};
//# sourceMappingURL=module.js.map