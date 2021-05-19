import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginLayoutInterface extends __SInterface {
  static definition = {
    layout: {
      type: 'String',
      required: true
    }
  };
}

export interface IPostcssSugarPluginLayoutParams {
  layout: string;
}

export { postcssSugarPluginLayoutInterface as interface };

export default function ({
  params,
  atRule,
  processNested
}: {
  params: IPostcssSugarPluginLayoutParams;
  atRule: any;
  processNested: Function;
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
    colsCount += rowCols.length;
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

  const vars: string[] = [
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
