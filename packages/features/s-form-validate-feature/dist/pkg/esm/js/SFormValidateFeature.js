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
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
// @ts-ignore
import __SValidator from '@coffeekraken/s-validator';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import __autoCast from '@coffeekraken/sugar/shared/string/autoCast';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
import __css from '../../../../src/css/s-form-validate.css'; // relative to /dist/pkg/esm/js
import __SFormValidateFeatureInterface from './interface/SFormValidateFeatureInterface';
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
        this.componentUtils.exposeApi({
            validate: this.validate,
        }, this);
        // search and init "nodes"
        if (this.props.nodes) {
            this._$nodes = this.node.querySelectorAll(this.props.nodes);
            this._$nodes.forEach(($node) => {
                for (let i = 0; i < $node.attributes.length; i++) {
                    const attr = $node.attributes[i];
                    if (attr.name in this.props) {
                        this.props[__camelCase(attr.name)] = __autoCast(attr.value);
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
        });
        // set the validation type depending on input type etc...
        if (this.props.type) {
            if (this.props.type === 'text')
                this._validationType = 'string';
            else
                this._validationType = this.props.type;
        }
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
    validate(event) {
        var _a;
        if (!this._$field) {
            throw new Error(`No $field has been found to be validated...`);
        }
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
        // grab the value from the field (select, checkbox, etc...)
        const value = this._getFieldValue();
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
                this.componentUtils.dispatchEvent('error', {
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
                this.componentUtils.dispatchEvent('valid', {
                    detail: res,
                });
            }
        });
    }
}
export function define(props = {}, name = 's-form-validate') {
    __SFeature.defineFeature(name, SFormValidateFeature, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsYUFBYTtBQUNiLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sS0FBSyxNQUFNLHlDQUF5QyxDQUFDLENBQUMsK0JBQStCO0FBQzVGLE9BQU8sK0JBQStCLE1BQU0sMkNBQTJDLENBQUM7QUFpTHhGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sb0JBQXFCLFNBQVEsVUFBVTtJQVl4RCxhQUFhO0lBQ2IsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhOztRQUN0RCxNQUFNLENBQUMsSUFBSSxDQUNQLE1BQUEsTUFBQSxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLDBDQUFFLGlCQUFpQixtQ0FBSSxFQUFFLENBQ25FLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDekIsSUFBSSwrQkFBK0IsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDO2dCQUMxRCxPQUFPO1lBQ1gsK0JBQStCLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHO2dCQUN6RCxJQUFJLEVBQUUsZ0JBQWdCO2FBQ3pCLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLFdBQVcs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