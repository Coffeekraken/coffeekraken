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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const _nativeLog = console.log;
class SStdioSource extends s_class_1.default {
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
exports.default = SStdioSource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBYTdDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFL0IsTUFBcUIsWUFBYSxTQUFRLGlCQUFRO0lBRzlDLFlBQVksUUFBZ0M7UUFDeEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBSFosZUFBVSxHQUErQixFQUFFLENBQUM7SUFJcEQsQ0FBQztJQUVELEdBQUcsQ0FBQyxNQUFhOztRQUNiLE1BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLDBDQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3RDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxHQUFHLENBQUMsTUFBZ0I7UUFDaEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN6QyxJQUFJLE1BQU0sQ0FBQztZQUNYLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDakQsTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzdCO1lBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsS0FBSzs7UUFDRCxNQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSywwQ0FBRSxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN4QyxRQUFRLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELEVBQUUsQ0FBQyxLQUFhLEVBQUUsUUFBb0M7UUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDL0I7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzNDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxHQUFHLENBQUMsS0FBYSxFQUFFLFFBQW9DO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM1QyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUM5QyxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBbERELCtCQWtEQyJ9