// @ts-nocheck
import __uniqid from '../../../shared/string/uniqid';
export default function injectStyle(style, settings) {
    var _a;
    const finalSettings = Object.assign({ id: `injected-style-${__uniqid()}`, rootNode: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
    if (document.querySelector(`#${finalSettings.id}`))
        return;
    const $tag = document.createElement('style');
    $tag.type = 'text/css';
    $tag.setAttribute('id', finalSettings.id);
    $tag.innerHTML = style;
    if (finalSettings.rootNode) {
        finalSettings.rootNode.appendChild($tag);
    }
    else {
        const $firstLink = document.querySelector('head link[rel="stylesheet"]');
        if ($firstLink) {
            (_a = $firstLink.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore($tag, $firstLink);
        }
        else {
            document.head.appendChild($tag);
        }
    }
    return $tag;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFFBQVEsTUFBTSwrQkFBK0IsQ0FBQztBQWlDckQsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQy9CLEtBQWEsRUFDYixRQUF3Qzs7SUFFeEMsTUFBTSxhQUFhLEdBQUcsZ0JBQ2xCLEVBQUUsRUFBRSxrQkFBa0IsUUFBUSxFQUFFLEVBQUUsRUFDbEMsUUFBUSxFQUFFLFNBQVMsSUFDaEIsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUFFLE9BQU87SUFDM0QsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztJQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFFdkIsSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFO1FBQ3hCLGFBQWEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVDO1NBQU07UUFDSCxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNyQyw2QkFBNkIsQ0FDaEMsQ0FBQztRQUNGLElBQUksVUFBVSxFQUFFO1lBQ1osTUFBQSxVQUFVLENBQUMsYUFBYSwwQ0FBRSxZQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQzVEO2FBQU07WUFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztLQUNKO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9