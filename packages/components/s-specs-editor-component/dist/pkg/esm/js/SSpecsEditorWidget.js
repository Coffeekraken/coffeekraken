var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __clone, __deepClean, __deepMerge, __get, __set, } from '@coffeekraken/sugar/object';
import { __wait } from '@coffeekraken/sugar/datetime';
import { html } from 'lit';
export default class SSpecsEditorWidget {
    constructor(deps, settings) {
        var _a, _b;
        this.status = {
            pristine: true,
        };
        this._errors = [];
        this._warnings = [];
        this.settings = Object.assign({ label: true }, ((_a = deps.settings) !== null && _a !== void 0 ? _a : {}));
        this.editor = deps.editor;
        this.propObj = deps.propObj;
        this.path = deps.path;
        this.valuePath = this.path.filter((l) => l !== 'props');
        this._values = deps.values;
        this._source = __deepClean((_b = deps.source) !== null && _b !== void 0 ? _b : {});
        // merge the values and the source together
        // Note that we do not clone the object to keep reference to the _values one
        __deepMerge(this._values, this._source, {
            clone: false,
        });
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
    resetValue() {
        for (let [key, value] of Object.entries(this._values)) {
            delete this._values[key];
        }
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
        if (!this._source) {
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
    setValue(value, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalSettings = Object.assign({ media: null, path: '.', merge: false, validate: true }, (settings !== null && settings !== void 0 ? settings : {}));
            // not so much pristine...
            this.status.pristine = false;
            const sourceValues = finalSettings.noneResponsive
                ? this._values
                : this.values;
            // get the current values
            let newValues = __clone(sourceValues, {
                deep: true,
            });
            // set or merge new value
            if (finalSettings.merge) {
                __set(newValues, finalSettings.path, __deepMerge(__get(newValues, finalSettings.path), value));
            }
            else {
                __set(newValues, finalSettings.path, value);
            }
            // validate
            let validateResult = {};
            if (finalSettings.validate) {
                validateResult = this._validate(newValues);
            }
            // if no error, set the new value
            if (!validateResult.error) {
                let path = finalSettings.path;
                if (this.isResponsive() && !finalSettings.noneResponsive) {
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
                // apply the changes in the editor
                this.editor.apply();
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
    hasValuesForMedia(media) {
        var _a, _b, _c;
        return Object.keys((_c = (_b = (_a = this._values) === null || _a === void 0 ? void 0 : _a.media) === null || _b === void 0 ? void 0 : _b[media]) !== null && _c !== void 0 ? _c : {}).length > 0;
    }
    isResponsive() {
        return this.propObj.responsive;
    }
    hasErrors() {
        if (this.status.pristine && this.editor.status.pristine) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFDSCxPQUFPLEVBQ1AsV0FBVyxFQUNYLFdBQVcsRUFDWCxLQUFLLEVBQ0wsS0FBSyxHQUNSLE1BQU0sNEJBQTRCLENBQUM7QUFJcEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXRELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUF3QzNCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0JBQWtCO0lBa0JuQyxZQUNJLElBQTZCLEVBQzdCLFFBQXNDOztRQWQxQyxXQUFNLEdBQThCO1lBQ2hDLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUM7UUFPRixZQUFPLEdBQWEsRUFBRSxDQUFDO1FBQ3ZCLGNBQVMsR0FBYSxFQUFFLENBQUM7UUFNckIsSUFBSSxDQUFDLFFBQVEsbUJBQ1QsS0FBSyxFQUFFLElBQUksSUFDUixDQUFDLE1BQUEsSUFBSSxDQUFDLFFBQVEsbUNBQUksRUFBRSxDQUFDLENBQzNCLENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLE1BQUEsSUFBSSxDQUFDLE1BQU0sbUNBQUksRUFBRSxDQUFDLENBQUM7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