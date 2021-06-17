// @ts-nocheck
import { IScrollToSettings } from '../dom/scroll/scrollTo';
import __scrollToLocationHash from '../dom/scroll/scrollToLocationHash';
import __deepMerge from '../../shared/object/deepMerge';

/**
 * @name        smoothScrollOnHashChange
 * @namespace            js.feature
 * @type      Function
 * @platform      js
 * @status      beta
 *
 * This feature simply allow a snooth scroll on hash changes
 *
 * @setting    {IScrollToSettings}            [scroll={}]       Some scroll settings that you can check on the sugar.dom.scroll.scrollTo function
 * 
 * @param     {ISmoothScrollOnHashChangeSettings}    [settings={}]     Some settings to tweak the smooth scroll behavior
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @example    js
 * import smoothScrollOnHashChange from '@coffeekraken/sugar/js/smoothScrollOnHashChange'
 * smoothScrollOnHashChange();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISmoothScrollOnHashChangeSettings {
  scroll: Partial<IScrollToSettings>;
}

function smoothScrollOnHashChange(
  settings: Partial<ISmoothScrollOnHashChangeSettings> = {}
): void {

  settings = __deepMerge({
    scroll: {}
  }, settings);

  window.addEventListener('hashchange', (e) => {
    __scrollToLocationHash(settings);
  });

}
export default smoothScrollOnHashChange;
