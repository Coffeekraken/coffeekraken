import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SFormValidateFeatureInterface from './interface/SFormValidateFeatureInterface';
import __joi from 'joi';
import __tlds from '@sideway/address/lib/tlds';
import __autoCast from '@coffeekraken/sugar/shared/string/autoCast';
import __wrap from '@coffeekraken/sugar/js/dom/manipulate/wrap';
import __insertAfter from '@coffeekraken/sugar/js/dom/manipulate/insertAfter';

// @ts-ignore
import __css from '../css/s-form-validate.css';

import __SComponentUtils from '@coffeekraken/s-component-utils';

/**
 * @name            SFormValidate
 * @namespace       js
 * @type            Feature
 * @menu            Styleguide / Forms               /styleguide/forms/s-form-validate
 * @platform        js
 * @platform        ts
 * @status          beta
 *
 * This feature allows you to validate your forms by using under the hood the AMAZING joi library.
 * For now, you can validate data types like "string", "number" or  "boolean" with options like "email",
 * "date", "greater", "less", "min", "max", and a lot more.
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html
 * <form action="." method="get">
 * <h3 class="s-color:accent s-font:30 s-mbe:30">Simple fields</h3>
 * <label class="s-label s-mbe:30" s-form-validate email>
 *    <input type="text" class="s-input s-width\:60" placeholder="olivier.bossel@coffeekraken.io" />
 *    Email address
 * </label>
 * <label class="s-label s-mbe:30" s-form-validate domain>
 *    <input type="text" class="s-input s-width\:60" placeholder="coffeekraken.io" />
 *    Domain name
 * </label>
 * <label class="s-label s-mbe:30" s-form-validate alphanum>
 *    <input type="text" class="s-input s-width\:60" placeholder="a-zA-Z0-9" />
 *    Alphanumeric
 * </label>
 * <label class="s-label s-mbe:30" s-form-validate credit-card>
 *    <input type="text" class="s-input s-width\:60" placeholder="340716737808634" />
 *    Credit card
 * </label>
 * <label class="s-label s-mbe:30" s-form-validate min="3" max="6">
 *    <input type="text" class="s-input s-width\:60" placeholder="3 to 6" />
 *    Min and max
 * </label>
 *
 * <h3 class="s-color:accent s-font:30 s-mbe:30">Complexe fields</h3>
 * <label class="s-label s-mbe:30" s-form-validate>
 *    <select class="s-select s-width\:60">
 *        <option value="value 1">This is the first option...</option>
 *        <option value="value 2">This is the second...</option>
 *        <option value="value 3">Third...</option>
 *    </select>
 *    Select
 * </label>
 * <label class="s-label s-mbe:30" s-form-validate min="2" max="2">
 *    <select multiple class="s-select s-width\:60">
 *        <option value="value 1">This is the first option...</option>
 *        <option value="value 2">This is the second...</option>
 *        <option value="value 3">Third...</option>
 *    </select>
 *    Multiple select
 * </label>
 * <label class="s-label s-mbe:30" s-form-validate date>
 *    <s-date-picker name="my-cool-date" placeholder="2021-09-16" class="s-width\:60"></s-date-picker>
 *    Date
 * </label>
 * <label class="s-label s-mbe:30" s-form-validate min="25" max="75">
 *    <s-range class="s-width\:60" min="0" max="100" tooltip></s-range>
 *    Value between 25 and 75
 * </label>
 * <label class="s-label s-mbe:30" s-form-validate min="2" max="2">
 *      <div class="s-flex s-width\:60">
 *         <label class="s-label s-mb\:20">
 *            <input type="checkbox" class="s-checkbox" value="value 1" />
 *            <span>Item 1</span>
 *         </label>
 *         <label class="s-label s-mb\:20">
 *            <input type="checkbox" class="s-checkbox" value="value 2" />
 *            <span>Item 1</span>
 *         </label>
 *         <label class="s-label s-mb\:20">
 *            <input type="checkbox" class="s-checkbox" value="value 3" />
 *            <span>Item 1</span>
 *         </label>
 *      </div>
 *      Choose at least 2 items
 * </label>
 *
 * <h3 class="s-color:accent s-font:30 s-mbe:30">Custom validation</h3>
 * <label class="s-label s-mbe:30" s-form-validate coffeekraken>
 *    <input type="text" class="s-input s-width\:60" placeholder="coffeekraken" />
 *    Try taping "coffeekraken"
 * </label>
 *
 * <div class="s-text\:end">
 *      <input type="reset" class="s-btn" value="Reset!" />
 *      <input type="submit" class="s-btn s-ui\:complementary s-ml\:20" value="Submit!" />
 * </div>
 *
 * </form>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
    private _validationType: 'string' | 'date' | 'number' | 'boolean' = 'string';

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

    // @ts-ignore
    constructor(name: string, node: HTMLElement, settings: any) {
        Object.keys(__SComponentUtils.getDefaultProps(name)?.customValidations).forEach((validationName) => {
            if (__SFormValidateFeatureInterface.definition[validationName]) return;
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
            } else {
                this.node.addEventListener(on, (e) => {
                    this.validate(e);
                });
            }
        });

        // preparing the joi schema
        let schema = __joi[this._validationType]();
        let isCustom = false;
        Object.keys(this.props).forEach((prop) => {
            if (isCustom) return;
            // custom validations
            if (this.props.customValidations[prop]) {
                isCustom = true;
                schema = schema.custom(this.props.customValidations[prop], prop);
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
        if (event?.currentTarget?.tagName.toLowerCase() === 'form' && event.type !== 'reset') {
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
        const checkboxesValues = Array.from(this.node.querySelectorAll('input[type="checkbox"]:checked')).map(
            ($item) => (<HTMLInputElement>$item).value,
        );
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
        const selectedItems = Array.from(this._$field.querySelectorAll('option'))
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

    _applyResult(res, event) {
        // @ts-ignore
        if (res.error) {
            // @ts-ignore
            const marginBottom = getComputedStyle(this.node).marginBottom;
            // wrap item into an error container
            let $container = (<HTMLElement>this.node.parentNode)?.hasAttribute?.('s-form-validate-error-container')
                ? this.node.parentNode
                : undefined;

            if (!$container && this.props.wrap) {
                $container = document.createElement('div');
                // @ts-ignore
                $container.setAttribute('s-form-validate-error-container', 'true');
                // @ts-ignore
                $container.classList.remove(...this.props.validClass.split(' '));
                // @ts-ignore
                $container.classList.add(...this.props.errorClass.split(' '));
                // @ts-ignore
                __wrap(this.node, $container);
            }

            // add error class on the node itself
            if (!this.props.wrap) {
                this.node.classList.add(...this.props.errorClass.split(' '));
            }

            // remove valid class on the node itself
            this.node.classList.remove(...this.props.validClass.split(' '));

            // display error if needed
            if (this.props.displayError) {
                const alreadyExists = !!$container?.querySelector('p[s-form-validate-error-message]');

                const $error = alreadyExists
                    ? <HTMLElement>$container?.querySelector('p[s-form-validate-error-message]')
                    : document.createElement('p');

                if (!alreadyExists) {
                    $error.setAttribute('s-form-validate-error-message', 'true');
                    $error.setAttribute('class', this.props.errorMessageClass);
                    $error.innerHTML = res.error.message;
                    $error.style.marginBottom = marginBottom;
                    if ($container) {
                        $container.appendChild($error);
                    } else {
                        __insertAfter($error, this.node);
                    }
                } else {
                    $error.innerHTML = res.error.message;
                }
            }
        } else if (!res.error) {
            // reset the field state
            if (event.type !== 'reset') {
                this.node.classList.add(...this.props.validClass.split(' '));
            } else {
                this.node.classList.remove(...this.props.validClass.split(' '));
            }

            // unwrap the field
            if (this.props.wrap) {
                const $container = <HTMLElement>this.node.parentNode;
                if (!$container.hasAttribute('s-form-validate-error-container')) return;
                __insertAfter(this.node, $container);
                $container?.remove();
            } else {
                const $errorMessage = <HTMLElement>this.node.nextSibling;
                if ($errorMessage?.hasAttribute('s-form-validate-error-message')) {
                    $errorMessage?.remove();
                }
            }
        }
    }
}

export function register(props: Partial<ISFormValidateFeatureProps> = {}, name = 's-form-validate') {
    __SFeature.registerFeature(name, SFormValidateFeature, props);
}
