// @ts-nocheck

import deepMerge from '../../shared/object/deepMerge';
import querySelectorLive from '../dom/query/querySelectorLive';

/**
 * @name 		linksStateAttributes
 * @namespace            js.feature
 * @type      Feature
 * @platform          js
 * @platform          ts
 * @status      beta
 *
 * This feature simply add some special attributes on links like "actual" when the link correspond to the actual visited page url,
 * "actual-child" when the link point to a child page, and maybe some more depending on needs
 *
 * @param       {Object}        [settings={}]         An object of settings to configure your feature
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @example       js
 * import linksStateAttributes from '@coffeekraken/sugar/js/feature/linksStateAttributes';
 * linksStateAttributes();
 *
 * @example    html
 * <!-- page url: /something --> 
 * <a href="/something" actual>Hello</a>
 * <a href="/something/cool" actual-child>World</a>
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IlinksStateAttributesSettings {
}

function linksStateAttributes(settings: Partial<IlinksStateAttributesSettings> = {}): void {
  settings = deepMerge(
    {},
    settings
  );

    function handleLink($linkElm) {
        if ($linkElm.getAttribute('href') === document.location.pathname) {
            $linkElm.setAttribute('actual', true);
        } else if ($linkElm.getAttribute('href').startsWith(document.location.pathname)) {
            $linkElm.removeAttribute('actual');
            $linkElm.setAttribute('actual-child', true);
        } else {
            $linkElm.removeAttribute('actual');
            $linkElm.removeAttribute('actual-child');
        }
    }

  querySelectorLive(`[href]`, ($linkElm) => {
    handleLink($linkElm);
  });
  window.addEventListener('locationchange', () => {
    Array.from(document.querySelectorAll('[href]')).forEach($linkElm => {
        handleLink($linkElm);
    });
  });
}
export default linksStateAttributes;
