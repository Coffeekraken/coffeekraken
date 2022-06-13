import __SComponentUtils from '@coffeekraken/s-component-utils';
import __SFeature from '@coffeekraken/s-feature';
import __querySelectorUp from '@coffeekraken/sugar/js/dom/query/querySelectorUp';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __autoCast from '@coffeekraken/sugar/shared/string/autoCast';
// @ts-ignore
import __css from '../../../../src/css/s-form-validate.css'; // relative to /dist/pkg/esm/js
import __SFormValidateFeatureInterface from './interface/SFormValidateFeatureInterface';
import __SValidator from '@coffeekraken/s-validator';
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';

/**
 * @name            SFormValidateFeature
 * @as              Form validate feature
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SFormValidateFeatureInterface.ts
 * @menu            Styleguide / Forms               /styleguide/form/s-form-validate-feature
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
 * @event           error           Dispatched when a validation error occurs
 * @event           valid               Dispatched when a validation pass correctly
 *
 * @install         bash
 * npm i @coffeekraken/s-form-validate-feature
 *
 * @install        js
 * import { define } from '@coffeekraken/s-form-validate-feature';
 * define();
 *
 * @example         html            Email field
 * <label class="s-label:responsive" s-form-validate email email-message="Coco" required-message="PLOP">
 *    Email address
 *    <input type="text" class="s-input s-width:60" required placeholder="olivier.bossel@coffeekraken.io" />
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
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISFormValidateFeatureProps {
    errorContainerAttr: string;
    [key: string]: any;
}

export default class SFormValidateFeature extends __SFeature {
    private _$field;
    private _$form;

    private _validator;

    // the field become dirty when it is in error state
    private _isDirty = false;

    // @ts-ignore
    constructor(name: string, node: HTMLElement, settings: any) {
        Object.keys(
            __SComponentUtils.getDefaultProps(name)?.customValidations ?? {},
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

        // init a new SValidator instance
        this._validator = new __SValidator();

        // try to get form
        this._$form = __querySelectorUp(this.node, 'form');

        if (this._$form) {
            this._$form.addEventListener('submit', (e) => {
                if (!this._$form._submitHandler) {
                    this._$form._submitHandler = true;

                    // collect errors during 1 event loop
                    const collectedErrors: any[] = [];
                    const errorHandler = (e) => {
                        collectedErrors.push(e.detail);
                    };
                    this._$form.addEventListener(
                        's-form-validate.error',
                        errorHandler,
                    );

                    // prevent form to submit.
                    // we sill submit it if no errors are collected
                    e.preventDefault();

                    // if not a custom event, we stop the propagation and we will
                    // dispatch a "submit" event if their's no errors collected
                    if (e instanceof CustomEvent) {
                    } else {
                        e.stopPropagation();
                    }

                    setTimeout(() => {
                        // after 1 event loop, remove the error handler and collector
                        delete this._$form._submitHandler;
                        this._$form.removeEventListener(
                            's-form-validate.error',
                            errorHandler,
                        );

                        // check if we have collected errors
                        if (!collectedErrors.length) {
                            // no errors, we can submit the form
                            this._$form.submit();
                            // dispatch a "submit" event only if the current submit event
                            // is not a custom event to avoid loops...
                            if (e instanceof CustomEvent) {
                            } else {
                                this._$form.dispatchEvent(
                                    new CustomEvent('submit', {
                                        bubbles: true,
                                        cancelable: true,
                                    }),
                                );
                            }
                        }
                    });
                }
            });
        }

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
        __querySelectorLive(
            'input,textarea,select',
            ($field) => {
                this._initField($field);
            },
            {
                rootNode: this.node,
            },
        );

        // set the validation type depending on input type etc...
        if (this.props.type) {
            if (this.props.type === 'text') this._validationType = 'string';
            else this._validationType = this.props.type;
        }
    }

    _initField($field) {
        this._$field = $field;

        this._$field = this.node;
        const $insideField = this.node.querySelector('input,textarea,select');
        if ($insideField) this._$field = $insideField;

        // add the "novalidate" attribute on the field cause we take care
        this._$field.setAttribute('novalidate', 'true');

        // get some validations directly from the $field
        ['required', 'maxlength', 'minlength', 'max', 'min', 'pattern'].forEach(
            (type) => {
                if (this._$field.hasAttribute(type)) {
                    if (this.props[type]) return;
                    this.props[type] = this._$field.getAttribute(type);
                    if (type !== 'maxlength' && type !== 'minlength') {
                        this._$field.removeAttribute(type);
                    }
                }
            },
        );

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
                    // prevent the submit
                    e.preventDefault();
                    // if its an internal event, stop here
                    if (e instanceof CustomEvent) return;
                    // otherwise, stop propagation
                    e.stopPropagation();
                    // validate the form
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
    }

    _isValidating = false;
    validate(event?) {
        if (!this._$field) {
            throw new Error(`No $field has been found to be validated...`);
        }

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

        // build the validator rules object
        const validatorRules = {};
        for (let [validator, definition] of Object.entries(
            __SValidator.getValidatorsDefinition(),
        )) {
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
            this.node.querySelectorAll('input[type="checkbox"]:checked'),
        ).map(($item) => (<HTMLInputElement>$item).value);
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
            .filter(($item) => (<HTMLOptionElement>$item).selected)
            .map(($item) => (<HTMLOptionElement>$item).value);
    }

    _$error;
    _applyResult(res, event) {
        // @ts-ignore
        if (!res.valid) {
            // set the field as dirty
            this._isDirty = true;

            // add error class on the node itself
            this.node.classList.add(...this.props.errorClass.split(' '));

            // remove valid class on the node itself
            this.node.classList.remove(...this.props.validClass.split(' '));

            const firstInvalidValidator = Object.keys(res.rules)[0];

            // grab the first error message from the validator or the attribute
            const finalMessage =
                this.props[`${firstInvalidValidator}Message`] ||
                res.messages[0];

            // display error if needed
            if (this.props.displayError) {
                this._$error =
                    this.node.querySelector(
                        `[${this.props.errorContainerAttr}]`,
                    ) ?? this.node.nextElementSibling;
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
                this._$error.innerHTML = finalMessage;
            }

            // dispatch en error event
            // @ts-ignore
            this.componentUtils.dispatchEvent('error', {
                detail: res,
            });
        } else {
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

            // dispatch en error event
            this.componentUtils.dispatchEvent('valid', {
                detail: res,
            });
        }
    }
}

export function define(
    props: Partial<ISFormValidateFeatureProps> = {},
    name = 's-form-validate',
) {
    __SFeature.defineFeature(name, SFormValidateFeature, props);
}
