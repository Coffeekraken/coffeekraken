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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUU7SUFFM0IsUUFBUSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRTtRQUV2QyxJQUFJLEtBQUssRUFBRSxHQUFHLENBQUM7UUFFZixDQUFDLEdBQVMsRUFBRTtZQUNWLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDbkIsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUM7UUFFTCxFQUFFLENBQUMsd0VBQXdFLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDbEYsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxNQUFNLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDekMsSUFBSSxFQUFFLENBQUM7WUFDVCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDVixDQUFDLENBQUMsQ0FBQTtJQUdKLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFBIn0=