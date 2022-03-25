var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var layout_exports = {};
__export(layout_exports, {
  default: () => layout_default,
  interface: () => postcssSugarPluginLayoutInterface
});
module.exports = __toCommonJS(layout_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class postcssSugarPluginLayoutInterface extends import_s_interface.default {
  static get _definition() {
    return {
      layout: {
        type: "String",
        required: true
      },
      gap: {
        type: "Number"
      },
      gapBetween: {
        type: "Boolean",
        default: false
      },
      align: {
        type: "String",
        values: ["start", "end", "center", "stretch"],
        default: "stretch"
      },
      justify: {
        type: "String",
        values: ["start", "end", "center", "stretch"],
        default: "stretch"
      },
      scope: {
        type: "Array<String>",
        values: ["bare", "lnf", "gap", "align", "justify"],
        default: ["bare", "lnf", "gap", "align", "justify"]
      }
    };
  }
}
function layout_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const areas = [];
  const colsCountByArea = {};
  const rowsCountByArea = {};
  const areasCountedByLine = {};
  const areasCountedByCol = {};
  const colsStartByArea = {};
  const rowsStartByArea = {};
  const colsEndByArea = {};
  const rowsEndByArea = {};
  const rows = finalParams.layout.split(/(\n|_)/gm).map((l) => l.trim()).filter((l) => l != "_" && l != "");
  const rowsCount = rows.length;
  let colsCount = 0;
  rows.forEach((row) => {
    const rowCols = row.split(" ").map((l) => l.trim()).filter((l) => l);
    if (rowCols.length > colsCount)
      colsCount = rowCols.length;
  });
  let currentCol = 0, currentRow = 0;
  rows.forEach((row) => {
    currentRow++;
    currentCol = 0;
    const rowCols = row.split(" ").map((l) => l.trim()).filter((l) => l);
    rowCols.forEach((areaId) => {
      var _a, _b;
      currentCol++;
      if (areas.indexOf(areaId) === -1) {
        areas.push(areaId);
      }
      if (!areasCountedByCol[`${currentCol}-${areaId}`]) {
        areasCountedByCol[`${currentCol}-${areaId}`] = true;
        colsCountByArea[areaId] = ((_a = colsCountByArea[areaId]) != null ? _a : 0) + 1;
      }
      if (!areasCountedByLine[`${currentRow}-${areaId}`]) {
        areasCountedByLine[`${currentRow}-${areaId}`] = true;
        rowsCountByArea[areaId] = ((_b = rowsCountByArea[areaId]) != null ? _b : 0) + 1;
      }
    });
  });
  currentCol = 0;
  currentRow = 0;
  rows.forEach((row) => {
    currentRow++;
    currentCol = 0;
    const rowCols = row.split(" ").map((l) => l.trim()).filter((l) => l);
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
    if (colsCount <= 1) {
      colsStatement.push("100%");
    } else {
      colsStatement.push("1fr");
    }
  }
  const vars = [];
  if (finalParams.scope.indexOf("bare") !== -1) {
    vars.push(`
        display: grid;
        grid-template-columns: ${colsStatement.join(" ")};
        grid-template-rows: auto;
      `);
  }
  if (finalParams.scope.indexOf("align") !== -1) {
    vars.push(`
      align-items: ${finalParams.align};
    `);
  }
  if (finalParams.scope.indexOf("justify") !== -1) {
    vars.push(`
      justify-items: ${finalParams.justify};
    `);
  }
  if (finalParams.scope.indexOf("bare") !== -1) {
    areas.forEach((areaId) => {
      vars.push(`
          .area-${areaId}, & > *:nth-child(${areaId}) {
              grid-column-start: ${colsStartByArea[areaId]};
              grid-column-end: ${colsEndByArea[areaId] + 1};
              grid-row-start: ${rowsStartByArea[areaId]};
              grid-row-end: ${rowsEndByArea[areaId] + 1};
              ${finalParams.gap ? `padding: sugar.space(${finalParams.gap})` : ""}
          }
        `);
    });
  }
  if (finalParams.scope.indexOf("gap") !== -1 && finalParams.gap) {
    areas.forEach((areaId) => {
      vars.push(`
          .area-${areaId}, & > *:nth-child(${areaId}) {
            padding: sugar.space(${finalParams.gap});
          }
      `);
    });
    if (finalParams.gapBetween) {
      vars.push(`
        width: calc(100% + sugar.space(${finalParams.gap}) * 2);
        margin-left: calc(sugar.space(${finalParams.gap}) * -1);
      `);
    }
  }
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
