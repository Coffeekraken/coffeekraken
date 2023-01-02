/**
 * @name            whenLod
 * @type            Function
 *
 * This method allows you to have a promise back that will be resolved when the actuel theme lod meet the requested one
 *
 * @param           {Number}                level           The level you want to wait on
 * @return          {Promise}                                    A promise that will be resolved once the correct level has been reached
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
/**
 * @name      whenLod
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Wait until the requested lod (level of details) has been reached.
 * See @coffeekraken/s-theme package for more infos
 *
 * @feature       Promise based API
 * @feature       Callback support
 *
 * @param       {Number}                    number      The level of details to wait on
 * @return 		{Promise} 								The promise that will be resolved
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __whenLod } from '@coffeekraken/sugar/dom'
 * __whenLod(3).then((link) => {
 * 		// do something when the lod is reached
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function whenLod(level: number): Promise<void> {
    return new Promise((resolve) => {
        // already reachec
        if (document.body.classList.contains(`s-lod--${level}`)) {
            return resolve();
        }

        const observer = new MutationObserver((mutationList, observer) => {
            for (const mutation of mutationList) {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'class'
                ) {
                    if (document.body.classList.contains(`s-lod--${level}`)) {
                        observer.disconnect();
                        return resolve();
                    }
                }
            }
        });

        observer.observe(document.body, {
            attributeFilter: ['class'],
            attributes: true,
        });
    });
}
