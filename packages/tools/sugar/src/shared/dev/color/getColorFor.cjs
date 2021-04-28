"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = __importDefault(require("../../crypt/md5"));
const availableColors_1 = __importDefault(require("./availableColors"));
const pickRandom_1 = __importDefault(require("../../array/pickRandom"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const _colorUsedByScope = {};
const _colorsStack = {};
function getColorFor(ref, settings) {
    settings = deepMerge_1.default({
        scope: 'default',
        excludeBasics: true
    }, settings !== null && settings !== void 0 ? settings : {});
    const availableColors = availableColors_1.default(settings);
    const scopeId = md5_1.default.encrypt(settings.scope);
    const refId = md5_1.default.encrypt(ref);
    // get from cache
    if (_colorsStack[`${scopeId}.${refId}`])
        return _colorsStack[`${scopeId}.${refId}`];
    // make sure some stack are ok
    if (!_colorUsedByScope[scopeId])
        _colorUsedByScope[scopeId] = [];
    // if we already have taken all the available colors for this scope
    // simply get a color randomly
    if (_colorUsedByScope[scopeId].length >= availableColors.length) {
        // fully random
        const color = pickRandom_1.default(availableColors);
        _colorsStack[`${scopeId}.${refId}`] = color;
        return color;
    }
    else {
        for (let i = 0; i < availableColors.length; i++) {
            if (_colorUsedByScope[scopeId].indexOf(availableColors[i]) === -1) {
                _colorUsedByScope[scopeId].push(availableColors[i]);
                _colorsStack[`${scopeId}.${refId}`] = availableColors[i];
                return availableColors[i];
            }
        }
    }
}
exports.default = getColorFor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q29sb3JGb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2Rldi9jb2xvci9nZXRDb2xvckZvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBEQUFvQztBQUNwQyx3RUFBZ0Y7QUFDaEYsd0VBQWtEO0FBQ2xELHVFQUFpRDtBQThCakQsTUFBTSxpQkFBaUIsR0FBNkIsRUFBRSxDQUFDO0FBQ3ZELE1BQU0sWUFBWSxHQUEyQixFQUFFLENBQUM7QUFFaEQsU0FBd0IsV0FBVyxDQUNqQyxHQUFRLEVBQ1IsUUFBd0M7SUFFeEMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1FBQ0UsS0FBSyxFQUFFLFNBQVM7UUFDaEIsYUFBYSxFQUFFLElBQUk7S0FDcEIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FBQztJQUVGLE1BQU0sZUFBZSxHQUFHLHlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXBELE1BQU0sT0FBTyxHQUFHLGFBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlDLE1BQU0sS0FBSyxHQUFHLGFBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFakMsaUJBQWlCO0lBQ2pCLElBQUksWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3JDLE9BQU8sWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFN0MsOEJBQThCO0lBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7UUFBRSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFakUsbUVBQW1FO0lBQ25FLDhCQUE4QjtJQUM5QixJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFO1FBQy9ELGVBQWU7UUFDZixNQUFNLEtBQUssR0FBRyxvQkFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzVDLFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM1QyxPQUFPLEtBQUssQ0FBQztLQUNkO1NBQU07UUFDTCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDakUsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxZQUFZLENBQUMsR0FBRyxPQUFPLElBQUksS0FBSyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELE9BQU8sZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNCO1NBQ0Y7S0FDRjtBQUNILENBQUM7QUF4Q0QsOEJBd0NDIn0=