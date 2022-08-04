"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
class postcssSugarPluginLayoutInterface extends s_interface_1.default {
    static get _definition() {
        return {
            layout: {
                type: 'String',
                required: true,
            },
            gap: {
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
exports.interface = postcssSugarPluginLayoutInterface;
function default_1({ params, atRule, replaceWith, }) {
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
    if (finalParams.scope.indexOf('bare') !== -1) {
        areas.forEach((areaId) => {
            vars.push(`
          .area-${areaId}, & > *:nth-child(${areaId}) {
              grid-column-start: ${colsStartByArea[areaId]};
              grid-column-end: ${colsEndByArea[areaId] + 1};
              grid-row-start: ${rowsStartByArea[areaId]};
              grid-row-end: ${rowsEndByArea[areaId] + 1};
              ${finalParams.gap
                ? `padding: sugar.margin(${finalParams.gap})`
                : ''}
          }
        `);
        });
    }
    if (finalParams.scope.indexOf('gap') !== -1 && finalParams.gap) {
        areas.forEach((areaId) => {
            vars.push(`
          .area-${areaId}, & > *:nth-child(${areaId}) {
            padding: sugar.margin(${finalParams.gap});
          }
      `);
        });
        if (finalParams.gapBetween) {
            vars.push(`
        width: calc(100% + sugar.margin(${finalParams.gap}) * 2);
        margin-left: calc(sugar.margin(${finalParams.gap}) * -1);
      `);
        }
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMENHO0FBRUgsTUFBTSxpQ0FBa0MsU0FBUSxxQkFBWTtJQUN4RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztnQkFDN0MsT0FBTyxFQUFFLFNBQVM7YUFDckI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDO2dCQUM3QyxPQUFPLEVBQUUsU0FBUzthQUNyQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQztnQkFDbEQsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQzthQUN0RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFXNkMsc0RBQVM7QUFFdkQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFN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