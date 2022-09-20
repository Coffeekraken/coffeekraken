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
import __autoCast from '@coffeekraken/sugar/shared/string/autoCast';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
import __css from '../../../../src/css/s-form-validate.css'; // relative to /dist/pkg/esm/js
import __SFormValidateFeatureInterface from './interface/SFormValidateFeatureInterface';
import __define from './define';
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
            scopes: false,
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
        this.componentUtils.fastdom.mutate(() => {
            this._$field.setAttribute('novalidate', 'true');
            // get some validations directly from the $field
            [
                'required',
                'maxlength',
                'minlength',
                'max',
                'min',
                'pattern',
            ].forEach((type) => {
                if (this._$field.hasAttribute(type)) {
                    if (this.props[type])
                        return;
                    this.props[type] = this._$field.getAttribute(type);
                    if (type !== 'maxlength' && type !== 'minlength') {
                        this._$field.removeAttribute(type);
                    }
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
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELGFBQWE7QUFDYixPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEtBQUssTUFBTSx5Q0FBeUMsQ0FBQyxDQUFDLCtCQUErQjtBQUM1RixPQUFPLCtCQUErQixNQUFNLDJDQUEyQyxDQUFDO0FBRXhGLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQWlMaEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxvQkFBcUIsU0FBUSxVQUFVO0lBWXhELGFBQWE7SUFDYixZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7O1FBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQ1AsTUFBQSxNQUFBLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsMENBQUUsaUJBQWlCLG1DQUFJLEVBQUUsQ0FDbkUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUN6QixJQUFJLCtCQUErQixDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7Z0JBQzFELE9BQU87WUFDWCwrQkFBK0IsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUc7Z0JBQ3pELElBQUksRUFBRSxnQkFBZ0I7YUFDekIsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFD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