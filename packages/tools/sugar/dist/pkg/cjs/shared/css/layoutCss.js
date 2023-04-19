"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const buildMediaQuery_1 = __importDefault(require("./buildMediaQuery"));
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
function __layoutCss(layout, settings) {
    var _a;
    const finalSettings = Object.assign({ method: 'container', containerName: 'viewport', selector: '#layout', gap: null, gapBetween: true, align: 'stretch', justify: 'stretch', media: null, mediaSettings: undefined, minify: false, scope: ['bare', 'lnf', 'gap', 'align', 'justify'] }, (settings !== null && settings !== void 0 ? settings : {}));
    if (!finalSettings.media) {
        finalSettings.media = s_frontspec_1.default.get('media');
    }
    // handle object passed
    if (typeof layout !== 'string') {
        const finalCss = [];
        const sortedMedia = s_frontspec_1.default.sortMedia(finalSettings.mediaSettings);
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
        const query = (0, buildMediaQuery_1.default)(finalSettings.media, finalSettings.mediaSettings);
        vars.unshift(`${query} {`);
        vars.push('}');
    }
    let css = vars.join(finalSettings.minify ? ' ' : '\n');
    if (finalSettings.minify) {
        css = css.replace(/\n/gm, ' ').replace(/\s{2,999}/gm, ' ');
    }
    return css;
}
exports.default = __layoutCss;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELHdFQUFrRDtBQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Q0c7QUFDSCxTQUF3QixXQUFXLENBQUMsTUFBb0IsRUFBRSxRQUFTOztJQUMvRCxNQUFNLGFBQWEsbUJBQ2YsTUFBTSxFQUFFLFdBQVcsRUFDbkIsYUFBYSxFQUFFLFVBQVUsRUFDekIsUUFBUSxFQUFFLFNBQVMsRUFDbkIsR0FBRyxFQUFFLElBQUksRUFDVCxVQUFVLEVBQUUsSUFBSSxFQUNoQixLQUFLLEVBQUUsU0FBUyxFQUNoQixPQUFPLEVBQUUsU0FBUyxFQUNsQixLQUFLLEVBQUUsSUFBSSxFQUNYLGFBQWEsRUFBRSxTQUFTLEVBQ3hCLE1BQU0sRUFBRSxLQUFLLEVBQ2IsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxJQUM5QyxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUU7UUFDdEIsYUFBYSxDQUFDLEtBQUssR0FBRyxxQkFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNuRDtJQUVELHVCQUF1QjtJQUN2QixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUM1QixNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7UUFFOUIsTUFBTSxXQUFXLEdBQUcscUJBQVksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXhFLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLE1BQUEsYUFBYSxDQUFDLGFBQWEsMENBQUUsYUFBYSxFQUFF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