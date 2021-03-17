// @ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fastdom", "../dom/dispatchEvent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fastdom_1 = __importDefault(require("fastdom"));
    var dispatchEvent_1 = __importDefault(require("../dom/dispatchEvent"));
    /**
     * @name 		handleInputAttributes
     * @namespace           sugar.js.feature
     * @type      Feature
     * @stable
     *
     * Add some events on some DOM Elements. Here's the list:
     * - enter (onenter): Triggered when user tap ```enter``` on his keyboard from a **input*** or **textarea** element
     * - escape (onescape): Triggered when user tap ```escape``` on his keyboard from a **input*** or **textarea** element
     *
     * @param       {Object}        [settings={}]         An object of settings to configure your feature
     *
     * @setting       {Boolean}       [enter=true]        Specify if you want to "enter" keyboard event
     * @setting       {Boolean}       [escape=true]        Specify if you want to "escape" keyboard event
     *
     * @todo        interface
     * @todo        doc
     * @todo        tests
     * @todo        add setting to specify on which elements you want to enable the feature
     *
     * @example 	js
     * import inputAdditionalEvents from '@coffeekraken/sugar/js/feature/inputAdditionalEvents';
     * inputAdditionalEvents();
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function inputAdditionalEvents(settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({ enter: true, escape: true }, settings);
        function handleInputAttributes(e) {
            var field = e.target ? e.target : e;
            if (!field || !field.tagName)
                return;
            switch (field.tagName) {
                case 'INPUT':
                case 'TEXTAREA':
                    fastdom_1.default.mutate(function () {
                        if (e.keyCode) {
                            switch (e.keyCode) {
                                case 13: // enter
                                    if (settings.enter && field.hasAttribute('onenter')) {
                                        eval(field.getAttribute('onenter'));
                                        dispatchEvent_1.default(field, 'enter');
                                    }
                                    break;
                                case 27: // escape
                                    if (settings.escape && field.hasAttribute('onescape')) {
                                        eval(field.getAttribute('onescape'));
                                        dispatchEvent_1.default(field, 'escape');
                                    }
                                    break;
                            }
                        }
                    });
                    break;
            }
        }
        document.addEventListener('change', handleInputAttributes);
        document.addEventListener('keyup', handleInputAttributes);
    }
    exports.default = inputAdditionalEvents;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRBZGRpdGlvbmFsRXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2pzL2ZlYXR1cmUvaW5wdXRBZGRpdGlvbmFsRXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsb0RBQThCO0lBQzlCLHVFQUFtRDtJQUVuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EwQkc7SUFDSCxTQUFTLHFCQUFxQixDQUFDLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDMUMsUUFBUSxjQUNOLEtBQUssRUFBRSxJQUFJLEVBQ1gsTUFBTSxFQUFFLElBQUksSUFDVCxRQUFRLENBQ1osQ0FBQztRQUVGLFNBQVMscUJBQXFCLENBQUMsQ0FBQztZQUM5QixJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO2dCQUFFLE9BQU87WUFDckMsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUNyQixLQUFLLE9BQU8sQ0FBQztnQkFDYixLQUFLLFVBQVU7b0JBQ2IsaUJBQU8sQ0FBQyxNQUFNLENBQUM7d0JBQ2IsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFOzRCQUNiLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRTtnQ0FDakIsS0FBSyxFQUFFLEVBQUUsUUFBUTtvQ0FDZixJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRTt3Q0FDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3Q0FDcEMsdUJBQWUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7cUNBQ2pDO29DQUNELE1BQU07Z0NBQ1IsS0FBSyxFQUFFLEVBQUUsU0FBUztvQ0FDaEIsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUU7d0NBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0NBQ3JDLHVCQUFlLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO3FDQUNsQztvQ0FDRCxNQUFNOzZCQUNUO3lCQUNGO29CQUNILENBQUMsQ0FBQyxDQUFDO29CQUNILE1BQU07YUFDVDtRQUNILENBQUM7UUFFRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDM0QsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFDRCxrQkFBZSxxQkFBcUIsQ0FBQyJ9