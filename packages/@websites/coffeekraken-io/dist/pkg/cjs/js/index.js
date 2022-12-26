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
// import __SDashboard from '@coffeekraken/s-dashboard';
const s_datetime_picker_component_1 = require("@coffeekraken/s-datetime-picker-component");
const s_filtrable_input_component_1 = require("@coffeekraken/s-filtrable-input-component");
const s_google_map_component_1 = require("@coffeekraken/s-google-map-component");
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_panel_component_1 = require("@coffeekraken/s-panel-component");
const s_rating_component_1 = require("@coffeekraken/s-rating-component");
const s_slider_component_1 = require("@coffeekraken/s-slider-component");
const s_theme_switcher_component_1 = require("@coffeekraken/s-theme-switcher-component");
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
// import { define as __SGlitchFeatureDefine } from '@coffeekraken/s-glitch-feature';
const s_highlight_feature_1 = require("@coffeekraken/s-highlight-feature");
const s_lazy_feature_1 = require("@coffeekraken/s-lazy-feature");
const s_page_transition_feature_1 = require("@coffeekraken/s-page-transition-feature");
const s_parallax_feature_1 = require("@coffeekraken/s-parallax-feature");
// Website specific
const CKDiscover_1 = require("./components/CKDiscover");
const CKDiscoverTabed_1 = require("./components/CKDiscoverTabed");
const CKDiscoverWelcome_1 = require("./components/CKDiscoverWelcome");
const CKSearch_1 = require("./components/CKSearch");
const CkSettings_1 = require("./components/CkSettings");
// import { define as __CKRatingsComponent } from './components/CKRating';
// import { define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings';
const dom_1 = require("@coffeekraken/sugar/dom");
// Libs
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
// Views specific
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// For doc specific
// @ts-ignore
const forDocRelated = import.meta.globEager('./forDoc/**/*.ts');
if (import.meta.hot) {
    import.meta.hot.on('sugar.update.css', (data) => {
        console.log('RELOAD', data);
        // perform custom update
        (0, dom_1.__reloadStylesheets)();
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    s_feature_1.default.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        // verbose: !__SEnv.is('devsCut'),
    });
    s_feature_1.default.setDefaultProps(['s-highlight'], {
        opacity: 0.3,
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
    (0, s_lazy_feature_1.define)();
    (0, s_parallax_feature_1.define)();
    (0, s_highlight_feature_1.define)();
    // __SGlitchFeatureDefine();
    // components
    (0, s_code_example_component_1.define)();
    (0, s_slider_component_1.define)();
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
    // const dashboard = new __SDashboard({
    //   dashboard: {
    //     components: {
    //       's-dashboard-pages': {
    //         onSelect: (page) => {
    //           dashboard.close();
    //           document.dispatchEvent(
    //             new CustomEvent('location.href', {
    //               detail: page.item.loc,
    //               bubbles: true,
    //             })
    //           );
    //         },
    //       },
    //     },
    //   },
    // });
    // code example highlight
    (0, dom_1.__querySelectorLive)('.s-code-example__content', ($elm) => {
        $elm.setAttribute('intensity', '0.2');
        $elm.setAttribute('s-highlight', 'light');
    });
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0ZBQWdFO0FBRWhFLHFGQUFpRztBQUNqRyxxRkFBaUc7QUFDakcsd0RBQXdEO0FBQ3hELDJGQUF1RztBQUN2RywyRkFBdUc7QUFDdkcsaUZBQTZGO0FBQzdGLG9GQUE0RDtBQUM1RCx1RUFBd0Y7QUFDeEYseUVBQXNGO0FBQ3RGLHlFQUFzRjtBQUN0Rix5RkFBcUc7QUFFckcsd0VBQWlEO0FBQ2pELHFGQUFxRjtBQUNyRiwyRUFBd0Y7QUFDeEYsaUVBQThFO0FBQzlFLHVGQUFtRztBQUNuRyx5RUFBc0Y7QUFFdEYsbUJBQW1CO0FBQ25CLHdEQUEwRTtBQUMxRSxrRUFBb0Y7QUFDcEYsc0VBQXdGO0FBQ3hGLG9EQUFzRTtBQUN0RSx3REFBMEU7QUFDMUUsMEVBQTBFO0FBQzFFLHlGQUF5RjtBQUV6RixpREFHaUM7QUFFakMsT0FBTztBQUNQLG9FQUE2QztBQUU3QyxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFL0QsbUJBQW1CO0FBQ25CLGFBQWE7QUFDYixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRWhFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7SUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUIsd0JBQXdCO1FBQ3hCLElBQUEseUJBQW1CLEdBQUUsQ0FBQztJQUN4QixDQUFDLENBQUMsQ0FBQztDQUNK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