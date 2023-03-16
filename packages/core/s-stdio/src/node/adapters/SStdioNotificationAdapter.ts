import type { ISLog, ISLogAsk } from '@coffeekraken/s-log';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __stripTags } from '@coffeekraken/sugar/html';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __notifier from 'node-notifier';
import __path from 'path';
import __SStdioAdapter from '../../shared/SStdioAdapter';

/**
 * @name            SStdioNotificationAdapter
 * @namespace       node.basic
 * @type            Class
 * @platform        node
 * @status          beta
 * @private
 *
 * This class represent a "notification" out interface.
 *
 * @param         {SEventEmitter[]}            sources           An array of sources to display with this Stdio instance
 * @param         {Object}              [settings={}]     The settings object to configure your SStdio
 *
 * @todo        Integrate notifications
 *
 * @example         js
 * import { __SStdioNotificationAdapter } from '@coffeekraken/s-stdio';
 * const terminal = new __SStdioNotificationAdapter();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISStdioNotificationAdapterLogsContainer {}

export interface ISStdioNotificationAdapterSettings {}

export interface ISNotificationStdioAdapter {}

const _nativeLog = console.log;

export default class SStdioBasicAdapter
    extends __SStdioAdapter
    implements ISNotificationStdioAdapter
{
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: ISStdioNotificationAdapterSettings) {
        super(__deepMerge({}, settings || {}));
    }

    clear() {}

    /**
     * @name          _log
     * @type          Function
     * @private
     *
     * Method that actually log the passed log object with the passed component
     *
     * @param         {ILog}        logObj            The log object to log
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    log(logObj: ISLog) {
        if (!logObj) return;

        // only the marked "notify" notification
        if (!logObj.notify) {
            return;
        }

        const icons = {
            log: __path.resolve(
                `${__dirname()}/../../../../../src/node/adapters/icons/icon-log.jpg`,
            ),
            info: __path.resolve(
                `${__dirname()}/../../../../../src/node/adapters/icons/icon-info.jpg`,
            ),
            warn: __path.resolve(
                `${__dirname()}/../../../../../src/node/adapters/icons/icon-warn.jpg`,
            ),
            error: __path.resolve(
                `${__dirname()}/../../../../../src/node/adapters/icons/icon-error.jpg`,
            ),
            success: __path.resolve(
                `${__dirname()}/../../../../../src/node/adapters/icons/icon-success.jpg`,
            ),
        };

        __notifier.notify({
            title: __stripTags(logObj.group ?? 'Sugar ♥'),
            message: __stripTags(logObj.value?.value ?? logObj.value ?? '...'),
            icon: false,
            timeout: 10,
            contentImage: icons[logObj.type] ?? icons.log,
            ...(logObj.metas ?? {}),
        });
    }

    /**
     * @name          _ask
     * @type          Function
     * @private
     *
     * Method that actually log the passed log object with the passed component
     *
     * @param         {ILogAsk}        askObj            The ask object to ask to the user
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    ask(askObj: ISLogAsk) {
        return new Promise(async (resolve) => {
            let res;

            __notifier.notify(
                {
                    title: __stripTags(askObj.group ?? 'Sugar ♥'),
                    message: __stripTags(askObj.value ?? '...'),
                    icon: false,
                    contentImage: icons[logObj.type] ?? icons.log,
                    ...(logObj.metas ?? {}),
                    reply: true,
                },
                function (error, response, metadata) {
                    _nativeLog(response, metadata);
                    resolve(response);
                },
            );
        });
    }
}
