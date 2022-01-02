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
import { define as __sSugarFeature } from '@coffeekraken/s-sugar-feature';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __sParallaxFeature } from '@coffeekraken/s-parallax-feature';
import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
import { define as __SSidePanelWebcomponent } from '@coffeekraken/s-side-panel-component';
import __linksStateAttributes from '@coffeekraken/sugar/js/feature/linksStateAttributes';
// features
import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import { define as __CKBlobComponent } from './components/CkBlob';
import { define as __CKDiscoverComponent } from './components/CKDiscover';
import { define as __CKSearchComponent } from './components/CKSearch';
import { define as __CKSettingsComponent } from './components/CkSettings';
import { define as __VersionSelector } from './components/VersionSelector';
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
(() => __awaiter(void 0, void 0, void 0, function* () {
    __SLitComponent.setDefaultProps('*', {
        mountWhen: 'nearViewport',
    });
    __SLitComponent.setDefaultProps(['s-side-panel', 'ck-settings'], {
        mountWhen: 'direct',
    });
    // layout related
    __expandPleasantCssClassnamesLive();
    // features
    __sActivateFeature();
    // internal components
    __VersionSelector();
    __CKSearchComponent();
    __CKBlobComponent();
    __smoothScroll({
        scroll: {
            offset: 188,
        },
    });
    __linksStateAttributes();
    // await __wait(1500);
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
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTyxFQUFFLE1BQU0sSUFBSSwwQkFBMEIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxNQUFNLElBQUksMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RixPQUFPLEVBQUUsTUFBTSxJQUFJLHlCQUF5QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDNUYsT0FBTyxFQUFFLE1BQU0sSUFBSSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxNQUFNLElBQUksZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDMUUsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLE1BQU0sSUFBSSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxNQUFNLElBQUksb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsTUFBTSxJQUFJLHdCQUF3QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDMUYsT0FBTyxzQkFBc0IsTUFBTSxxREFBcUQsQ0FBQztBQUN6RixXQUFXO0FBQ1gsT0FBTyxjQUFjLE1BQU0sNkNBQTZDLENBQUM7QUFDekUsT0FBTyxpQ0FBaUMsTUFBTSw2REFBNkQsQ0FBQztBQUU1RyxPQUFPLEVBQUUsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEUsT0FBTyxFQUFFLE1BQU0sSUFBSSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxNQUFNLElBQUksbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsTUFBTSxJQUFJLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDMUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTNFLGFBQWE7QUFDYixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRS9ELENBQUMsR0FBUyxFQUFFO0lBQ1IsZUFBZSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7UUFDakMsU0FBUyxFQUFFLGNBQWM7S0FDNUIsQ0FBQyxDQUFDO0lBQ0gsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsRUFBRTtRQUM3RCxTQUFTLEVBQUUsUUFBUTtLQUN0QixDQUFDLENBQUM7SUFFSCxpQkFBaUI7SUFDakIsaUNBQWlDLEVBQUUsQ0FBQztJQUVwQyxXQUFXO0lBQ1gsa0JBQWtCLEVBQUUsQ0FBQztJQUVyQixzQkFBc0I7SUFDdEIsaUJBQWlCLEVBQUUsQ0FBQztJQUNwQixtQkFBbUIsRUFBRSxDQUFDO0lBQ3RCLGlCQUFpQixFQUFFLENBQUM7SUFFcEIsY0FBYyxDQUFDO1FBQ1gsTUFBTSxFQUFFO1lBQ0osTUFBTSxFQUFFLEdBQUc7U0FDZDtLQUNKLENBQUMsQ0FBQztJQUNILHNCQUFzQixFQUFFLENBQUM7SUFFekIsc0JBQXNCO0lBRXRCLGFBQWE7SUFDYixxQkFBcUIsRUFBRSxDQUFDO0lBQ3hCLHFCQUFxQixFQUFFLENBQUM7SUFDeEIsMEJBQTBCLEVBQUUsQ0FBQztJQUM3Qix3QkFBd0IsRUFBRSxDQUFDO0lBQzNCLDBCQUEwQixFQUFFLENBQUM7SUFDN0IseUJBQXlCLEVBQUUsQ0FBQztJQUM1QixvQkFBb0IsRUFBRSxDQUFDO0lBRXZCLHNCQUFzQjtJQUV0QixXQUFXO0lBQ1gsZUFBZSxFQUFFLENBQUM7SUFDbEIsa0JBQWtCLEVBQUUsQ0FBQztJQUNyQixzQkFBc0IsQ0FBQztRQUNuQixpQkFBaUIsRUFBRTtZQUNmLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxLQUFLLEtBQUssY0FBYyxFQUFFO29CQUMxQixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQ2xCLHdDQUF3QyxDQUMzQyxDQUFDO2lCQUNMO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUM7U0FDSjtLQUNKLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9