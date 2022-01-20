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
    setTimeout(() => {
        __linksStateAttributes();
    }, 1000);
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTyxFQUFFLE1BQU0sSUFBSSwwQkFBMEIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxNQUFNLElBQUksMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RixPQUFPLEVBQUUsTUFBTSxJQUFJLHlCQUF5QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDNUYsT0FBTyxFQUFFLE1BQU0sSUFBSSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsTUFBTSxJQUFJLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFFLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsTUFBTSxJQUFJLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDakYsT0FBTyxFQUFFLE1BQU0sSUFBSSx3QkFBd0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRTFGLFdBQVc7QUFDWCxPQUFPLGlDQUFpQyxNQUFNLDZEQUE2RCxDQUFDO0FBRTVHLE9BQU8sRUFBRSxNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsTUFBTSxJQUFJLHlCQUF5QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbEYsT0FBTyxFQUFFLE1BQU0sSUFBSSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzFFLE9B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