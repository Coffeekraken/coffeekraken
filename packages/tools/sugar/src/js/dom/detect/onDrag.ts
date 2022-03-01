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

export interface IOnDragTrackItem {
    x: number;
    y: number;
}

export default function onDrag($elm: HTMLElement, cb: Function): void {

    let isMouseDown = false;
    
    let startPos, endPos;

    const track: IOnDragTrackItem[] = [];

    $elm.addEventListener('mousedown', (e) => {
        // update status
        isMouseDown = true;
        // set the start position
        startPos = {
            x: e.offsetX,
            y: e.offsetY
        };
        cb?.({
            type: 'start',
            x: startPos.x,
            y: startPos.y
        });
    });
    $elm.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;

        track.push({
            x: e.offsetX,
            y: e.offsetY,
        });

        cb?.({
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
        cb?.({
            type: 'end',
            x: endPos.x,
            y: endPos.y
        });
    });
}