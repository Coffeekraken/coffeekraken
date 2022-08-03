var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPromise from '@coffeekraken/s-promise';
import __STestinatorExpect from './STestinatorExpect';
export default class STestinatorApi {
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
                        const promise = new __SPromise();
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
        return new __SPromise(({ resolve, emit }) => __awaiter(this, void 0, void 0, function* () {
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
        return new __SPromise(({ resolve, emit }) => __awaiter(this, void 0, void 0, function* () {
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
        return new __STestinatorExpect(value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sbUJBQW1CLE1BQU0scUJBQXFCLENBQUM7QUFXdEQsTUFBTSxDQUFDLE9BQU8sT0FBTyxjQUFjO0lBUS9CLFlBQVksSUFBWTtRQVB4QixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBR3BCLGtCQUFhLEdBQWEsRUFBRSxDQUFDO1FBRTdCLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFHbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVLLEdBQUc7O1lBQ0wsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM3QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUM1QjtRQUNMLENBQUM7S0FBQTtJQUVELGFBQWEsQ0FBQyxFQUFPLEVBQUUsSUFBYztRQUNqQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FDM0QsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNYLDZCQUE2QjtZQUM3QixJQUNJLENBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQzlEO2dCQUNFLE9BQU87YUFDVjtZQUVELG1GQUFtRjtZQUNuRixFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO2dCQUN6QixRQUFRLFVBQVUsRUFBRTtvQkFDaEIsS0FBSyxVQUFV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