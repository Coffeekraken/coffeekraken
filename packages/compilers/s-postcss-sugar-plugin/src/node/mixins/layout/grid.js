import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginLayoutInterface extends __SInterface {
}
postcssSugarPluginLayoutInterface.definition = {
    layout: {
        type: 'String',
        required: true
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
export default function ({ params, atRule, processNested }) {
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
        colsCount += rowCols.length;
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
    const vars = [
        `
      display: grid;
      grid-template-columns: ${colsStatement.join(' ')};
      grid-template-rows: ${rowsStatement.join(' ')};
    `
    ];
    areas.forEach((areaId) => {
        vars.push(`
        .area-${areaId}, & > *:nth-child(${areaId}) {
            grid-column-start: ${colsStartByArea[areaId]};
            grid-column-end: ${colsEndByArea[areaId] + 1};
            grid-row-start: ${rowsStartByArea[areaId]};
            grid-row-end: ${rowsEndByArea[areaId] + 1};
        }
      `);
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdyaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZOztBQUNuRCw0Q0FBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFPSixPQUFPLEVBQUUsaUNBQWlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLEtBQUssR0FBYSxFQUFFLENBQUM7SUFFM0IsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzNCLE1BQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUMzQixNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztJQUM5QixNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztJQUU3QixNQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDM0IsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzNCLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUN6QixNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFFekIsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUVqRSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzlCLElBQUksU0FBUyxHQUFHLENBQUMs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