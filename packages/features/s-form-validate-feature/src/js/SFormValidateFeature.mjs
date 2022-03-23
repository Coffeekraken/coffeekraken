import "../../../../chunk-PG3ZPS4G.mjs";
import __SFeature from "@coffeekraken/s-feature";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SFormValidateFeatureInterface from "./interface/SFormValidateFeatureInterface";
import __joi from "joi";
import __autoCast from "@coffeekraken/sugar/shared/string/autoCast";
import __css from "../css/s-form-validate.css";
import __SComponentUtils from "@coffeekraken/s-component-utils";
class SFormValidateFeature extends __SFeature {
  constructor(name, node, settings) {
    var _a;
    Object.keys((_a = __SComponentUtils.getDefaultProps(name)) == null ? void 0 : _a.customValidations).forEach((validationName) => {
      if (__SFormValidateFeatureInterface.definition[validationName])
        return;
      __SFormValidateFeatureInterface.definition[validationName] = {
        type: "String|Boolean"
      };
    });
    super(name, node, __deepMerge({
      componentUtils: {
        interface: __SFormValidateFeatureInterface,
        style: __css
      }
    }, settings != null ? settings : {}));
    this._validationType = "string";
    this._isDirty = false;
    this._isValidating = false;
    this.componentUtils.exposeApi({
      validate: this.validate
    }, this);
    this.node.classList.add("s-form-validate");
  }
  mount() {
    this._$field = this.node;
    const $insideField = this.node.querySelector("input,textarea,select");
    if ($insideField)
      this._$field = $insideField;
    if (this.props.type) {
      if (this.props.type === "text")
        this._validationType = "string";
      else
        this._validationType = this.props.type;
    }
    this.props.on.forEach((on) => {
      var _a, _b;
      if (on === "enter") {
        this._$field.addEventListener("keyup", (e) => {
          if (e.keyCode !== 13)
            return;
          this.validate(e);
        });
      } else if (on === "reset") {
        (_a = this._$field.form) == null ? void 0 : _a.addEventListener(on, (e) => {
          setTimeout(() => {
            this.validate(e);
          });
        });
      } else if (on === "submit") {
        (_b = this._$field.form) == null ? void 0 : _b.addEventListener(on, (e) => {
          this.validate(e);
        });
      } else if (on === "keyup") {
        this.node.addEventListener(on, (e) => {
          if (!this._isDirty)
            return;
          this.validate(e);
        });
      } else {
        this.node.addEventListener(on, (e) => {
          this.validate(e);
        });
      }
    });
    console.log(this.props);
    let schema = __joi[this._validationType]();
    let isCustom = false;
    Object.keys(this.props).forEach((prop) => {
      if (isCustom)
        return;
      if (this.props.customValidations[prop]) {
        isCustom = true;
        schema = schema.custom(this.props.customValidations[prop], prop);
      } else {
        const propValue = this.props[prop];
        if (propValue === true && typeof schema[prop] === "function") {
          let options = {};
          if (prop === "email" || prop === "domain") {
            options = {
              tlds: false
            };
          }
          schema = schema[prop](options);
        } else if (typeof schema[prop] === "function") {
          schema = schema[prop](__autoCast(propValue));
        }
      }
    });
    this._schema = schema;
  }
  validate(event) {
    var _a;
    if (((_a = event == null ? void 0 : event.currentTarget) == null ? void 0 : _a.tagName.toLowerCase()) === "form" && event.type !== "reset") {
      event.preventDefault();
    }
    if (this._isValidating)
      return;
    this._isValidating = true;
    setTimeout(() => {
      this._isValidating = false;
    });
    let resultObj;
    if (this._$field.type === "checkbox") {
      resultObj = this._validateCheckbox();
    } else if (this._$field.type === "range") {
      resultObj = this._validateRange();
    } else if (this._$field.tagName.toLowerCase() === "select") {
      resultObj = this._validateSelect();
    } else {
      resultObj = this._schema.validate(this._$field.value, __deepMerge({
        errors: {
          label: false,
          language: this.props.language
        }
      }, this.props.joiOptions));
    }
    if (event.type === "reset") {
      resultObj = {};
    }
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
        language: this.props.language
      }
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
        language: this.props.language
      }
    }, this.props.joiOptions));
  }
  _validateSelect() {
    const selectedItems = Array.from(this._$field.querySelectorAll("option")).filter(($item) => $item.selected).map(($item) => $item.value);
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
        language: this.props.language
      }
    }, this.props.joiOptions));
  }
  _applyResult(res, event) {
    var _a, _b;
    if (res.error) {
      this._isDirty = true;
      this.node.classList.add(...this.props.errorClass.split(" "));
      this.node.classList.remove(...this.props.validClass.split(" "));
      if (this.props.displayError) {
        this._$error = this.node.nextElementSibling;
        if (!this._$error || !this._$error.hasAttribute("s-form-validate-error")) {
          this._$error = document.createElement("p");
          this._$error.setAttribute("s-form-validate-error", "true");
          this._$error.classList.add("s-form-validate-error-message");
          this.node.parentNode.insertBefore(this._$error, this.node.nextSibling);
        }
        this._$error.innerHTML = res.error.message;
      }
    } else if (!res.error) {
      this._isDirty = false;
      if (event.type !== "reset") {
        this.node.classList.add(...this.props.validClass.split(" "));
      } else {
        this.node.classList.remove(...this.props.validClass.split(" "));
      }
      this.node.classList.remove(...this.props.errorClass.split(" "));
      if ((_a = this._$error) == null ? void 0 : _a.hasAttribute("s-form-validate-error")) {
        (_b = this._$error) == null ? void 0 : _b.remove();
      }
    }
  }
}
function define(props = {}, name = "s-form-validate") {
  __SFeature.defineFeature(name, SFormValidateFeature, props);
}
export {
  SFormValidateFeature as default,
  define
};
