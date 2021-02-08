// @ts-nocheck
// @shared
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @name      easeOutQuad
     * @namespace           sugar.js.easing
     * @type      Function
     * @stable
     *
     * Ease out quad function
     *
     * @param 		{Number} 		t 		The current time
     * @return 		{Number} 				The value depending on time
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function ease(t) {
        return t * (2 - t);
    }
    return ease;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFzZU91dFF1YWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlYXNlT3V0UXVhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxTQUFTLElBQUksQ0FBQyxDQUFDO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUNELE9BQVMsSUFBSSxDQUFDIn0=