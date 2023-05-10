// @ts-nocheck
import __SClass from '@coffeekraken/s-class';
import { __deepMerge, __sort } from '@coffeekraken/sugar/object';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import { __parse } from '@coffeekraken/sugar/string';
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
export default class SMedia extends __SClass {
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
        super(__deepMerge({}, settings));
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
            if (typeof __parse(mediaName) === 'number') {
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
                const dashProp = __dashCase(prop);
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
        const queries = __sort(media.queries, (a, b) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2pFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQWNyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTyxTQUFRLFFBQVE7SUFHeEMsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7SUFDckMsQ0FBQztJQUVELElBQVcsWUFBWTs7UUFDbkIsT0FBTyxNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxtQ0FBSSxTQUFTLENBQUM7SUFDakQsQ0FBQztJQUVELElBQVcsTUFBTTtRQUNiLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3JCLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsVUFBVSxDQUFDLE1BQWM7UUFDckIsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLE1BQU07YUFDRCxLQUFLLENBQUMsVUFBVSxDQUFDO2FBQ2pCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3BCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENB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