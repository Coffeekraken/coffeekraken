// @ts-nocheck
// @shared
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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    return function asyncForEach(array, asyncFn) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (_a) {
                        var resolve = _a.resolve, reject = _a.reject;
                        return __awaiter(_this, void 0, void 0, function () {
                            var index;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        index = 0;
                                        _b.label = 1;
                                    case 1:
                                        if (!(index < array.length)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, asyncFn(array[index], index, array)];
                                    case 2:
                                        _b.sent();
                                        _b.label = 3;
                                    case 3:
                                        index++;
                                        return [3 /*break*/, 1];
                                    case 4:
                                        resolve();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    })];
            });
        });
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNGb3JFYWNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXN5bmNGb3JFYWNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQThCVixPQUFTLFNBQWUsWUFBWSxDQUNsQyxLQUFZLEVBQ1osT0FBc0I7Ozs7Z0JBRXRCLHNCQUFPLElBQUksT0FBTyxDQUFDLFVBQU8sRUFBbUI7NEJBQWpCLE9BQU8sYUFBQSxFQUFFLE1BQU0sWUFBQTs7Ozs7O3dDQUNoQyxLQUFLLEdBQUcsQ0FBQzs7OzZDQUFFLENBQUEsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUE7d0NBQ3RDLHFCQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFBOzt3Q0FBekMsU0FBeUMsQ0FBQzs7O3dDQURGLEtBQUssRUFBRSxDQUFBOzs7d0NBR2pELE9BQU8sRUFBRSxDQUFDOzs7OztxQkFDWCxDQUFDLEVBQUM7OztLQUNKLENBQUMifQ==