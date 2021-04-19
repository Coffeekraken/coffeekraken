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
module.exports = (__request) => {
    if (process.env.GITHUB_WORKFLOW !== undefined) {
        test('Bypass these tests cause we are in Github actions env', (done) => {
            done();
        });
        return;
    }
    test('Making simple ajax request', (done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield __request({
                url: 'http://dummy.restapiexample.com/api/v1/employees',
                method: 'get'
            });
            expect(response.status).toBe(200);
            done();
        }
        catch (e) {
            done(e);
        }
    }));
    test('Making an ajax request with multiple send count', (done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield __request({
                url: 'http://dummy.restapiexample.com/api/v1/employees',
                method: 'get',
                sendCount: 2
            });
            expect(response.length).toBe(2);
            done();
        }
        catch (e) {
            done(e);
        }
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRTtJQUM3QixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxLQUFLLFNBQVMsRUFBRTtRQUM3QyxJQUFJLENBQUMsdURBQXVELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNyRSxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTztLQUNSO0lBRUQsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDaEQsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sU0FBUyxDQUFDO2dCQUMvQixHQUFHLEVBQUUsa0RBQWtEO2dCQUN2RCxNQUFNLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLElBQUksRUFBRSxDQUFDO1NBQ1I7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNUO0lBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxpREFBaUQsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQ3JFLElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLFNBQVMsQ0FBQztnQkFDL0IsR0FBRyxFQUFFLGtEQUFrRDtnQkFDdkQsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsU0FBUyxFQUFFLENBQUM7YUFDYixDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLEVBQUUsQ0FBQztTQUNSO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDVDtJQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==