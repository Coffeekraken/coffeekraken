// import '@coffeekraken/s-inline-svg-component';
// import '@coffeekraken/s-request-component';
import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
// import {
//     define as __SConfigExplorerWebcomponent,
// } from '@coffeekraken/s-config-explorer-component';
import { define as __SSidePanelWebcomponent } from '@coffeekraken/s-side-panel-component';
import { define as __SDatePickerWebcomponent } from '@coffeekraken/s-date-picker-component';
import { define as __SColorPickerWebcomponent } from '@coffeekraken/s-color-picker-component';
import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import { define as __DocNavComponent } from './components/docNav';
import { define as __VersionSelector } from './components/VersionSelector';
import { define as __CkSettingsWebcomponent } from './components/CkSettings';
import { register as __sActivateFeature } from '@coffeekraken/s-activate-feature';
// internal components
__DocNavComponent();
__VersionSelector();
__CkSettingsWebcomponent();
__SLitComponent.setDefaultProps('*', {
    mountWhen: 'inViewport',
    defaultStyle: true,
});
__SLitComponent.setDefaultProps(['s-side-panel', 'ck-settings'], {
    mountWhen: 'direct',
});
// webcomponents
__SCodeExampleWebcomponent();
// __SConfigExplorerWebcomponent();
__SSidePanelWebcomponent();
__SColorPickerWebcomponent();
__SDatePickerWebcomponent();
__SRangeWebcomponent();
// features
import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';
import __linksStateAttributes from '@coffeekraken/sugar/js/feature/linksStateAttributes';
__sActivateFeature();
__smoothScroll({
    scroll: {
        offset: 188,
    },
});
__linksStateAttributes();
// // document.addEventListener('scroll', (e) => {
// //     if (document.body.scrollTop >= 10) {
// //         document.body.classList.add('scrolled');
// //     } else {
// //         document.body.classList.remove('scrolled');
// //     }
// // });
__expandPleasantCssClassnamesLive();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpREFBaUQ7QUFDakQsOENBQThDO0FBQzlDLE9BQU8sRUFBRSxNQUFNLElBQUksMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RixXQUFXO0FBQ1gsK0NBQStDO0FBQy9DLHNEQUFzRDtBQUN0RCxPQUFPLEVBQUUsTUFBTSxJQUFJLHdCQUF3QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDMUYsT0FBTyxFQUFFLE1BQU0sSUFBSSx5QkFBeUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzVGLE9BQU8sRUFBRSxNQUFNLElBQUksMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RixPQUFPLEVBQUUsTUFBTSxJQUFJLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDakYsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxpQ0FBaUMsTUFBTSw2REFBNkQsQ0FBQztBQUU1RyxPQUFPLEVBQUUsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEUsT0FBTyxFQUFFLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxNQUFNLElBQUksd0JBQXdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU3RSxPQUFPLEVBQUUsUUFBUSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFbEYsc0JBQXNCO0FBQ3RCLGlCQUFpQixFQUFFLENBQUM7QUFDcEIsaUJBQWlCLEVBQUUsQ0FBQztBQUNwQix3QkFBd0IsRUFBRSxDQUFDO0FBRTNCLGVBQWUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO0lBQ2pDLFNBQVMsRUFBRSxZQUFZO0lBQ3ZCLFlBQVksRUFBRSxJQUFJO0NBQ3JCLENBQUMsQ0FBQztBQUNILGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLEVBQUU7SUFDN0QsU0FBUyxFQUFFLFFBQVE7Q0FDdEIsQ0FBQyxDQUFDO0FBRUgsZ0JBQWdCO0FBQ2hCLDBCQUEwQixFQUFFLENBQUM7QUFDN0IsbUNBQW1DO0FBQ25DLHdCQUF3QixFQUFFLENBQUM7QUFDM0IsMEJBQTBCLEVBQUUsQ0FBQztBQUM3Qix5QkFBeUIsRUFBRSxDQUFDO0FBQzVCLG9CQUFvQixFQUFFLENBQUM7QUFFdkIsV0FBVztBQUNYLE9BQU8sY0FBYyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3pFLE9BQU8sc0JBQXNCLE1BQU0scURBQXFELENBQUM7QUFFekYsa0JBQWtCLEVBQUUsQ0FBQztBQUVyQixjQUFjLENBQUM7SUFDWCxNQUFNLEVBQUU7UUFDSixNQUFNLEVBQUUsR0FBRztLQUNkO0NBQ0osQ0FBQyxDQUFDO0FBQ0gsc0JBQXNCLEVBQUUsQ0FBQztBQUV6QixrREFBa0Q7QUFDbEQsOENBQThDO0FBQzlDLHNEQUFzRDtBQUN0RCxrQkFBa0I7QUFDbEIseURBQXlEO0FBQ3pELFdBQVc7QUFDWCxTQUFTO0FBRVQsaUNBQWlDLEVBQUUsQ0FBQyJ9