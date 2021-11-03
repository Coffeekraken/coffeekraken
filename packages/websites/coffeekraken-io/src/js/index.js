// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// import '@coffeekraken/s-inline-svg-component';
// import '@coffeekraken/s-request-component';
import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
import { define as __SConfigExplorerWebcomponent } from '@coffeekraken/s-config-explorer-component';
import { define as __SSidePanelWebcomponent } from '@coffeekraken/s-side-panel-component';
import { define as __SDatePickerWebcomponent } from '@coffeekraken/s-date-picker-component';
import { define as __SColorPickerWebcomponent } from '@coffeekraken/s-color-picker-component';
import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import { define as __DocNavComponent } from './components/docNav';
import { define as __VersionSelector } from './components/VersionSelector';
import { define as __CKSearchComponent } from './components/CKSearch';
import { define as __CKSettingsComponent } from './components/CkSettings';
import { register as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import { register as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
// internal components
__DocNavComponent();
__VersionSelector();
__CKSearchComponent();
__CKSettingsComponent();
__SLitComponent.setDefaultProps('*', {
    mountWhen: 'inViewport',
    defaultStyle: true,
});
__SLitComponent.setDefaultProps(['s-side-panel', 'ck-settings'], {
    mountWhen: 'direct',
});
// webcomponents
__SCodeExampleWebcomponent();
__SConfigExplorerWebcomponent();
__SSidePanelWebcomponent();
__SColorPickerWebcomponent();
__SDatePickerWebcomponent();
__SRangeWebcomponent();
// features
import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';
import __linksStateAttributes from '@coffeekraken/sugar/js/feature/linksStateAttributes';
__sActivateFeature();
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
__smoothScroll({
    scroll: {
        offset: 188,
    },
});
__linksStateAttributes();
document.addEventListener('scroll', (e) => {
    if (window.scrollY >= 10) {
        document.body.classList.add('scrolled');
    }
    else {
        document.body.classList.remove('scrolled');
    }
});
__expandPleasantCssClassnamesLive();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxhQUFhO0FBQ2IsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUUvRCxpREFBaUQ7QUFDakQsOENBQThDO0FBQzlDLE9BQU8sRUFBRSxNQUFNLElBQUksMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RixPQUFPLEVBQUUsTUFBTSxJQUFJLDZCQUE2QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDcEcsT0FBTyxFQUFFLE1BQU0sSUFBSSx3QkFBd0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxNQUFNLElBQUkseUJBQXlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM1RixPQUFPLEVBQUUsTUFBTSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDOUYsT0FBTyxFQUFFLE1BQU0sSUFBSSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2pGLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8saUNBQWlDLE1BQU0sNkRBQTZELENBQUM7QUFFNUcsT0FBTyxFQUFFLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsTUFBTSxJQUFJLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEUsT0FBTyxFQUFFLE1BQU0sSUFBSSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTFFLE9BQU8sRUFBRSxRQUFRLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRixPQUFPLEVBQUUsUUFBUSxJQUFJLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFFM0Ysc0JBQXNCO0FBQ3RCLGlCQUFpQixFQUFFLENBQUM7QUFDcEIsaUJBQWlCLEVBQUUsQ0FBQztBQUNwQixtQkFBbUIsRUFBRSxDQUFDO0FBQ3RCLHFCQUFxQixFQUFFLENBQUM7QUFFeEIsZUFBZSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7SUFDakMsU0FBUyxFQUFFLFlBQVk7SUFDdkIsWUFBWSxFQUFFLElBQUk7Q0FDckIsQ0FBQyxDQUFDO0FBQ0gsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsRUFBRTtJQUM3RCxTQUFTLEVBQUUsUUFBUTtDQUN0QixDQUFDLENBQUM7QUFFSCxnQkFBZ0I7QUFDaEIsMEJBQTBCLEVBQUUsQ0FBQztBQUM3Qiw2QkFBNkIsRUFBRSxDQUFDO0FBQ2hDLHdCQUF3QixFQUFFLENBQUM7QUFDM0IsMEJBQTBCLEVBQUUsQ0FBQztBQUM3Qix5QkFBeUIsRUFBRSxDQUFDO0FBQzVCLG9CQUFvQixFQUFFLENBQUM7QUFFdkIsV0FBVztBQUNYLE9BQU8sY0FBYyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3pFLE9BQU8sc0JBQXNCLE1BQU0scURBQXFELENBQUM7QUFFekYsa0JBQWtCLEVBQUUsQ0FBQztBQUNyQixzQkFBc0IsQ0FBQztJQUNuQixpQkFBaUIsRUFBRTtRQUNmLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtZQUM3QixJQUFJLEtBQUssS0FBSyxjQUFjLEVBQUU7Z0JBQzFCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FDbEIsd0NBQXdDLENBQzNDLENBQUM7YUFDTDtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7S0FDSjtDQUNKLENBQUMsQ0FBQztBQUVILGNBQWMsQ0FBQztJQUNYLE1BQU0sRUFBRTtRQUNKLE1BQU0sRUFBRSxHQUFHO0tBQ2Q7Q0FDSixDQUFDLENBQUM7QUFDSCxzQkFBc0IsRUFBRSxDQUFDO0FBRXpCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUN0QyxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFO1FBQ3RCLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUMzQztTQUFNO1FBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzlDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxpQ0FBaUMsRUFBRSxDQUFDIn0=