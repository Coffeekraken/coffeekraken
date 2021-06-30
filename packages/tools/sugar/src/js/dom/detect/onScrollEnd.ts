/**
 * @name            onScrollEnd
 * @namespace       js.dom.detect
 * @type            Function
 * @async
 * @platform          js
 * @platform          ts
 * @status        beta
 *
 * This function simply listen for scroll on the passed element and call the passed callback
 * when reaching the end of it.
 *
 * @param       {HTMLElement}           $elm        The element to listen on
 * @param       {Function}              callback        The function to call when scroll end is detected
 * @param       {IOnScrollEndSettings}      [settings={}]       Some settings like offset, etc...
 *
 * @todo      tests
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

  let isBody = false;

  let $scrollListenedElm = $elm;
  let $scrollHeightElm = $elm;
  if ($elm === document.body) {
    isBody = true;
    $scrollListenedElm = document;
    $scrollHeightElm = document.body;
  } else if ($elm === document || $elm === window) {
    isBody = true;
    $elm = document.body;
    $scrollHeightElm = document.body;
  }

  let active = true,
    count = 0;

  const internalCallback = (e) => {

    let fullHeight, viewportHeight, scrollTop;
    if (isBody) {
      viewportHeight = window.innerHeight;
      scrollTop = $scrollHeightElm.scrollTop;
      fullHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
    } else {
      viewportHeight = $scrollHeightElm.scrollHeight;
      scrollTop = $scrollHeightElm.scrollTop;
      fullHeight = $scrollHeightElm.scrollHeight;
    }

    if (
      active &&
      scrollTop + viewportHeight >=
        fullHeight - finalSettings.offset
    ) {
      callback();
      count++;
      if (finalSettings.once) {
        $scrollListenedElm.removeEventListener('scroll', internalCallback);
        active = false;
      } else if (finalSettings.times > 0 && count >= finalSettings.times) {
        $scrollListenedElm.removeEventListener('scroll', internalCallback);
        active = false;
      }
    } else if (
      $scrollHeightElm.offsetHeight + $scrollHeightElm.scrollTop <
      $scrollHeightElm.scrollHeight - finalSettings.offset
    ) {
      active = true;
    }
  };

  $scrollListenedElm.addEventListener('scroll', internalCallback);
}
