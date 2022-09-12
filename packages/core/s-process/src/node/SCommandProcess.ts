import { __spawn } from '@coffeekraken/sugar/process';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SCommandProcessInterface from './interface/SCommandProcessInterface';
import {
    ISCommandProcessParams,
    ISCommandProcessSettings,
    ISProcessResultObject,
} from './ISProcess';
import __SProcess from './SProcess';

/**
 * @name            SCommandProcess
 * @namespace       s-process
 * @type            Class
 * @extends         SProcess
 * @status          wip
 *
 * This class represent an SProcess started with a simple bash command like "ls -la" or whatever
 *
 * @param       {ISCommandProcessSettings}          [settings={}]           Some settings to configure your command process
 *
 * @example         js
 * import { SCommandProcess } from '@coffeekreken/s-process';
 * const commandProcess = new SCommandProcess();
 * commandProcess.run('npm i');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

// @ts-ignore
export default class SCommandProcess extends __SProcess {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(
        initialParams?: Partial<ISCommandProcessParams>,
        settings?: Partial<ISCommandProcessSettings>,
    ) {
        super(
            initialParams ?? {},
            __deepMerge(settings ?? {}, {
                spawnSettings: {},
                runAsChild: false,
            }),
        );
    }

    /**
     * @name          process
     * @type          Function
     * @async
     *
     * Run the actual command through a ```spawn``` call.
     * The spawn function used here is the sugar one stored in "sugar.node.process.spawn"
     *
     * @param         {String}        command         The command you want to execute
     * @param         {ISCommandProcessSettings}      [settings={}]       Some command process settings you want to override
     * @return        {SPromise}                  An SPromise through which you can subscribe for some ```log``` and that will be resolved once the command has ended
     *
     * @since		2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    process(
        params: Partial<ISCommandProcessParams>,
        settings?: Partial<ISCommandProcessSettings>,
    ): Promise<ISProcessResultObject> {
        const set = <
            ISCommandProcessSettings // @ts-ignore
        >__deepMerge(this.settings, settings ?? {});

        // @ts-ignore
        const finalParams: ISCommandProcessParams =
            __SCommandProcessInterface.apply(params);

        return __spawn(finalParams.command, [], {
            returnValueOnly: true,
            ...set.spawnSettings,
        });
    }
}
