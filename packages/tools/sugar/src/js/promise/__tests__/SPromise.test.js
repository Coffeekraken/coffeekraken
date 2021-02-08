// @shared
// @ts-nocheck
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
        define(["require", "exports", "../../time/wait", "../SPromise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var wait_1 = __importDefault(require("../../time/wait"));
    var SPromise_1 = __importDefault(require("../SPromise"));
    describe('sugar.js.promise', function () {
        it('Should create and resolve a promise using API', function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var promise, promiseRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promise = new SPromise_1.default({
                            coco: 'yyy'
                        });
                        setTimeout(function () {
                            promise.resolve('Hello');
                        }, 100);
                        return [4 /*yield*/, promise];
                    case 1:
                        promiseRes = _a.sent();
                        expect(promiseRes).toBe('Hello');
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should create and resolve a promise using executor function API', function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var promise, promiseRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promise = new SPromise_1.default(function (_a) {
                            var resolve = _a.resolve;
                            return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, wait_1.default(100)];
                                        case 1:
                                            _b.sent();
                                            resolve('Hello');
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        });
                        return [4 /*yield*/, promise];
                    case 1:
                        promiseRes = _a.sent();
                        expect(promiseRes).toBe('Hello');
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should create and emit an event that will be catched correctly', function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var promise, eventCatched, promiseRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promise = new SPromise_1.default(function (_a) {
                            var resolve = _a.resolve, emit = _a.emit;
                            return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, wait_1.default(100)];
                                        case 1:
                                            _b.sent();
                                            emit('update', 'World');
                                            return [4 /*yield*/, wait_1.default(200)];
                                        case 2:
                                            _b.sent();
                                            resolve('Hello');
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        });
                        eventCatched = false;
                        promise.on('update', function (value, metas) {
                            console.log('UPDA', value, metas);
                            if (value === 'World')
                                eventCatched = true;
                        });
                        return [4 /*yield*/, promise];
                    case 1:
                        promiseRes = _a.sent();
                        expect(eventCatched).toBe(true);
                        expect(promiseRes).toBe('Hello');
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb21pc2UudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9taXNlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTtBQUNWLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHlEQUFxQztJQUNyQyx5REFBcUM7SUFFckMsUUFBUSxDQUFDLGtCQUFrQixFQUFFO1FBQzNCLEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxVQUFPLElBQUk7Ozs7O3dCQUN2RCxPQUFPLEdBQUcsSUFBSSxrQkFBVSxDQUFDOzRCQUM3QixJQUFJLEVBQUUsS0FBSzt5QkFDWixDQUFDLENBQUM7d0JBQ0gsVUFBVSxDQUFDOzRCQUNULE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzNCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDVyxxQkFBTSxPQUFPLEVBQUE7O3dCQUExQixVQUFVLEdBQUcsU0FBYTt3QkFDaEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDakMsSUFBSSxFQUFFLENBQUM7Ozs7YUFDUixDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsaUVBQWlFLEVBQUUsVUFBTyxJQUFJOzs7Ozt3QkFDekUsT0FBTyxHQUFHLElBQUksa0JBQVUsQ0FBQyxVQUFPLEVBQVc7Z0NBQVQsT0FBTyxhQUFBOzs7O2dEQUM3QyxxQkFBTSxjQUFNLENBQUMsR0FBRyxDQUFDLEVBQUE7OzRDQUFqQixTQUFpQixDQUFDOzRDQUNsQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7O3lCQUNsQixDQUFDLENBQUM7d0JBQ2dCLHFCQUFNLE9BQU8sRUFBQTs7d0JBQTFCLFVBQVUsR0FBRyxTQUFhO3dCQUNoQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNqQyxJQUFJLEVBQUUsQ0FBQzs7OzthQUNSLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxnRUFBZ0UsRUFBRSxVQUFPLElBQUk7Ozs7O3dCQUN4RSxPQUFPLEdBQUcsSUFBSSxrQkFBVSxDQUFDLFVBQU8sRUFBaUI7Z0NBQWYsT0FBTyxhQUFBLEVBQUUsSUFBSSxVQUFBOzs7O2dEQUNuRCxxQkFBTSxjQUFNLENBQUMsR0FBRyxDQUFDLEVBQUE7OzRDQUFqQixTQUFpQixDQUFDOzRDQUNsQixJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDOzRDQUN4QixxQkFBTSxjQUFNLENBQUMsR0FBRyxDQUFDLEVBQUE7OzRDQUFqQixTQUFpQixDQUFDOzRDQUNsQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7O3lCQUNsQixDQUFDLENBQUM7d0JBQ0MsWUFBWSxHQUFHLEtBQUssQ0FBQzt3QkFDekIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQyxLQUFLLEVBQUUsS0FBSzs0QkFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDOzRCQUNsQyxJQUFJLEtBQUssS0FBSyxPQUFPO2dDQUFFLFlBQVksR0FBRyxJQUFJLENBQUM7d0JBQzdDLENBQUMsQ0FBQyxDQUFDO3dCQUNnQixxQkFBTSxPQUFPLEVBQUE7O3dCQUExQixVQUFVLEdBQUcsU0FBYTt3QkFDaEMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDaEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDakMsSUFBSSxFQUFFLENBQUM7Ozs7YUFDUixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQyJ9