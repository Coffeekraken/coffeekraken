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
        define(["require", "exports", "fastdom", "../dom/querySelectorLive"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fastdom_1 = __importDefault(require("fastdom"));
    var querySelectorLive_1 = __importDefault(require("../dom/querySelectorLive"));
    /**
     * @name 		handleInputAttributes
     * @namespace            js.feature
     * @type      Feature
     * @stable
     *
     * Add some attributes on inputs, textarea and select to help with styling purposes and more.
     * Here's the attributes added:
     * - `has-value`: When the input has a value in it
     * - `empty`: When the input is has no value in it
     * - `dirty`: When the input has been touched
     *
     * @param       {Object}        [settings={}]         An object of settings to configure your feature
     *
     * @setting       {Boolean}       [empty=true]        Specify if you want to "empty" attribute
     * @setting       {Boolean}       [dirty=true]        Specify if you want to "dirty" attribute
     * @setting       {Boolean}       [hasValue=true]        Specify if you want to "hasValue" attribute
     *
     * @todo        interface
     * @todo        doc
     * @todo        tests
     * @todo        add setting to specify on which elements you want to enable the feature
     *
     * @example 	js
     * import inputAdditionalAttributes from '@coffeekraken/sugar/js/feature/inputAdditionalAttributes';
     * inputAdditionalAttributes();
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function inputAdditionalAttributes(settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({ empty: true, hasValue: true, dirty: true }, settings);
        function handleInputAttributes(eOrElm) {
            var field = eOrElm.target ? eOrElm.target : eOrElm;
            if (!field || !field.tagName)
                return;
            switch (field.tagName) {
                case 'INPUT':
                case 'TEXTAREA':
                case 'SELECT':
                    fastdom_1.default.mutate(function () {
                        if (field.type &&
                            (field.type === 'checkbox' || field.type === 'radio'))
                            return;
                        if (field.value && !field.hasAttribute('has-value')) {
                            if (settings.hasValue) {
                                field.setAttribute('has-value', true);
                            }
                            if (settings.empty) {
                                field.removeAttribute('empty');
                            }
                        }
                        else if (field.value === undefined ||
                            field.value === null ||
                            field.value === '') {
                            if (settings.hasValue) {
                                field.removeAttribute('has-value');
                            }
                            field.removeAttribute('value');
                            if (settings.empty) {
                                if (!field.hasAttribute('empty')) {
                                    field.setAttribute('empty', true);
                                }
                            }
                        }
                        if (settings.dirty) {
                            if (!field.hasAttribute('dirty') && field.value) {
                                field.setAttribute('dirty', true);
                            }
                        }
                    });
                    break;
            }
        }
        function handleFormSubmitOrReset(e) {
            // loop on each form elements
            [].forEach.call(e.target.elements, function (field) {
                // reset the field attributes
                handleInputAttributes(field);
                // stop here if is a submit
                if (e.type === 'submit')
                    return;
                // remove dirty attribute
                fastdom_1.default.mutate(function () {
                    field.removeAttribute('dirty');
                });
            });
        }
        querySelectorLive_1.default('select, textarea, input:not([type="submit"])', function (elm) {
            handleInputAttributes(elm);
        });
        document.addEventListener('change', handleInputAttributes);
        document.addEventListener('keyup', handleInputAttributes);
        document.addEventListener('reset', handleFormSubmitOrReset);
        document.addEventListener('submit', handleFormSubmitOrReset);
    }
    exports.default = inputAdditionalAttributes;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRBZGRpdGlvbmFsQXR0cmlidXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlucHV0QWRkaXRpb25hbEF0dHJpYnV0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFZCxvREFBOEI7SUFDOUIsK0VBQTJEO0lBRTNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTZCRztJQUNILFNBQVMseUJBQXlCLENBQUMsUUFBYTtRQUFiLHlCQUFBLEVBQUEsYUFBYTtRQUM5QyxRQUFRLGNBQ04sS0FBSyxFQUFFLElBQUksRUFDWCxRQUFRLEVBQUUsSUFBSSxFQUNkLEtBQUssRUFBRSxJQUFJLElBQ1IsUUFBUSxDQUNaLENBQUM7UUFFRixTQUFTLHFCQUFxQixDQUFDLE1BQU07WUFDbkMsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ3JELElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztnQkFBRSxPQUFPO1lBQ3JDLFFBQVEsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDckIsS0FBSyxPQUFPLENBQUM7Z0JBQ2IsS0FBSyxVQUFVLENBQUM7Z0JBQ2hCLEtBQUssUUFBUTtvQkFDWCxpQkFBTyxDQUFDLE1BQU0sQ0FBQzt3QkFDYixJQUNFLEtBQUssQ0FBQyxJQUFJOzRCQUNWLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxVQUFVLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUM7NEJBRXJELE9BQU87d0JBQ1QsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsRUFBRTs0QkFDbkQsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO2dDQUNyQixLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQzs2QkFDdkM7NEJBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO2dDQUNsQixLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzZCQUNoQzt5QkFDRjs2QkFBTSxJQUNMLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUzs0QkFDekIsS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJOzRCQUNwQixLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFDbEI7NEJBQ0EsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO2dDQUNyQixLQUFLLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzZCQUNwQzs0QkFDRCxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUMvQixJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7Z0NBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29DQUNoQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztpQ0FDbkM7NkJBQ0Y7eUJBQ0Y7d0JBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFOzRCQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO2dDQUMvQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzs2QkFDbkM7eUJBQ0Y7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTTthQUNUO1FBQ0gsQ0FBQztRQUVELFNBQVMsdUJBQXVCLENBQUMsQ0FBQztZQUNoQyw2QkFBNkI7WUFDN0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBQyxLQUFLO2dCQUN2Qyw2QkFBNkI7Z0JBQzdCLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QiwyQkFBMkI7Z0JBQzNCLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRO29CQUFFLE9BQU87Z0JBQ2hDLHlCQUF5QjtnQkFDekIsaUJBQU8sQ0FBQyxNQUFNLENBQUM7b0JBQ2IsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakMsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCwyQkFBbUIsQ0FBQyw4Q0FBOEMsRUFBRSxVQUFDLEdBQUc7WUFDdEUscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDM0QsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQzFELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztRQUM1RCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLHVCQUF1QixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUNELGtCQUFlLHlCQUF5QixDQUFDIn0=