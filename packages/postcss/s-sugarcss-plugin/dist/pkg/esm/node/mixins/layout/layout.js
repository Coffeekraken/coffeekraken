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
export { SSugarcssPluginLayoutInterface as interface };
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
    vars.push(`@s.scope 'bare' {`);
    vars.push(`
        display: grid;
        grid-template-columns: ${colsStatement.join(' ')};
        grid-template-rows: auto;
      `);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Q0c7QUFFSCxNQUFNLDhCQUErQixTQUFRLFlBQVk7SUFDckQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7Z0JBQzdDLE9BQU8sRUFBRSxTQUFTO2FBQ3JCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztnQkFDN0MsT0FBTyxFQUFFLFNBQVM7YUFDckI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBWUQsT0FBTyxFQUFFLDhCQUE4QixJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXZELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFC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