// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';

/**
 * @name      scrollSpy
 * @namespace            js.dom.scroll
 * @type      Function
 * @platform          js
 * @status          beta
 * @async
 *
 * Function that let you monitor an HTMLElement passed and being notified when
 * it is "active" and when it is "unactive".
 *
 * @feature       Promise based API
 *
 * @param 		{HTMLElement} 				$target 			The element to monitor
 * @param       {IScrollSpySettings}     [settings={}]       Some settings to tweak the active and unactive detection
 * @return      {SPromise}           An SPromise that will emit events like "activate" and "unactivate"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import { __scrollSpy } from '@coffeekraken/sugar/dom';
 * __scrollSpy($myElement).on('activate', () => {
 *      // do something
 * }).on('unactivate', () => {
 *      // do something
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IScrollSpySettings {
    group: string;
    percentY: number;
}

export interface IScrollSpyItem {
    $target: HTMLElement;
    emit: Function;
    percentY: Number;
    lastEmittedEvent: string;
}

const _groups: Record<string, IScrollSpyItem[]> = {};

function _check() {
    for (let [group, stack] of Object.entries(_groups)) {
        let nearest = 9999999,
            $nearest;

        _groups[group] = _groups[group].filter((itemObj) => {
            const bound = itemObj.$target.getBoundingClientRect();

            if (!itemObj.$target.isConnected) {
                return false;
            }

            const percent = (100 / window.innerHeight) * bound.top;

            if (
                percent < itemObj.percentY &&
                Math.abs(percent) - itemObj.percentY < nearest
            ) {
                nearest = Math.abs(percent) - itemObj.percentY;
                $nearest = itemObj.$target;
            }

            return true;
        });

        for (let itemObj of stack) {
            if (itemObj.$target === $nearest) {
                if (itemObj.lastEmittedEvent === 'activate') {
                    continue;
                }
                itemObj.emit('activate', itemObj.$target);
                itemObj.lastEmittedEvent = 'activate';
            } else {
                if (itemObj.lastEmittedEvent === 'unactivate') {
                    continue;
                }
                itemObj.emit('unactivate', itemObj.$target);
                itemObj.lastEmittedEvent = 'unactivate';
            }
        }
    }
}

document.addEventListener('scroll', () => {
    _check();
});

let _firstCheckTimeout;

export default function __scrollSpy(
    $target: HTMLElement,
    settings?: Partial<IScrollSpySettings>,
): Promise<any> {
    return new __SPromise(({ resolve, reject, emit, on }) => {
        const finalSettings: IScrollSpySettings = {
            group: 'default',
            percentY: 50,
            ...(settings ?? {}),
        };

        function remove() {
            _groups[finalSettings.group] = _groups[finalSettings.group].filter(
                (itemObj) => {
                    return itemObj.$target !== $target;
                },
            );
            if (!_groups[finalSettings.group].length) {
                delete _groups[finalSettings.group];
            }
        }

        on('finally', () => {
            remove();
        });

        if (!_groups[finalSettings.group]) {
            _groups[finalSettings.group] = [];
        }

        // add item in the group
        _groups[finalSettings.group].push({
            $target,
            percentY: finalSettings.percentY,
            emit,
        });

        clearTimeout(_firstCheckTimeout);
        _firstCheckTimeout = setTimeout(() => {
            _check();
        });
    });
}
