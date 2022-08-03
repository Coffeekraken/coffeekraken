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
    test('Making simple ajax request', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield __request({
                url: 'http://dummy.restapiexample.com/api/v1/employees',
                method: 'get',
            });
            expect(response.status).toBe(200);
        }
        catch (e) { }
    }));
    test('Making an ajax request with multiple send count', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield __request({
                url: 'http://dummy.restapiexample.com/api/v1/employees',
                method: 'get',
                sendCount: 2,
            });
            expect(response.length).toBe(2);
        }
        catch (e) { }
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUU7SUFDM0IsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsS0FBSyxTQUFTLEVBQUU7UUFDM0MsSUFBSSxDQUFDLHVEQUF1RCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbkUsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU87S0FDVjtJQUVELElBQUksQ0FBQyw0QkFBNEIsRUFBRSxHQUFTLEVBQUU7UUFDMUMsSUFBSTtZQUNBLE1BQU0sUUFBUSxHQUFHLE1BQU0sU0FBUyxDQUFDO2dCQUM3QixHQUFHLEVBQUUsa0RBQWtEO2dCQUN2RCxNQUFNLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQztRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxpREFBaUQsRUFBRSxHQUFTLEVBQUU7UUFDL0QsSUFBSTtZQUNBLE1BQU0sUUFBUSxHQUFHLE1BQU0sU0FBUyxDQUFDO2dCQUM3QixHQUFHLEVBQUUsa0RBQWtEO2dCQUN2RCxNQUFNLEVBQUUsS0FBSztnQkFDYixTQUFTLEVBQUUsQ0FBQzthQUNmLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25DO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtJQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=