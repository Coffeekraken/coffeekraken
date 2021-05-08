/**
 * @name            stylesheetToString
 * @namespace       js.css
 * @type             Function
 * @status           stable
 *
 * This function take a StyleSheet instance and convert it to a simple string
 *
 * @param       {StyleSheet|StyleSheet[]}        stalesheet      The StyleSheet instance to convert
 * @return      {String}                            The css string
 *
 * @example         js
 * import stylesheetToString from '@coffeekraken/sugar/js/css/stylesheetToString';
 * stylesheetToString(document.stylesheets); // => body { ... }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function stylesheetToString(
  // @ts-ignore
  stylesheet: StyleSheet | StyleSheetList
): string {
  let stack: any[] = [];

  if (!(stylesheet instanceof StyleSheetList)) {
    if (!Array.isArray(stylesheet)) stack.push(stylesheet);
  } else {
    Object.keys(stylesheet).forEach((k) => {
      stack.push(stylesheet[k]);
    });
  }
  let str = ``;
  stack.forEach((style) => {
    str += style.cssRules
      ? Array.from(style.cssRules)
          .map((rule: any) => rule.cssText ?? '')
          .join('\n')
      : '';
  });
  return str;
}
