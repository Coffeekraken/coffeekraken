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
 * @snippet         __getCssDeclarations()
 *
 * @example  	js
 * import { __getCssDeclarations } from '@coffeekraken/sugar/dom';
 * __getCssDeclarations('style', [myCoolCssRules]);
 *
 * @see             https://github.com/marionebl/jogwheel/blob/master/source/library/get-declarations.js
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function getCssDeclarations(
    typeName = 'style',
    rules = [],
    predecate: boolean | Function = Boolean,
): any[] {
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

    return (
        [].slice
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
            }, [])
    );
}
