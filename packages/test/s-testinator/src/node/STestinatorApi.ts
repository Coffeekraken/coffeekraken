import __SPromise from '@coffeekraken/s-promise';
import __STestinatorExpect from './STestinatorExpect';

export interface ISTestinatorApiIt {
    promise: Promise<any>;
}

export interface ISTestinatorApiDescribe {
    promise: Promise<any>;
    its: ISTestinatorApiIt[];
}

export default class STestinatorApi {
    _promises: any = [];
    _path: string;

    _currentStack: string[] = [];

    _describes: any[] = [];

    constructor(path: string) {
        this._path = path;
    }

    async run() {
        for (let i = 0; i < this._describes.length; i++) {
            const describeObj = this._describes[i];
            await describeObj.exec();
        }
    }

    exposeMethods(on: any, pipe: Function): void {
        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(
            (methodName) => {
                // do not expose some methods
                if (
                    ['constructor', 'exposeMethods', 'run'].includes(methodName)
                ) {
                    return;
                }

                // expose the method on the passed "on" object. Usually the "on" object is "global"
                on[methodName] = (...args) => {
                    switch (methodName) {
                        case 'describe':
                            const promise = new __SPromise();
                            this._describes.push({
                                promise,
                                exec: async () => {
                                    const its = this._describes[
                                        this._describes.length - 1
                                    ].its;
                                    for (let i = 0; i < its.length; i++) {
                                        const itObj = its[i];
                                        await itObj.exec();
                                    }
                                    // resolve promise
                                    promise.resolve();
                                },
                                its: [],
                            });
                            // execute the callback directly
                            // @ts-ignore
                            pipe(this[methodName](...args));
                            break;
                        case 'it':
                            // append to the current describe
                            this._describes[
                                this._describes.length - 1
                            ].its.push({
                                exec: async () => {
                                    // @ts-ignore
                                    await pipe(this[methodName](...args));
                                },
                            });
                            break;
                        default:
                            return this[methodName](...args);
                            break;
                    }
                };
            },
        );
    }

    describe(description: string, callback: () => void): void {
        return new __SPromise(async ({ resolve, emit }) => {
            emit('log', {
                value: `<cyan>[describe]</cyan> ${description} - <cyan>${this._path}</cyan>`,
            });
            if (callback) {
                await callback();
            }
            resolve();
        });
    }

    it(description: string, callback: () => void): void {
        return new __SPromise(async ({ resolve, emit }) => {
            emit('log', {
                value: `<yellow>      [it]</yellow> ${description}`,
            });
            if (callback) {
                await callback();
            }
            resolve();
        });
    }

    expect(value: any): ISTestinatorApiExpect {
        return new __STestinatorExpect(value);
    }
}
