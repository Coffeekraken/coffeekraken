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
        this._hasErrors = undefined;
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
        let valuesToReturn = this._values;
        if (this.isResponsive()) {
            if (!this._values.media) {
                this._values.media = {};
            }
            if (!this._values.media[this.editor.props.media]) {
                this._values.media[this.editor.props.media] = {};
            }
            valuesToReturn = this._values.media[this.editor.props.media];
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
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const finalSettings = Object.assign({ media: null, path: '.', merge: false, validate: true, apply: true, responsive: true }, (settings !== null && settings !== void 0 ? settings : {}));
            // not so much pristine...
            this.status.pristine = false;
            this.editor.state.status.pristine = false;
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
            let path = finalSettings.path;
            if (this.isResponsive() && finalSettings.responsive) {
                path =
                    `media.${this.editor.props.media}.${finalSettings.path}`.replace(/\.{2}/gm, '');
            }
            // if no error, set the new value
            if (!((_b = validateResult.errors) === null || _b === void 0 ? void 0 : _b.length)) {
                console.log('SET', this._values, path, newValues);
                // set the new value(s)
                __set(this._values, path, newValues, {
                    preferAssign: true,
                });
                // reset the canBeOverride status
                this._canBeOverride = undefined;
                // ugly hack to avoid issue in repeatable display...
                yield __wait();
                // call the passed callback if is one
                (_c = this.callback) === null || _c === void 0 ? void 0 : _c.call(this, this._values);
            }
            else {
                // // update the UI to display errors
                // this.editor.requestUpdate();
            }
            // apply the changes in the editor
            if (finalSettings.apply) {
                this.editor.apply();
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
        let valueToValidate = values;
        // console.log('___Val', this.path, valueToValidate);
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
        const res = __SSpecs.validate(objToValidate, specObj);
        for (let [prop, result] of Object.entries(res.props)) {
            if (!result.valid) {
                this._errors = [...this._errors, ...((_a = result.messages) !== null && _a !== void 0 ? _a : [])];
            }
        }
        // validate new values
        const validateResult = [];
        // const validateResult = this.validate(values) ?? {};
        // console.log('VAL', validateResult);
        // // error and warnings
        // if (validateResult.error) {
        //     this._errors.push(validateResult.error);
        // }
        // if (validateResult.warning) {
        //     this._warnings.push(validateResult.warning);
        // }
        return {
            errors: this._errors,
            warnings: this._warnings,
        };
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
        // "caching" to avoid doing same work
        // multiple times in the same event loop
        if (this._hasErrors !== undefined) {
            return this._hasErrors;
        }
        clearTimeout(this._hasErrorTimeout);
        this._hasErrorTimeout = setTimeout(() => {
            this._hasErrors = undefined;
        });
        // if (this.status.pristine) {
        //     return false;
        // }
        if (this.status.pristine) {
            this._validate();
        }
        this._hasErrors = this._errors.length;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFDSCxPQUFPLEVBQ1AsV0FBVyxFQUNYLFdBQVcsRUFDWCxRQUFRLEVBQ1IsS0FBSyxFQUNMLEtBQUssR0FDUixNQUFNLDRCQUE0QixDQUFDO0FBQ3BDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUl0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFekQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXRELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUEwQzNCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0JBQWtCO0lBcUJuQyxZQUFZLElBQTZCOztRQWJ6QyxXQUFNLEdBQThCO1lBQ2hDLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLEtBQUs7U0FDakIsQ0FBQztRQU9GLFlBQU8sR0FBYSxFQUFFLENBQUM7UUFDdkIsY0FBUyxHQUFhLEVBQUUsQ0FBQztRQTBTekIsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQTBEbkIsZUFBVSxHQUFHLFNBQVMsQ0FBQztRQWpXbkIsSUFBSSxDQUFDLFFBQVEsbUJBQ1QsS0FBSyxFQUFFLElBQUksSUFDUixDQUFDLE1BQUEsSUFBSSxDQUFDLFFBQVEsbUNBQUksRUFBRSxDQUFDLENBQzNCLENBQUM7UUFFRiw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUVyQixnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMs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