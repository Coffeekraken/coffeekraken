var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../SCache"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SCache_1 = __importDefault(require("../SCache"));
    var cache = new SCache_1.default('sugar-js-cache-SCache', {
        adapter: 'ls'
    });
    test('sugar.js.cache.SCache: Set an item in the cache', function (done) {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cache.set('myCoolItem', {
                            hello: 'world'
                        })];
                    case 1:
                        _a.sent();
                        done();
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    test('sugar.js.cache.SCache: Get an item in the cache', function (done) {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cache.get('myCoolItem')];
                    case 1:
                        item = _a.sent();
                        expect(item).toEqual({
                            hello: 'world'
                        });
                        done();
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    test('sugar.js.cache.SCache: Delete an item in the cache', function (done) {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cache.delete('myCoolItem')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, cache.get('myCoolItem')];
                    case 2:
                        item = _a.sent();
                        expect(item).toBe(null);
                        done();
                        return [2 /*return*/];
                }
            });
        }); })();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ2FjaGUudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLHFEQUErQjtJQUUvQixJQUFNLEtBQUssR0FBRyxJQUFJLGdCQUFNLENBQUMsdUJBQXVCLEVBQUU7UUFDaEQsT0FBTyxFQUFFLElBQUk7S0FDZCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsaURBQWlELEVBQUUsVUFBQyxJQUFJO1FBQzNELENBQUM7Ozs0QkFDQyxxQkFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRTs0QkFDNUIsS0FBSyxFQUFFLE9BQU87eUJBQ2YsQ0FBQyxFQUFBOzt3QkFGRixTQUVFLENBQUM7d0JBQ0gsSUFBSSxFQUFFLENBQUM7Ozs7YUFDUixDQUFDLEVBQUUsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLGlEQUFpRCxFQUFFLFVBQUMsSUFBSTtRQUMzRCxDQUFDOzs7OzRCQUNjLHFCQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUE7O3dCQUFwQyxJQUFJLEdBQUcsU0FBNkI7d0JBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUM7NEJBQ25CLEtBQUssRUFBRSxPQUFPO3lCQUNmLENBQUMsQ0FBQzt3QkFDSCxJQUFJLEVBQUUsQ0FBQzs7OzthQUNSLENBQUMsRUFBRSxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsb0RBQW9ELEVBQUUsVUFBQyxJQUFJO1FBQzlELENBQUM7Ozs7NEJBQ0MscUJBQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBQTs7d0JBQWhDLFNBQWdDLENBQUM7d0JBQ3BCLHFCQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUE7O3dCQUFwQyxJQUFJLEdBQUcsU0FBNkI7d0JBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3hCLElBQUksRUFBRSxDQUFDOzs7O2FBQ1IsQ0FBQyxFQUFFLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQyJ9