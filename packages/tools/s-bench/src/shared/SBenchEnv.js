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
    static activateBench(benchId) {
        var _a;
        let currentBenchs = (_a = __env('s-bench-activated-ids')) !== null && _a !== void 0 ? _a : [];
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
    static activeBench() {
        var _a;
        return (_a = __env('s-bench-activated-ids')) !== null && _a !== void 0 ? _a : [];
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
    static isBenchActive(benchId) {
        if (this.activeBench().indexOf('*') !== -1)
            return true;
        return this.activeBench().indexOf(benchId) !== -1;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JlbmNoRW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0JlbmNoRW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLG9DQUFvQyxDQUFDO0FBRXZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLFNBQVM7SUFDMUI7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQTBCOztRQUMzQyxJQUFJLGFBQWEsR0FBRyxNQUFBLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFDekQsYUFBYSxHQUFHLENBQUMsR0FBRyxhQUFhLEVBQUUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDM0QsS0FBSyxDQUFDLHVCQUF1QixFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxXQUFXOztRQUNkLE9BQU8sTUFBQSxLQUFLLENBQUMsdUJBQXVCLENBQUMsbUNBQUksRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQWU7UUFDaEMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3hELE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0NBQ0oifQ==