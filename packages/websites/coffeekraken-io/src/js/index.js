import '@coffeekraken/s-inline-svg-component';
import '@coffeekraken/s-activate-component';
import "@coffeekraken/s-filtrable-input-component";
import "@coffeekraken/s-request-component";
import "@coffeekraken/s-code-example-component";
import "@coffeekraken/s-opengraph-viewer-component";
// import "@coffeekraken/s-handlebars-component";
import __SComponentUtils from "@coffeekraken/s-component-utils";
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
import './components/docNav.riot';
// generic
import "./generic/docShortcut";
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
__SComponentUtils.setDefaultProps('s-code-example', {
    toolbarPosition: 'nav',
    defaultStyle: true,
    defaultStyleClasses: {
        main: 's-tabs'
    }
});
__querySelectorLive('[class*=":"]', ($elm) => {
    $elm.getAttribute('class').split(' ').forEach((cls) => {
        if (!cls.includes(':'))
            return;
        const parts = cls.split(":");
        const startCls = parts[0];
        $elm.classList.add(startCls);
        parts.forEach((p, i) => {
            if (i <= 0)
                return;
            $elm.classList.add(`${startCls}--${p}`);
        });
        $elm.classList.remove(cls);
    });
}, {
    once: false
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sb0NBQW9DLENBQUM7QUFDNUMsT0FBTywyQ0FBMkMsQ0FBQztBQUNuRCxPQUFPLG1DQUFtQyxDQUFDO0FBQzNDLE9BQU8sd0NBQXdDLENBQUM7QUFDaEQsT0FBTyw0Q0FBNEMsQ0FBQztBQUNwRCxpREFBaUQ7QUFDakQsT0FBTyxpQkFBaUIsTUFBTSxpQ0FBaUMsQ0FBQztBQUNoRSxPQUFPLG1CQUFtQixNQUFNLG9EQUFvRCxDQUFDO0FBRXJGLE9BQU8sMEJBQTBCLENBQUM7QUFFbEMsVUFBVTtBQUNWLE9BQU8sdUJBQXVCLENBQUM7QUFFL0IsV0FBVztBQUNYLE9BQU8sY0FBYyxNQUFNLDZDQUE2QyxDQUFDO0FBRXpFLFdBQVc7QUFDWCxjQUFjLENBQUM7SUFDYixNQUFNLEVBQUU7UUFDTixNQUFNLEVBQUUsR0FBRztLQUNaO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3hDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxFQUFFO1FBQ2pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN6QztTQUFNO1FBQ0wsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzVDO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUU7SUFDaEQsZUFBZSxFQUFFLEtBQUs7SUFDdEIsWUFBWSxFQUFFLElBQUk7SUFDbEIsbUJBQW1CLEVBQUU7UUFDakIsSUFBSSxFQUFFLFFBQVE7S0FDakI7Q0FDSixDQUFDLENBQUM7QUFFSCxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNyRCxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPO1FBQy9CLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFBRSxPQUFPO1lBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsRUFBRTtJQUNELElBQUksRUFBRSxLQUFLO0NBQ1osQ0FBQyxDQUFDIn0=