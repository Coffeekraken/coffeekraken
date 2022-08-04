"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_component_utils_1 = __importDefault(require("@coffeekraken/s-component-utils"));
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const querySelectorUp_1 = __importDefault(require("@coffeekraken/sugar/js/dom/query/querySelectorUp"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
// @ts-ignore
const s_validator_1 = __importDefault(require("@coffeekraken/s-validator"));
const querySelectorLive_1 = __importDefault(require("@coffeekraken/sugar/js/dom/query/querySelectorLive"));
const autoCast_1 = __importDefault(require("@coffeekraken/sugar/shared/string/autoCast"));
const camelCase_1 = __importDefault(require("@coffeekraken/sugar/shared/string/camelCase"));
const s_form_validate_css_1 = __importDefault(require("../../../../src/css/s-form-validate.css")); // relative to /dist/pkg/esm/js
const SFormValidateFeatureInterface_1 = __importDefault(require("./interface/SFormValidateFeatureInterface"));
class SFormValidateFeature extends s_feature_1.default {
    // @ts-ignore
    constructor(name, node, settings) {
        var _a, _b, _c, _d;
        Object.keys((_b = (_a = s_component_utils_1.default.getDefaultProps(name)) === null || _a === void 0 ? void 0 : _a.customValidations) !== null && _b !== void 0 ? _b : {}).forEach((validationName) => {
            if (SFormValidateFeatureInterface_1.default.definition[validationName])
                return;
            SFormValidateFeatureInterface_1.default.definition[validationName] = {
                type: 'String|Boolean',
            };
        });
        super(name, node, (0, deepMerge_1.default)({
            name: 's-form-validate',
            interface: SFormValidateFeatureInterface_1.default,
            style: s_form_validate_css_1.default,
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
        this._validator = new s_validator_1.default();
        // try to get form
        this._$form = (0, querySelectorUp_1.default)(this.node, 'form');
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
                        this.props[(0, camelCase_1.default)(attr.name)] = (0, autoCast_1.default)(attr.value);
                        this._nodeByValidator[(0, camelCase_1.default)(attr.name)] = $node;
                    }
                }
            });
        }
    }
    mount() {
        // get the field. Used if the actual field is inside the node
        // marked as s-form-validate
        (0, querySelectorLive_1.default)('input,textarea,select', ($field) => {
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
        for (let [validator, definition] of Object.entries(s_validator_1.default.getValidatorsDefinition())) {
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
            for (let [validator, definition] of Object.entries(s_validator_1.default.getValidatorsDefinition())) {
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
exports.default = SFormValidateFeature;
function define(props = {}, name = 's-form-validate') {
    s_feature_1.default.defineFeature(name, SFormValidateFeature, props);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdGQUFnRTtBQUNoRSx3RUFBaUQ7QUFDakQsdUdBQWlGO0FBQ2pGLDRGQUFzRTtBQUN0RSxhQUFhO0FBQ2IsNEVBQXFEO0FBQ3JELDJHQUFxRjtBQUNyRiwwRkFBb0U7QUFDcEUsNEZBQXNFO0FBQ3RFLGtHQUE0RCxDQUFDLCtCQUErQjtBQUM1Riw4R0FBd0Y7QUFpTHhGLE1BQXFCLG9CQUFxQixTQUFRLG1CQUFVO0lBWXhELGFBQWE7SUFDYixZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7O1FBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQ1AsTUFBQSxNQUFBLDJCQUFpQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsMENBQUUsaUJBQWlCLG1DQUFJLEVBQUUsQ0FDbkUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUN6QixJQUFJLHVDQUErQixDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7Z0JBQzFELE9BQU87WUFDWCx1Q0FBK0IsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUc7Z0JBQ3pELElBQUksRUFBRSxnQkFBZ0I7YUFDekIsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osSUFBQSxtQkFBVyxFQUNQO1lBQ0ksSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixTQUFTLEVBQUUsdUNBQStCO1lBQzFDLEtBQUssRUFBRSw2QkFBSztTQUNmLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUE5QkUscUJBQWdCLEdBQUcsRUFBRSxDQUFDO1FBSTlCLG1EQUFtRDtRQUMzQyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBaU96QixrQkFBYSxHQUFHLEtBQUssQ0FBQztR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