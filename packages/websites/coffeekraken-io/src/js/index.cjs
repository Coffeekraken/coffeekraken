import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_s_activate_feature = require("@coffeekraken/s-activate-feature");
var import_s_code_example_component = require("@coffeekraken/s-code-example-component");
var import_s_color_picker_component = require("@coffeekraken/s-color-picker-component");
var import_s_date_picker_component = require("@coffeekraken/s-date-picker-component");
var import_s_form_validate_feature = require("@coffeekraken/s-form-validate-feature");
var import_s_refocus_feature = require("@coffeekraken/s-refocus-feature");
var import_s_sugar_feature = require("@coffeekraken/s-sugar-feature");
var import_s_floating_feature = require("@coffeekraken/s-floating-feature");
var import_s_page_transition_feature = require("@coffeekraken/s-page-transition-feature");
var import_s_slider_component = require("@coffeekraken/s-slider-component");
var import_s_lit_component = __toESM(require("@coffeekraken/s-lit-component"), 1);
var import_s_parallax_feature = require("@coffeekraken/s-parallax-feature");
var import_s_range_component = require("@coffeekraken/s-range-component");
var import_s_side_panel_component = require("@coffeekraken/s-side-panel-component");
var import_expandPleasantCssClassnamesLive = __toESM(require("@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive"), 1);
var import_CkBlob = require("./components/CkBlob");
var import_CkFallingStars = require("./components/CkFallingStars");
var import_CKDiscover = require("./components/CKDiscover");
var import_CKSearch = require("./components/CKSearch");
var import_CkSettings = require("./components/CkSettings");
var import_VersionSelector = require("./components/VersionSelector");
var import_s_conductor = __toESM(require("@coffeekraken/s-conductor"), 1);
const import_meta = {};
const viewsRelated = import_meta.globEager("../views/**/*.ts");
import_s_conductor.default.setup({
  log: true
});
(async () => {
  import_s_lit_component.default.setDefaultProps("*", {
    mountWhen: "nearViewport"
  });
  import_s_lit_component.default.setDefaultProps(["s-side-panel", "ck-settings"], {
    mountWhen: "direct"
  });
  import_s_lit_component.default.setDefaultProps(["s-code-example"], {
    scrollToSettings: {
      offset: 100
    }
  });
  (0, import_expandPleasantCssClassnamesLive.default)();
  (0, import_s_activate_feature.define)();
  (0, import_s_page_transition_feature.define)();
  (0, import_VersionSelector.define)();
  (0, import_CKSearch.define)();
  (0, import_CkBlob.define)();
  (0, import_CkFallingStars.define)();
  for (let [key, value] of Object.entries(viewsRelated)) {
    if (typeof value.default === "function")
      value.default();
  }
  (0, import_CKDiscover.define)();
  (0, import_CkSettings.define)();
  (0, import_s_code_example_component.define)();
  (0, import_s_side_panel_component.define)();
  (0, import_s_color_picker_component.define)();
  (0, import_s_date_picker_component.define)();
  (0, import_s_range_component.define)();
  (0, import_s_slider_component.define)({
    availableBehaviors: {
      slideable: {
        class: import_s_slider_component.SSliderSlideableBehavior,
        settings: {}
      }
    }
  });
  (0, import_s_sugar_feature.define)();
  (0, import_s_floating_feature.define)();
  (0, import_s_refocus_feature.define)();
  (0, import_s_parallax_feature.define)();
  (0, import_s_form_validate_feature.define)({
    customValidations: {
      coffeekraken: (value, helpers) => {
        if (value === "coffeekraken") {
          return helpers.message("Are you sure? Krakens are dangerous...");
        }
        return value;
      }
    }
  });
})();
