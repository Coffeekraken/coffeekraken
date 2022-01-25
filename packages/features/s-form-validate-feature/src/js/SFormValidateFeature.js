import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SFormValidateFeatureInterface from './interface/SFormValidateFeatureInterface';
import __joi from 'joi';
import __autoCast from '@coffeekraken/sugar/shared/string/autoCast';
// @ts-ignore
import __css from '../css/s-form-validate.css';
import __SComponentUtils from '@coffeekraken/s-component-utils';
export default class SFormValidateFeature extends __SFeature {
    // @ts-ignore
    constructor(name, node, settings) {
        var _a;
        Object.keys((_a = __SComponentUtils.getDefaultProps(name)) === null || _a === void 0 ? void 0 : _a.customValidations).forEach((validationName) => {
            if (__SFormValidateFeatureInterface.definition[validationName])
                return;
            __SFormValidateFeatureInterface.definition[validationName] = {
                type: 'String|Boolean',
            };
        });
        super(name, node, __deepMerge({
            componentUtils: {
                interface: __SFormValidateFeatureInterface,
                style: __css,
            },
        }, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name        _validationType
         * @type        'string' | 'date' | 'number' | 'boolean'
         * @default      'string'
         *
         * Store the type of validation to do using joi
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this._validationType = 'string';
        // the field become dirty when it is in error state
        this._isDirty = false;
        this._isValidating = false;
        // expose the api on node
        this.componentUtils.exposeApi({
            validate: this.validate,
        }, this);
        this.node.classList.add('s-form-validate');
    }
    mount() {
        // get the field. Used if the actual field is inside the node
        // marked as s-form-validate
        this._$field = this.node;
        const $insideField = this.node.querySelector('input,textarea,select');
        if ($insideField)
            this._$field = $insideField;
        // set the validation type depending on input type etc...
        if (this.props.type) {
            if (this.props.type === 'text')
                this._validationType = 'string';
            else
                this._validationType = this.props.type;
        }
        // listen for events
        this.props.on.forEach((on) => {
            var _a, _b;
            if (on === 'enter') {
                this._$field.addEventListener('keyup', (e) => {
                    if (e.keyCode !== 13)
                        return;
                    this.validate(e);
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
        console.log(this.props);
        // preparing the joi schema
        let schema = __joi[this._validationType]();
        let isCustom = false;
        Object.keys(this.props).forEach((prop) => {
            if (isCustom)
                return;
            // custom validations
            if (this.props.customValidations[prop]) {
                isCustom = true;
                schema = schema.custom(this.props.customValidations[prop], prop);
            }
            else {
                const propValue = this.props[prop];
                if (propValue === true && typeof schema[prop] === 'function') {
                    let options = {};
                    if (prop === 'email' || prop === 'domain') {
                        options = {
                            tlds: false,
                        };
                    }
                    schema = schema[prop](options);
                }
                else if (typeof schema[prop] === 'function') {
                    schema = schema[prop](__autoCast(propValue));
                }
            }
        });
        this._schema = schema;
    }
    validate(event) {
        var _a;
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
        if (this._$field.type === 'checkbox') {
            resultObj = this._validateCheckbox();
        }
        else if (this._$field.type === 'range') {
            resultObj = this._validateRange();
        }
        else if (this._$field.tagName.toLowerCase() === 'select') {
            resultObj = this._validateSelect();
        }
        else {
            resultObj = this._schema.validate(this._$field.value, __deepMerge({
                errors: {
                    label: false,
                    language: this.props.language,
                },
            }, this.props.joiOptions));
        }
        if (event.type === 'reset') {
            resultObj = {};
        }
        // apply result
        this._applyResult(resultObj, event);
    }
    _validateCheckbox() {
        const checkboxesValues = Array.from(this.node.querySelectorAll('input[type="checkbox"]:checked')).map(($item) => $item.value);
        let schema = __joi.array();
        if (this.props.min) {
            schema = schema.min(this.props.min);
        }
        if (this.props.max) {
            schema = schema.max(this.props.max);
        }
        return schema.validate(checkboxesValues, __deepMerge({
            errors: {
                label: false,
                language: this.props.language,
            },
        }, this.props.joiOptions));
    }
    _validateRange() {
        const value = parseFloat(this._$field.value);
        let schema = __joi.number();
        if (this.props.min) {
            schema = schema.min(this.props.min);
        }
        if (this.props.max) {
            schema = schema.max(this.props.max);
        }
        return schema.validate(value, __deepMerge({
            errors: {
                label: false,
                language: this.props.language,
            },
        }, this.props.joiOptions));
    }
    _validateSelect() {
        // min max
        const selectedItems = Array.from(this._$field.querySelectorAll('option'))
            .filter(($item) => $item.selected)
            .map(($item) => $item.value);
        let schema = __joi.array();
        if (this.props.min) {
            schema = schema.min(this.props.min);
        }
        if (this.props.max) {
            schema = schema.max(this.props.max);
        }
        return schema.validate(selectedItems, __deepMerge({
            errors: {
                label: false,
                language: this.props.language,
            },
        }, this.props.joiOptions));
    }
    _applyResult(res, event) {
        var _a, _b;
        // @ts-ignore
        if (res.error) {
            // set the field as dirty
            this._isDirty = true;
            // add error class on the node itself
            this.node.classList.add(...this.props.errorClass.split(' '));
            // remove valid class on the node itself
            this.node.classList.remove(...this.props.validClass.split(' '));
            // display error if needed
            if (this.props.displayError) {
                this._$error = this.node.nextElementSibling;
                if (!this._$error || !this._$error.hasAttribute('s-form-validate-error')) {
                    this._$error = document.createElement('p');
                    this._$error.setAttribute('s-form-validate-error', 'true');
                    this._$error.classList.add('s-form-validate-error-message');
                    // @ts-ignore
                    this.node.parentNode.insertBefore(this._$error, this.node.nextSibling);
                }
                this._$error.innerHTML = res.error.message;
            }
        }
        else if (!res.error) {
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
            if ((_a = this._$error) === null || _a === void 0 ? void 0 : _a.hasAttribute('s-form-validate-error')) {
                (_b = this._$error) === null || _b === void 0 ? void 0 : _b.remove();
            }
        }
    }
}
export function define(props = {}, name = 's-form-validate') {
    __SFeature.defineFeature(name, SFormValidateFeature, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zvcm1WYWxpZGF0ZUZlYXR1cmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRm9ybVZhbGlkYXRlRmVhdHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLCtCQUErQixNQUFNLDJDQUEyQyxDQUFDO0FBQ3hGLE9BQU8sS0FBSyxNQUFNLEtBQUssQ0FBQztBQUV4QixPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUlwRSxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sNEJBQTRCLENBQUM7QUFFL0MsT0FBTyxpQkFBaUIsTUFBTSxpQ0FBaUMsQ0FBQztBQTZJaEUsTUFBTSxDQUFDLE9BQU8sT0FBTyxvQkFBcUIsU0FBUSxVQUFVO0lBK0J4RCxhQUFhO0lBQ2IsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhOztRQUN0RCxNQUFNLENBQUMsSUFBSSxDQUNQLE1BQUEsaUJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQywwQ0FBRSxpQkFBaUIsQ0FDN0QsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUN6QixJQUFJLCtCQUErQixDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7Z0JBQzFELE9BQU87WUFDWCwrQkFBK0IsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUc7Z0JBQ3pELElBQUksRUFBRSxnQkFBZ0I7YUFDekIsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osV0FBVyxDQUNQO1lBQ0ksY0FBYyxFQUFFO2dCQUNaLFNBQVMsRUFBRSwrQkFBK0I7Z0JBQzFDLEtBQUssRUFBRSxLQUFLO2FBQ2Y7U0FDSixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FB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