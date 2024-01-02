import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           layout
 * @as              @s.layout
 * @namespace      node.mixin.layout
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to generate all the css needed for complex grids with multiple
 * columns and rows like:
 *
 * |-|----|-|
 * |--|--|--|
 * |-----|--|
 *
 * The mixin accept 1 parameter called layout. Here's some simple layouts to
 * illustrate how it works:
 *
 * - layout 1: <span class="s-color-accent">'1 2 3 4 5 6'</span> : This describe a simple 6 columns layout
 * - layout 2: <span class="s-color-accent">'1 1 2'</span>: This describe a two columns layout with the first columns taking 2/3 of the space and the second one taking 1/3 of it
 * - layout 3: <span class="s-color-accent">'1 2 _ 3 3'</span>: This describe 2 rows with the first having two columns and the second just one
 *
 * @param       {String}        layout      The layout you want to generate
 * @return        {Css}         The generated css
 *
 * @snippet         @s.layout($1)
 *
 * @example        css
 * .my-element {
 *    @s.layout(
 *      1 1 1 2 2
 *      3 3 4 4 4
 *    );
 * }
 *
 * @example     html
 * <div class="my-element">
 *    <div>Area 1</div>
 *    <div>Area 2</div>
 *    <div>Area 3</div>
 *    <div>Area 4</div>
 * </div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginLayoutInterface extends __SInterface {
    static get _definition() {
        return {
            layout: {
                type: 'String',
                required: true,
            },
            gap: {
                type: 'Number',
            },
            columnGap: {
                type: 'Number',
            },
            rowGap: {
                type: 'Number',
            },
            gapBetween: {
                type: 'Boolean',
                default: false,
            },
            align: {
                type: 'String',
                values: ['start', 'end', 'center', 'stretch'],
                default: 'stretch',
            },
            justify: {
                type: 'String',
                values: ['start', 'end', 'center', 'stretch'],
                default: 'stretch',
            },
        };
    }
}

export interface ISSugarcssPluginLayoutParams {
    layout: string;
    gap: number;
    columnGap: number;
    rowGap: number;
    gapBetween: boolean;
    align: 'start' | 'end' | 'center' | 'stretch';
    justify: 'start' | 'end' | 'center' | 'stretch';
}

export { SSugarcssPluginLayoutInterface as interface };

export default function ({
    params,
    atRule,
    postcssApi,
    replaceWith,
}: {
    params: ISSugarcssPluginLayoutParams;
    atRule: any;
    postcssApi: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginLayoutParams = {
        ...params,
    };
    const areas: string[] = [];

    const colsCountByArea = {};
    const rowsCountByArea = {};
    const areasCountedByLine = {};
    const areasCountedByCol = {};

    const colsStartByArea = {};
    const rowsStartByArea = {};
    const colsEndByArea = {};
    const rowsEndByArea = {};

    const rows = finalParams.layout
        .split(/(\n|_)/gm)
        .map((l) => l.trim())
        .filter((l) => l != '_' && l != '');

    // if (finalParams.layout.includes('1 2 3 4 5')) {
    //     console.log(finalParams.layout, rows);
    // }

    const rowsCount = rows.length;
    let colsCount = 0;

    rows.forEach((row) => {
        const rowCols = row
            .split(' ')
            .map((l) => l.trim())
            .filter((l) => l);
        if (rowCols.length > colsCount) colsCount = rowCols.length;
    });

    let currentCol = 0,
        currentRow = 0;

    rows.forEach((row) => {
        currentRow++;
        currentCol = 0;

        const rowCols = row
            .split(' ')
            .map((l) => l.trim())
            .filter((l) => l);

        rowCols.forEach((areaId) => {
            currentCol++;

            if (areas.indexOf(areaId) === -1) {
                areas.push(areaId);
            }

            if (!areasCountedByCol[`${currentCol}-${areaId}`]) {
                areasCountedByCol[`${currentCol}-${areaId}`] = true;
                colsCountByArea[areaId] = (colsCountByArea[areaId] ?? 0) + 1;
            }

            if (!areasCountedByLine[`${currentRow}-${areaId}`]) {
                areasCountedByLine[`${currentRow}-${areaId}`] = true;
                rowsCountByArea[areaId] = (rowsCountByArea[areaId] ?? 0) + 1;
            }
        });
    });

    currentCol = 0;
    currentRow = 0;

    rows.forEach((row) => {
        currentRow++;
        currentCol = 0;

        const rowCols = row
            .split(' ')
            .map((l) => l.trim())
            .filter((l) => l);

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
        // colsStatement.push(`${100 / colsCount}%`);
        if (colsCount <= 1) {
            colsStatement.push('100%');
        } else {
            colsStatement.push('1fr');
        }
    }
    // for (let i = 0; i < rowsCount; i++) {
    //     rowsStatement.push(`${100 / rowsCount}%`);
    // }

    const vars: string[] = [];

    vars.push(`@s.scope 'bare' {`);

    vars.push(
        `
        display: grid;
        grid-template-columns: ${colsStatement.join(' ')};
        grid-template-rows: auto;
      `,
    );

    if (finalParams.align) {
        vars.push(`
                align-items: ${finalParams.align};
            `);
    }

    if (finalParams.justify) {
        vars.push(`
      justify-items: ${finalParams.justify};
    `);
    }

    if (finalParams.gap) {
        vars.push(`
                gap: s.margin(${finalParams.gap});
            `);
    }
    if (finalParams.columnGap) {
        vars.push(`
                column-gap: s.margin(${finalParams.columnGap});
            `);
    }
    if (finalParams.rowGap) {
        vars.push(`
                row-gap: s.margin(${finalParams.rowGap});
            `);
    }

    vars.push('}');

    const decls = postcssApi.parse(vars.join('\n'));

    let parentWithSelector = atRule.parent;
    if (!parentWithSelector.selector) {
        while (!parentWithSelector.selector) {
            parentWithSelector = parentWithSelector.parent;
        }
    }
    const parentNode = atRule.parent;

    atRule.replaceWith(decls);

    areas.forEach((areaId) => {
        const newRule = new postcssApi.Rule({
            selector: `> *:nth-child(${areaId})`,
            nodes: postcssApi.parse(`
                    grid-column-start: ${colsStartByArea[areaId]};
                    grid-column-end: ${colsEndByArea[areaId] + 1};
                    grid-row-start: ${rowsStartByArea[areaId]};
                    grid-row-end: ${rowsEndByArea[areaId] + 1};

                `).nodes,
        });

        parentNode.prepend(newRule);
    });
}
