import type { ISLog } from '@coffeekraken/s-log';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import { __parseHtml } from '@coffeekraken/sugar/console';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';
import { __upperFirst } from '@coffeekraken/sugar/string';
// import { __countLines } from '@coffeekraken/sugar/terminal';
import __SStdioAdapter from '../../shared/SStdioAdapter';

/**
 * @name            SBasicStdio
 * @namespace       node.basic
 * @type            Class
 *
 * This class represent a "basic" terminal strandard in out interface.
 *
 * @param         {SEventEmitter[]}            sources           An array of sources to display with this Stdio instance
 * @param         {Object}              [settings={}]     The settings object to configure your SStdio
 *
 * @todo        Integrate notifications
 *
 * @example         js
 * import SBasicStdio from '@coffeekraken/s-stdio';
 * const terminal = new SBasicStdio(mySource);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISStdioBasicAdapterLogsContainer {}

export interface ISStdioBasicAdapterSettings {}

export interface ISBasicStdioAdapter {}

const _nativeConsole = {};
for (let key of ['log', 'error', 'warn', 'verbose']) {
    _nativeConsole[key] = console[key] ?? console.log;
}
    

export default class SStdioBasicAdapter extends __SStdioAdapter implements ISBasicStdioAdapter {
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
    constructor(
        settings?: ISStdioBasicAdapterSettings,
    ) {
        super(__deepMerge({}, settings || {}));
    }

    clear() { 
        console.clear();
    }

    _getGroupObj(group, log = true) {
        // @ts-ignore
        let groupObj = this._loggedGroups[group];
        if (!groupObj || this._lastLogObj?.group !== group) {
            // @ts-ignore
            groupObj = {
                color: __getColorFor(group),
            };
            groupObj.prefix = __parseHtml(
                `<${groupObj.color}>█</${groupObj.color}>`,
            );
            // @ts-ignore
            this._loggedGroups[group] = groupObj;
        }
        return groupObj;
    }

    /**
     * @name          _log
     * @type          Function
     * @private
     *
     * Method that actually log the passed log object with the passed component
     *
     * @param         {ILog}        logObj            The log object to log
     * @param         {ISStdioComponent}      component       The component to use for logging
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _lastLogLinesCountStack = [];
    _lastLogObj;
    _loggedGroups: any = {};
    _logsStack: ISStdioBasicAdapterLogsContainer[] = [];
    log(logObj: ISLog) {
        // handle empty logs
        if (!logObj) return;

        const logger = logObj.logger ?? _nativeConsole.log;

        const groupObj = this._getGroupObj(logObj.group);

        if (logObj.group !== this._lastLogObj?.group) {
            logger(groupObj.prefix);
            // @ts-ignore
            logger(__parseHtml(
                `<bg${__upperFirst(groupObj.color)}><black> ${
                    logObj.group
                } </black></bg${__upperFirst(groupObj.color)}><${
                    groupObj.color
                }>${'-'.repeat(
                    50,
                )}</${groupObj.color}>`)
            );
            logger(groupObj.prefix);
        }

        if (
            logObj.clear &&
            this._lastLogObj?.type !== __SLog.TYPE_WARN &&
            this._lastLogObj?.type !== __SLog.TYPE_ERROR
        ) {
            console.clear();
        }

        let logLinesCount = 0;

        if (logObj.margin?.top) {
            for (let i = 0; i < logObj.margin.top; i++) {
                logger(__parseHtml(`<${groupObj.color}>█</${groupObj.color}>`));
            }
            logLinesCount += logObj.margin.top;
        }

        const logValue = logObj.value?.value ?? logObj.value ?? logObj;

        let log = logValue;
        if (typeof logValue === 'string') {
            log = __parseHtml(`<${groupObj.color}>█</${groupObj.color}> ${logValue}`);
        }

        logLinesCount += 1;
        logger(log);

        if (logObj.margin?.bottom) {
            for (let i = 0; i < logObj.margin.bottom; i++) {
                logger(__parseHtml(`<${groupObj.color}>█</${groupObj.color}>`));
            }
            // @ts-ignore
            logLinesCount += logObj.margin.top;
        }

        // @ts-ignore)
        this._lastLogLinesCountStack.push(logLinesCount);
        this._lastLogObj = logObj;
    }

    /**
     * @name          _ask
     * @type          Function
     * @private
     *
     * Method that actually log the passed log object with the passed component
     *
     * @param         {ILogAsk}        askObj            The ask object to ask to the user
     * @param         {ISStdioComponent}      component       The component to use for logging
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _ask(askObj) {
        return new __SPromise(async ({ resolve, reject, emit }) => {

            throw new Error(`<red>[SStdioBasicAdapter]</red> The "ask" feature has not been implemented yet in the browser environment...`)
            
            let prompt, res;

            if (!askObj.group) {
                // @ts-ignore
                if (askObj.metas.id === 'SPromise') {
                    askObj.group = 'Global';
                } else {
                    // @ts-ignore
                    askObj.group = askObj.metas.id;
                }
            }

            // transform html in message
            askObj.message = __parseHtml(askObj.message);

            const groupObj = this._getGroupObj(askObj.group);


            resolve(res);
        });
    }
}