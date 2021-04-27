// @ts-nocheck
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
    const fastdom_1 = __importDefault(require("fastdom"));
    const dispatchEvent_1 = __importDefault(require("../dom/dispatchEvent"));
    /**
     * @name 		handleInputAttributes
     * @namespace            js.feature
     * @type      Feature
     * @stable
     *
     * Add some events on some DOM Elements. Here's the list:
     * - enter (onenter): Triggered when user tap ```enter``` on his keyboard from a **input*** or **textarea** element
     * - escape (onescape): Triggered when user tap ```escape``` on his keyboard from a **input*** or **textarea** element
     *
     * @param       {Object}        [settings={}]         An object of settings to configure your feature
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
    function inputAdditionalEvents(settings = {}) {
        settings = Object.assign({ enter: true, escape: true }, settings);
        function handleInputAttributes(e) {
            const field = e.target ? e.target : e;
            if (!field || !field.tagName)
                return;
            switch (field.tagName) {
                case 'INPUT':
                case 'TEXTAREA':
                    fastdom_1.default.mutate(() => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRBZGRpdGlvbmFsRXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5wdXRBZGRpdGlvbmFsRXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHNEQUE4QjtJQUM5Qix5RUFBbUQ7SUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMEJHO0lBQ0gsU0FBUyxxQkFBcUIsQ0FBQyxRQUFRLEdBQUcsRUFBRTtRQUMxQyxRQUFRLG1CQUNOLEtBQUssRUFBRSxJQUFJLEVBQ1gsTUFBTSxFQUFFLElBQUksSUFDVCxRQUFRLENBQ1osQ0FBQztRQUVGLFNBQVMscUJBQXFCLENBQUMsQ0FBQztZQUM5QixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO2dCQUFFLE9BQU87WUFDckMsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUNyQixLQUFLLE9BQU8sQ0FBQztnQkFDYixLQUFLLFVBQVU7b0JBQ2IsaUJBQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO3dCQUNsQixJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7NEJBQ2IsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFO2dDQUNqQixLQUFLLEVBQUUsRUFBRSxRQUFRO29DQUNmLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFO3dDQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dDQUNwQyx1QkFBZSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztxQ0FDakM7b0NBQ0QsTUFBTTtnQ0FDUixLQUFLLEVBQUUsRUFBRSxTQUFTO29DQUNoQixJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRTt3Q0FDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzt3Q0FDckMsdUJBQWUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7cUNBQ2xDO29DQUNELE1BQU07NkJBQ1Q7eUJBQ0Y7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTTthQUNUO1FBQ0gsQ0FBQztRQUVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUMzRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUNELGtCQUFlLHFCQUFxQixDQUFDIn0=