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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const STestinatorExpect_1 = __importDefault(require("./STestinatorExpect"));
class STestinatorApi {
    constructor(path) {
        this._promises = [];
        this._currentStack = [];
        this._describes = [];
        this._path = path;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this._describes.length; i++) {
                const describeObj = this._describes[i];
                yield describeObj.exec();
            }
        });
    }
    exposeMethods(on, pipe) {
        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach((methodName) => {
            // do not expose some methods
            if (['constructor', 'exposeMethods', 'run'].includes(methodName)) {
                return;
            }
            // expose the method on the passed "on" object. Usually the "on" object is "global"
            on[methodName] = (...args) => {
                switch (methodName) {
                    case 'describe':
                        const promise = new s_promise_1.default();
                        this._describes.push({
                            promise,
                            exec: () => __awaiter(this, void 0, void 0, function* () {
                                const its = this._describes[this._describes.length - 1].its;
                                for (let i = 0; i < its.length; i++) {
                                    const itObj = its[i];
                                    yield itObj.exec();
                                }
                                // resolve promise
                                promise.resolve();
                            }),
                            its: [],
                        });
                        // execute the callback directly
                        // @ts-ignore
                        pipe(this[methodName](...args));
                        break;
                    case 'it':
                        // append to the current describe
                        this._describes[this._describes.length - 1].its.push({
                            exec: () => __awaiter(this, void 0, void 0, function* () {
                                // @ts-ignore
                                yield pipe(this[methodName](...args));
                            }),
                        });
                        break;
                    default:
                        return this[methodName](...args);
                        break;
                }
            };
        });
    }
    describe(description, callback) {
        return new s_promise_1.default(({ resolve, emit }) => __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                value: `<cyan>[describe]</cyan> ${description} - <cyan>${this._path}</cyan>`,
            });
            if (callback) {
                yield callback();
            }
            resolve();
        }));
    }
    it(description, callback) {
        return new s_promise_1.default(({ resolve, emit }) => __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                value: `<yellow>      [it]</yellow> ${description}`,
            });
            if (callback) {
                yield callback();
            }
            resolve();
        }));
    }
    expect(value) {
        return new STestinatorExpect_1.default(value);
    }
}
exports.default = STestinatorApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELDRFQUFzRDtBQVd0RCxNQUFxQixjQUFjO0lBUS9CLFlBQVksSUFBWTtRQVB4QixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBR3BCLGtCQUFhLEdBQWEsRUFBRSxDQUFDO1FBRTdCLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFHbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVLLEdBQUc7O1lBQ0wsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM3QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUM1QjtRQUNMLENBQUM7S0FBQTtJQUVELGFBQWEsQ0FBQyxFQUFPLEVBQUUsSUFBYztRQUNqQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FDM0QsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNYLDZCQUE2QjtZQUM3QixJQUNJLENBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQzlEO2dCQUNFLE9BQU87YUFDVjtZQUVELG1GQUFtRjtZQUNuRixFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO2dCQUN6QixRQUFRLFVBQVUsRUFBRTtvQkFDaEIsS0FBSyxVQUFVO3dCQUNYLE1BQU0sT0FBTyxHQUFHLElBQUksbUJBQVUsRUFBRSxDQUFDO3dCQUNqQyxJ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