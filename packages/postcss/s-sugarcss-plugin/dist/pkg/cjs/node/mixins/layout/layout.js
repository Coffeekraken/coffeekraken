"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
class SSugarcssPluginLayoutInterface extends s_interface_1.default {
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
exports.interface = SSugarcssPluginLayoutInterface;
function default_1({ params, atRule, postcssApi, replaceWith, }) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkNHO0FBRUgsTUFBTSw4QkFBK0IsU0FBUSxxQkFBWTtJQUNyRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztnQkFDN0MsT0FBTyxFQUFFLFNBQVM7YUFDckI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDO2dCQUM3QyxPQUFPLEVBQUUsU0FBUzthQUNyQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFZMEMsbURBQVM7QUFFcEQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUNGLE1BQU0sS0FBSyxHQUFhLEVBQUUsQ0FBQztJQUUzQixN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