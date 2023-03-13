import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           layout
 * @namespace      node.mixin.layout
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
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
 * @snippet         @sugar.layout($1)
 *
 * @example        css
 * .my-element {
 *    \@sugar.layout(
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
class postcssSugarPluginLayoutInterface extends __SInterface {
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
            scope: {
                type: 'Array<String>',
                values: ['bare', 'lnf', 'gap', 'align', 'justify'],
                default: ['bare', 'lnf', 'gap', 'align', 'justify'],
            },
        };
    }
}
export { postcssSugarPluginLayoutInterface as interface };
export default function ({ params, atRule, postcssApi, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const areas = [];
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
        if (rowCols.length > colsCount)
            colsCount = rowCols.length;
    });
    let currentCol = 0, currentRow = 0;
    rows.forEach((row) => {
        currentRow++;
        currentCol = 0;
        const rowCols = row
            .split(' ')
            .map((l) => l.trim())
            .filter((l) => l);
        rowCols.forEach((areaId) => {
            var _a, _b;
            currentCol++;
            if (areas.indexOf(areaId) === -1) {
                areas.push(areaId);
            }
            if (!areasCountedByCol[`${currentCol}-${areaId}`]) {
                areasCountedByCol[`${currentCol}-${areaId}`] = true;
                colsCountByArea[areaId] = ((_a = colsCountByArea[areaId]) !== null && _a !== void 0 ? _a : 0) + 1;
            }
            if (!areasCountedByLine[`${currentRow}-${areaId}`]) {
                areasCountedByLine[`${currentRow}-${areaId}`] = true;
                rowsCountByArea[areaId] = ((_b = rowsCountByArea[areaId]) !== null && _b !== void 0 ? _b : 0) + 1;
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
    const colsStatement = [], rowsStatement = [];
    for (let i = 0; i < colsCount; i++) {
        // colsStatement.push(`${100 / colsCount}%`);
        if (colsCount <= 1) {
            colsStatement.push('100%');
        }
        else {
            colsStatement.push('1fr');
        }
    }
    // for (let i = 0; i < rowsCount; i++) {
    //     rowsStatement.push(`${100 / rowsCount}%`);
    // }
    const vars = [];
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        display: grid;
        grid-template-columns: ${colsStatement.join(' ')};
        grid-template-rows: auto;
      `);
    }
    if (finalParams.scope.indexOf('align') !== -1) {
        vars.push(`
      align-items: ${finalParams.align};
    `);
    }
    if (finalParams.scope.indexOf('justify') !== -1) {
        vars.push(`
      justify-items: ${finalParams.justify};
    `);
    }
    if (finalParams.scope.indexOf('gap') !== -1) {
        if (finalParams.gap) {
            vars.push(`
                gap: sugar.margin(${finalParams.gap});
            `);
        }
        if (finalParams.columnGap) {
            vars.push(`
                column-gap: sugar.margin(${finalParams.columnGap});
            `);
        }
        if (finalParams.rowGap) {
            vars.push(`
                row-gap: sugar.margin(${finalParams.rowGap});
            `);
        }
    }
    const decls = postcssApi.parse(vars.join('\n'));
    let parentWithSelector = atRule.parent;
    if (!parentWithSelector.selector) {
        while (!parentWithSelector.selector) {
            parentWithSelector = parentWithSelector.parent;
        }
    }
    const parentNode = atRule.parent;
    atRule.replaceWith(decls);
    if (finalParams.scope.indexOf('bare') !== -1) {
        areas.forEach((areaId) => {
            // let selector = `.coco:nth-child(${areaId})`;
            // const newSelectors: string[] = [];
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDRztBQUVILE1BQU0saUNBQWtDLFNBQVEsWUFBWTtJQUN4RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztnQkFDN0MsT0FBTyxFQUFFLFNBQVM7YUFDckI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDO2dCQUM3QyxPQUFPLEVBQUUsU0FBUzthQUNyQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQztnQkFDbEQsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVB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