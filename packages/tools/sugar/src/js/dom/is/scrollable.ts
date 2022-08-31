/**
 * @name      scrollable
 * @namespace            js.dom.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Check if the passed element is scrollable or not
 *
 * @return    {Boolean}    true if is scrollable, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isScrollable from '@coffeekraken/sugar/js/dom/is/scrollable'
 * if (isScrollable($myElement)) {
 *   // do something
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IIsScrollableSettings {
    x: boolean;
    y: boolean;
}

export default function isScrollable(
    $elm: HTMLElement,
    settings?: Partial<IIsScrollableSettings>,
): boolean {
    settings = <IIsScrollableSettings>{
        x: true,
        y: true,
        ...(settings ?? {}),
    };

    const style = window.getComputedStyle($elm);
    var overflowY = style.overflowY.trim();
    var overflowX = style.overflowX.trim();

    if ($elm.classList.contains('s-slider__slides-wrapper')) {
        console.log('COCOCOC', overflowX, overflowY);
    }

    const dir = {
        vertical:
            (overflowY === 'scroll' || overflowY === 'auto') &&
            $elm.scrollHeight > $elm.clientHeight,
        horizontal:
            (overflowX === 'scroll' || overflowX === 'auto') &&
            $elm.scrollWidth > $elm.clientWidth,
    };

    if ($elm.classList.contains('s-slider__slides-wrapper')) {
        console.log('COCOCOCffefef', dir);

        if (settings.x && dir.horizontal) {
            console.log('HORIGIN');
        }
    }

    if (settings.x && dir.horizontal) return true;
    if (settings.y && dir.vertical) return true;
    return false;
}
