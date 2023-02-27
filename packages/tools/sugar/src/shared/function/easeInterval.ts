import __SPromise from '@coffeekraken/s-promise';
import __easeInOutQuart from '../easing/easeInOutQuart';

/**
 * @name                easeInterval
 * @namespace           shared.function
 * @type                Function
 * @platform            js
 * @status              beta
 * @async
 *
 * This function allows you to call a callback function exactly as the `setInterval` would do but with an easing that you can specify,
 * as well as an `interval` setting to customize how many time your function will be called.
 * By default this function will pass the "easedPercent" that represent the percentage of your passed "duration" with the easing applied on it.
 * With that you can make everything you want inside your callback function.
 *
 * @param       {Number}            duration            The duration of your interval process you want
 * @param       {Function}          [cb=null]           A callback function to call at each interval
 * @param       {IEaseIntervalSettings}     [settings={}]       Some settings to customize your interval process
 * @return      {SPromise}                              An SPromise that will be resolved once the process is complete, and through which you can subscribe to the "interval" event that is the same as the "cb" parameter
 *
 * @setting         {Number}        [inteval=1000/25]           An interval in ms to call your callback function
 * @setting         {Function}      [easing=easeInOutQuart]     An easing function that take as parameter a value between 0 and 1
 * @setting         {Number}        [from=0]                    The value to start with
 * @setting         {Number}        [to=100]                    The value to end with
 *
 * @snippet         __easeInterval($1, $2)
 * const easeInterval = __easeInterval($1, percent => {
 *      $2
 * });
 * // easeInterval.cancel(); // stop the easing process
 * await easeInterval;
 * 
 * @example         js
 * import { __easeInterval } from '@coffeekraken/sugar/function';
 * await __easeInterval(2000, (easedPercent) => {
 *      // do something...
 * }, {
 *      interval: 1000 / 25 // 25 times by second
 * });
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface IEaseIntervalSettings {
    interval: number;
    easing: Function;
    from: number;
    to: number;
    onEnd?: Function;
}

export default function __easeInterval(
    duration: number,
    cb: Function,
    settings: Partial<IEaseIntervalSettings> = {},
) {
    let cleared = false,
        animationFrame;

    const pro = new __SPromise(({ resolve, reject, emit, on }) => {
        settings = {
            interval: 1000 / 25,
            easing: __easeInOutQuart,
            from: 0,
            to: 100,
            onEnd: undefined,
            ...settings,
        };
        const startTime = Date.now();

        on('cancel', () => {
            cleared = true;
            cancelAnimationFrame(animationFrame);
        });

        function animate() {
            if (cleared) return;
            const percent = (100 / duration) * (Date.now() - startTime);
            // @ts-ignore
            const easedPercent = settings.easing(percent / 100) * 100;
            // emit('interval', easedPercent);
            cb(easedPercent);
            if (percent < 100) {
                if (cleared) return;
                animationFrame = requestAnimationFrame(animate);
            } else {
                settings.onEnd?.();
                resolve(easedPercent);
            }
        }
        animate();
    });

    return pro;
}
