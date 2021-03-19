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
module.exports = (__SGoogleCustomSearch) => {
    test('Make a simple google search', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const google = new __SGoogleCustomSearch('AIzaSyDzFfEzhmYXRTlONUCtMWQ88uHJhsbtXY4', '000247055370126278051:xqxglvx8w5x');
        const response = yield google.search('sugar');
        expect(response.status).toBe(200);
        expect(response.data.kind).toBe('customsearch#search');
        done();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dvb2dsZUN1c3RvbVNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNHb29nbGVDdXN0b21TZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFO0lBRXpDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFNLElBQUksRUFBQyxFQUFFO1FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUkscUJBQXFCLENBQUMseUNBQXlDLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztRQUN6SCxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDdkQsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFBIn0=