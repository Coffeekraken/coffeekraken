import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SFormValidateFeatureInterface from './interface/SFormValidateFeatureInterface';
import __joi from 'joi';
import __tlds from '@sideway/address/lib/tlds';
import __autoCast from '@coffeekraken/sugar/shared/string/autoCast';
import __wrap from '@coffeekraken/sugar/js/dom/manipulate/wrap';
import __insertAfter from '@coffeekraken/sugar/js/dom/manipulate/insertAfter';

// @ts-ignore
import __css from '../../../../src/css/s-form-validate.css'; // relative to /dist/pkg/esm/js

import __SComponentUtils from '@coffeekraken/s-component-utils';

/**
 * @name            SFormValidateFeature
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SFormValidateFeatureInterface.js
 * @menu            Styleguide / Features               /styleguide/feature/s-form-validate-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to validate your forms by using under the hood the **AMAZING joi library**.
 * For now, you can validate data types like `string`, `number` or  `boolean` with options like `email`,
 * `date`, `greater`, `less`, `min`, `max`, and a lot more.
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @install         bash
 * npm i @coffeekraken/s-form-validate-feature
 *
 * @install        js
 * import { define } from '@coffeekraken/s-form-validate-feature';
 * define();
 *
 * @example         html            Email field
 * <label class="s-label:responsive" s-form-validate email>
 *    Email address
 *    <input type="text" class="s-input s-width:60" placeholder="olivier.bossel@coffeekraken.io" />
 * </label>
 *
 * @example         html            Domain field
 * <label class="s-label:responsive" s-form-validate domain>
 *    Domain name
 *    <input type="text" class="s-input s-width:60" placeholder="coffeekraken.io" />
 * </label>
 *
 * @example         html        Alphanumeric field
 * <label class="s-label:responsive" s-form-validate alphanum>
 *    Alphanumeric
 *    <input type="text" class="s-input s-width:60" placeholder="a-zA-Z0-9" />
 * </label>
 *
 * @example         html       Credit card field
 * <label class="s-label:responsive" s-form-validate credit-card>
 *    Credit card
 *    <input type="text" class="s-input s-width:60" placeholder="340716737808634" />
 * </label>
 *
 * @example         html       Min / Max
 * <label class="s-label:responsive" s-form-validate min="3" max="6">
 *    Min and max
 *    <input type="text" class="s-input s-width:60" placeholder="3 to 6" />
 * </label>
 *
 * @example         html        Select field
 * <label class="s-label:responsive" s-form-validate>
 *    Select
 *    <select class="s-select s-width:60">
 *        <option value="value 1">This is the first option...</option>
 *        <option value="value 2">This is the second...</option>
 *        <option value="value 3">Third...</option>
 *    </select>
 * </label>
 *
 * @example         html        Select min / max
 * <label class="s-label:responsive" s-form-validate min="2" max="2">
 *    Multiple select
 *    <select multiple class="s-select s-width:60">
 *        <option value="value 1">This is the first option...</option>
 *        <option value="value 2">This is the second...</option>
 *        <option value="value 3">Third...</option>
 *    </select>
 * </label>
 *
 * @example         html            ISO date field
 * <label class="s-label:responsive" s-form-validate iso-date>
 *    ISO date
 *    <s-date-picker input button name="my-cool-date" placeholder="2021-09-16" class="s-width:60"></s-date-picker>
 * </label>
 *
 * @example         html            Range min / max
 * <label class="s-label:responsive" s-form-validate min="25" max="75">
 *    Value between 25 and 75
 *    <s-range class="s-width:60" min="0" max="100" tooltip></s-range>
 * </label>
 *
 * @example        html            Checkboxes min / max
 * <label class="s-label" s-form-validate min="2" max="2">
 *      Choose at least 2 items
 *      <div class="">
 *         <label class="s-label s-mb:20">
 *            Item 1
 *            <input type="checkbox" class="s-checkbox" value="value 1" />
 *         </label>
 *         <label class="s-label s-mb:20">
 *            Item 1
 *            <input type="checkbox" class="s-checkbox" value="value 2" />
 *         </label>
 *         <label class="s-label s-mb:20">
 *            Item 1
 *            <input type="checkbox" class="s-checkbox" value="value 3" />
 *         </label>
 *      </div>
 * </label>
 *
 * @example             html           Custom validation
 * <label class="s-label:responsive" s-form-validate coffeekraken>
 *    Try taping "coffeekraken"
 *    <input type="text" class="s-input s-width:60" placeholder="coffeekraken" />
 * </label>
 *
 * @example            html           Submit / Reset
 * <form>
 * <label class="s-label:responsive" s-form-validate min="3" max="6">
 *    Min and max
 *    <input type="text" class="s-input s-width:60" placeholder="3 to 6" />
 * </label>
 * <label class="s-label:responsive s-mbs:30" s-form-validate min="2" max="2">
 *    Multiple select
 *    <select multiple class="s-select s-width:60">
 *        <option value="value 1">This is the first option...</option>
 *        <option value="value 2">This is the second...</option>
 *        <option value="value 3">Third...</option>
 *    </select>
 * </label>
 * <div class="s-text:end s-mbs:30">
 *      <input type="reset" class="s-btn" value="Reset!" />
 *      <input type="submit" class="s-btn s-color:complementary s-ml:20" value="Submit!" />
 * </div>
 * </form>
 *
 * @see         https://github.com/sideway/joi
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISFormValidateFeatureProps {
    alphanum: boolean;
    base64: boolean;
    case: 'upper' | 'lower';
    creditCard: boolean;
    dataUri: boolean;
    domain: boolean | string;
    [key: string]: any;
}

export default class SFormValidateFeature extends __SFeature {
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
    private _validationType: 'string' | 'date' | 'number' | 'boolean' =
        'string';

    /**
     * @name        _schema
     * @type        'string' | 'date' | 'number' | 'boolean'
     * @default      'string'
     *
     * Store the joi validation schema
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    private _schema;

    private _$field;

    // the field become dirty when it is in error state
    private _isDirty = false;

    // @ts-ignore
    constructor(name: string, node: HTMLElement, settings: any) {
        Object.keys(
            __SComponentUtils.getDefaultProps(name)?.customValidations,
        ).forEach((validationName) => {
            if (__SFormValidateFeatureInterface.definition[validationName])
                return;
            __SFormValidateFeatureInterface.definition[validationName] = {
                type: 'String|Boolean',
            };
        });

        super(
            name,
            node,
            __deepMerge(
                {
                    componentUtils: {
                        interface: __SFormValidateFeatureInterface,
                        style: __css,
                    },
                },
                settings ?? {},
            ),
        );

        // expose the api on node
        this.componentUtils.exposeApi(
            {
                validate: this.validate,
            },
            this,
        );

        this.node.classList.add('s-form-validate');
    }

    mount() {
        // get the field. Used if the actual field is inside the node
        // marked as s-form-validate
        this._$field = this.node;
        const $insideField = this.node.querySelector('input,textarea,select');
        if ($insideField) this._$field = $insideField;

        // set the validation type depending on input type etc...
        if (this.props.type) {
            if (this.props.type === 'text') this._validationType = 'string';
            else this._validationType = this.props.type;
        }

        // listen for events
        this.props.on.forEach((on) => {
            if (on === 'enter') {
                this._$field.addEventListener('keyup', (e) => {
                    if (e.keyCode !== 13) return;
                    this.validate(e);
                });
            } else if (on === 'reset') {
                this._$field.form?.addEventListener(on, (e) => {
                    setTimeout(() => {
                        this.validate(e);
                    });
                });
            } else if (on === 'submit') {
                this._$field.form?.addEventListener(on, (e) => {
                    this.validate(e);
                });
            } else if (on === 'keyup') {
                this.node.addEventListener(on, (e) => {
                    if (!this._isDirty) return;
                    this.validate(e);
                });
            } else {
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
            if (isCustom) return;
            // custom validations
            if (this.props.customValidations[prop]) {
                isCustom = true;
                schema = schema.custom(
                    this.props.customValidations[prop],
                    prop,
                );
            } else {
                const propValue = this.props[prop];
                if (propValue === true && typeof schema[prop] === 'function') {
                    let options = {};
                    if (prop === 'email' || prop === 'domain') {
                        options = {
                            tlds: false,
                        };
                    }
                    schema = schema[prop](options);
                } else if (typeof schema[prop] === 'function') {
                    schema = schema[prop](__autoCast(propValue));
                }
            }
        });
        this._schema = schema;
    }

    _isValidating = false;
    validate(event?) {
        // stop form send action
        if (
            event?.currentTarget?.tagName.toLowerCase() === 'form' &&
            event.type !== 'reset'
        ) {
            event.preventDefault();
        }

        if (this._isValidating) return;
        this._isValidating = true;
        setTimeout(() => {
            this._isValidating = false;
        });

        let resultObj;

        if (this._$field.type === 'checkbox') {
            resultObj = this._validateCheckbox();
        } else if (this._$field.type === 'range') {
            resultObj = this._validateRange();
        } else if (this._$field.tagName.toLowerCase() === 'select') {
            resultObj = this._validateSelect();
        } else {
            resultObj = this._schema.validate(
                (<HTMLInputElement>this._$field).value,
                __deepMerge(
                    {
                        errors: {
                            label: false,
                            language: this.props.language,
                        },
                    },
                    this.props.joiOptions,
                ),
            );
        }

        if (event.type === 'reset') {
            resultObj = {};
        }

        // apply result
        this._applyResult(resultObj, event);
    }

    _validateCheckbox() {
        const checkboxesValues = Array.from(
            this.node.querySelectorAll('input[type="checkbox"]:checked'),
        ).map(($item) => (<HTMLInputElement>$item).value);
        let schema = __joi.array();
        if (this.props.min) {
            schema = schema.min(this.props.min);
        }
        if (this.props.max) {
            schema = schema.max(this.props.max);
        }
        return schema.validate(
            checkboxesValues,
            __deepMerge(
                {
                    errors: {
                        label: false,
                        language: this.props.language,
                    },
                },
                this.props.joiOptions,
            ),
        );
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
        return schema.validate(
            value,
            __deepMerge(
                {
                    errors: {
                        label: false,
                        language: this.props.language,
                    },
                },
                this.props.joiOptions,
            ),
        );
    }

    _validateSelect() {
        // min max
        const selectedItems = Array.from(
            this._$field.querySelectorAll('option'),
        )
            .filter(($item) => (<HTMLOptionElement>$item).selected)
            .map(($item) => (<HTMLOptionElement>$item).value);

        let schema = __joi.array();

        if (this.props.min) {
            schema = schema.min(this.props.min);
        }
        if (this.props.max) {
            schema = schema.max(this.props.max);
        }

        return schema.validate(
            selectedItems,
            __deepMerge(
                {
                    errors: {
                        label: false,
                        language: this.props.language,
                    },
                },
                this.props.joiOptions,
            ),
        );
    }

    _$error;
    _applyResult(res, event) {
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
                if (
                    !this._$error ||
                    !this._$error.hasAttribute('s-form-validate-error')
                ) {
                    this._$error = document.createElement('p');
                    this._$error.setAttribute('s-form-validate-error', 'true');
                    this._$error.classList.add('s-form-validate-error-message');
                    // @ts-ignore
                    this.node.parentNode.insertBefore(
                        this._$error,
                        this.node.nextSibling,
                    );
                }
                this._$error.innerHTML = res.error.message;
            }
        } else if (!res.error) {
            // reset dirty state
            this._isDirty = false;
            // reset the field state
            if (event.type !== 'reset') {
                this.node.classList.add(...this.props.validClass.split(' '));
            } else {
                this.node.classList.remove(...this.props.validClass.split(' '));
            }
            this.node.classList.remove(...this.props.errorClass.split(' '));

            // unwrap the field
            if (this._$error?.hasAttribute('s-form-validate-error')) {
                this._$error?.remove();
            }
        }
    }
}

export function define(
    props: Partial<ISFormValidateFeatureProps> = {},
    name = 's-form-validate',
) {
    __SFeature.defineFeature(name, SFormValidateFeature, props);
}
