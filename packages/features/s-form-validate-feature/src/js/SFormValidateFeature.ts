import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SFormValidateFeatureInterface from './interface/SFormValidateFeatureInterface';
import __joi from 'joi';
import __autoCast from '@coffeekraken/sugar/shared/string/autoCast';
import __wrap from '@coffeekraken/sugar/js/dom/manipulate/wrap';
import __insertAfter from '@coffeekraken/sugar/js/dom/manipulate/insertAfter';

export interface ISFormValidateFeatureProps {
    alphanum: boolean;
    base64: boolean;
    case: 'upper' | 'lower';
    creditCard: boolean;
    dataUri: boolean;
    domain: boolean | string;
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

    constructor(name: string, node: HTMLElement, settings) {
        super(
            name,
            node,
            __deepMerge(
                {
                    componentUtils: {
                        interface: __SFormValidateFeatureInterface,
                    },
                },
                settings ?? {},
            ),
        );

        // expose the api on node
        this.componentUtils.exposeApi({
            validate: this.validate,
        });

        console.log(this.props);
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
            } else if (on === 'submit') {
                this._$field.form.addEventListener(on, (e) => {
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
        Object.keys(this.props).forEach((prop) => {
            const propValue = this.props[prop];
            if (propValue === true && typeof schema[prop] === 'function') {
                schema = schema[prop]();
            } else if (typeof schema[prop] === 'function') {
                schema = schema[prop](__autoCast(propValue));
            }
        });
        this._schema = schema;
    }

    _isValidating = false;
    validate(event?) {
        // stop form send action
        if (event?.currentTarget?.tagName.toLowerCase() === 'form') {
            event.preventDefault();
        }

        if (this._isValidating) return;
        this._isValidating = true;
        setTimeout(() => {
            this._isValidating = false;
        });

        const res = this._schema.validate(
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

        // @ts-ignore
        if (res.error && !this.node._inError) {
            // set the internal node state as error
            // @ts-ignore
            this.node._inError = true;
            // wrap item into an error container
            const $container = document.createElement('div');
            $container.setAttribute('s-form-validate-error-container', 'true');
            $container.classList.add(...this.props.errorClass.split(' '));
            __wrap(this.node, $container);
            // display error if needed
            if (this.props.displayError) {
                const $error = document.createElement('p');
                $error.setAttribute('class', this.props.errorMessageClass);
                $error.innerHTML = res.error.message;
                $container.appendChild($error);
            }
            // set focus back to field
            this._$field.focus();
        } else if (!res.error) {
            // reset the field state
            // @ts-ignore
            this.node._inError = false;
            // unwrap the field
            const $errorContainer = <HTMLElement>this.node.parentNode;
            if (!$errorContainer.hasAttribute('s-form-validate-error-container')) return;
            __insertAfter(this.node, $errorContainer);
            $errorContainer?.remove();
        }
    }
}

export function register(props: Partial<ISFormValidateFeatureProps> = {}, name = 's-form-validate') {
    __SFeature.registerFeature(name, SFormValidateFeature, props);
}
