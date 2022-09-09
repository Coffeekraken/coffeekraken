// @ts-nocheck
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
export default function __clearTransmations($elm = document.body, settings) {
    const cls = `s-clear-transmations-${__uniqid()}`;
    $elm.classList.add(cls);
    const $tag = document.createElement('style');
    $tag.type = 'text/css';
    $tag.innerHTML = `
        .${cls},
        .${cls}:before,
        .${cls}:after,
        .${cls} *,
        .${cls} *:before,
        .${cls} *:after {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild($tag);
    function reset() {
        $elm.classList.remove(cls);
        $tag.remove();
    }
    if (settings === null || settings === void 0 ? void 0 : settings.timeout) {
        setTimeout(() => {
            reset();
        }, settings.timeout);
    }
    return reset;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQXNDaEUsTUFBTSxDQUFDLE9BQU8sVUFBVSxtQkFBbUIsQ0FDdkMsT0FBb0IsUUFBUSxDQUFDLElBQUksRUFDakMsUUFBOEM7SUFFOUMsTUFBTSxHQUFHLEdBQUcsd0JBQXdCLFFBQVEsRUFBRSxFQUFFLENBQUM7SUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFeEIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztJQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHO1dBQ1YsR0FBRztXQUNILEdBQUc7V0FDSCxHQUFHO1dBQ0gsR0FBRztXQUNILEdBQUc7V0FDSCxHQUFHOzs7O0tBSVQsQ0FBQztJQUNGLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWhDLFNBQVMsS0FBSztRQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTyxFQUFFO1FBQ25CLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixLQUFLLEVBQUUsQ0FBQztRQUNaLENBQUMsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDeEI7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDIn0=