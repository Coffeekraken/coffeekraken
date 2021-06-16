// @ts-nocheck

import __easing from '../../shared/easing/easeInOutQuint';
import querySelectorLive from './querySelectorLive';
import urlParse from 'url-parse';
import scrollTo from './scrollTo';

/**
 * @name        autoScrollAnchorLinks
 * @namespace            js.feature
 * @type      Function
 * @platform      js
 * @status      beta
 *
 * Listen for links contains an hash to init them for scroll to target on click
 *
 * @param    {Integer}    [duration=500]    The scroll duration in ms
 * @param    {Integer}    [offset=0]    A scroll offset to apply
 * @param    {Function}    [easing=__easing]    An easing function used to scroll
 * @param    {Boolean}    [checkPathNames=true]    Specify if need to check the pathnames correspondance or not
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @example    js
 * import autoScrollAnchorLinks from '@coffeekraken/sugar/js/autoScrollAnchorLinks'
 * autoScrollAnchorLinks()
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IAutoScrollAnchorLinks {
  duration: number;
  offset: number;
  align: 'top' | 'center' | 'bottom';
  easing: Function;
  checkPathNames: boolean;
}

function autoScrollAnchorLinks(
  settings: Partial<IAutoScrollAnchorLinks> = {}
): void {

  settings = {
    duration: 500,
    offset: 0,
    align: 'top',
    easing: __easing,
    checkPathNames: true,
    ...settings
  };

  querySelectorLive('a:not([is])[href*="#"]', ($link) => {
    // listen for click
    $link.addEventListener('click', (e) => {
      // get the hash
      const linkUrl = urlParse($link.getAttribute('href'));
      const currentUrl = urlParse();

      // chack that we have an hash
      if (!linkUrl.hash || linkUrl.hash === '#') return;

      // if it's not the same pathname between the current url and the link one,
      // we do nothing and we let the link behave as he want
      if (settings.checkPathNames && currentUrl.pathname !== linkUrl.pathname) return;

      // try to get the target from the hash
      const $target = document.querySelector(linkUrl.hash);

      // if we don't have any target, let the link behave as he wants
      if (!$target) return;

      // preventing the link to behave as he wants
      e.preventDefault();

      // append the hash to the history in the url
      history.pushState({}, null, linkUrl.hash);

      // all seems to be good, we can scroll to the target
      scrollTo($target, settings);
    });
  });
}
export default autoScrollAnchorLinks;
