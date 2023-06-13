var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
export default class SStdioSource extends __SClass {
    constructor(settings) {
        super(settings);
        this._callbacks = {};
    }
    log(logObj) {
        var _a;
        (_a = this._callbacks.log) === null || _a === void 0 ? void 0 : _a.forEach((callback) => {
            callback(logObj);
        });
    }
    ask(askObj) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let answer;
            for (let [key, fn] of this._callbacks.ask.entries()) {
                answer = yield fn(askObj);
            }
            resolve(answer);
        }));
    }
    ready() {
        var _a;
        (_a = this._callbacks.ready) === null || _a === void 0 ? void 0 : _a.forEach((callback) => {
            callback();
        });
    }
    on(event, callback) {
        if (!this._callbacks[event]) {
            this._callbacks[event] = [];
        }
        if (this._callbacks[event].includes(callback)) {
            return;
        }
        this._callbacks[event].push(callback);
    }
    off(event, callback) {
        if (!this._callbacks[event]) {
            return;
        }
        if (!this._callbacks[event].includes(callback)) {
            return;
        }
        this._callbacks[event].splice(this._callbacks[event].indexOf(callback, 1));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBYTdDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sWUFBYSxTQUFRLFFBQVE7SUFHOUMsWUFBWSxRQUFnQztRQUN4QyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFIWixlQUFVLEdBQStCLEVBQUUsQ0FBQztJQUlwRCxDQUFDO0lBRUQsR0FBRyxDQUFDLE1BQWE7O1FBQ2IsTUFBQSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsMENBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDdEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELEdBQUcsQ0FBQyxNQUFnQjtRQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3pDLElBQUksTUFBTSxDQUFDO1lBQ1gsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNqRCxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDN0I7WUFDRCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxLQUFLOztRQUNELE1BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLDBDQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3hDLFFBQVEsRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsRUFBRSxDQUFDLEtBQWEsRUFBRSxRQUFvQztRQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUMvQjtRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0MsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELEdBQUcsQ0FBQyxLQUFhLEVBQUUsUUFBb0M7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzVDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQzlDLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==