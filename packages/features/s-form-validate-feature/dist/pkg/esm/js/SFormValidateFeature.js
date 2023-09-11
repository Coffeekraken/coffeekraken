var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __SFeature from '@coffeekraken/s-feature';
import { __querySelectorUp } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
// @ts-ignore
import __SValidator from '@coffeekraken/s-validator';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import { __camelCase, __parse } from '@coffeekraken/sugar/string';
import __css from '../../../../src/css/s-form-validate.css'; // relative to /dist/pkg/esm/js
import __SFormValidateFeatureInterface from './interface/SFormValidateFeatureInterface.js';
import { __format } from '@coffeekraken/sugar/string';
export default class SFormValidateFeature extends __SFeature {
    // @ts-ignore
    constructor(name, node, settings) {
        var _a, _b, _c, _d;
        Object.keys((_b = (_a = __SComponentUtils.getDefaultProps(name)) === null || _a === void 0 ? void 0 : _a.customValidations) !== null && _b !== void 0 ? _b : {}).forEach((validationName) => {
            if (__SFormValidateFeatureInterface.definition[validationName])
                return;
            __SFormValidateFeatureInterface.definition[validationName] = {
                type: 'String|Boolean',
            };
        });
        super(name, node, __deepMerge({
            name: 's-form-validate',
            interface: __SFormValidateFeatureInterface,
            style: __css,
        }, settings !== null && settings !== void 0 ? settings : {}));
        this._nodeByValidator = {};
        // the field become dirty when it is in error state
        this._isDirty = false;
        this._isValidating = false;
        // some default "handlers"
        if (!((_c = this.props.handlers) === null || _c === void 0 ? void 0 : _c.password)) {
            (_d = this.props.handlers) === null || _d === void 0 ? void 0 : _d.password = this._passwordDefaultHandler;
        }
        // init a new SValidator instance
        this._validator = new __SValidator();
        // try to get form
        this._$form = __querySelectorUp(this.node, 'form');
        if (this._$form) {
            this._$form.addEventListener('submit', (e) => {
                var _a;
                if (!this._$form._submitHandler) {
                    this._$form._submitHandler = true;
                    // collect errors during 1 event loop
                    const collectedErrors = [];
                    const errorHandler = (e) => {
                        collectedErrors.push(e.detail);
                    };
                    this._$form.addEventListener('s-form-validate.error', errorHandler);
                    // prevent form to submit.
                    // we sill submit it if no errors are collected
                    e.preventDefault();
                    // if not a custom event, we stop the propagation and we will
                    // dispatch a "submit" event if their's no errors collected
                    if (e instanceof CustomEvent && !((_a = e.detail) === null || _a === void 0 ? void 0 : _a.internal)) {
                    }
                    else {
                        e.stopPropagation();
                    }
                    setTimeout(() => {
                        // after 1 event loop, remove the error handler and collector
                        delete this._$form._submitHandler;
                        this._$form.removeEventListener('s-form-validate.error', errorHandler);
                        // check if we have collected errors
                        if (!collectedErrors.length) {
                            // no errors, we can submit the form
                            this._$form.submit();
                            // dispatch a "submit" event only if the current submit event
                            // is not a custom event to avoid loops...
                            if (e instanceof CustomEvent) {
                            }
                            else {
                                this._$form.dispatchEvent(new CustomEvent('submit', {
                                    bubbles: true,
                                    cancelable: true,
                                }));
                            }
                        }
                    });
                }
            });
        }
        // expose the api on node
        this.utils.exposeApi({
            validate: this.validate,
        }, this);
        // search and init "nodes"
        if (this.props.nodes) {
            this._$nodes = this.node.querySelectorAll(this.props.nodes);
            this._$nodes.forEach(($node) => {
                for (let i = 0; i < $node.attributes.length; i++) {
                    const attr = $node.attributes[i];
                    if (attr.name in this.props) {
                        this.props[__camelCase(attr.name)] = __parse(attr.value);
                        this._nodeByValidator[__camelCase(attr.name)] = $node;
                    }
                }
            });
        }
    }
    mount() {
        // get the field. Used if the actual field is inside the node
        // marked as s-form-validate
        __querySelectorLive('input,textarea,select', ($field) => {
            this._initField($field);
        }, {
            rootNode: this.node,
            scopes: false,
        });
    }
    _passwordDefaultHandler({ result, $feature }) {
        var _a;
        if (result.valid) {
            $feature.classList.remove(`password-weak`);
            $feature.classList.remove(`password-medium`);
            $feature.classList.remove(`password-strong`);
        }
        else if ((_a = result.metas) === null || _a === void 0 ? void 0 : _a.levels) {
            result.metas.levels.forEach((level) => {
                if (level !== result.metas.validLevels.slice(-1)[0]) {
                    $feature.classList.remove(`password-${level}`);
                }
                else {
                    $feature.classList.add(`password-${level}`);
                }
            });
        }
    }
    _initField($field) {
        this._$field = $field;
        this._$field = this.node;
        const $insideField = this.node.querySelector('input,textarea,select');
        if ($insideField)
            this._$field = $insideField;
        // add the "novalidate" attribute on the field cause we take care
        this._$field.setAttribute('novalidate', 'true');
        // get some validations directly from the $field
        ['required', 'maxlength', 'minlength', 'max', 'min', 'pattern'].forEach((type) => {
            if (this._$field.hasAttribute(type)) {
                if (this.props[type])
                    return;
                this.props[type] = this._$field.getAttribute(type);
                if (type !== 'maxlength' && type !== 'minlength') {
                    this._$field.removeAttribute(type);
                }
            }
        });
        // format the value if needed
        ['keydown', 'change'].forEach((eventType) => {
            this._$field.addEventListener(eventType, (e) => {
                if (this.props.format &&
                    (e.target.type === 'text' ||
                        e.target.tagName.toLowerCase() === 'textarea')) {
                    setTimeout(() => {
                        var _a;
                        const newValue = this.format((_a = e.target.value) !== null && _a !== void 0 ? _a : '', this.props.format);
                        if (newValue !== e.target.value) {
                            this._$field.value = newValue;
                        }
                    });
                }
            });
        });
        // listen for events
        this.props.on.forEach((on) => {
            var _a, _b;
            if (on === 'enter') {
                this._$field.addEventListener('keyup', (e) => {
                    if (e.keyCode !== 13)
                        return;
                    if (this._$form) {
                        this._$form.dispatchEvent(new CustomEvent('submit', {
                            bubbles: false,
                            detail: {
                                internal: true, // internal marker to let the validation be made globally on all the validators
                            },
                        }));
                    }
                    else {
                        this.validate(e);
                    }
                });
            }
            else if (on === 'reset') {
                (_a = this._$field.form) === null || _a === void 0 ? void 0 : _a.addEventListener(on, (e) => {
                    setTimeout(() => {
                        this.validate(e);
                    });
                });
            }
            else if (on === 'submit') {
                (_b = this._$field.form) === null || _b === void 0 ? void 0 : _b.addEventListener(on, (e) => {
                    var _a;
                    // prevent the submit
                    e.preventDefault();
                    // if its an internal event, stop here
                    if (e instanceof CustomEvent && !((_a = e.detail) === null || _a === void 0 ? void 0 : _a.internal))
                        return;
                    // otherwise, stop propagation
                    e.stopPropagation();
                    // validate the form
                    this.validate(e);
                });
            }
            else if (on === 'keyup') {
                this.node.addEventListener(on, (e) => {
                    if (!this._isDirty)
                        return;
                    this.validate(e);
                });
            }
            else {
                this.node.addEventListener(on, (e) => {
                    this.validate(e);
                });
            }
        });
    }
    format(value, format) {
        const newValue = __format(value, format);
        return newValue;
    }
    validate(event) {
        var _a;
        if (!this._$field) {
            throw new Error(`No $field has been found to be validated...`);
        }
        // grab the value from the field (select, checkbox, etc...)
        let value = this._getFieldValue();
        // stop form send action
        if (((_a = event === null || event === void 0 ? void 0 : event.currentTarget) === null || _a === void 0 ? void 0 : _a.tagName.toLowerCase()) === 'form' &&
            event.type !== 'reset') {
            event.preventDefault();
        }
        if (this._isValidating)
            return;
        this._isValidating = true;
        setTimeout(() => {
            this._isValidating = false;
        });
        let resultObj;
        // build the validator rules object
        const validatorRules = {};
        for (let [validator, definition] of Object.entries(__SValidator.getValidatorsDefinition())) {
            if (this.props[validator] !== undefined) {
                validatorRules[validator] = this.props[validator];
            }
        }
        // handle special case when the type is "text" (form input field),
        // and that we don't have any real rule "type" specified
        if (validatorRules.type === 'text') {
            validatorRules.type = 'string';
        }
        // validate our value with the SValidator class
        resultObj = this._validator.validate(value, validatorRules);
        // handle reset event
        if (event.type === 'reset') {
            resultObj = {
                valid: true,
            };
        }
        // apply result
        this._applyResult(resultObj, event);
    }
    _getFieldValue() {
        switch (true) {
            case this._$field.type === 'checkbox':
                return this._getCheckboxValues();
            case this._$field.type === 'range':
                return this._getRangeValue();
            case this._$field.tagName.toLowerCase() === 'select':
                return this._getSelectValues();
            case this._$field.type === 'radio':
                return this._getRadioValue();
            default:
                return this._$field.value;
        }
    }
    _getCheckboxValues() {
        return Array.from(
        // @ts-ignore
        this.node.querySelectorAll('input[type="checkbox"]:checked')).map(($item) => $item.value);
    }
    _getRadioValue() {
        // @ts-ignore
        return this.node.querySelector('input[type="radio"]:checked').value;
    }
    _getRangeValue() {
        return parseFloat(this._$field.value);
    }
    _getSelectValues() {
        return Array.from(this._$field.querySelectorAll('option'))
            .filter(($item) => $item.selected)
            .map(($item) => $item.value);
    }
    _applyResult(res, event) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            for (let [validator, definition] of Object.entries(__SValidator.getValidatorsDefinition())) {
                if (!this.props[validator]) {
                    continue;
                }
                if (this.props.handlers[validator]) {
                    yield this.props.handlers[validator]({
                        result: Object.assign({}, (_b = (_a = res.rules) === null || _a === void 0 ? void 0 : _a[validator]) !== null && _b !== void 0 ? _b : res),
                        props: this.props,
                        $feature: this.node,
                        $form: this._$form,
                        $field: this._$field,
                        $node: (_c = this._nodeByValidator) === null || _c === void 0 ? void 0 : _c[validator],
                    });
                }
            }
            // @ts-ignore
            if (!res.valid) {
                // set the field as dirty
                this._isDirty = true;
                // add error class on the node itself
                this.node.classList.add(...this.props.errorClass.split(' '));
                // remove valid class on the node itself
                this.node.classList.remove(...this.props.validClass.split(' '));
                const firstInvalidValidator = Object.keys(res.rules)[0];
                // handle either normal error message,
                // or the "nodes" messages
                if (!Object.keys(this._nodeByValidator).length) {
                    // grab the first error message from the validator or the attribute
                    const finalMessage = this.props[`${firstInvalidValidator}Message`] ||
                        res.messages[0];
                    // display error if needed
                    if (this.props.displayError) {
                        this._$error =
                            (_d = this.node.querySelector(`[${this.props.errorContainerAttr}]`)) !== null && _d !== void 0 ? _d : this.node.nextElementSibling;
                        if (!this._$error ||
                            !this._$error.hasAttribute('s-form-validate-error')) {
                            this._$error = document.createElement('p');
                            this._$error.setAttribute('s-form-validate-error', 'true');
                            this._$error.classList.add('s-form-validate-error-message');
                            // @ts-ignore
                            this.node.parentNode.insertBefore(this._$error, this.node.nextSibling);
                        }
                        this._$error.innerHTML = finalMessage;
                    }
                }
                else {
                    // handle the "nodes" errors
                    for (let [validator, validationObj] of Object.entries(res.rules)) {
                        if (!this._nodeByValidator[validator])
                            continue;
                        if (validationObj.valid) {
                            this._nodeByValidator[validator].classList.remove(...this.props.errorClass.split(' '));
                            this._nodeByValidator[validator].classList.add(...this.props.validClass.split(' '));
                        }
                        else {
                            this._nodeByValidator[validator].classList.remove(...this.props.validClass.split(' '));
                            this._nodeByValidator[validator].classList.add(...this.props.errorClass.split(' '));
                        }
                    }
                }
                // dispatch en error event
                // @ts-ignore
                this.utils.dispatchEvent('error', {
                    detail: res,
                });
            }
            else {
                // reset dirty state
                this._isDirty = false;
                // reset the field state
                if (event.type !== 'reset') {
                    this.node.classList.add(...this.props.validClass.split(' '));
                }
                else {
                    this.node.classList.remove(...this.props.validClass.split(' '));
                }
                this.node.classList.remove(...this.props.errorClass.split(' '));
                // unwrap the field
                if ((_e = this._$error) === null || _e === void 0 ? void 0 : _e.hasAttribute('s-form-validate-error')) {
                    (_f = this._$error) === null || _f === void 0 ? void 0 : _f.remove();
                }
                // handle the "nodes" errors
                if (Object.keys(this._nodeByValidator).length) {
                    for (let [validator, validationObj] of Object.entries(res.rules)) {
                        if (!this._nodeByValidator[validator])
                            continue;
                        this._nodeByValidator[validator].classList.remove(...this.props.errorClass.split(' '));
                        this._nodeByValidator[validator].classList.add(...this.props.validClass.split(' '));
                    }
                }
                // dispatch en error event
                this.utils.dispatchEvent('valid', {
                    detail: res,
                });
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELGFBQWE7QUFDYixPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRWxFLE9BQU8sS0FBSyxNQUFNLHlDQUF5QyxDQUFDLENBQUMsK0JBQStCO0FBQzVGLE9BQU8sK0JBQStCLE1BQU0sOENBQThDLENBQUM7QUFFM0YsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBcU10RCxNQUFNLENBQUMsT0FBTyxPQUFPLG9CQUFxQixTQUFRLFVBQVU7SUFZeEQsYUFBYTtJQUNiLFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTs7UUFDdEQsTUFBTSxDQUFDLElBQUksQ0FDUCxNQUFBLE1BQUEsaUJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQywwQ0FBRSxpQkFBaUIsbUNBQUksRUFBRSxDQUNuRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQ3pCLElBQUksK0JBQStCLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQztnQkFDMUQsT0FBTztZQUNYLCtCQUErQixDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRztnQkFDekQsSUFBSSxFQUFFLGdCQUFnQjthQUN6QixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7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