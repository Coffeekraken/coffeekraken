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
module.exports = (__sleep) => {
    describe('sugar.js.function.sleep', () => {
        let start, end;
        (() => __awaiter(void 0, void 0, void 0, function* () {
            start = Date.now();
            yield __sleep(200);
            end = Date.now();
        }))();
        it('Sould a difference between the start and the end time greater that 200', done => {
            setTimeout(() => {
                expect(end - start).toBeGreaterThan(195);
                done();
            }, 250);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xlZXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbGVlcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBRTNCLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLEVBQUU7UUFFdkMsSUFBSSxLQUFLLEVBQUUsR0FBRyxDQUFDO1FBRWYsQ0FBQyxHQUFTLEVBQUU7WUFDVixLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ25CLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO1FBRUwsRUFBRSxDQUFDLHdFQUF3RSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ2xGLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsTUFBTSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksRUFBRSxDQUFDO1lBQ1QsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxDQUFDLENBQUE7SUFHSixDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQSJ9