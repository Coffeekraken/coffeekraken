// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
import { __deepMerge, __sort } from '@coffeekraken/sugar/object';
import { __dashCase, __parse } from '@coffeekraken/sugar/string';
import type { ISMedia } from '@specim3n/types';

export interface IBuildQuerySettings {
    media: ISMedia;
    method?: 'container' | 'media';
    containerName?: string;
}

export interface ISMediaLayoutCssResult {
    css: string;
    areas: number[];
}

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
export default class SMedia extends __SClass {
    private _media;

    public get defaultAction(): '>' | '>=' | '<' | '<=' | '=' {
        return this._media.defaultAction;
    }

    public get defaultMedia(): string {
        return this._media.defaultMedia ?? 'desktop';
    }

    public get medias(): string[] {
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
    countAreas(layout: string): number {
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
    buildQuery(
        queryString: string,
        settings?: Partial<IBuildQuerySettings>,
    ): string {
        let currentQueryList: string[] = [];

        const finalSettings: IBuildQuerySettings = {
            method: settings?.method ?? 'media',
            containerName: settings?.containerName,
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

            if (
                firstTwoChar === '>=' ||
                firstTwoChar === '<=' ||
                firstTwoChar === '=='
            ) {
                mediaName = mediaName.slice(2);
                action = firstTwoChar;
            } else if (
                firstChar === '<' ||
                firstChar === '>' ||
                firstChar === '='
            ) {
                mediaName = mediaName.slice(1);
                action = firstChar;
            }

            let mediaQueryConfig = this._media,
                sortedMedia = Object.keys(this._media.queries);

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
            } else {
                mediaQueryConfig = this._media.queries[mediaName];
                if (!mediaQueryConfig)
                    throw new Error(
                        `<red>[sugarcssPlugin.media]</red> Sorry but the requested media "<yellow>${mediaName}</yellow>" does not exists in the config. Here's the available medias: ${Object.keys(
                            this._media.queries,
                        )
                            .map((l) => `<green>${l}</green>`)
                            .join(',')}`,
                    );
            }

            const queryList: string[] = [];

            Object.keys(mediaQueryConfig).forEach((prop) => {
                // dash case
                const dashProp = __dashCase(prop);

                let value = mediaQueryConfig[prop];
                if (!value) {
                    if (prop === 'minWidth') {
                        value = 0;
                    } else if (prop === 'maxWidth') {
                        value = 99999;
                    }
                }

                if (['min-width', 'max-width'].indexOf(dashProp) !== -1) {
                    if (action === '>') {
                        if (dashProp === 'max-width') {
                            let argName = 'min-width';
                            queryList.push(`(${argName}: ${value + 1}px)`);
                        }
                    } else if (action === '<') {
                        if (dashProp === 'min-width') {
                            let argName = 'max-width';
                            queryList.push(`(${argName}: ${value}px)`);
                        }
                    } else if (action === '=') {
                        queryList.push(`(${dashProp}: ${value}px)`);
                    } else if (action === '>=') {
                        if (sortedMedia.at(-1) === mediaName) {
                            return;
                        }

                        if (dashProp === 'min-width') {
                            queryList.push(`(${dashProp}: ${value}px)`);
                        }
                    } else if (action === '<=') {
                        if (sortedMedia[0] === mediaName) {
                            return;
                        }

                        if (dashProp === 'max-width') {
                            queryList.push(`(${dashProp}: ${value}px)`);
                        }
                    } else {
                        queryList.push(`(${dashProp}: ${value}px)`);
                    }
                } else {
                    queryList.push(`(${dashProp}: ${value}px)`);
                }
            });

            if (lastChar === '-') {
                queryList.push('(orientation: landscape)');
            } else if (lastChar === '|') {
                queryList.push('(orientation: portrait)');
            }

            currentQueryList.push(queryList.join(' and '));
        });

        currentQueryList = currentQueryList.filter((l) => l.trim() !== '');

        if (finalSettings.method === 'container') {
            return `@container ${
                finalSettings.containerName
            } ${currentQueryList.join(' ')}`;
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
    layoutCss(layout: string | any, settings?): ISMediaLayoutCssResult {
        const finalSettings = {
            method: 'container',
            containerName: 'viewport',
            selector: '#layout',
            gap: null,
            gapBetween: true,
            align: 'stretch',
            justify: 'stretch',
            minify: false,
            scope: ['bare', 'lnf', 'gap', 'align', 'justify'],
            ...(settings ?? {}),
        };

        // handle object passed
        if (typeof layout !== 'string') {
            const finalCss: string[] = [];

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
                } else if (defaultAction == '<=' && i == 0) {
                    media = null;
                }
                i++;

                finalCss.push(
                    __layoutCss(lay, {
                        ...finalSettings,
                        media,
                    }),
                );
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

        let currentCol = 0,
            currentRow = 0;

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

        const colsStatement: string[] = [],
            rowsStatement: string[] = [];

        for (let i = 0; i < colsCount; i++) {
            if (colsCount <= 1) {
                colsStatement.push('100%');
            } else {
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
                vars.push(`${
                    finalSettings.selector
                } > .s-layout_area-${areaId} {
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
            } else if (media.defaultAction == '>=') {
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
