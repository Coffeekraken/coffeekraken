"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_clipboard_copy_component_1 = require("@coffeekraken/s-clipboard-copy-component");
const lazy_1 = require("@coffeekraken/s-code-example-component/lazy");
const s_color_picker_component_1 = require("@coffeekraken/s-color-picker-component");
const s_dashboard_1 = __importDefault(require("@coffeekraken/s-dashboard"));
const s_datetime_picker_component_1 = require("@coffeekraken/s-datetime-picker-component");
const s_filtrable_input_component_1 = require("@coffeekraken/s-filtrable-input-component");
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_panel_component_1 = require("@coffeekraken/s-panel-component");
const s_range_component_1 = require("@coffeekraken/s-range-component");
const s_rating_component_1 = require("@coffeekraken/s-rating-component");
const s_scroll_component_1 = require("@coffeekraken/s-scroll-component");
const s_slider_component_1 = require("@coffeekraken/s-slider-component");
const s_theme_switcher_component_1 = require("@coffeekraken/s-theme-switcher-component");
const s_activate_feature_1 = require("@coffeekraken/s-activate-feature");
const s_deps_feature_1 = __importStar(require("@coffeekraken/s-deps-feature"));
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const s_floating_feature_1 = require("@coffeekraken/s-floating-feature");
const s_form_validate_feature_1 = require("@coffeekraken/s-form-validate-feature");
const s_inline_feature_1 = require("@coffeekraken/s-inline-feature");
const s_page_transition_feature_1 = require("@coffeekraken/s-page-transition-feature");
const s_refocus_feature_1 = require("@coffeekraken/s-refocus-feature");
const s_sugar_feature_1 = require("@coffeekraken/s-sugar-feature");
const s_template_feature_1 = require("@coffeekraken/s-template-feature");
// Website specific
const CKDiscover_1 = require("./components/CKDiscover");
const CKDiscoverTabed_1 = require("./components/CKDiscoverTabed");
const CKSearch_1 = require("./components/CKSearch");
const CkSettings_1 = require("./components/CkSettings");
// import { define as __CKRatingsComponent } from './components/CKRating';
// import { define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings';
// Libs
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
// Views specific
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// For doc specific
// @ts-ignore
const forDocRelated = import.meta.globEager('./forDoc/**/*.ts');
(() => __awaiter(void 0, void 0, void 0, function* () {
    s_feature_1.default.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        // verbose: !__SEnv.is('devsCut'),
    });
    s_lit_component_1.default.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        // verbose: !__SEnv.is('devsCut'),
    });
    s_lit_component_1.default.setDefaultProps(['ck-search-input', 's-color-picker', 's-datetime-picker'], {
        mountWhen: 'interact',
        // verbose: !__SEnv.is('devsCut'),
    });
    s_lit_component_1.default.setDefaultProps(['s-panel', 'ck-settings'], {
        mountWhen: 'direct',
    });
    s_lit_component_1.default.setDefaultProps(['s-code-example'], {
        scrollToSettings: {
            offset: 100,
        },
        responsive: {
            mobile: {
                lines: 5,
            },
        },
    });
    // init theme
    s_theme_1.default.init({
        variant: 'dark',
    });
    // dependencies
    [
        {
            sel: '.icon-card',
            css: 'iconCard',
        },
        {
            sel: 's-code-example',
            css: 'sCodeExample',
        },
        {
            sel: '.sidemenu',
            css: 'sidemenu',
        },
        {
            sel: '.code-example-section',
            css: 'codeExampleSection',
        },
        {
            sel: '.s-filtrable-input',
            css: 'sFiltrableInput',
        },
        {
            sel: 's-color-picker',
            css: 'sColorPicker',
        },
        {
            sel: 's-datetime-picker',
            css: 'sDatetimePicker',
        },
        {
            sel: 's-rating',
            css: 'sRating',
        },
        {
            sel: 's-slider',
            css: 'sSlider',
        },
        {
            sel: 's-theme-switcher',
            css: 'sThemeSwitcher',
        },
        {
            sel: '.s-platform',
            css: 'sPlatform',
        },
    ].forEach((dep) => {
        s_deps_feature_1.default.registerDeps(dep.sel, {
            css: dep.css,
        });
    });
    // features
    (0, s_deps_feature_1.define)();
    (0, s_activate_feature_1.define)();
    (0, s_page_transition_feature_1.define)();
    (0, s_template_feature_1.define)();
    (0, s_floating_feature_1.define)();
    (0, s_inline_feature_1.define)();
    (0, s_form_validate_feature_1.define)({
        customValidations: {
            coffeekraken: (value, helpers) => {
                if (value === 'coffeekraken') {
                    return helpers.message('Are you sure? Krakens are dangerous...');
                }
                return value;
            },
        },
    });
    (0, s_sugar_feature_1.define)();
    (0, s_refocus_feature_1.define)();
    // components
    (0, lazy_1.define)();
    (0, s_filtrable_input_component_1.define)();
    (0, s_panel_component_1.define)();
    (0, s_slider_component_1.define)({
        behaviors: {
            slideable: {
                class: s_slider_component_1.SSliderSlideableBehavior,
                settings: {},
            },
        },
    });
    (0, s_clipboard_copy_component_1.define)();
    (0, s_rating_component_1.define)();
    (0, s_color_picker_component_1.define)();
    (0, s_datetime_picker_component_1.define)();
    (0, s_scroll_component_1.define)();
    (0, s_range_component_1.define)();
    (0, s_theme_switcher_component_1.define)();
    // Website specific
    // __CKRatingsComponent();
    // __CKWelcomeRatingsComponent();
    (0, CKSearch_1.define)();
    (0, CkSettings_1.define)();
    (0, CKDiscover_1.define)();
    (0, CKDiscoverTabed_1.define)();
    // dashboard
    const dashboard = new s_dashboard_1.default({
        dashboard: {
            components: {
                's-dashboard-pages': {
                    onSelect: (page) => {
                        dashboard.close();
                        document.dispatchEvent(new CustomEvent('location.href', {
                            detail: page.item.loc,
                            bubbles: true,
                        }));
                    },
                },
            },
        },
    });
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5RkFBK0Y7QUFDL0Ysc0VBQWdHO0FBQ2hHLHFGQUEyRjtBQUMzRiw0RUFBcUQ7QUFDckQsMkZBQWlHO0FBQ2pHLDJGQUFpRztBQUNqRyxvRkFBNEQ7QUFDNUQsdUVBQWtGO0FBQ2xGLHVFQUE4RTtBQUM5RSx5RUFBZ0Y7QUFDaEYseUVBQWdGO0FBQ2hGLHlFQUcwQztBQUMxQyx5RkFBK0Y7QUFFL0YseUVBQWdGO0FBQ2hGLCtFQUVzQztBQUN0Qyx3RUFBaUQ7QUFDakQseUVBQWdGO0FBQ2hGLG1GQUF5RjtBQUN6RixxRUFBNEU7QUFDNUUsdUZBQTZGO0FBQzdGLHVFQUE4RTtBQUM5RSxtRUFBMEU7QUFDMUUseUVBQWdGO0FBRWhGLG1CQUFtQjtBQUNuQix3REFBMEU7QUFDMUUsa0VBQW9GO0FBQ3BGLG9EQUFzRTtBQUN0RSx3REFBMEU7QUFDMUUsMEVBQTBFO0FBQzFFLHlGQUF5RjtBQUV6RixPQUFPO0FBQ1Asb0VBQTZDO0FBRTdDLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUUvRCxtQkFBbUI7QUFDbkIsYUFBYTtBQUNiLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFaEUsQ0FBQyxHQUFTLEVBQUU7SUFDUixtQkFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7UUFDNUIsU0FBUyxFQUFFLGNBQWM7UUFDekIsa0NBQWtDO0tBQ3JDLENBQUMsQ0FBQztJQUNILHlCQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRTtRQUNqQyxTQUFTLEVBQUUsY0FBYztRQUN6QixrQ0FB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