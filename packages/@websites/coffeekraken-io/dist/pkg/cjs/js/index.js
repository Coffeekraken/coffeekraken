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
const CKVersionSelector_1 = require("./components/CKVersionSelector");
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
    (0, CKVersionSelector_1.define)();
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
        $elm.setAttribute('intensity', '0.1');
        $elm.setAttribute('s-highlight', 'light');
    });
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0ZBQWdFO0FBRWhFLHFGQUFpRztBQUNqRyxxRkFBaUc7QUFDakcsd0RBQXdEO0FBQ3hELDJGQUF1RztBQUN2RywyRkFBdUc7QUFDdkcsaUZBQTZGO0FBQzdGLG9GQUE0RDtBQUM1RCx1RUFBd0Y7QUFDeEYseUVBQXNGO0FBQ3RGLHlFQUFzRjtBQUN0Rix5RkFBcUc7QUFFckcsd0VBQWlEO0FBQ2pELHFGQUFxRjtBQUNyRiwyRUFBd0Y7QUFDeEYsaUVBQThFO0FBQzlFLHVGQUFtRztBQUNuRyx5RUFBc0Y7QUFFdEYsbUJBQW1CO0FBQ25CLHdEQUEwRTtBQUMxRSxrRUFBb0Y7QUFDcEYsc0VBQXdGO0FBQ3hGLG9EQUFzRTtBQUN0RSx3REFBMEU7QUFDMUUsc0VBQStFO0FBQy9FLDBFQUEwRTtBQUMxRSx5RkFBeUY7QUFFekYsaURBR2lDO0FBRWpDLE9BQU87QUFDUCxvRUFBNkM7QUFFN0MsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRS9ELG1CQUFtQjtBQUNuQixhQUFhO0FBQ2IsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUVoRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO0lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLHdCQUF3QjtRQUN4QixJQUFBLHlCQUFtQixHQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7Q0FDTjtBQUVELENBQUMsR0FBUyxFQUFFO0lBQ1IsbUJBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO1FBQzVCLFNBQVMsRUFBRSxjQUFjO1FBQ3pCLGtDQUFrQztLQUNyQyxDQUFDLENBQUM7SUFDSCxtQkFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQ3hDLE9BQU8sRUFBRSxHQUFHO0tBQ2YsQ0FBQyxDQUFDO0lBQ0gsbUJBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1FBQzVDLGlCQUFpQixFQUFFO1lBQ2YsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO2dCQUM3QixJQUFJLEtBQUssS0FBSyxjQUFjLEVBQUU7b0JBQzFCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FDbEIsd0NBQXdDLENBQzNDLENBQUM7aUJBQ0w7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQztTQUNKO0tBQ0osQ0FBQyxDQUFDO0lBQ0gseUJBQWUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO1FBQ2pDLFNBQVMsRUFBRSxjQUFjO1FBQ3pCLGtDQUFrQztLQUNyQyxDQUFDLENBQUM7SUFDSCx5QkFBZSxDQUFDLGVBQWUsQ0FDM0IsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQyxFQUMxRDtRQUNJLFNBQVMsRUFBRSxVQUFVO1FBQ3JCLGtDQUFrQztLQUNyQyxDQUNKLENBQUM7SUFDRix5QkFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsRUFBRTtRQUN4RCxTQUFTLEVBQUUsUUFBUTtLQUN0QixDQUFDLENBQUM7SUFDSCx5QkFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDaEQsZ0JBQWdCLEVBQUU7WUFDZCxNQUFNLEVBQUUsR0FBRztTQUNkO1FBQ0QsVUFBVSxFQUFFO1lBQ1IsTUFBTSxFQUFFO2dCQUNKLEtBQUssRUFBRSxDQUFDO2FBQ1g7U0FDSjtLQUNKLENBQUMsQ0FBQztJQUVILGFBQWE7SUFDYixpQkFBUSxDQUFDLElBQUksQ0FBQztRQUNWLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUMsQ0FBQztJQUVILGFBQWE7SUFDYixJQUFBLDJCQUFpQixHQUFFLENBQUM7SUFFcEIsV0FBVztJQUNYLElBQUEsa0NBQThCLEdBQUUsQ0FBQztJQUNqQyxJQUFBLHVCQUFvQixHQUFFLENBQUM7SUFDdkIsSUFBQSwyQkFBd0IsR0FBRSxDQUFDO0lBQzNCLElBQUEsNEJBQXlCLEdBQUUsQ0FBQztJQUM1Qiw0QkFBNEI7SUFFNUIsYUFBYTtJQUNiLElBQUEsaUNBQTZCLEdBQUUsQ0FBQztJQUNoQyxJQUFBLDJCQUF3QixHQUFFLENBQUM7SUFDM0IsSUFBQSxvQ0FBZ0MsR0FBRSxDQUFDO0lBQ25DLElBQUEsMEJBQTJCLEdBQUUsQ0FBQztJQUM5QixJQUFBLDJCQUF3QixHQUFFLENBQUM7SUFDM0IsSUFBQSxpQ0FBNkIsR0FBRSxDQUFDO0lBQ2hDLElBQUEsb0NBQWdDLEdBQUUsQ0FBQztJQUNuQyxJQUFBLCtCQUEyQixHQUFFLENBQUM7SUFDOUIsSUFBQSxtQ0FBK0IsR0FBRSxDQUFDO0lBRWxDLG1CQUFtQjtJQUNuQiwwQkFBMEI7SUFDMUIsaUNBQWlDO0lBQ2pDLElBQUEsaUJBQW1CLEdBQUUsQ0FBQztJQUN0QixJQUFBLG1CQUFxQixHQUFFLENBQUM7SUFDeEIsSUFBQSxtQkFBcUIsR0FBRSxDQUFDO0lBQ3hCLElBQUEsMEJBQTRCLEdBQUUsQ0FBQztJQUMvQixJQUFBLHdCQUEwQixHQUFFLENBQUM7SUFDN0IsSUFBQSwwQkFBbUIsR0FBRSxDQUFDO0lBRXRCLFlBQVk7SUFDWix1Q0FBdUM7SUFDdkMsaUJBQWlCO0lBQ2pCLG9CQUFvQjtJQUNwQiwrQkFBK0I7SUFDL0IsZ0NBQWdDO0lBQ2hDLCtCQUErQjtJQUMvQixvQ0FBb0M7SUFDcEMsaURBQWlEO0lBQ2pELHVDQUF1QztJQUN2QywrQkFBK0I7SUFDL0IsaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixhQUFhO0lBQ2IsV0FBVztJQUNYLFNBQVM7SUFDVCxPQUFPO0lBQ1AsTUFBTTtJQUVOLHlCQUF5QjtJQUN6QixJQUFBLHlCQUFtQixFQUFDLDBCQUEwQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMifQ==