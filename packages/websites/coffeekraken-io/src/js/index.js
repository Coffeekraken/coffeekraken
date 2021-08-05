import '@coffeekraken/s-inline-svg-component';
import "@coffeekraken/s-request-component";
import { webcomponent as __SCodeExampleWebcomponent } from "@coffeekraken/s-code-example-component";
import { webcomponent as __SActivateWebcomponent } from "@coffeekraken/s-activate-component";
import { webcomponent as __SConfigExplorerWebcomponent } from "@coffeekraken/s-config-explorer-component";
import __SComponentUtils from "@coffeekraken/s-component-utils";
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import { webcomponent as __DocNavComponent } from './components/docNav';
import { webcomponent as __VersionSelector } from './components/VersionSelector';
// generic
// import "./generic/docShortcut";
// internal components
__DocNavComponent();
__VersionSelector();
__SComponentUtils.setDefaultProps('*', {
    mountWhen: 'inViewport'
});
__SComponentUtils.setDefaultProps('s-code-example', {
    toolbarPosition: 'nav',
    defaultStyle: true,
    defaultStyleClasses: {
        main: 's-tabs'
    }
});
// webcomponents
__SCodeExampleWebcomponent();
__SActivateWebcomponent();
__SConfigExplorerWebcomponent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sbUNBQW1DLENBQUM7QUFDM0MsT0FBZ0MsRUFBRSxZQUFZLElBQUksMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3SCxPQUE2QixFQUFFLFlBQVksSUFBSSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25ILE9BQTBCLEVBQUUsWUFBWSxJQUFJLDZCQUE2QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0gsT0FBTyxpQkFBaUIsTUFBTSxpQ0FBaUMsQ0FBQztBQUNoRSxPQUFPLGlDQUFpQyxNQUFNLDZEQUE2RCxDQUFDO0FBRTVHLE9BQU8sRUFBRSxZQUFZLElBQUksaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFakYsVUFBVTtBQUNWLGtDQUFrQztBQUVsQyxzQkFBc0I7QUFDdEIsaUJBQWlCLEVBQUUsQ0FBQztBQUNwQixpQkFBaUIsRUFBRSxDQUFDO0FBRXBCLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7SUFDckMsU0FBUyxFQUFFLFlBQVk7Q0FDeEIsQ0FBQyxDQUFDO0FBQ0gsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFO0lBQ2hELGVBQWUsRUFBRSxLQUFLO0lBQ3RCLFlBQVksRUFBRSxJQUFJO0lBQ2xCLG1CQUFtQixFQUFFO1FBQ2pCLElBQUksRUFBRSxRQUFRO0tBQ2pCO0NBQ0osQ0FBQyxDQUFDO0FBRUgsZ0JBQWdCO0FBQ2hCLDBCQUEwQixFQUFFLENBQUM7QUFDN0IsdUJBQXVCLEVBQUUsQ0FBQztBQUMxQiw2QkFBNkIsRUFBRSxDQUFDO0FBRWhDLFdBQVc7QUFDWCxPQUFPLGNBQWMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxPQUFPLHNCQUFzQixNQUFNLHFEQUFxRCxDQUFDO0FBRXpGLFdBQVc7QUFDWCxjQUFjLENBQUM7SUFDYixNQUFNLEVBQUU7UUFDTixNQUFNLEVBQUUsR0FBRztLQUNaO0NBQ0YsQ0FBQyxDQUFDO0FBQ0gsc0JBQXNCLEVBQUUsQ0FBQztBQUV6QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDeEMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLEVBQUU7UUFDakMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3pDO1NBQU07UUFDTCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDNUM7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILGlDQUFpQyxFQUFFLENBQUMifQ==