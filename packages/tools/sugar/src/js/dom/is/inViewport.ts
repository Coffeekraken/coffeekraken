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

export interface IInViewport {
    offset: number | Record<string, number>;
}

function inViewport(
    elm: HTMLElement,
    settings: Partial<IInViewport> = {},
): boolean {
    return new Promise((resolve) => {
        settings = {
            offset: '10px',
            ...settings,
        };

        // // handle offset
        // let offsetTop = settings.offset;
        // let offsetRight = settings.offset;
        // let offsetBottom = settings.offset;
        // let offsetLeft = settings.offset;
        // if (typeof settings.offset === 'object') {
        //   offsetTop = settings.offset.top || 0;
        //   offsetRight = settings.offset.right || 0;
        //   offsetBottom = settings.offset.bottom || 0;
        //   offsetLeft = settings.offset.left || 0;
        // }
        // const containerHeight =
        //   window.innerHeight || document.documentElement.clientHeight;
        // const containerWidth =
        //   window.innerWidth || document.documentElement.clientWidth;
        // const rect = elm.getBoundingClientRect();
        // const isTopIn = rect.top - containerHeight - offsetBottom <= 0;
        // const isBottomIn = rect.bottom - offsetTop >= 0;
        // const isLeftIn = rect.left - containerWidth - offsetRight <= 0;
        // const isRightIn = rect.right - offsetLeft >= 0;
        // return isTopIn && isBottomIn && isLeftIn && isRightIn;

        const observer = new IntersectionObserver(
            (entries, observer) => {
                if (!entries.length) return;
                const entry = entries[0];
                if (entry.intersectionRatio > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
                observer.disconnect();
            },
            {
                root: null, // viewport
                rootMargin: settings.offset,
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            },
        );

        observer.observe(elm);
    });
}
export default inViewport;
