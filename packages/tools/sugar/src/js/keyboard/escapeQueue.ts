import __SPromise from '@coffeekraken/s-promise';
import __hotkey from './hotkey';

/**
 * @name 		escaoeQueue
 * @namespace            js.keyboard
 * @type      Function
 * @platform          js
 * @status              beta
 *
 * This funciton allows you to register actions to execute when user press the escape key.
 * It will take care of executing the last registered action first, then the others...
 * This function returns a SPromise instance on which you can call the `cancel` method to unregister your
 * action in the queue.
 *
 * @param           {Function}          [callback=null]            The callback to call on pressing escape
 * @param         {Object}      [settings={}]    An option object to configure your hotkey. Here's the list of available settings:
 * @return      {SPromise}                       An SPromise instance that will be resolved when the user has pressed the escape key and that it's yout turn in the queue
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __escapeQueue($1).then(() => {
 *      $2
 * });
 *
 * @example    js
 * import { __escapeQueue } from '@coffeekraken/sugar/keyboard'
 * const promise = __escapeQueue();
 * promise.then(() => {
 *      // do something...
 * });
 *
 * // if you want to cancel your subscription
 * promise.cancel();
 *
 * @see         https://www.npmjs.com/package/hotkeys-js
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IEscapeQueueSettings {
    rootNode?: HTMLElement | Document | HTMLElement[] | Document[];
}

export interface IEscapeQueueItem {
    callback?: Function;
    resolve: Function;
}

const _escapeQueue: IEscapeQueueItem[] = [];
let _isEscaping = false;
export default function escapeQueue(
    callback?: Function,
    settings?: IEscapeQueueSettings,
): __SPromise {
    return new __SPromise(({ resolve, reject, on }) => {
        const finalSettings: IEscapeQueueSettings = {
            rootNode: document,
            ...(settings ?? {}),
        };

        const roots = Array.isArray(finalSettings.rootNode)
            ? finalSettings.rootNode
            : [finalSettings.rootNode];

        roots.forEach(($root) => {
            // make sure we only register 1 by rootNode
            if ($root._escapeQueue) {
                return;
            }
            $root._escapeQueue = true;

            __hotkey('escape', {
                element: $root,
            }).on('press', () => {
                if (!_escapeQueue.length || _isEscaping) {
                    return;
                }

                // make sure to not escape multiple times
                // at once
                _isEscaping = true;
                setTimeout(() => {
                    _isEscaping = false;
                });

                const queueItem = <IEscapeQueueItem>_escapeQueue.pop();
                queueItem.callback?.();
                queueItem.resolve();
            });
        });

        // create the queue item to register
        const queueItem: IEscapeQueueItem = {
            callback,
            resolve,
        };

        // add to the queue
        _escapeQueue.push(queueItem);

        // handle the "cancel" call
        on('cancel', () => {
            _escapeQueue.splice(_escapeQueue.indexOf(queueItem, 1));
        });
    });
}
