// @ts-nocheck

import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import __fastdom from 'fastdom';

/**
 * @name 		handleInputAttributes
 * @namespace            js.feature
 * @type      Feature
 * @platform          js
 * @status      beta
 *
 * Add some attributes on inputs, textarea and select to help with styling purposes and more.
 * Here's the attributes added:
 * - `has-value`: When the input has a value in it
 * - `empty`: When the input is has no value in it
 * - `dirty`: When the input has been touched
 *
 * @param       {Object}        [settings={}]         An object of settings to configure your feature
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
 * import { __inputAdditionalAttributes } from '@coffeekraken/sugar/feature';
 *  __inputAdditionalAttributes();
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IInputAdditionalAttributesSettings {
    empty: boolean;
    dirty: boolean;
    hasValue: boolean;
}

export default function __inputAdditionalAttributes(
    settings: Partial<IInputAdditionalAttributesSettings> = {},
): void {
    settings = {
        empty: true,
        hasValue: true,
        dirty: true,
        ...settings,
    };

    function handleInputAttributes(eOrElm) {
        const field = eOrElm.target ? eOrElm.target : eOrElm;
        if (!field || !field.tagName) return;
        switch (field.tagName) {
            case 'INPUT':
            case 'TEXTAREA':
            case 'SELECT':
                if (
                    field.type &&
                    (field.type === 'checkbox' || field.type === 'radio')
                ) {
                    return;
                }

                __fastdom.mutate(() => {
                    if (field.value && !field.hasAttribute('has-value')) {
                        if (settings.hasValue) {
                            field.setAttribute('has-value', true);
                        }
                        if (settings.empty) {
                            field.removeAttribute('empty');
                        }
                    } else if (
                        field.value === undefined ||
                        field.value === null ||
                        field.value === ''
                    ) {
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
        [].forEach.call(e.target.elements, (field) => {
            // reset the field attributes
            handleInputAttributes(field);
            // stop here if is a submit
            if (e.type === 'submit') return;
            // remove dirty attribute
            field.removeAttribute('dirty');
        });
    }

    __querySelectorLive(
        'select, textarea, input:not([type="submit"])',
        (elm) => {
            handleInputAttributes(elm);
        },
    );

    document.addEventListener('change', handleInputAttributes);
    document.addEventListener('keyup', handleInputAttributes);
    document.addEventListener('reset', handleFormSubmitOrReset);
    document.addEventListener('submit', handleFormSubmitOrReset);
}
