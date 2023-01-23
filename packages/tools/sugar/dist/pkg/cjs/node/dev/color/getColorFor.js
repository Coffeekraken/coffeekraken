"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("@coffeekraken/sugar/process");
const pickRandom_1 = __importDefault(require("../../../shared/array/pickRandom"));
const md5_1 = __importDefault(require("../../../shared/crypto/md5"));
const availableColors_1 = __importDefault(require("../../../shared/dev/color/availableColors"));
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
let _colorsStack = {};
let _colorUsedByScope = {};
function getColorFor(ref, settings) {
    settings = (0, deepMerge_1.default)({
        scope: 'default',
        excludeBasics: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    const ctx = (0, process_1.__sharedContext)();
    if (ctx.colorUsedByScope) {
        _colorUsedByScope = ctx.colorUsedByScope;
    }
    const availableColors = (0, availableColors_1.default)(settings);
    const scopeId = md5_1.default.encrypt(settings.scope);
    const refId = md5_1.default.encrypt(ref);
    // get from cache
    if (_colorsStack[`${scopeId}.${refId}`]) {
        return _colorsStack[`${scopeId}.${refId}`];
    }
    // make sure some stack are ok
    if (!_colorUsedByScope[scopeId])
        _colorUsedByScope[scopeId] = [];
    // if we already have taken all the available colors for this scope
    // simply get a color randomly
    if (_colorUsedByScope[scopeId].length >= availableColors.length) {
        // fully random
        const color = (0, pickRandom_1.default)(availableColors);
        _colorsStack[`${scopeId}.${refId}`] = color;
        return color;
    }
    else {
        for (let i = 0; i < availableColors.length; i++) {
            if (_colorUsedByScope[scopeId].indexOf(availableColors[i]) === -1) {
                _colorUsedByScope[scopeId].push(availableColors[i]);
                _colorsStack[`${scopeId}.${refId}`] = availableColors[i];
                (0, process_1.__sharedContext)(Object.assign(Object.assign({}, ctx), { colorUsedByScope: _colorUsedByScope }));
                return availableColors[i];
            }
        }
    }
}
exports.default = getColorFor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseURBQThEO0FBQzlELGtGQUE0RDtBQUM1RCxxRUFBK0M7QUFFL0MsZ0dBQTBFO0FBQzFFLGlGQUEyRDtBQWlDM0QsSUFBSSxZQUFZLEdBQTJCLEVBQUUsQ0FBQztBQUM5QyxJQUFJLGlCQUFpQixHQUE2QixFQUFFLENBQUM7QUFFckQsU0FBd0IsV0FBVyxDQUMvQixHQUFRLEVBQ1IsUUFBd0M7SUFFeEMsUUFBUSxHQUFHLElBQUEsbUJBQVcsRUFDbEI7UUFDSSxLQUFLLEVBQUUsU0FBUztRQUNoQixhQUFhLEVBQUUsSUFBSTtLQUN0QixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLE1BQU0sR0FBRyxHQUFHLElBQUEseUJBQWUsR0FBRSxDQUFDO0lBQzlCLElBQUksR0FBRyxDQUFDLGdCQUFnQixFQUFFO1FBQ3RCLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztLQUM1QztJQUVELE1BQU0sZUFBZSxHQUFHLElBQUEseUJBQWlCLEVBQUMsUUFBUSxDQUFDLENBQUM7SUFFcEQsTUFBTSxPQUFPLEdBQUcsYUFBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsTUFBTSxLQUFLLEdBQUcsYUFBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVqQyxpQkFBaUI7SUFDakIsSUFBSSxZQUFZLENBQUMsR0FBRyxPQUFPLElBQUksS0FBSyxFQUFFLENBQUMsRUFBRTtRQUNyQyxPQUFPLFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQzlDO0lBRUQsOEJBQThCO0lBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7UUFBRSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFakUsbUVBQW1FO0lBQ25FLDhCQUE4QjtJQUM5QixJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFO1FBQzdELGVBQWU7UUFDZixNQUFNLEtBQUssR0FBRyxJQUFBLG9CQUFZLEVBQUMsZUFBZSxDQUFDLENBQUM7UUFDNUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzVDLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO1NBQU07UUFDSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDL0QsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxZQUFZLENBQUMsR0FBRyxPQUFPLElBQUksS0FBSyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELElBQUEseUJBQWUsa0NBQ1IsR0FBRyxLQUNOLGdCQUFnQixFQUFFLGlCQUFpQixJQUNyQyxDQUFDO2dCQUNILE9BQU8sZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdCO1NBQ0o7S0FDSjtBQUNMLENBQUM7QUFsREQsOEJBa0RDIn0=