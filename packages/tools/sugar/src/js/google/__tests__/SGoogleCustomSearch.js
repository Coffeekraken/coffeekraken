var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = (__SGoogleCustomSearch) => {
    test('Make a simple google search', (done) => __awaiter(this, void 0, void 0, function* () {
        const google = new __SGoogleCustomSearch('AIzaSyDzFfEzhmYXRTlONUCtMWQ88uHJhsbtXY4', '000247055370126278051:xqxglvx8w5x');
        const response = yield google.search('sugar');
        expect(response.status).toBe(200);
        expect(response.data.kind).toBe('customsearch#search');
        done();
    }));
};
