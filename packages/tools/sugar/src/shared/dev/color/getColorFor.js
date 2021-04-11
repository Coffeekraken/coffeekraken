var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../crypt/md5", "./availableColors", "../../array/pickRandom", "../../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q29sb3JGb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRDb2xvckZvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLDBEQUFvQztJQUNwQyx3RUFBZ0Y7SUFDaEYsd0VBQWtEO0lBQ2xELHVFQUFpRDtJQThCakQsTUFBTSxpQkFBaUIsR0FBNkIsRUFBRSxDQUFDO0lBQ3ZELE1BQU0sWUFBWSxHQUEyQixFQUFFLENBQUM7SUFFaEQsU0FBd0IsV0FBVyxDQUNqQyxHQUFRLEVBQ1IsUUFBd0M7UUFFeEMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsS0FBSyxFQUFFLFNBQVM7WUFDaEIsYUFBYSxFQUFFLElBQUk7U0FDcEIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FBQztRQUVGLE1BQU0sZUFBZSxHQUFHLHlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXBELE1BQU0sT0FBTyxHQUFHLGFBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLE1BQU0sS0FBSyxHQUFHLGFBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakMsaUJBQWlCO1FBQ2pCLElBQUksWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ3JDLE9BQU8sWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFN0MsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7WUFBRSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFakUsbUVBQW1FO1FBQ25FLDhCQUE4QjtRQUM5QixJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFO1lBQy9ELGVBQWU7WUFDZixNQUFNLEtBQUssR0FBRyxvQkFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzVDLFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUM1QyxPQUFPLEtBQUssQ0FBQztTQUNkO2FBQU07WUFDTCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDL0MsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ2pFLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6RCxPQUFPLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDM0I7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQXhDRCw4QkF3Q0MifQ==