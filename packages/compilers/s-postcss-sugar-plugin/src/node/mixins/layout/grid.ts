import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginLayoutInterface extends __SInterface {
  static definition = {
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
      values: ['start','end','center','stretch'],
      default: 'stretch'
    },
    justify: {
      type: 'String',
      values: ['start','end','center','stretch'],
      default: 'stretch'
    },
    scope: {
      type: 'Array<String>',
      values: ['bare','lnf','gutter','align','justify'],
      default: ['bare','lnf','gutter','align','justify']
    }
  };
}

export interface IPostcssSugarPluginLayoutParams {
  layout: string;
  gutter: number;
  gutterBetween: boolean;
  align: 'start' | 'end' | 'center' | 'stretch';
  justify: 'start' | 'end' | 'center' | 'stretch';
  scope: string[];
}

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
export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: IPostcssSugarPluginLayoutParams;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginLayoutParams = {
    ...params
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

  const rows = finalParams.layout.split('\n').map((l) => l.trim());

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
    colsStatement.push(`${100 / colsCount}%`);
  }
  for (let i = 0; i < rowsCount; i++) {
    rowsStatement.push(`${100 / rowsCount}%`);
  }

  const vars: string[] = [];
  
  if (finalParams.scope.indexOf('bare') !== -1) {
    vars.push(
      `
        display: grid;
        grid-template-columns: ${colsStatement.join(' ')};
        grid-template-rows: ${rowsStatement.join(' ')};
      `
    );
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
