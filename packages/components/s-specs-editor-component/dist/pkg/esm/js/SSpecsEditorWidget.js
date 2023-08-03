var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __clone, __deepClean, __deepMerge, __delete, __get, __set, } from '@coffeekraken/sugar/object';
import { __uniqid } from '@coffeekraken/sugar/string';
import { __isPlainObject } from '@coffeekraken/sugar/is';
import __SSpecs from '@coffeekraken/s-specs';
import { __wait } from '@coffeekraken/sugar/datetime';
import { html } from 'lit';
export default class SSpecsEditorWidget {
    constructor(deps) {
        var _a, _b;
        this.status = {
            pristine: true,
            unsaved: false,
        };
        this._errors = [];
        this._warnings = [];
        this._widgets = {};
        this.settings = Object.assign({ label: true }, ((_a = deps.settings) !== null && _a !== void 0 ? _a : {}));
        // set a uniqid for the widget
        this.id = __uniqid();
        // grab values from dependencies
        this.editor = deps.editor;
        this.propObj = deps.propObj;
        this.path = Array.isArray(deps.pathOrCallback)
            ? deps.pathOrCallback
            : ['value'];
        this.callback =
            typeof deps.pathOrCallback === 'function'
                ? deps.pathOrCallback
                : null;
        this.valuePath = this.path.filter((l) => l !== 'props');
        this._values = deps.values;
        this._source = __deepClean((_b = deps.source) !== null && _b !== void 0 ? _b : {});
        // merge the values and the source together
        // Note that we do not clone the object to keep reference to the _values one
        __deepMerge(this._values, this._source, {
            clone: false,
        });
        // handle default
        if (!Object.keys(this._values).length && this.propObj.default) {
            if (__isPlainObject(this.propObj.default)) {
                Object.assign(this._values, this.propObj.default);
            }
            else {
                Object.assign(this._values, {
                    value: this.propObj.default,
                });
            }
        }
    }
    get values() {
        if (this.isResponsive()) {
            if (!this._values.media) {
                this._values.media = {};
            }
            if (!this._values.media[this.editor.props.media]) {
                this._values.media[this.editor.props.media] = {};
            }
            return this._values.media[this.editor.props.media];
        }
        return this._values;
    }
    get noneResponsiveValue() {
        var _a;
        return (_a = this._values) !== null && _a !== void 0 ? _a : {};
    }
    saved() {
        this.status.unsaved = false;
    }
    clearValue(path) {
        var _a;
        if (!path) {
            return this.resetValue();
        }
        // not so much pristine...
        this.status.pristine = false;
        this.status.unsaved = true;
        // delete actual value
        __delete(this._values, path);
        // call the passed callback if is one
        (_a = this.callback) === null || _a === void 0 ? void 0 : _a.call(this, this._values);
        // update UI
        this.editor.requestUpdate();
    }
    resetValue() {
        var _a;
        // delete all values
        for (let [key, value] of Object.entries(this._values)) {
            delete this._values[key];
        }
        // not so much pristine...
        this.status.pristine = false;
        this.status.unsaved = true;
        // call the passed callback if is one
        (_a = this.callback) === null || _a === void 0 ? void 0 : _a.call(this, this._values);
        // update UI
        this.editor.requestUpdate();
    }
    mergeValue(value, settings) {
        this.setValue(value, Object.assign(Object.assign({}, (settings !== null && settings !== void 0 ? settings : {})), { merge: true }));
    }
    override() {
        this._overrided = true;
    }
    canBeOverride() {
        if (this._overrided) {
            return false;
        }
        if (!Object.keys(this._source).length) {
            return false;
        }
        if (this._canBeOverride === undefined) {
            const cleanedValues = __deepClean(__clone(this._values, {
                deep: true,
            }));
            this._canBeOverride =
                JSON.stringify(cleanedValues) === JSON.stringify(this._source);
        }
        return this._canBeOverride;
    }
    setDefault(value, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.setValue(value, Object.assign(Object.assign({}, (settings !== null && settings !== void 0 ? settings : {})), { validate: false, apply: false }));
        });
    }
    setValue(value, settings) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const finalSettings = Object.assign({ media: null, path: '.', merge: false, validate: true, apply: true, responsive: true }, (settings !== null && settings !== void 0 ? settings : {}));
            // not so much pristine...
            this.status.pristine = false;
            this.status.unsaved = true;
            const sourceValues = !finalSettings.responsive
                ? (_a = __get(this._values, finalSettings.path)) !== null && _a !== void 0 ? _a : {}
                : this.values;
            // get the current values
            let newValues = __clone(sourceValues, {
                deep: true,
            });
            // set or merge new value
            if (finalSettings.merge) {
                __deepMerge(newValues, value);
            }
            else {
                newValues = value;
            }
            // validate
            let validateResult = {};
            if (finalSettings.validate) {
                validateResult = this._validate(newValues);
            }
            // if no error, set the new value
            if (!validateResult.error) {
                let path = finalSettings.path;
                if (this.isResponsive() && finalSettings.responsive) {
                    path =
                        `media.${this.editor.props.media}.${finalSettings.path}`.replace(/\.{2}/gm, '');
                }
                // set the new value(s)
                __set(this._values, path, newValues, {
                    preferAssign: true,
                });
                // reset the canBeOverride status
                this._canBeOverride = undefined;
                // ugly hack to avoid issue in repeatable display...
                yield __wait();
                // call the passed callback if is one
                (_b = this.callback) === null || _b === void 0 ? void 0 : _b.call(this, this._values);
                // apply the changes in the editor
                if (finalSettings.apply) {
                    this.editor.apply();
                }
            }
            else {
                // update the UI to display errors
                this.editor.requestUpdate();
            }
        });
    }
    _validate(values) {
        var _a;
        if (!values) {
            values = __clone(this._values, {
                deep: true,
            });
        }
        // reset errors and warnings
        this._errors = [];
        this._warnings = [];
        console.log('VB', values, this.propObj);
        let valueToValidate = values;
        if (Object.keys(valueToValidate).length === 1 &&
            valueToValidate.value !== undefined) {
            valueToValidate = valueToValidate.value;
        }
        const path = this.path;
        const objToValidate = {
            [path.at(-1)]: valueToValidate,
        };
        const specObj = {
            props: {
                [path.at(1)]: this.propObj,
            },
        };
        console.log('Ob', objToValidate, specObj);
        const res = __SSpecs.validate(objToValidate, specObj);
        console.log('RESSS', res);
        // validate new values
        const validateResult = (_a = this.validate(values)) !== null && _a !== void 0 ? _a : {};
        // error and warnings
        if (validateResult.error) {
            this._errors.push(validateResult.error);
        }
        if (validateResult.warning) {
            this._warnings.push(validateResult.warning);
        }
        return validateResult;
    }
    renderLabel(settings) {
        if (!this.settings.label) {
            return '';
        }
        return html ` <label
            class="${this.editor.utils.cls('_label', 's-label s-label--block')}"
            @click=${(e) => e.preventDefault()}
        >
            ${this.editor.renderLabel(this.propObj, this.path, settings)}
        </label>`;
    }
    renderWidget(propObj, callback) {
        if (!propObj.id) {
            throw new Error(`<red>[SSpecsEditor]</red> To render a widget with a callback, you MUST specify an "id" inside the "propObj"...`);
        }
        if (!this._widgets[propObj.id]) {
            this._widgets[propObj.id] = this.editor.renderWidget(Object.assign(Object.assign({}, propObj), { id: `${this.id}.${propObj.id}` }), callback);
        }
        return html ` <div
            class="s-specs-editor_prop s-specs-editor_prop-${propObj.type.toLowerCase()}"
        >
            ${this._widgets[propObj.id]}
        </div>`;
    }
    renderInlineInput(settings) {
        var _a;
        return html `
            <label class="_alt inline-input">
                <div class="_label">${settings.label}</div>
                <input
                    class="_input"
                    type="text"
                    name="alt"
                    placeholder="${settings.placeholder}"
                    value="${settings.value}"
                    @change=${(_a = settings.onChange) !== null && _a !== void 0 ? _a : function () { }}
                />
            </label>
        `;
    }
    validate(values) {
        return {};
    }
    hasUnsavedChanges() {
        return !this.status.pristine && this.status.unsaved;
    }
    hasValuesForMedia(media) {
        var _a, _b, _c;
        return Object.keys((_c = (_b = (_a = this._values) === null || _a === void 0 ? void 0 : _a.media) === null || _b === void 0 ? void 0 : _b[media]) !== null && _c !== void 0 ? _c : {}).length > 0;
    }
    isResponsive() {
        return this.propObj.responsive;
    }
    hasErrors() {
        if (this.status.pristine && this.editor.state.status.pristine) {
            return false;
        }
        if (this.status.pristine) {
            this._validate();
        }
        return this._errors.length > 0;
    }
    get lastError() {
        return this._errors[0];
    }
    hasWarnings() {
        return this._warnings.length > 0;
    }
    get lastWarning() {
        return this._warnings[0];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFDSCxPQUFPLEVBQ1AsV0FBVyxFQUNYLFdBQVcsRUFDWCxRQUFRLEVBQ1IsS0FBSyxFQUNMLEtBQUssR0FDUixNQUFNLDRCQUE0QixDQUFDO0FBQ3BDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUl0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFekQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXRELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUEwQzNCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0JBQWtCO0lBcUJuQyxZQUFZLElBQTZCOztRQWJ6QyxXQUFNLEdBQThCO1lBQ2hDLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLEtBQUs7U0FDakIsQ0FBQztRQU9GLFlBQU8sR0FBYSxFQUFFLENBQUM7UUFDdkIsY0FBUyxHQUFhLEVBQUUsQ0FBQztRQTRSekIsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQXpSZixJQUFJLENBQUMsUUFBUSxtQkFDVCxLQUFLLEVBQUUsSUFBSSxJQUNSLENBQUMsTUFBQSxJQUFJLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQUMsQ0FDM0IsQ0FBQztRQUVGLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDO1FBRXJCLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FB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