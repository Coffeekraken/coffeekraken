/**
 * @name            onScrollEnd
 * @namespace       js.dom.detect
 * @type            Function
 *
 * This function simply listen for scroll on the passed element and call the passed callback
 * when reaching the end of it.
 *
 * @param       {HTMLElement}           $elm        The element to listen on
 * @param       {Function}              callback        The function to call when scroll end is detected
 * @param       {IOnScrollEndSettings}      [settings={}]       Some settings like offset, etc...
 *
 * @example         js
 * import onScrollEnd from '@coffeekraken/sugar/js/dom/detect/onScrollEnd';
 * onScrollEnd($elm, () => {
 *      // do something
 * }, {
 *    offset: 50
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface IOnScrollEndSettings {
  offset: number;
  once: boolean;
  times: number;
}

export default function onScrollEnd(
  $elm: HTMLElement,
  callback: Function,
  settings?: IOnScrollEndSettings
): void {
  const finalSettings: IOnScrollEndSettings = {
    offset: 20,
    once: false,
    times: -1,
    ...(settings ?? {})
  };

  let active = true,
    count = 0;

  const internalCallback = (e) => {
    if (
      active &&
      $elm.offsetHeight + $elm.scrollTop >=
        $elm.scrollHeight - finalSettings.offset
    ) {
      callback();
      active = false;
      count++;
      if (finalSettings.once)
        $elm.removeEventListener('scroll', internalCallback);
      else if (finalSettings.times > 0 && count >= finalSettings.times) {
        $elm.removeEventListener('scroll', internalCallback);
      }
    } else if (
      $elm.offsetHeight + $elm.scrollTop <
      $elm.scrollHeight - finalSettings.offset
    ) {
      active = true;
    }
  };

  $elm.addEventListener('scroll', internalCallback);
}
