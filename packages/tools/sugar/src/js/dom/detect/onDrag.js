/**
 * @name      onDrag
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @status          beta
 *
 * Detect drag "gesture" with the mouse or touch
 *
 * @setting     {Number}      [threshold=100]       The minimum distance the user has to swipe before detection
 *
 * @param       {HTMLElement}         elm         The HTMLElement on which to detect the swipe
 * @param       {Function}            cb          The function to call on swipe. The callback function has as parameter an object that containthe swipe direction like left, right, up and down
 * @param       {Number}              [threshold=100]       The swipe threshold
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import onSwipe from '@coffeekraken/sugar/js/dom/onSwipe'
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function onDrag($elm, cb) {
    let isMouseDown = false;
    let startPos, endPos;
    const track = [];
    $elm.addEventListener('mousedown', (e) => {
        // update status
        isMouseDown = true;
        // set the start position
        startPos = {
            x: e.offsetX,
            y: e.offsetY
        };
        cb === null || cb === void 0 ? void 0 : cb({
            type: 'start',
            x: startPos.x,
            y: startPos.y
        });
    });
    $elm.addEventListener('mousemove', (e) => {
        if (!isMouseDown)
            return;
        track.push({
            x: e.offsetX,
            y: e.offsetY,
        });
        cb === null || cb === void 0 ? void 0 : cb({
            type: 'track',
            deltaX: e.offsetX - startPos.x,
            deltaY: e.offsetY - startPos.y,
            track
        });
    });
    $elm.addEventListener('mouseup', (e) => {
        // update status
        isMouseDown = false;
        // set the end position
        endPos = {
            x: e.offsetX,
            y: e.offsetY
        };
        cb === null || cb === void 0 ? void 0 : cb({
            type: 'end',
            x: endPos.x,
            y: endPos.y
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25EcmFnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib25EcmFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBT0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxNQUFNLENBQUMsSUFBaUIsRUFBRSxFQUFZO0lBRTFELElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztJQUV4QixJQUFJLFFBQVEsRUFBRSxNQUFNLENBQUM7SUFFckIsTUFBTSxLQUFLLEdBQXVCLEVBQUUsQ0FBQztJQUVyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDckMsZ0JBQWdCO1FBQ2hCLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIseUJBQXlCO1FBQ3pCLFFBQVEsR0FBRztZQUNQLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTztZQUNaLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTztTQUNmLENBQUM7UUFDRixFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLENBQUc7WUFDRCxJQUFJLEVBQUUsT0FBTztZQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNoQixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNyQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU87UUFFekIsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNQLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTztZQUNaLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTztTQUNmLENBQUMsQ0FBQztRQUVILEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsQ0FBRztZQUNELElBQUksRUFBRSxPQUFPO1lBQ2IsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFDOUIsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFDOUIsS0FBSztTQUNSLENBQUMsQ0FBQztJQUVQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ25DLGdCQUFnQjtRQUNoQixXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLHVCQUF1QjtRQUN2QixNQUFNLEdBQUc7WUFDTCxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU87WUFDWixDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU87U0FDZixDQUFDO1FBQ0YsRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFHO1lBQ0QsSUFBSSxFQUFFLEtBQUs7WUFDWCxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDWCxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDZCxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==