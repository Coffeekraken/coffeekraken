var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
import { define as __SColorPickerWebcomponent } from '@coffeekraken/s-color-picker-component';
import { define as __SDatePickerWebcomponent } from '@coffeekraken/s-date-picker-component';
import { define as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
import { define as __sSugarFeature } from '@coffeekraken/s-sugar-feature';
import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __sParallaxFeature } from '@coffeekraken/s-parallax-feature';
import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
import { define as __SSidePanelWebcomponent } from '@coffeekraken/s-side-panel-component';
// features
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import { define as __CKBlobComponent } from './components/CkBlob';
import { define as __CkFallingStarsComponent } from './components/CkFallingStars';
import { define as __CKDiscoverComponent } from './components/CKDiscover';
import { define as __CKSearchComponent } from './components/CKSearch';
import { define as __CKSettingsComponent } from './components/CkSettings';
import { define as __VersionSelector } from './components/VersionSelector';
// others
import __linksStateAttributes from '@coffeekraken/sugar/js/feature/linksStateAttributes';
import __SConductor from '@coffeekraken/s-conductor';
import __krakenLogo from './generic/krakenLogo';
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// setup conductor
__SConductor.setup({
    log: true,
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    __SLitComponent.setDefaultProps('*', {
        mountWhen: 'nearViewport',
    });
    __SLitComponent.setDefaultProps(['s-side-panel', 'ck-settings'], {
        mountWhen: 'direct',
    });
    __SLitComponent.setDefaultProps(['s-code-example'], {
        scrollToSettings: {
            offset: 100,
        }
    });
    // layout related
    __expandPleasantCssClassnamesLive();
    // features
    __sActivateFeature();
    // internal components
    __VersionSelector();
    __CKSearchComponent();
    __CKBlobComponent();
    __CkFallingStarsComponent();
    // await __wait(1500);
    // views related
    for (let [key, value] of Object.entries(viewsRelated)) {
        // @ts-ignore
        if (typeof value.default === 'function')
            value.default();
    }
    // components
    __CKDiscoverComponent();
    __CKSettingsComponent();
    __SCodeExampleWebcomponent();
    __SSidePanelWebcomponent();
    __SColorPickerWebcomponent();
    __SDatePickerWebcomponent();
    __SRangeWebcomponent();
    // await __wait(1000);
    // features
    __sSugarFeature();
    __sFloatingFeature();
    __sRefocusFeature();
    __sParallaxFeature();
    __sFormValidateFeature({
        customValidations: {
            coffeekraken: (value, helpers) => {
                if (value === 'coffeekraken') {
                    return helpers.message('Are you sure? Krakens are dangerous...');
                }
                return value;
            },
        },
    });
    __krakenLogo();
    setTimeout(() => {
        __linksStateAttributes();
    }, 1000);
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTyxFQUFFLE1BQU0sSUFBSSwwQkFBMEIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxNQUFNLElBQUksMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RixPQUFPLEVBQUUsTUFBTSxJQUFJLHlCQUF5QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDNUYsT0FBTyxFQUFFLE1BQU0sSUFBSSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsTUFBTSxJQUFJLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVoRixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsTUFBTSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTyxFQUFFLE1BQU0sSUFBSSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxNQUFNLElBQUksd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRixXQUFXO0FBQ1gsT0FBTyxpQ0FBaUMsTUFBTSw2REFBNkQsQ0FBQztBQUU1RyxPQUFPLEVBQUUsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEUsT0FBTyxFQUFFLE1BQU0sSUFBSSx5QkFBeUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2xGLE9B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