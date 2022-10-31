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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUZBQXFHO0FBQ3JHLHFFQUFrRjtBQUVsRixxRkFBaUc7QUFDakcscUZBQWlHO0FBQ2pHLDRFQUFxRDtBQUNyRCwyRkFBdUc7QUFDdkcsMkZBQXVHO0FBQ3ZHLG9GQUE0RDtBQUM1RCx1RUFBd0Y7QUFDeEYsdUVBQW9GO0FBQ3BGLHlFQUFzRjtBQUN0Rix5RUFBc0Y7QUFDdEYseUVBRzBDO0FBQzFDLHlGQUFxRztBQUVyRyx5RUFBc0Y7QUFDdEYsaUVBQThFO0FBQzlFLHdFQUFpRDtBQUNqRCx5RUFBc0Y7QUFDdEYsbUZBQStGO0FBQy9GLHVGQUFtRztBQUNuRyx1RUFBb0Y7QUFDcEYsbUVBQWdGO0FBQ2hGLHlFQUFzRjtBQUV0RixtQkFBbUI7QUFDbkIsd0RBQTBFO0FBQzFFLGtFQUFvRjtBQUNwRixvREFBc0U7QUFDdEUsd0RBQTBFO0FBQzFFLDBFQUEwRTtBQUMxRSx5RkFBeUY7QUFFekYsT0FBTztBQUNQLG9FQUE2QztBQUU3QyxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFL0QsbUJBQW1CO0FBQ25CLGFBQWE7QUFDYixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRWhFLENBQUMsR0FBUyxFQUFFO0lBQ1YsbUJBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO1FBQzlCLFNBQVMsRUFBRSxjQUFjO1FBQ3pCLGtDQUFrQztLQUNuQyxDQUFDLENBQUM7SUFDSCx5QkFBZSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7UUFDbkMsU0FBUyxFQUFFLGNBQWM7UUFDekIsa0NBQWtDO0tBQ25DLENBQUMsQ0FBQztJQUNI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