// @ts-nocheck

import __scrollTo from './scrollTo';
import __easeing from '../../shared/easing/easeInOutQuint';

/**
 * @name      scrollToLocationHash
 * @namespace            js.dom.scroll
 * @type      Function
 * @platform        js
 * @status        beta
 *
 * Scroll to the location hash if an hash is present.
 * This function will try to get the target element from the hash and scroll to it
 *
 * @setting    {Integer}    [duration=500]    The scroll duration
 * @setting    {Integer}    [offset=0]    A pixel value to offset the scroll with
 * @setting    {Function}    [easing=__easeing]    An easing function to use to scroll
 *
 * @param       {IScrollToLocationHashSettings}       [settings={}]       Some settings to tweak the scroll behavior
 * @return      {Promise}                     A promise resolved once the scroll has ended
 * 
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import __scrollToLocationHash from '@coffeekraken/sugar/js/dom/scrollToLocationHash'
 * __scrollToLocationHash(500, 0)
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com) (https://olivierbossel.com)
 */

export interface IScrollToLocationHashSettings {
  duration: number;
  offset: number;
  easing: Function;
}

function scrollToLocationHash(settings: Partial<IScrollToLocationHashSettings> = {}): Promise<any> {

  settings = {
    duration: 500,
    offset: 0,
    easing: __easeing,
    ...settings
  };

  // check if we have an hash in the url
  const hash = document.location.hash;

  // if not, do nothing
  if (!hash) return;

  // try to get the hash target in the page
  const targetElm = document.querySelector(hash);

  // if no target found, do nothing
  if (!targetElm) return;

  // tell the browser that we handle the scroll restoration manually
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // scroll to target
  return __scrollTo(targetElm, settings);
}
export default scrollToLocationHash;
