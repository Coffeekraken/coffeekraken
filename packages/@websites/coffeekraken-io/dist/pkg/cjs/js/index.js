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
const s_pack_essentials_1 = __importDefault(require("@coffeekraken/s-pack-essentials"));
const s_code_example_component_1 = require("@coffeekraken/s-code-example-component");
const s_color_picker_component_1 = require("@coffeekraken/s-color-picker-component");
const s_dashboard_1 = __importDefault(require("@coffeekraken/s-dashboard"));
const s_datetime_picker_component_1 = require("@coffeekraken/s-datetime-picker-component");
const s_filtrable_input_component_1 = require("@coffeekraken/s-filtrable-input-component");
const s_google_map_component_1 = require("@coffeekraken/s-google-map-component");
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_panel_component_1 = require("@coffeekraken/s-panel-component");
const s_rating_component_1 = require("@coffeekraken/s-rating-component");
const s_theme_switcher_component_1 = require("@coffeekraken/s-theme-switcher-component");
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const s_page_transition_feature_1 = require("@coffeekraken/s-page-transition-feature");
const s_parallax_feature_1 = require("@coffeekraken/s-parallax-feature");
const s_template_feature_1 = require("@coffeekraken/s-template-feature");
// Website specific
const CKDiscover_1 = require("./components/CKDiscover");
const CKDiscoverTabed_1 = require("./components/CKDiscoverTabed");
const CKDiscoverWelcome_1 = require("./components/CKDiscoverWelcome");
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
    s_feature_1.default.setDefaultProps(['s-form-validate'], {
        customValidations: {
            coffeekraken: (value, helpers) => {
                if (value === 'coffeekraken') {
                    return helpers.message('Are you sure? Krakens are dangerous...');
                }
                return value;
            },
        },
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
    // essentials
    (0, s_pack_essentials_1.default)();
    // features
    (0, s_page_transition_feature_1.define)();
    (0, s_template_feature_1.define)();
    (0, s_parallax_feature_1.define)();
    // components
    (0, s_code_example_component_1.define)({
        cssDeps: ['global', '/dist/css/partials/sCodeExample.css'],
    });
    (0, s_filtrable_input_component_1.define)();
    (0, s_panel_component_1.define)();
    (0, s_rating_component_1.define)();
    (0, s_color_picker_component_1.define)();
    (0, s_datetime_picker_component_1.define)();
    (0, s_google_map_component_1.define)();
    (0, s_theme_switcher_component_1.define)();
    // Website specific
    // __CKRatingsComponent();
    // __CKWelcomeRatingsComponent();
    (0, CKSearch_1.define)();
    (0, CkSettings_1.define)();
    (0, CKDiscover_1.define)();
    (0, CKDiscoverWelcome_1.define)();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0ZBQWdFO0FBRWhFLHFGQUFpRztBQUNqRyxxRkFBaUc7QUFDakcsNEVBQXFEO0FBQ3JELDJGQUF1RztBQUN2RywyRkFBdUc7QUFDdkcsaUZBQTZGO0FBQzdGLG9GQUE0RDtBQUM1RCx1RUFBd0Y7QUFDeEYseUVBQXNGO0FBQ3RGLHlGQUFxRztBQUVyRyx3RUFBaUQ7QUFDakQsdUZBQW1HO0FBQ25HLHlFQUFzRjtBQUN0Rix5RUFBc0Y7QUFFdEYsbUJBQW1CO0FBQ25CLHdEQUEwRTtBQUMxRSxrRUFBb0Y7QUFDcEYsc0VBQXdGO0FBQ3hGLG9EQUFzRTtBQUN0RSx3REFBMEU7QUFDMUUsMEVBQTBFO0FBQzFFLHlGQUF5RjtBQUV6RixPQUFPO0FBQ1Asb0VBQTZDO0FBRTdDLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUUvRCxtQkFBbUI7QUFDbkIsYUFBYTtBQUNiLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFaEUsQ0FBQyxHQUFTLEVBQUU7SUFDUixtQkFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7UUFDNUIsU0FBUyxFQUFFLGNBQWM7UUFDekIsa0NBQWtDO0tBQ3JDLENBQUMsQ0FBQztJQUNILG1CQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBRTtRQUM1QyxpQkFBaUIsRUFBRTtZQUNmLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxLQUFLLEtBQUssY0FBYyxFQUFFO29CQUMxQixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQ2xCLHdDQUF3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