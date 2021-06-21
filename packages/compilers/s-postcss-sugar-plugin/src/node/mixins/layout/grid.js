import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginLayoutInterface extends __SInterface {
}
postcssSugarPluginLayoutInterface.definition = {
    layout: {
        type: 'String',
        required: true
    },
    gutter: {
        type: 'Number'
    },
    gutterBetween: {
        type: 'Boolean',
        default: false
    },
    align: {
        type: 'String',
        values: ['start', 'end', 'center', 'stretch'],
        default: 'stretch'
    },
    justify: {
        type: 'String',
        values: ['start', 'end', 'center', 'stretch'],
        default: 'stretch'
    },
    scope: {
        type: 'Array<String>',
        values: ['bare', 'lnf', 'gutter', 'align', 'justify'],
        default: ['bare', 'lnf', 'gutter', 'align', 'justify']
    }
};
export { postcssSugarPluginLayoutInterface as interface };
/**
 * @name          grid
 * @namespace     sugar.postcss.mixin.layout
 * @type          PostcssMixin
 *
 * This mixin allows you to create with ease some grid layouts by using a visual
 * description syntax.
 * The mixin accept 1 parameter called layout. Here's some simple layouts to
 * illustrate how it works:
 *
 * - layout 1: <span class="s-color-accent">'1 2 3 4 5 6'</span> : This describe a simple 6 columns layout
 * - layout 2: <span class="s-color-accent">'1 1 2'</span>: This describe a two columns layout with the first columns taking 2/3 of the space and the second one taking 1/3 of it
 * - layout 3: <span class="s-color-accent">'1 2 _ 3 3'</span>: This describe 2 rows with the first having two columns and the second just one
 *
 * @param       {String}        layout      The layout to generate
 * @return      {Css}                   The corresponding grid css
 *
 * @example       css
 * .my-element {
 *    @sugar.layout.grid('1 1 2');
 * }
 *
 * @example     html
 * <div class="my-element">
 *    <div>Column 1</div>
 *    <div>Column 2</div>
 * </div>
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith }) {
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
    const rows = finalParams.layout.split('\n').map((l) => l.trim());
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
        colsStatement.push(`${100 / colsCount}%`);
    }
    for (let i = 0; i < rowsCount; i++) {
        rowsStatement.push(`${100 / rowsCount}%`);
    }
    const vars = [];
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        display: grid;
        grid-template-columns: ${colsStatement.join(' ')};
        grid-template-rows: ${rowsStatement.join(' ')};
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
              ${finalParams.gutter ? `padding: sugar.space(${finalParams.gutter})` : ''}
          }
        `);
        });
    }
    if (finalParams.scope.indexOf('gutter') !== -1 && finalParams.gutter) {
        areas.forEach((areaId) => {
            vars.push(`
          .area-${areaId}, & > *:nth-child(${areaId}) {
            padding: sugar.space(${finalParams.gutter});
          }
      `);
        });
        if (finalParams.gutterBetween) {
            vars.push(`
        width: calc(100% + sugar.space(${finalParams.gutter}) * 2);
        margin-left: calc(sugar.space(${finalParams.gutter}) * -1);
      `);
        }
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdyaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZOztBQUNuRCw0Q0FBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO0tBQ2Y7SUFDRCxhQUFhLEVBQUU7UUFDYixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLFNBQVMsQ0FBQztRQUMxQyxPQUFPLEVBQUUsU0FBUztLQUNuQjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsU0FBUyxDQUFDO1FBQzFDLE9BQU8sRUFBRSxTQUFTO0tBQ25CO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLFNBQVMsQ0FBQztRQUNqRCxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsU0FBUyxDQUFDO0tBQ25EO0NBQ0YsQ0FBQztBQVlKLE9BQU8sRUFBRSxpQ0FBaUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNO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