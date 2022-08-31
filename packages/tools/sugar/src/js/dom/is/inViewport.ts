// @ts-nocheck

/**
 * @name      inViewport
 * @namespace            js.dom.is
 * @type      Function
 * @platform          js
 * @status        beta
 * @async
 *
 * Check if the passed HTMLElement is in the viewport or not
 *
 * @param 		{HTMLElement} 				elm  			The element to insert
 * @param 		{Object} 					[offset=50] 	An object of top, right, bottom and left offset used to detect the status or an object with top, right, bottom and left offsets
 * @return 		{Boolean}									If the element is in the viewport or not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import inViewport from '@coffeekraken/sugar/js/dom/is/inViewport'
 * if (await inViewport(myCoolHTMLElement) {
 * 		// i'm in the viewport
 * }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IInViewport {}

export default function inViewport(
    elm: HTMLElement,
    settings: Partial<IInViewport> = {},
): boolean {
    settings = {
        ...settings,
    };

    const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop,
        scrollLeft =
            document.documentElement.scrollLeft || document.body.scrollLeft;

    const containerHeight =
            window.innerHeight || document.documentElement.clientHeight,
        containerWidth =
            window.innerWidth || document.documentElement.clientWidth,
        rect = elm.getBoundingClientRect();

    const top = rect.top - scrollTop,
        left = rect.left - scrollLeft,
        right = rect.right - scrollLeft,
        bottom = rect.bottom - scrollTop;

    const isTopIn = top - containerHeight <= 0,
        isBottomIn = bottom <= containerHeight,
        isLeftIn = left >= 0 && left <= containerWidth,
        isRightIn = right >= 0 && right <= containerWidth;

    // if at least top|bottom AND left|right
    if ((isTopIn || isBottomIn) && (isLeftIn || isRightIn)) {
        // if (elm.id === 'coco') {
        //     console.log('IN 1', rect, isTopIn, isRightIn, isBottomIn, isLeftIn);
        // }
        return true;
    }

    // is rect is bigger than viewport in all directions
    if (
        top <= 0 &&
        bottom >= containerHeight &&
        left <= 0 &&
        right >= containerWidth
    ) {
        // if (elm.id === 'coco') {
        //     console.log('IN 2');
        // }
        return true;
    }

    if (top <= 0 && bottom >= containerHeight && left <= 0 && isRightIn) {
        // if (elm.id === 'coco') {
        //     console.log('IN 3');
        // }
        return true;
    }

    if (
        top <= 0 &&
        bottom >= containerHeight &&
        right >= containerWidth &&
        isLeftIn
    ) {
        // if (elm.id === 'coco') {
        //     console.log('IN 4');
        // }
        return true;
    }

    if (left <= 0 && right >= containerWidth && top <= 0 && isBottomIn) {
        // if (elm.id === 'coco') {
        //     console.log('IN 5');
        // }
        return true;
    }

    if (
        left <= 0 &&
        right >= containerWidth &&
        bottom >= containerHeight &&
        isTopIn
    ) {
        // if (elm.id === 'coco') {
        //     console.log('IN 6');
        // }
        return true;
    }

    return false;

    // const observer = new IntersectionObserver(
    //     (entries, observer) => {
    //         if (!entries.length) return;

    //         const entry = entries[0];

    // const isTopIn = entry.boundingClientRect.top - entry.rootBounds.height <= 0;
    // const isBottomIn = entry.boundingClientRect.bottom >= 0;
    // const isLeftIn = rect.left - containerWidth - offsetRight <= 0;
    // const isRightIn = rect.right - offsetLeft >= 0;

    //         if (entry.boundingClientRect.left >= entry.rootBounds.top && entry.boundingClientRect.left <= entry.rootBounds.right)

    //         if (
    //             entry.intersectionRatio > 0 &&
    //             (entry.intersectionRect.width ||
    //                 entry.intersectionRect.height)
    //         ) {
    //             resolve(true);
    //         } else {
    //             resolve(false);
    //         }
    //         observer.disconnect();
    //     },
    //     {
    //         root: null, // viewport
    //         rootMargin: settings.offset,
    //         threshold: 0,
    //     },
    // );

    // observer.observe(elm);
}
