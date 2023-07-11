"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const object_1 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
/**
 * @name                SMedia
 * @namespace           shared
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status             beta
 *
 * A simple class to handle the media (queries) like methods like buildQuery, layoutCss, etc... All of this on top of the @specim3n/types ISMedia type and the @coffeekraken/s-frontspec package
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
     * @name                buildQuery
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
            .split(/(\s|\,)/gm)
            .map((l) => l.trim())
            .filter((l) => l !== '' && l !== ',');
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
                const dashProp = (0, string_1.__dashCase)(prop);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUM3Qyx1REFBaUU7QUFDakUsdURBQWlFO0FBY2pFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBcUIsTUFBTyxTQUFRLGlCQUFRO0lBR3hDLElBQVcsYUFBYTtRQUNwQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFXLFlBQVk7O1FBQ25CLE9BQU8sTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksbUNBQUksU0FBUyxDQUFDO0lBQ2pELENBQUM7SUFFRCxJQUFXLE1BQU07UUFDYixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUNyQixLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFVBQVUsQ0FBQyxNQUFjO1FBQ3JCLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQixNQUFNO2FBQ0QsS0FBSyxDQUFDLFVBQVUsQ0FBQzthQUNqQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNwQixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNwQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMs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