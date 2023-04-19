import __SFrontspec from '@coffeekraken/s-frontspec';
import __buildMediaQuery from './buildMediaQuery';
/**
 * @name            layoutCss
 * @namespace            shared.css
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function takes a layout definition like "1 2 _ 3 3" and generate the css that will handle this layout.
 * You can as well pass some informations the gap wanted, the alignement, etc...
 *
 * @param       {String|Array}         layout            The layout string defintion you want to generate the css for like "1 2 _ 3 3". It can also be an associative array like ["desktop" : "1 2", "mobile" : "1 _ 2"]
 * @param       {Array}         [settings=null]      Some settings to configure your layout generation
 * @return      {String}                         The resulting css
 *
 * @setting         {String}        [method='container']        The method to use. By default, it will use the @container query over the @media one cause it offers more possibilities like resizing the ".s-viewport" element
 * @setting         {String}        [containerName='viewport']    The container name on which the @container query will refer to.
 * @setting         {String}        [selector='#layout']       A css selector used to target the correct section/div...
 * @setting         {String}        [gap=null]                 A gap value to apply on your layout
 * @setting         {Boolean}       [gapBetween=true]           Specify if you want the gap only between the cells or all around
 * @setting         {String}        [align='stretch']           The "align-items" value for your grid layout
 * @setting         {String}        [justify='stretch']         The "justify-items" value for your grid layout
 * @setting         {String}        [media=null]                A media to pass to the \Sugar\css\buildMediaQuery function to scope the generated css in the correct media query
 * @setting         {Array}         [mediaSettings=[]]          Specify the \Sugar\css\buildMediaQuery settings parameter if you specify a "media" setting
 * @setting         {Boolean}       [minify=true]             Minify the output css or not
 * @setting         {Array}         [scope=['bare','lnf','gap','align','justify']]             The scope(s) you want to generate
 *
 * @snippet         __layoutCss(1);
 *
 * @example         js
 * import { __layoutCss } from '@coffeekraken/sugar/css';
 * __layoutCss('1 2 _ 3 3', {
 *    selector: '.my-layout'
 * });
 *
 * __layoutCss({
 *      desktop: '1 2 3',
 *      mobile': '1 2 _ 3 3'
 * }, {
 *    selector: '.my-layout'
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __layoutCss(layout, settings) {
    var _a;
    const finalSettings = Object.assign({ method: 'container', containerName: 'viewport', selector: '#layout', gap: null, gapBetween: true, align: 'stretch', justify: 'stretch', media: null, mediaSettings: undefined, minify: false, scope: ['bare', 'lnf', 'gap', 'align', 'justify'] }, (settings !== null && settings !== void 0 ? settings : {}));
    if (!finalSettings.media) {
        finalSettings.media = __SFrontspec.get('media');
    }
    // handle object passed
    if (typeof layout !== 'string') {
        const finalCss = [];
        const sortedMedia = __SFrontspec.sortMedia(finalSettings.mediaSettings);
        let defaultAction = '<=';
        if ((_a = finalSettings.mediaSettings) === null || _a === void 0 ? void 0 : _a.defaultAction) {
            defaultAction = finalSettings.mediaSettings.defaultAction;
        }
        const queries = sortedMedia.queries;
        const keys = Object.keys(queries);
        const orderedLayouts = [];
        keys.forEach((media) => {
            if (layout[media]) {
                let lay = layout[media];
                if (typeof lay !== 'string') {
                    lay = lay.layout;
                }
                orderedLayouts[media] = lay;
            }
        });
        let i = 0;
        for (let [media, lay] of Object.entries(orderedLayouts)) {
            if (defaultAction == '>=' && i >= keys.length - 1) {
                media = null;
            }
            else if (defaultAction == '<=' && i == 0) {
                media = null;
            }
            i++;
            finalCss.push(__layoutCss(lay, Object.assign(Object.assign({}, finalSettings), { media })));
        }
        return finalCss.join('\n');
    }
    // make sure that if we pass the media as "default"
    // it is setted to null to avoid creating media query for it
    if (finalSettings.media == 'default') {
        finalSettings.media = null;
    }
    const areas = [];
    const colsCountByArea = [];
    const rowsCountByArea = [];
    const areasCountedByLine = [];
    const areasCountedByCol = [];
    const colsStartByArea = [];
    const rowsStartByArea = [];
    const colsEndByArea = [];
    const rowsEndByArea = [];
    const rows = layout
        .split(/(\\n|_)/)
        .map((l) => l.trim())
        .filter((l) => l !== '_' && l !== '');
    const rowsCount = rows.length;
    let colsCount = 0;
    rows.forEach((row) => {
        const rowsCols = row.split(' ').map((l) => l.trim());
        if (rowsCols.length > colsCount) {
            colsCount = rowsCols.length;
        }
    });
    let currentCol = 0, currentRow = 0;
    rows.forEach((row) => {
        currentRow++;
        currentCol = 0;
        const rowCols = row.split(' ').map((l) => l.trim());
        rowCols.forEach((areaId) => {
            currentCol++;
            if (!areas.includes(areaId)) {
                areas.push(areaId);
            }
            if (!areasCountedByCol[`${currentCol}-${areaId}`]) {
                areasCountedByCol[`${currentCol}-${areaId}`] = true;
                const current = colsCountByArea[areaId]
                    ? colsCountByArea[areaId]
                    : 0;
                colsCountByArea[areaId] = current + 1;
            }
            if (!areasCountedByLine[`${currentRow}-${areaId}`]) {
                areasCountedByLine[`${currentRow}-${areaId}`] = true;
                const current = rowsCountByArea[areaId]
                    ? rowsCountByArea[areaId]
                    : 0;
                rowsCountByArea[areaId] = current + 1;
            }
        });
    });
    currentCol = 0;
    currentRow = 0;
    rows.forEach((row) => {
        currentRow++;
        currentCol = 0;
        const rowCols = row.split(' ').map((l) => l.trim());
        rowCols.forEach((areaId) => {
            currentCol++;
            if (!colsStartByArea[areaId]) {
                colsStartByArea[areaId] = currentCol;
            }
            if (!rowsStartByArea[areaId]) {
                rowsStartByArea[areaId] = currentRow;
            }
            colsEndByArea[areaId] = currentCol;
            rowsEndByArea[areaId] = currentRow;
        });
    });
    const colsStatement = [], rowsStatement = [];
    for (let i = 0; i < colsCount; i++) {
        if (colsCount <= 1) {
            colsStatement.push('100%');
        }
        else {
            colsStatement.push('1fr');
        }
    }
    const vars = [`${finalSettings.selector} {`];
    if (finalSettings.scope.includes('bare')) {
        vars.push(`display: grid;`);
        vars.push(`grid-template-columns: ${colsStatement.join(' ')};`);
        vars.push(`grid-template-rows: auto;`);
    }
    if (finalSettings.scope.includes('align')) {
        vars.push(`align-items: ${finalSettings.align};`);
    }
    if (finalSettings.scope.includes('justify')) {
        vars.push(`justify-items: ${finalSettings.justify};`);
    }
    if (finalSettings.gap && finalSettings.scope.includes('gap')) {
        vars.push(`gap: ${finalSettings.gap};`);
    }
    vars.push('}');
    if (finalSettings.scope.includes('bare')) {
        areas.forEach((areaId) => {
            vars.push(`${finalSettings.selector} > *:nth-child(${areaId}) {
                grid-column-start: ${colsStartByArea[areaId]};
                grid-column-end: ${colsEndByArea[areaId] + 1};
                grid-row-start: ${rowsStartByArea[areaId]};
                grid-row-end: ${rowsEndByArea[areaId] + 1};

            }`);
        });
    }
    if (finalSettings.media) {
        const query = __buildMediaQuery(finalSettings.media, finalSettings.mediaSettings);
        vars.unshift(`${query} {`);
        vars.push('}');
    }
    let css = vars.join(finalSettings.minify ? ' ' : '\n');
    if (finalSettings.minify) {
        css = css.replace(/\n/gm, ' ').replace(/\s{2,999}/gm, ' ');
    }
    return css;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8saUJBQWlCLE1BQU0sbUJBQW1CLENBQUM7QUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNENHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQUMsTUFBb0IsRUFBRSxRQUFTOztJQUMvRCxNQUFNLGFBQWEsbUJBQ2YsTUFBTSxFQUFFLFdBQVcsRUFDbkIsYUFBYSxFQUFFLFVBQVUsRUFDekIsUUFBUSxFQUFFLFNBQVMsRUFDbkIsR0FBRyxFQUFFLElBQUksRUFDVCxVQUFVLEVBQUUsSUFBSSxFQUNoQixLQUFLLEVBQUUsU0FBUyxFQUNoQixPQUFPLEVBQUUsU0FBUyxFQUNsQixLQUFLLEVBQUUsSUFBSSxFQUNYLGFBQWEsRUFBRSxTQUFTLEVBQ3hCLE1BQU0sRUFBRSxLQUFLLEVBQ2IsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxJQUM5QyxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUU7UUFDdEIsYUFBYSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ25EO0lBRUQsdUJBQXVCO0lBQ3ZCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQzVCLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztRQUU5QixNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV4RSxJQUFJLGFBQWEsR0FBRyxJQUFJLENB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