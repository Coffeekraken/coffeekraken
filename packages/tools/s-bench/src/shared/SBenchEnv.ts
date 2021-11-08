import __env from '@coffeekraken/sugar/shared/env/env';

/**
 * @name            SBenchEnv
 * @namespace       shared
 * @type            Class
 * @platform        js
 * @platform        node
 * @status          alpha
 *
 * This class allows you to access the SBench environment parameters like:
 * - the current process want some bench?
 * - which bench are activated
 * - some methods to check if for example the bench "request" is wanted
 *
 * @example         js
 * import SBench, { SBenchEnv } from '@coffeekraken/s-bench';
 *
 * SBench.start('myCoolProcess');
 * SBenchEnv.
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SBenchEnv {
    /**
     * @name        activateBench
     * @type        Function
     * @static
     *
     * This method allows you to activate one or more bench in the current process
     *
     * @param           {String|String[]}           benchId         One or more bench id(s) to activate
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static activateBench(benchId: string | string[]): void {
        let currentBenchs = __env('s-bench-activated-ids') ?? [];
        currentBenchs = [...currentBenchs, ...Array.from(benchId)];
        __env('s-bench-activated-ids', currentBenchs);
    }

    /**
     * @name        activeBench
     * @type        Function
     * @static
     *
     * This method allows you to get back the list of activated bench(s)
     *
     * @return      {String[]}          The list of activated bench id(s)
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static activeBench(): string[] {
        return __env('s-bench-activated-ids') ?? [];
    }

    /**
     * @name        isBenchActive
     * @type        Function
     * @static
     *
     * This method allows you to check if a particular bench id is active
     *
     * @param        {String}               benchId             The bench id to check
     * @return      {Boolean}           true if is active, false if not
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static isBenchActive(benchId: string): boolean {
        if (this.activeBench().indexOf('*') !== -1) return true;
        return this.activeBench().indexOf(benchId) !== -1;
    }
}
