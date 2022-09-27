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
const webcomponent_1 = require("@coffeekraken/s-clipboard-copy-component/webcomponent");
const webcomponent_2 = require("@coffeekraken/s-inline-component/webcomponent");
const webcomponent_3 = require("@coffeekraken/s-code-example-component/webcomponent");
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
    (0, webcomponent_3.define)({
        cssDeps: ['global', '/dist/css/partials/sCodeExample.css'],
    });
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
    (0, webcomponent_1.define)();
    (0, webcomponent_2.define)();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3RkFBNEc7QUFDNUcsZ0ZBQTZGO0FBRTdGLHNGQUF3RztBQUN4RyxxRkFBMkY7QUFDM0YsNEVBQXFEO0FBQ3JELDJGQUFpRztBQUNqRywyRkFBaUc7QUFDakcsb0ZBQTREO0FBQzVELHVFQUFrRjtBQUNsRix1RUFBOEU7QUFDOUUseUVBQWdGO0FBQ2hGLHlFQUFnRjtBQUNoRix5RUFHMEM7QUFDMUMseUZBQStGO0FBRS9GLHlFQUFnRjtBQUNoRiwrRUFFc0M7QUFDdEMsd0VBQWlEO0FBQ2pELHlFQUFnRjtBQUNoRixtRkFBeUY7QUFDekYsdUZBQTZGO0FBQzdGLHVFQUE4RTtBQUM5RSxtRUFBMEU7QUFDMUUseUVBQWdGO0FBRWhGLG1CQUFtQjtBQUNuQix3REFBMEU7QUFDMUUsa0VBQW9GO0FBQ3BGLG9EQUFzRTtBQUN0RSx3REFBMEU7QUFDMUUsMEVBQTBFO0FBQzFFLHlGQUF5RjtBQUV6RixPQUFPO0FBQ1Asb0VBQTZDO0FBRTdDLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUUvRCxtQkFBbUI7QUFDbkIsYUFBYTtBQUNiLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFaEUsQ0FBQyxHQUFTLEVBQUU7SUFDVixtQkFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7UUFDOUIsU0FBUyxFQUFFLGNBQWM7UUFDekIsa0NBQWtDO0tBQ25DLENBQUMsQ0FBQztJQUNILHlCQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRTtRQUNuQyxTQUFTLEVBQUUsY0FBYztRQUN6QixrQ0FB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