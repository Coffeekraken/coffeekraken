import '@coffeekraken/s-inline-svg-component';
import "@coffeekraken/s-request-component";
import { webcomponent as __SCodeExampleWebcomponent } from "@coffeekraken/s-code-example-component";
import { webcomponent as __SActivateWebcomponent } from "@coffeekraken/s-activate-component";
import { webcomponent as __SConfigExplorerWebcomponent } from "@coffeekraken/s-config-explorer-component";
import { webcomponent as __SSidePanelWebcomponent } from "@coffeekraken/s-side-panel-component";
import { webcomponent as __SColorPickerWebcomponent } from "@coffeekraken/s-color-picker-component";
import __SComponentUtils from "@coffeekraken/s-component-utils";
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import { webcomponent as __DocNavComponent } from './components/docNav';
import { webcomponent as __VersionSelector } from './components/VersionSelector';
import { webcomponent as __CkSettingsWebcomponent } from './components/CkSettings';
// generic
// import "./generic/docShortcut";
// internal components
__DocNavComponent();
__VersionSelector();
__CkSettingsWebcomponent();
__SComponentUtils.setDefaultProps('*', {
    // mountWhen: 'inViewport',
    defaultStyle: true
});
// __SComponentUtils.setDefaultProps(['s-side-panel', 'ck-settings'], {
//   mountWhen: 'direct'
// });
__SComponentUtils.setDefaultProps('s-code-example', {
    toolbarPosition: 'nav',
    defaultStyleClasses: {
        main: 's-tabs'
    }
});
// webcomponents
__SCodeExampleWebcomponent();
__SActivateWebcomponent();
__SConfigExplorerWebcomponent();
__SSidePanelWebcomponent();
__SColorPickerWebcomponent();
// features
import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';
import __linksStateAttributes from '@coffeekraken/sugar/js/feature/linksStateAttributes';
// features
__smoothScroll({
    scroll: {
        offset: 188
    }
});
__linksStateAttributes();
document.addEventListener('scroll', (e) => {
    if (document.body.scrollTop >= 10) {
        document.body.classList.add('scrolled');
    }
    else {
        document.body.classList.remove('scrolled');
    }
});
__expandPleasantCssClassnamesLive();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sbUNBQW1DLENBQUM7QUFDM0MsT0FBZ0MsRUFBRSxZQUFZLElBQUksMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3SCxPQUE2QixFQUFFLFlBQVksSUFBSSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25ILE9BQTBCLEVBQUUsWUFBWSxJQUFJLDZCQUE2QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0gsT0FBcUIsRUFBRSxZQUFZLElBQUksd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RyxPQUFPLEVBQUUsWUFBWSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEcsT0FBTyxpQkFBaUIsTUFBTSxpQ0FBaUMsQ0FBQztBQUNoRSxPQUFPLGlDQUFpQyxNQUFNLDZEQUE2RCxDQUFDO0FBRTVHLE9BQU8sRUFBRSxZQUFZLElBQUksaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakYsT0FBTyxFQUFFLFlBQVksSUFBSSx3QkFBd0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRW5GLFVBQVU7QUFDVixrQ0FBa0M7QUFFbEMsc0JBQXNCO0FBQ3RCLGlCQUFpQixFQUFFLENBQUM7QUFDcEIsaUJBQWlCLEVBQUUsQ0FBQztBQUNwQix3QkFBd0IsRUFBRSxDQUFDO0FBRTNCLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7SUFDckMsMkJBQTJCO0lBQzNCLFlBQVksRUFBRSxJQUFJO0NBQ25CLENBQUMsQ0FBQztBQUNILHVFQUF1RTtBQUN2RSx3QkFBd0I7QUFDeEIsTUFBTTtBQUNOLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRTtJQUNoRCxlQUFlLEVBQUUsS0FBSztJQUN0QixtQkFBbUIsRUFBRTtRQUNqQixJQUFJLEVBQUUsUUFBUTtLQUNqQjtDQUNKLENBQUMsQ0FBQztBQUVILGdCQUFnQjtBQUNoQiwwQkFBMEIsRUFBRSxDQUFDO0FBQzdCLHVCQUF1QixFQUFFLENBQUM7QUFDMUIsNkJBQTZCLEVBQUUsQ0FBQztBQUNoQyx3QkFBd0IsRUFBRSxDQUFDO0FBQzNCLDBCQUEwQixFQUFFLENBQUM7QUFFN0IsV0FBVztBQUNYLE9BQU8sY0FBYyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3pFLE9BQU8sc0JBQXNCLE1BQU0scURBQXFELENBQUM7QUFFekYsV0FBVztBQUNYLGNBQWMsQ0FBQztJQUNiLE1BQU0sRUFBRTtRQUNOLE1BQU0sRUFBRSxHQUFHO0tBQ1o7Q0FDRixDQUFDLENBQUM7QUFDSCxzQkFBc0IsRUFBRSxDQUFDO0FBRXpCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUN4QyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsRUFBRTtRQUNqQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDekM7U0FBTTtRQUNMLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUM1QztBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsaUNBQWlDLEVBQUUsQ0FBQyJ9