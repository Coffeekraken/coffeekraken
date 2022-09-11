import __SPromise from '@coffeekraken/s-promise';
import { __isChildProcess } from '@coffeekraken/sugar/is';

export default function myProcess(params) {
    return new __SPromise(({ resolve }) => {
        setTimeout(() => {
            resolve({
                state: 'success',
                isChildProcess: __isChildProcess(),
                ...params,
            });
        }, 100);
    });
}
