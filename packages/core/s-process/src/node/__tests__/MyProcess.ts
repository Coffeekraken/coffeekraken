import __SProcess from '../SProcess';
import __SPromise from '@coffeekraken/s-promise';
import __SInterface from '@coffeekraken/s-interface';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

class MyInterface extends __SInterface {
    static get _definition() {
        return {
            param1: {
                type: 'String',
                default: 'Hello',
            },
            param2: {
                type: 'Boolean',
                default: true,
            },
            crash: {
                type: 'Boolean',
                default: false,
            },
            crashTimeout: {
                type: 'Number',
                default: 100,
            },
        };
    }
}

// @ts-ignore
export default class MyProcess extends __SProcess {
    static interfaces = {
        params: MyInterface,
    };

    constructor(initialParams?, settings = {}) {
        super(initialParams, settings);
    }

    process(params, settings = {}) {
        return new __SPromise(async ({ resolve, reject, emit }) => {
            emit('log', {
                value: `Hello world ${
                    __isChildProcess() ? 'from child process' : ''
                }`,
            });

            // @ts-ignore
            if (params.crash) {
                await __wait(params.crashTimeout);
                throw new Error('COCO');
                // reject(params);
            } else {
                resolve({
                    ...params,
                    isChildProcess: __isChildProcess(),
                });
            }
        });
    }
}
