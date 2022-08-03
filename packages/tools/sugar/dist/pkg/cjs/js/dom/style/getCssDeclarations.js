"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      getCssDeclarations
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status          wip
 *
 * Get all the CSSRules of the passed type
 *
 * @param           {string}             [typeName='style']             CSSRule type to search for, valid types: unknown, style, charset, import, media, fontface, page, keyframes, keyframe, namespace, counter, supports, document, fontfeature, viewport, region
 * @param           {array}          [rules=[]]                     Array of CSSRules to search
 * @param           {function}           [predecate=Boolean]        Predecate function to filter matches
 * @return          {array}             Array of matching CSSRules
 *
 * @todo      refactore
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import __getCssDeclarations from '@coffeekraken/sugar/js/dom/style/getCssDeclarations';
 * __getCssDeclarations('style', [myCoolCssRules]);
 *
 * @see             https://github.com/marionebl/jogwheel/blob/master/source/library/get-declarations.js
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function getCssDeclarations(typeName = 'style', rules = [], predecate = Boolean) {
    const declarations = {
        unknown: 0,
        style: 1,
        charset: 2,
        import: 3,
        media: 4,
        fontface: 5,
        page: 6,
        keyframes: 7,
        keyframe: 8,
        namespace: 9,
        counter: 11,
        supports: 12,
        document: 13,
        fontfeature: 14,
        viewport: 15,
        region: 16,
    };
    const type = declarations[typeName];
    return ([].slice
        .call(rules)
        // filter by rule type
        // @ts-ignore
        .filter((rule) => rule.type === type)
        // filter with user-provided predecate
        // @ts-ignore
        .filter(predecate)
        // unwrap cssRules
        // @ts-ignore
        .map((rule) => rule.cssRules)
        // flatten cssRules
        .reduce((results, cssRules) => {
        return [...results, ...[].slice.call(cssRules)];
    }, []));
}
exports.default = getCssDeclarations;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBd0Isa0JBQWtCLENBQ3RDLFFBQVEsR0FBRyxPQUFPLEVBQ2xCLEtBQUssR0FBRyxFQUFFLEVBQ1YsWUFBZ0MsT0FBTztJQUV2QyxNQUFNLFlBQVksR0FBRztRQUNqQixPQUFPLEVBQUUsQ0FBQztRQUNWLEtBQUssRUFBRSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUM7UUFDVixNQUFNLEVBQUUsQ0FBQztRQUNULEtBQUssRUFBRSxDQUFDO1FBQ1IsUUFBUSxFQUFFLENBQUM7UUFDWCxJQUFJLEVBQUUsQ0FBQztRQUNQLFNBQVMsRUFBRSxDQUFDO1FBQ1osUUFBUSxFQUFFLENBQUM7UUFDWCxTQUFTLEVBQUUsQ0FBQztRQUNaLE9BQU8sRUFBRSxFQUFFO1FBQ1gsUUFBUSxFQUFFLEVBQUU7UUFDWixRQUFRLEVBQUUsRUFBRTtRQUNaLFdBQVcsRUFBRSxFQUFFO1FBQ2YsUUFBUSxFQUFFLEVBQUU7UUFDWixNQUFNLEVBQUUsRUFBRTtLQUNiLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFcEMsT0FBTyxDQUNILEVBQUUsQ0FBQyxLQUFLO1NBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNaLHNCQUFzQjtRQUN0QixhQUFhO1NBQ1osTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztRQUNyQyxzQ0FBc0M7UUFDdEMsYUFBYTtTQUNaLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbEIsa0JBQWtCO1FBQ2xCLGFBQWE7U0FDWixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0IsbUJBQW1CO1NBQ2xCLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRTtRQUMxQixPQUFPLENBQUMsR0FBRyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUMsRUFBRSxFQUFFLENBQUMsQ0FDYixDQUFDO0FBQ04sQ0FBQztBQTNDRCxxQ0EyQ0MifQ==