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
module.exports = (__SDocMapItem) => {
    describe('sugar.node.doc.SDocMapItem', () => {
        it('Should generate correctly an SDocMapItem instance from a file', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const item = new __SDocMapItem(`${__dirname}/../SDocMapItem.js`, {});
            const item1 = new __SDocMapItem(`${__dirname}/doc/README.md`, {});
            done();
        }));
    });
};
//# sourceMappingURL=SDocMapItem.js.map