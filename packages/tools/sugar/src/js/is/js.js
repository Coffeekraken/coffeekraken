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
    return function () {
        return typeof window !== 'undefined';
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7SUF1QlYsT0FBUztRQUNQLE9BQU8sT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyJ9