"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const object_1 = require("@coffeekraken/sugar/object");
const dashCase_1 = __importDefault(require("@coffeekraken/sugar/shared/string/dashCase"));
const string_1 = require("@coffeekraken/sugar/string");
/**
 * @name                SMedia
 * @namespace           shared
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status             beta
 *
 * A simple class to handle the media (queries) like methods like buildQuery, layoutCss, etc... All of this on top of the @specimen/types ISMedia type and the @coffeekraken/s-frontspec package
 *
 * @param       {String|Object}             [media='frontspec']                      Either an ISMedia object, or 'frontspec' if you want them to be loaded from your frontspec.json file
 * @param       {Object|Array}              [settings=[]]              Some settings to configure your SMedia instance
 *
 * @example         php
 * const media = new SMedia();
 * const query = media.buildQuery('desktop');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SMedia extends s_class_1.default {
    get defaultAction() {
        return this._media.defaultAction;
    }
    get defaultMedia() {
        var _a;
        return (_a = this._media.defaultMedia) !== null && _a !== void 0 ? _a : 'desktop';
    }
    get medias() {
        return Object.keys(this._media.queries);
    }
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings = {}) {
        super((0, object_1.__deepMerge)({}, settings));
    }
    /**
     * @name            countAreas
     * @type            Function
     *
     * This method allows you to count the number of area from a layout string like "1 2 _ 3 3"
     *
     * @param               {String}    layout      The layout string you want to count areas from
     * @return              {Number}                The count of areas in the passed layout string
     *
     * @since               2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    countAreas(layout) {
        const areas = [];
        layout
            .split(/(\\n|\s)/)
            .map((l) => l.trim())
            .filter((l) => l !== '_' && l !== '')
            .forEach((areaId) => {
            if (!areas.includes(areaId)) {
                areas.push(areaId);
            }
        });
        return areas.length;
    }
    /**
     * @name                buildMediaQuery
     * @type                Function
     *
     * This static method allows you to built a media query by passing args like "mobile", ">tablet", etc...
     *
     * @param               {String}    query    The media query you want to build
     * @return              {String}                The builded media query (without brackets)
     *
     * @since               2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    buildQuery(queryString, settings) {
        var _a;
        let currentQueryList = [];
        const finalSettings = {
            method: (_a = settings === null || settings === void 0 ? void 0 : settings.method) !== null && _a !== void 0 ? _a : 'media',
            containerName: settings === null || settings === void 0 ? void 0 : settings.containerName,
        };
        const queryAr = queryString
            .split(' ')
            .map((l) => l.trim())
            .filter((l) => l !== '');
        queryAr.forEach((query, i) => {
            if (query === 'and' || query === 'or') {
                currentQueryList.push(query);
                return;
            }
            const firstChar = query.slice(0, 1);
            const firstTwoChar = query.slice(0, 2);
            const lastChar = query.slice(-1);
            let action = this._media.defaultAction;
            let mediaName = query;
            if (lastChar === '-' || lastChar === '|')
                mediaName = mediaName.slice(0, -1);
            if (firstTwoChar === '>=' ||
                firstTwoChar === '<=' ||
                firstTwoChar === '==') {
                mediaName = mediaName.slice(2);
                action = firstTwoChar;
            }
            else if (firstChar === '<' ||
                firstChar === '>' ||
                firstChar === '=') {
                mediaName = mediaName.slice(1);
                action = firstChar;
            }
            let mediaQueryConfig = this._media, sortedMedia = Object.keys(this._media.queries);
            // parse the mediaName to check if it's a number
            if (typeof (0, string_1.__parse)(mediaName) === 'number') {
                switch (action) {
                    case '>':
                    case '>=':
                        mediaQueryConfig = {
                            minWidth: mediaName,
                            maxWidth: null,
                        };
                        break;
                    case '<':
                    case '<=':
                        mediaQueryConfig = {
                            minWidth: null,
                            maxWidth: mediaName,
                        };
                        break;
                    case '=':
                        mediaQueryConfig = {
                            minWidth: mediaName,
                            maxWidth: mediaName,
                        };
                        break;
                }
            }
            else {
                mediaQueryConfig = this._media.queries[mediaName];
                if (!mediaQueryConfig)
                    throw new Error(`<red>[postcssSugarPlugin.media]</red> Sorry but the requested media "<yellow>${mediaName}</yellow>" does not exists in the config. Here's the available medias: ${Object.keys(this._media.queries)
                        .map((l) => `<green>${l}</green>`)
                        .join(',')}`);
            }
            const queryList = [];
            Object.keys(mediaQueryConfig).forEach((prop) => {
                // dash case
                const dashProp = (0, dashCase_1.default)(prop);
                let value = mediaQueryConfig[prop];
                if (!value) {
                    if (prop === 'minWidth') {
                        value = 0;
                    }
                    else if (prop === 'maxWidth') {
                        value = 99999;
                    }
                }
                if (['min-width', 'max-width'].indexOf(dashProp) !== -1) {
                    if (action === '>') {
                        if (dashProp === 'max-width') {
                            let argName = 'min-width';
                            queryList.push(`(${argName}: ${value + 1}px)`);
                        }
                    }
                    else if (action === '<') {
                        if (dashProp === 'min-width') {
                            let argName = 'max-width';
                            queryList.push(`(${argName}: ${value}px)`);
                        }
                    }
                    else if (action === '=') {
                        queryList.push(`(${dashProp}: ${value}px)`);
                    }
                    else if (action === '>=') {
                        if (sortedMedia.at(-1) === mediaName) {
                            return;
                        }
                        if (dashProp === 'min-width') {
                            queryList.push(`(${dashProp}: ${value}px)`);
                        }
                    }
                    else if (action === '<=') {
                        if (sortedMedia[0] === mediaName) {
                            return;
                        }
                        if (dashProp === 'max-width') {
                            queryList.push(`(${dashProp}: ${value}px)`);
                        }
                    }
                    else {
                        queryList.push(`(${dashProp}: ${value}px)`);
                    }
                }
                else {
                    queryList.push(`(${dashProp}: ${value}px)`);
                }
            });
            if (lastChar === '-') {
                queryList.push('(orientation: landscape)');
            }
            else if (lastChar === '|') {
                queryList.push('(orientation: portrait)');
            }
            currentQueryList.push(queryList.join(' and '));
        });
        currentQueryList = currentQueryList.filter((l) => l.trim() !== '');
        if (finalSettings.method === 'container') {
            return `@container ${finalSettings.containerName} ${currentQueryList.join(' ')}`;
        }
        return `@media ${currentQueryList.join(' ')}`;
    }
    /**
     * @name            layoutCss
     * @type            Function
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
     * @setting         {Boolean}       [minify=true]             Minify the output css or not
     * @setting         {Array}         [scope=['bare','lnf','gap','align','justify']]             The scope(s) you want to generate
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    layoutCss(layout, settings) {
        const finalSettings = Object.assign({ method: 'container', containerName: 'viewport', selector: '#layout', gap: null, gapBetween: true, align: 'stretch', justify: 'stretch', minify: false, scope: ['bare', 'lnf', 'gap', 'align', 'justify'] }, (settings !== null && settings !== void 0 ? settings : {}));
        // handle object passed
        if (typeof layout !== 'string') {
            const finalCss = [];
            let defaultAction = '<=';
            if (this._media.defaultAction) {
                defaultAction = this._media.defaultAction;
            }
            const queries = this._media.queries;
            const keys = Object.keys(queries);
            const orderedLayouts = {};
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
            vars.push(`justify-content: ${finalSettings.justify};`);
        }
        if (finalSettings.gap && finalSettings.scope.includes('gap')) {
            vars.push(`gap: ${finalSettings.gap};`);
        }
        vars.push('}');
        if (finalSettings.scope.includes('bare')) {
            areas.forEach((areaId, i) => {
                if (areaId === 'x' || areaId === '-') {
                    return;
                }
                vars.push(`${finalSettings.selector} > .s-layout_area-${areaId} {
                        grid-column-start: ${colsStartByArea[areaId]};
                        grid-column-end: ${colsEndByArea[areaId] + 1};
                        grid-row-start: ${rowsStartByArea[areaId]};
                        grid-row-end: ${rowsEndByArea[areaId] + 1};
            }`);
            });
        }
        if (finalSettings.media) {
            const query = this.buildQuery(this._media);
            vars.unshift(`${query} {`);
            vars.push('}');
        }
        let css = vars.join(finalSettings.minify ? ' ' : '\n');
        if (finalSettings.minify) {
            css = css.replace(/\n/gm, ' ').replace(/\s{2,999}/gm, ' ');
        }
        return {
            css,
            areas,
        };
    }
    /**
     * @name            sortQueries
     * @type            Function
     *
     * This function take as input the "media" property of the `frontspec.json` file and return
     * a new object mostly the same but with the "queries" object|array sorted depending on the
     * "defaultAction" property.
     *
     * @param     {Object}      media                      The frontspec "media" object
     * @return    {Object}                                  The same object with the "queries" sorted correctly
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    sortQueries(media = null) {
        if (media == null) {
            media = this.media;
        }
        if (!media.defaultAction) {
            return media;
        }
        const queries = (0, object_1.__sort)(media.queries, (a, b) => {
            if (media.defaultAction == '<=') {
                return a.value.minWidth < b.value.minWidth ? 1 : -1;
            }
            else if (media.defaultAction == '>=') {
                return a.value.minWidth > b.value.minWidth ? 1 : -1;
            }
            return 0;
        });
        // create new queries object
        const sortedQueries = {};
        // add all the others queries next
        for (let [m, query] of Object.entries(queries)) {
            sortedQueries[m] = query;
        }
        // override original queries
        media.queries = sortedQueries;
        // return new media object
        return media;
    }
}
exports.default = SMedia;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUM3Qyx1REFBaUU7QUFDakUsMEZBQW9FO0FBQ3BFLHVEQUFxRDtBQWNyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILE1BQXFCLE1BQU8sU0FBUSxpQkFBUTtJQUd4QyxJQUFXLGFBQWE7UUFDcEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBVyxZQUFZOztRQUNuQixPQUFPLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLG1DQUFJLFNBQVMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2IsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDckIsS0FBSyxDQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxVQUFVLENBQUMsTUFBYztRQUNyQixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsTUFBTTthQUNELEtBQUssQ0FBQyxVQUFVLENBQUM7YUFDakIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDcEMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENB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