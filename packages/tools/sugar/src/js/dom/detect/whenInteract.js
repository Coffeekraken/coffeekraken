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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbkludGVyYWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2hlbkludGVyYWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQWdEdEUsTUFBTSxDQUFDLE9BQU8sVUFBVSxZQUFZLENBQ2hDLEdBQWdCLEVBQ2hCLFFBQXlDO0lBRXpDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsUUFBUSxHQUEwQixXQUFXLENBQ3pDO1lBQ0ksS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxJQUFJO2dCQUNWLEdBQUcsRUFBRSxJQUFJO2dCQUNULEtBQUssRUFBRSxJQUFJO2FBQ2Q7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsR0FBRyxFQUFFLElBQUk7YUFDWjtZQUNELEtBQUssRUFBRSxJQUFJO1NBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7UUFFRixTQUFTLFVBQVUsQ0FBQyxXQUFXO1lBQzNCLHdCQUF3QjtZQUN4QixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFckIsR0FBRyxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNoRCxHQUFHLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNsRCxHQUFHLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBRUQsU0FBUyxTQUFTLENBQUMsQ0FBQztZQUNoQixVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUNELElBQUksUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDaEQsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNoRDtRQUVELFNBQVMsUUFBUSxDQUFDLENBQUM7WUFDZixVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUNELElBQUksUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDL0MsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM5QztRQUVELFNBQVMsS0FBSyxDQUFDLENBQUM7WUFDWixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUNELElBQUksUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDakQsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN4QztRQUVELFNBQVMsVUFBVSxDQUFDLENBQUM7WUFDakIsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ2pELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDbEQ7UUFFRCxTQUFTLFFBQVEsQ0FBQyxDQUFDO1lBQ2YsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ2pELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDOUM7UUFFRCxTQUFTLEtBQUssQ0FBQyxDQUFDO1lBQ1osVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ3pCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMxQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9