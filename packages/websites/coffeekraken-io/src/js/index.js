import '@coffeekraken/s-inline-svg-component';
import '@coffeekraken/s-activate-component';
import "@coffeekraken/s-filtrable-input-component";
import "@coffeekraken/s-request-component";
import { webcomponent as __SCodeExampleWebcomponent } from "@coffeekraken/s-code-example-component";
import "@coffeekraken/s-handlebars-component";
import __SComponentUtils from "@coffeekraken/s-component-utils";
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import { webcomponent as __docNavWebcomponent } from './components/docNav';
// generic
import "./generic/docShortcut";
__docNavWebcomponent();
__SComponentUtils.setDefaultProps('s-code-example', {
    toolbarPosition: 'nav',
    defaultStyle: true,
    defaultStyleClasses: {
        main: 's-tabs'
    }
});
// webcomponents
__SCodeExampleWebcomponent('s-code-example');
// features
import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';
// features
__smoothScroll({
    scroll: {
        offset: 188
    }
});
document.addEventListener('scroll', (e) => {
    if (document.body.scrollTop >= 10) {
        document.body.classList.add('scrolled');
    }
    else {
        document.body.classList.remove('scrolled');
    }
});
__expandPleasantCssClassnamesLive();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sb0NBQW9DLENBQUM7QUFDNUMsT0FBTywyQ0FBMkMsQ0FBQztBQUNuRCxPQUFPLG1DQUFtQyxDQUFDO0FBQzNDLE9BQWdDLEVBQUUsWUFBWSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0gsT0FBTyxzQ0FBc0MsQ0FBQztBQUM5QyxPQUFPLGlCQUFpQixNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8saUNBQWlDLE1BQU0sNkRBQTZELENBQUM7QUFFNUcsT0FBTyxFQUFFLFlBQVksSUFBSSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTNFLFVBQVU7QUFDVixPQUFPLHVCQUF1QixDQUFDO0FBRS9CLG9CQUFvQixFQUFFLENBQUM7QUFFdkIsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFO0lBQ2hELGVBQWUsRUFBRSxLQUFLO0lBQ3RCLFlBQVksRUFBRSxJQUFJO0lBQ2xCLG1CQUFtQixFQUFFO1FBQ2pCLElBQUksRUFBRSxRQUFRO0tBQ2pCO0NBQ0osQ0FBQyxDQUFDO0FBRUgsZ0JBQWdCO0FBQ2hCLDBCQUEwQixDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFFN0MsV0FBVztBQUNYLE9BQU8sY0FBYyxNQUFNLDZDQUE2QyxDQUFDO0FBRXpFLFdBQVc7QUFDWCxjQUFjLENBQUM7SUFDYixNQUFNLEVBQUU7UUFDTixNQUFNLEVBQUUsR0FBRztLQUNaO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3hDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxFQUFFO1FBQ2pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN6QztTQUFNO1FBQ0wsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzVDO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxpQ0FBaUMsRUFBRSxDQUFDIn0=