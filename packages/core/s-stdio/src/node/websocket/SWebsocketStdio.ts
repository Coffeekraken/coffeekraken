// import __inquirer from 'inquirer';
import { ISEventEmitter } from '@coffeekraken/s-event-emitter';
import __SLog, { ISLog } from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __countLines from '@coffeekraken/sugar/node/terminal/countLines';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';
import __clone from '@coffeekraken/sugar/shared/object/clone';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __stripAnsi from '@coffeekraken/sugar/shared/string/stripAnsi';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import * as __Enquirer from 'enquirer';
import __SStdio from '../../shared/SStdio';
import __defaultWebsocketComponent from './components/defaultWebSocketComponent';

/**
 * @name            SWebsocketStdio
 * @namespace       node.basic
 * @type            Class
 *
 * This class represent a "websocket" in out interface.
 *
 * @param         {SEventEmitter[]}            sources           An array of sources to display with this Stdio instance
 * @param         {Object}              [settings={}]     The settings object to configure your SStdio
 *
 * @todo        Integrate notifications
 *
 * @example         js
 * import SWebsocketStdio from '@coffeekraken/s-stdio';
 * const websocket = new SWebsocketStdio(mySource);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISWebsocketStdioCtorSettings {
    websocketStdio?: Partial<ISWebsocketStdioSettings>;
}

export interface ISWebsocketStdioLogsContainer {}

export interface ISWebsocketStdioSettings {}

export interface ISWebsocketStdio {}

class SWebsocketStdio extends __SStdio implements ISWebsocketStdio {
    /**
     * @name      websocketStdioSettings
     * @type      ISWebsocketStdioSettings
     * @get
     *
     * Access the stdio settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get websocketStdioSettings(): ISWebsocketStdioSettings {
        return (<any>this)._settings.websocketStdio;
    }

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
        id: string,
        sources: ISEventEmitter | ISEventEmitter[],
        settings?: ISWebsocketStdioCtorSettings,
    ) {
        super(
            id,
            sources,
            __deepMerge(
                {
                    websocketStdio: {},
                },
                settings || {},
            ),
        );
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
    _log(logObj: ISLog, component) {
        // handle empty logs
        if (!logObj) return;
        const obj = component.render(logObj);
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
            let prompt, res;

            // switch (askObj.type) {
            //     case 'select':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.Select))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'autocomplete':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.AutoComplete))({
            //             ...askObj,
            //             color: groupObj.color,
            //             choices: askObj.choices,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'confirm':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.Confirm))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'form':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.Form))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'input':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.Input))({
            //             ...askObj,
            //             color: groupObj.color,
            //             validate(value) {
            //                 if (!askObj.pattern) return true;
            //                 const pattern = Array.isArray(askObj.pattern) ? askObj.pattern : [askObj.pattern];
            //                 const reg = new RegExp(pattern[0], pattern[1]);
            //                 return reg.test(value);
            //             }
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'secret':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.Secret))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'list':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.List))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'multiselect':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.MultiSelect))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'number':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.NumberPrompt))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'password':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.Password))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     case 'toggle':
            //         // @ts-ignore
            //         prompt = new (this._getPromptClass(__Enquirer.default.Toggle))({
            //             ...askObj,
            //             color: groupObj.color,
            //         });
            //         res = await prompt.run();
            //         break;
            //     default:
            //         throw new Error(`Unknown ask type ${askObj.type}`);
            //         break;
            // }
            resolve(res);
        });
    }
}

SWebsocketStdio.registerComponent(__defaultWebsocketComponent);

export default SWebsocketStdio;
