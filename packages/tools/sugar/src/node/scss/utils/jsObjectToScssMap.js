"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
const plainObject_1 = __importDefault(require("../../../shared/is/plainObject"));
/**
 * @status              wip
 * @todo      interface
 * @todo      doc
 * @todo      tests
 */
function jsObjectToScssMap(value, settings = {}) {
    settings = deepMerge_1.default({
        quoteKeys: ['src', 'import', 'font-family', 'defaultAction']
    }, settings);
    function _jsObjectToScssMap(value, initialIndentLevel = 0) {
        let indentLevel = initialIndentLevel;
        switch (typeof value) {
            case 'boolean':
            case 'number':
                return value.toString();
            case 'string':
                if (value.slice(0, 1) === '#') {
                    return `"${value}"`;
                }
                return value;
            case 'object':
                if (plainObject_1.default(value)) {
                    indentLevel += 1;
                    let indent = indentsToSpaces(indentLevel);
                    let jsObj = value;
                    let sassKeyValPairs = [];
                    sassKeyValPairs = Object.keys(jsObj).reduce((result, key) => {
                        let jsVal = jsObj[key];
                        let sassVal = _jsObjectToScssMap(jsVal, indentLevel);
                        if (isNotUndefined(sassVal)) {
                            if (settings.quoteKeys.indexOf(key) !== -1) {
                                result.push(`${key}: "${sassVal}"`);
                            }
                            else {
                                result.push(`${key}: ${sassVal}`);
                            }
                        }
                        return result;
                    }, []);
                    let result = `(\n${indent + sassKeyValPairs.join(',\n' + indent)}\n${indentsToSpaces(indentLevel - 1)})`;
                    indentLevel -= 1;
                    return result;
                }
                else if (Array.isArray(value)) {
                    let sassVals = [];
                    value.forEach((v) => {
                        if (isNotUndefined(v)) {
                            sassVals.push(_jsObjectToScssMap(v, indentLevel));
                        }
                    });
                    return '(' + sassVals.join(', ') + ')';
                }
                else if (isNull(value))
                    return 'null';
                else {
                    return value.toString();
                }
            default:
                return;
        }
    }
    let res = _jsObjectToScssMap(value);
    res = res.replace(/\s["'](#[a-zA-Z0-9]{3,6})["']/gm, ' $1');
    return res;
}
function indentsToSpaces(indentCount) {
    return Array(indentCount + 1).join('  ');
}
function isNull(value) {
    return value === null;
}
function isNotUndefined(value) {
    return typeof value !== 'undefined';
}
exports.default = jsObjectToScssMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNPYmplY3RUb1Njc3NNYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqc09iamVjdFRvU2Nzc01hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFHZCxpRkFBMkQ7QUFDM0QsaUZBQTZEO0FBRTdEOzs7OztHQUtHO0FBRUgsU0FBUyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDN0MsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1FBQ0UsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDO0tBQzdELEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixTQUFTLGtCQUFrQixDQUFDLEtBQUssRUFBRSxrQkFBa0IsR0FBRyxDQUFDO1FBQ3ZELElBQUksV0FBVyxHQUFHLGtCQUFrQixDQUFDO1FBRXJDLFFBQVEsT0FBTyxLQUFLLEVBQUU7WUFDcEIsS0FBSyxTQUFTLENBQUM7WUFDZixLQUFLLFFBQVE7Z0JBQ1gsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDMUIsS0FBSyxRQUFRO2dCQUNYLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO29CQUM3QixPQUFPLElBQUksS0FBSyxHQUFHLENBQUM7aUJBQ3JCO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2YsS0FBSyxRQUFRO2dCQUNYLElBQUkscUJBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDMUIsV0FBVyxJQUFJLENBQUMsQ0FBQztvQkFDakIsSUFBSSxNQUFNLEdBQUcsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUUxQyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ2xCLElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQztvQkFFekIsZUFBZSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFB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