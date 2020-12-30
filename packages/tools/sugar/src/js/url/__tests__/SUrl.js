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
module.exports = function (__SUrl) {
    describe('sugar.js.url.SUrl', function () {
        it('Should build a simple url and parse it', function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = new __SUrl('https://coffeekraken.io:9999/something/cool?item1=hello&item2=world#toMake');
                expect(url.protocol).toBe('https:');
                expect(url.hash).toBe('#toMake');
                expect(url.query).toEqual({
                    item1: 'hello',
                    item2: 'world'
                });
                expect(url.pathname).toBe('/something/cool');
                expect(url.port).toBe(9999);
                expect(url.hostname).toBe('coffeekraken.io');
                done();
                return [2 /*return*/];
            });
        }); });
        it('Should nuild a complexe url with a schema and parse it', function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = new __SUrl('https://coffeekraken.io:9999/something/cool/2?item1=hello&item2=world#toMake', {
                    schema: '{param1:string}/{param2}/{?param3:number}'
                });
                expect(url.schema.params).toEqual({
                    param1: {
                        optional: false,
                        raw: '{param1:string}',
                        type: 'string',
                        value: 'something'
                    },
                    param2: {
                        optional: false,
                        raw: '{param2}',
                        type: null,
                        value: 'cool'
                    },
                    param3: {
                        optional: true,
                        raw: '{?param3:number}',
                        type: 'number',
                        value: 2
                    }
                });
                url.pathname = 'some/other';
                expect(url.schema.params).toEqual({
                    param1: {
                        optional: false,
                        raw: '{param1:string}',
                        type: 'string',
                        value: 'some'
                    },
                    param2: {
                        optional: false,
                        raw: '{param2}',
                        type: null,
                        value: 'other'
                    },
                    param3: {
                        optional: true,
                        raw: '{?param3:number}',
                        type: 'number',
                        value: null
                    }
                });
                url.pathname = '3/other/3';
                expect(url.schema.params).toEqual({
                    param1: {
                        error: {
                            description: "This param \"param1\" has to be a \"string\" but he's a \"number\"...",
                            type: "type",
                            passed: "number",
                            requested: "string",
                        },
                        optional: false,
                        raw: '{param1:string}',
                        type: 'string',
                        value: 3
                    },
                    param2: {
                        optional: false,
                        raw: '{param2}',
                        type: null,
                        value: 'other'
                    },
                    param3: {
                        optional: true,
                        raw: '{?param3:number}',
                        type: 'number',
                        value: 3
                    }
                });
                done();
                return [2 /*return*/];
            });
        }); });
    });
};
//# sourceMappingURL=SUrl.js.map