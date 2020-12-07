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
//# sourceMappingURL=inputAdditionalAttributes.js.map