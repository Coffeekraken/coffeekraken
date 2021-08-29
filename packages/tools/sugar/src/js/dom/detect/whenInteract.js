// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
export default function whenInteract(elm, settings) {
    return new Promise((resolve, reject) => {
        settings = __deepMerge({
            mouse: {
                over: true,
                out: true,
                click: true,
            },
            touch: {
                start: true,
                end: true,
            },
            focus: true,
        }, settings !== null && settings !== void 0 ? settings : {});
        function interacted(interaction) {
            // resolving the promise
            resolve(interaction);
            elm.removeEventListener('mouseover', mouseover);
            elm.removeEventListener('mouseout', mouseout);
            elm.removeEventListener('click', click);
            elm.removeEventListener('touchstart', touchstart);
            elm.removeEventListener('touchend', touchend);
            elm.removeEventListener('focus', focus);
            elm.removeEventListener('focusin', focus);
        }
        function mouseover(e) {
            interacted('mouseover');
        }
        if (settings.mouse === true || settings.mouse.over) {
            elm.addEventListener('mouseover', mouseover);
        }
        function mouseout(e) {
            interacted('mouseout');
        }
        if (settings.mouse === true || settings.mouse.out) {
            elm.addEventListener('mouseout', mouseout);
        }
        function click(e) {
            interacted('click');
        }
        if (settings.mouse === true || settings.mouse.click) {
            elm.addEventListener('click', click);
        }
        function touchstart(e) {
            interacted('touchstart');
        }
        if (settings.touch === true || settings.touch.start) {
            elm.addEventListener('touchstart', touchstart);
        }
        function touchend(e) {
            interacted('touchend');
        }
        if (settings.touch === true || settings.touch.start) {
            elm.addEventListener('touchend', touchend);
        }
        function focus(e) {
            interacted('focus');
        }
        if (settings.focus === true) {
            elm.addEventListener('focus', focus);
            elm.addEventListener('focusin', focus);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbkludGVyYWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2hlbkludGVyYWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQWlEdEUsTUFBTSxDQUFDLE9BQU8sVUFBVSxZQUFZLENBQUMsR0FBZ0IsRUFBRSxRQUF5QztJQUM1RixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLFFBQVEsR0FBMEIsV0FBVyxDQUN6QztZQUNJLEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsSUFBSTtnQkFDVixHQUFHLEVBQUUsSUFBSTtnQkFDVCxLQUFLLEVBQUUsSUFBSTthQUNkO1lBQ0QsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxJQUFJO2dCQUNYLEdBQUcsRUFBRSxJQUFJO2FBQ1o7WUFDRCxLQUFLLEVBQUUsSUFBSTtTQUNkLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO1FBRUYsU0FBUyxVQUFVLENBQUMsV0FBVztZQUMzQix3QkFBd0I7WUFDeEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXJCLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDaEQsR0FBRyxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM5QyxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDbEQsR0FBRyxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM5QyxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUVELFNBQVMsU0FBUyxDQUFDLENBQUM7WUFDaEIsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2hELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDaEQ7UUFFRCxTQUFTLFFBQVEsQ0FBQyxDQUFDO1lBQ2YsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQy9DLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDOUM7UUFFRCxTQUFTLEtBQUssQ0FBQyxDQUFDO1lBQ1osVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ2pELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDeEM7UUFFRCxTQUFTLFVBQVUsQ0FBQyxDQUFDO1lBQ2pCLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNqRCxHQUFHLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsU0FBUyxRQUFRLENBQUMsQ0FBQztZQUNmLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQixDQUFDO1FBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNqRCxHQUFHLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsU0FBUyxLQUFLLENBQUMsQ0FBQztZQUNaLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtZQUN6QixHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDMUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==