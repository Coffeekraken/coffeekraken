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
const _nativeLog = console.log;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBYTdDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFL0IsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFhLFNBQVEsUUFBUTtJQUc5QyxZQUFZLFFBQWdDO1FBQ3hDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUhaLGVBQVUsR0FBK0IsRUFBRSxDQUFDO0lBSXBELENBQUM7SUFFRCxHQUFHLENBQUMsTUFBYTs7UUFDYixNQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRywwQ0FBRSxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN0QyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsR0FBRyxDQUFDLE1BQWdCO1FBQ2hCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDekMsSUFBSSxNQUFNLENBQUM7WUFDWCxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ2pELE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM3QjtZQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELEtBQUs7O1FBQ0QsTUFBQSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssMENBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDeEMsUUFBUSxFQUFFLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxFQUFFLENBQUMsS0FBYSxFQUFFLFFBQW9DO1FBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMzQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsR0FBRyxDQUFDLEtBQWEsRUFBRSxRQUFvQztRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDNUMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FDOUMsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9