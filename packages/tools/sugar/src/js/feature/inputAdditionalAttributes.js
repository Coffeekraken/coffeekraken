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
    var fastdom_1 = __importDefault(require("fastdom"));
    var querySelectorLive_1 = __importDefault(require("../dom/querySelectorLive"));
    /**
     * @name 		handleInputAttributes
     * @namespace           sugar.js.feature
     * @type      Feature
     * @stable
     *
     * Add some attributes on inputs, textarea and select to help with styling purposes and more.
     * Here's the attributes added:
     * - `has-value`: When the input has a value in it
     * - `empty`: When the input is has no value in it
     * - `dirty`: When the input has been touched
     *
     * @param       {Object}        [settings={}]         An object of settings to configure your feature
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
    return inputAdditionalAttributes;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRBZGRpdGlvbmFsQXR0cmlidXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlucHV0QWRkaXRpb25hbEF0dHJpYnV0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLG9EQUE4QjtJQUM5QiwrRUFBMkQ7SUFFM0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBQ0gsU0FBUyx5QkFBeUIsQ0FBQyxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQzlDLFFBQVEsY0FDTixLQUFLLEVBQUUsSUFBSSxFQUNYLFFBQVEsRUFBRSxJQUFJLEVBQ2QsS0FBSyxFQUFFLElBQUksSUFDUixRQUFRLENBQ1osQ0FBQztRQUVGLFNBQVMscUJBQXFCLENBQUMsTUFBTTtZQUNuQyxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDckQsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO2dCQUFFLE9BQU87WUFDckMsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUNyQixLQUFLLE9BQU8sQ0FBQztnQkFDYixLQUFLLFVBQVUsQ0FBQztnQkFDaEIsS0FBSyxRQUFRO29CQUNYLGlCQUFPLENBQUMsTUFBTSxDQUFDO3dCQUNiLElBQ0UsS0FBSyxDQUFDLElBQUk7NEJBQ1YsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFVBQVUsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQzs0QkFFckQsT0FBTzt3QkFDVCxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUFFOzRCQUNuRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0NBQ3JCLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDOzZCQUN2Qzs0QkFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7Z0NBQ2xCLEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7NkJBQ2hDO3lCQUNGOzZCQUFNLElBQ0wsS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTOzRCQUN6QixLQUFLLENBQUMsS0FBSyxLQUFLLElBQUk7NEJBQ3BCLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUNsQjs0QkFDQSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0NBQ3JCLEtBQUssQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7NkJBQ3BDOzRCQUNELEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQy9CLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtnQ0FDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUU7b0NBQ2hDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2lDQUNuQzs2QkFDRjt5QkFDRjt3QkFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7NEJBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0NBQy9DLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDOzZCQUNuQzt5QkFDRjtvQkFDSCxDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNO2FBQ1Q7UUFDSCxDQUFDO1FBRUQsU0FBUyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ2hDLDZCQUE2QjtZQUM3QixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFDLEtBQUs7Z0JBQ3ZDLDZCQUE2QjtnQkFDN0IscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdCLDJCQUEyQjtnQkFDM0IsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVE7b0JBQUUsT0FBTztnQkFDaEMseUJBQXlCO2dCQUN6QixpQkFBTyxDQUFDLE1BQU0sQ0FBQztvQkFDYixLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNqQyxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELDJCQUFtQixDQUFDLDhDQUE4QyxFQUFFLFVBQUMsR0FBRztZQUN0RSxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUMzRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDMUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQzVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBQ0QsT0FBUyx5QkFBeUIsQ0FBQyJ9