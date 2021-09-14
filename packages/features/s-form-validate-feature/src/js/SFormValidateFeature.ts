import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SFormValidateFeatureInterface from './interface/SFormValidateFeatureInterface';
import __joi from 'joi';
import __tlds from '@sideway/address/lib/tlds';
import __autoCast from '@coffeekraken/sugar/shared/string/autoCast';
import __wrap from '@coffeekraken/sugar/js/dom/manipulate/wrap';
import __insertAfter from '@coffeekraken/sugar/js/dom/manipulate/insertAfter';

import __css from '../css/s-form-validate.css';

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
 * <h3 class="s-color\:accent s-font\:30 s-mb\:30">Simple fields</h3>
 * <label class="s-label s-mb\:30" s-form-validate email>
 *    <input type="text" class="s-input s-width\:60" placeholder="olivier.bossel@coffeekraken.io" />
 *    Email address
 * </label>
 * <label class="s-label s-mb\:30" s-form-validate domain>
 *    <input type="text" class="s-input s-width\:60" placeholder="coffeekraken.io" />
 *    Domain name
 * </label>
 * <label class="s-label s-mb\:30" s-form-validate alphanum>
 *    <input type="text" class="s-input s-width\:60" placeholder="a-zA-Z0-9" />
 *    Alphanumeric
 * </label>
 * <label class="s-label s-mb\:30" s-form-validate credit-card>
 *    <input type="text" class="s-input s-width\:60" placeholder="340716737808634" />
 *    Credit card
 * </label>
 * <label class="s-label s-mb\:30" s-form-validate min="3" max="6">
 *    <input type="text" class="s-input s-width\:60" placeholder="3 to 6" />
 *    Min and max
 * </label>
 *
 * <h3 class="s-color\:accent s-font\:30 s-mb\:30">Complexe fields</h3>
 * <label class="s-label s-mb\:30" s-form-validate>
 *    <select class="s-select s-width\:60">
 *        <option value="value 1">This is the first option...</option>
 *        <option value="value 2">This is the second...</option>
 *        <option value="value 3">Third...</option>
 *    </select>
 *    Select
 * </label>
 * <label class="s-label s-mb\:30" s-form-validate>
 *    <select multiple class="s-select s-width\:60">
 *        <option value="value 1">This is the first option...</option>
 *        <option value="value 2">This is the second...</option>
 *        <option value="value 3">Third...</option>
 *    </select>
 *    Multiple select
 * </label>
 * <label class="s-label s-mb\:30" s-form-validate date>
 *    <s-date-picker name="my-cool-date" placeholder="2021-09-16" class="s-width\:60"></s-date-picker>
 *    Date
 * </label>
 *
 * <h3 class="s-color\:accent s-font\:30 s-mb\:30">Custom validation</h3>
 * <label class="s-label s-mb\:30" s-form-validate coffeekraken>
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
    constructor(name: string, node: HTMLElement, defaultProps: any, settings: any) {
        Object.keys(defaultProps.customValidations).forEach((validationName) => {
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
                this._$field.addEventListener(on, (e) => {
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

        let res = this._schema.validate(
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

        if (event.type === 'reset') {
            res = {};
        }

        // @ts-ignore
        if (res.error && !this.node._inError) {
            // set the internal node state as error
            // @ts-ignore
            this.node._inError = true;
            // @ts-ignore
            const marginBottom = getComputedStyle(this.node).marginBottom;
            // wrap item into an error container
            let $container;
            if (this.props.wrap) {
                $container = document.createElement('div');
                $container.setAttribute('s-form-validate-error-container', 'true');
                $container.classList.remove(...this.props.validClass.split(' '));
                $container.classList.add(...this.props.errorClass.split(' '));
                __wrap(this.node, $container);
            } else {
                this.node.classList.remove(...this.props.validClass.split(' '));
                this.node.classList.add(...this.props.errorClass.split(' '));
            }
            // display error if needed
            if (this.props.displayError) {
                const $error = document.createElement('p');
                $error.setAttribute('class', this.props.errorMessageClass);
                $error.innerHTML = res.error.message;
                $error.style.marginBottom = marginBottom;
                if (this.props.wrap) {
                    $container.appendChild($error);
                } else {
                    __insertAfter($error, this.node);
                }
            }
        } else if (!res.error) {
            // reset the field state
            // @ts-ignore
            this.node._inError = false;
            // unwrap the field
            if (this.props.wrap) {
                if (event.type !== 'reset') {
                    this.node.classList.add(...this.props.validClass.split(' '));
                } else {
                    this.node.classList.remove(...this.props.validClass.split(' '));
                }
                const $errorContainer = <HTMLElement>this.node.parentNode;
                if (!$errorContainer.hasAttribute('s-form-validate-error-container')) return;
                __insertAfter(this.node, $errorContainer);
                $errorContainer?.remove();
            } else {
                this.node.classList.remove(...this.props.errorClass.split(' '));
                if (event.type !== 'reset') {
                    this.node.classList.add(...this.props.validClass.split(' '));
                } else {
                    this.node.classList.remove(...this.props.validClass.split(' '));
                }
                const $errorMessage = <HTMLElement>this.node.nextSibling;
                if ($errorMessage?.getAttribute('class') === this.props.errorMessageClass) {
                    $errorMessage?.remove();
                }
            }
        }
    }
}

export function register(props: Partial<ISFormValidateFeatureProps> = {}, name = 's-form-validate') {
    __SFeature.registerFeature(name, SFormValidateFeature, props);
}
