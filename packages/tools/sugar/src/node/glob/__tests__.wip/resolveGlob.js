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
module.exports = (__resolveGlob) => {
    describe('sugar.node.glob.resolveGlob', () => {
        it('Should resolve the passed glob correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const files = yield __resolveGlob(`data/**/*`, {
                rootDir: __dirname
            });
            const file = files[0];
            expect(file.path.includes('src/node/glob/__tests__/data/myCoolData.txt')).toBe(true);
            expect(file.rootDir.includes('src/node/glob/__tests__')).toBe(true);
            expect(file.relPath).toBe('data/myCoolData.txt');
            done();
        }));
    });
};
//# sourceMappingURL=resolveGlob.js.map