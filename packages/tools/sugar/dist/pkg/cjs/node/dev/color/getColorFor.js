"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pickRandom_js_1 = __importDefault(require("../../../shared/array/pickRandom.js"));
const md5_js_1 = __importDefault(require("../../../shared/crypto/md5.js"));
const availableColors_js_1 = __importDefault(require("../../../shared/dev/color/availableColors.js"));
const deepMerge_js_1 = __importDefault(require("../../../shared/object/deepMerge.js"));
const sharedContext_js_1 = __importDefault(require("../../process/sharedContext.js"));
let _colorsStack = {};
let _colorUsedByScope = {};
function getColorFor(ref, settings) {
    settings = (0, deepMerge_js_1.default)({
        scope: 'default',
        excludeBasics: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    const ctx = (0, sharedContext_js_1.default)();
    if (ctx.colorUsedByScope) {
        _colorUsedByScope = ctx.colorUsedByScope;
    }
    const availableColors = (0, availableColors_js_1.default)(settings);
    const scopeId = md5_js_1.default.encrypt(settings.scope);
    const refId = md5_js_1.default.encrypt(ref);
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
        const color = (0, pickRandom_js_1.default)(availableColors);
        _colorsStack[`${scopeId}.${refId}`] = color;
        return color;
    }
    else {
        for (let i = 0; i < availableColors.length; i++) {
            if (_colorUsedByScope[scopeId].indexOf(availableColors[i]) === -1) {
                _colorUsedByScope[scopeId].push(availableColors[i]);
                _colorsStack[`${scopeId}.${refId}`] = availableColors[i];
                (0, sharedContext_js_1.default)(Object.assign(Object.assign({}, ctx), { colorUsedByScope: _colorUsedByScope }));
                return availableColors[i];
            }
        }
    }
}
exports.default = getColorFor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0ZBQStEO0FBQy9ELDJFQUFrRDtBQUVsRCxzR0FBNkU7QUFDN0UsdUZBQThEO0FBQzlELHNGQUE2RDtBQW1DN0QsSUFBSSxZQUFZLEdBQTJCLEVBQUUsQ0FBQztBQUM5QyxJQUFJLGlCQUFpQixHQUE2QixFQUFFLENBQUM7QUFFckQsU0FBd0IsV0FBVyxDQUMvQixHQUFRLEVBQ1IsUUFBd0M7SUFFeEMsUUFBUSxHQUFHLElBQUEsc0JBQVcsRUFDbEI7UUFDSSxLQUFLLEVBQUUsU0FBUztRQUNoQixhQUFhLEVBQUUsSUFBSTtLQUN0QixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLE1BQU0sR0FBRyxHQUFHLElBQUEsMEJBQWUsR0FBRSxDQUFDO0lBQzlCLElBQUksR0FBRyxDQUFDLGdCQUFnQixFQUFFO1FBQ3RCLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztLQUM1QztJQUVELE1BQU0sZUFBZSxHQUFHLElBQUEsNEJBQWlCLEVBQUMsUUFBUSxDQUFDLENBQUM7SUFFcEQsTUFBTSxPQUFPLEdBQUcsZ0JBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlDLE1BQU0sS0FBSyxHQUFHLGdCQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpDLGlCQUFpQjtJQUNqQixJQUFJLFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxFQUFFO1FBQ3JDLE9BQU8sWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDOUM7SUFFRCw4QkFBOEI7SUFDOUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztRQUFFLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUVqRSxtRUFBbUU7SUFDbkUsOEJBQThCO0lBQzlCLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUU7UUFDN0QsZUFBZTtRQUNmLE1BQU0sS0FBSyxHQUFHLElBQUEsdUJBQVksRUFBQyxlQUFlLENBQUMsQ0FBQztRQUM1QyxZQUFZLENBQUMsR0FBRyxPQUFPLElBQUksS0FBSyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDNUMsT0FBTyxLQUFLLENBQUM7S0FDaEI7U0FBTTtRQUNILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdDLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMvRCxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekQsSUFBQSwwQkFBZSxrQ0FDUixHQUFHLEtBQ04sZ0JBQWdCLEVBQUUsaUJBQWlCLElBQ3JDLENBQUM7Z0JBQ0gsT0FBTyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0I7U0FDSjtLQUNKO0FBQ0wsQ0FBQztBQWxERCw4QkFrREMifQ==