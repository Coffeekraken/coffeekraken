"use strict";
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
const s_inline_feature_1 = require("@coffeekraken/s-inline-feature");
const s_code_example_component_1 = require("@coffeekraken/s-code-example-component");
const s_color_picker_component_1 = require("@coffeekraken/s-color-picker-component");
const s_dashboard_1 = __importDefault(require("@coffeekraken/s-dashboard"));
const s_datetime_picker_component_1 = require("@coffeekraken/s-datetime-picker-component");
const s_filtrable_input_component_1 = require("@coffeekraken/s-filtrable-input-component");
const s_google_map_component_1 = require("@coffeekraken/s-google-map-component");
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_panel_component_1 = require("@coffeekraken/s-panel-component");
const s_range_component_1 = require("@coffeekraken/s-range-component");
const s_rating_component_1 = require("@coffeekraken/s-rating-component");
const s_scroll_component_1 = require("@coffeekraken/s-scroll-component");
const s_slider_component_1 = require("@coffeekraken/s-slider-component");
const s_theme_switcher_component_1 = require("@coffeekraken/s-theme-switcher-component");
const s_activate_feature_1 = require("@coffeekraken/s-activate-feature");
const s_deps_feature_1 = require("@coffeekraken/s-deps-feature");
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
    // [
    //   {
    //     sel: '.icon-card',
    //     css: 'iconCard',
    //   },
    //   {
    //     sel: 's-code-example',
    //     css: 'sCodeExample',
    //   },
    //   {
    //     sel: '.sidemenu',
    //     css: 'sidemenu',
    //   },
    //   {
    //     sel: '.code-example-section',
    //     css: 'codeExampleSection',
    //   },
    //   {
    //     sel: '.s-filtrable-input',
    //     css: 'sFiltrableInput',
    //   },
    //   {
    //     sel: 's-color-picker',
    //     css: 'sColorPicker',
    //   },
    //   {
    //     sel: 's-datetime-picker',
    //     css: 'sDatetimePicker',
    //   },
    //   {
    //     sel: 's-rating',
    //     css: 'sRating',
    //   },
    //   {
    //     sel: 's-slider',
    //     css: 'sSlider',
    //   },
    //   {
    //     sel: 's-theme-switcher',
    //     css: 'sThemeSwitcher',
    //   },
    //   {
    //     sel: '.s-platform',
    //     css: 'sPlatform',
    //   },
    // ].forEach((dep) => {
    //   __SDepsFeature.registerDeps(dep.sel, {
    //     css: dep.css,
    //   });
    // });
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
    (0, s_inline_feature_1.define)();
    // components
    (0, s_code_example_component_1.define)({
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
    (0, s_clipboard_copy_component_1.define)();
    (0, s_rating_component_1.define)();
    (0, s_color_picker_component_1.define)();
    (0, s_datetime_picker_component_1.define)();
    (0, s_google_map_component_1.define)();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUZBQXFHO0FBQ3JHLHFFQUFrRjtBQUVsRixxRkFBaUc7QUFDakcscUZBQWlHO0FBQ2pHLDRFQUFxRDtBQUNyRCwyRkFBdUc7QUFDdkcsMkZBQXVHO0FBQ3ZHLGlGQUE2RjtBQUM3RixvRkFBNEQ7QUFDNUQsdUVBQXdGO0FBQ3hGLHVFQUFvRjtBQUNwRix5RUFBc0Y7QUFDdEYseUVBQXNGO0FBQ3RGLHlFQUcwQztBQUMxQyx5RkFBcUc7QUFFckcseUVBQXNGO0FBQ3RGLGlFQUE4RTtBQUM5RSx3RUFBaUQ7QUFDakQseUVBQXNGO0FBQ3RGLG1GQUErRjtBQUMvRix1RkFBbUc7QUFDbkcsdUVBQW9GO0FBQ3BGLG1FQUFnRjtBQUNoRix5RUFBc0Y7QUFFdEYsbUJBQW1CO0FBQ25CLHdEQUEwRTtBQUMxRSxrRUFBb0Y7QUFDcEYsb0RBQXNFO0FBQ3RFLHdEQUEwRTtBQUMxRSwwRUFBMEU7QUFDMUUseUZBQXlGO0FBRXpGLE9BQU87QUFDUCxvRUFBNkM7QUFFN0MsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRS9ELG1CQUFtQjtBQUNuQixhQUFhO0FBQ2IsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUVoRSxDQUFDLEdBQVMsRUFBRTtJQUNSLG1CQUFVLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRTtRQUM1QixTQUFTLEVBQUUsY0FBYztRQUN6QixrQ0FBa0M7S0FDckMsQ0FBQyxDQUFDO0lBQ0gseUJBQWUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO1FBQ2pDLFNBQVMsRUFBRSxjQUFjO1FBQ3pCLGtDQUFrQztLQUNyQyxD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