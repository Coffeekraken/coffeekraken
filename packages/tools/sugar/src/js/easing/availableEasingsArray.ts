/**
 * @name            availableEasingsArray
 * @namespace           sugar.js.easing
 * @type            Function
 * @stable
 *
 * This function simply return back an array of all the available easings function in the sugar toolkit
 *
 * @return      {Array}             An array of all the easing functions available
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function availableEasingsArray() {
  return [
    'easeInOutCubic',
    'easeInOutQuad',
    'easeInOutQuart',
    'easeInOutQuint',
    'easeInCubic',
    'easeInQuad',
    'easeInQuart',
    'easeInQuint',
    'easeOutCubic',
    'easeOutQuad',
    'easeOutQuart',
    'easeOutQuint'
  ];
}
