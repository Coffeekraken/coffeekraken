// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge", "../console/parseHtml"], factory);
    }
})(function (require, exports) {
    "use strict";
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var parseHtml_1 = __importDefault(require("../console/parseHtml"));
    function sugarHeading(settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_1.default({
            version: '2.0.0',
            borders: true
        }, settings);
        var version = '';
        if (settings.version)
            version = "<white>" + settings.version + "</white>";
        var value = [
            "<yellow>" + (settings.borders ? '█' : '') + "</yellow>",
            "<yellow>" + (settings.borders ? '█' : '') + "     ____                           </yellow>",
            "<yellow>" + (settings.borders ? '█' : '') + "   / ____|</yellow><white>Coffee<cyan>kraken</cyan></white><yellow> __ _ _ __   </yellow>",
            "<yellow>" + (settings.borders ? '█' : '') + "   \\___ \\| | | |/ _` |/ _` | `__|  </yellow>",
            "<yellow>" + (settings.borders ? '█' : '') + "    ___) | |_| | (_| | (_| | |       </yellow>",
            "<yellow>" + (settings.borders ? '█' : '') + "   |____/ \\__,_|\\__, |\\__,_|_|</yellow> " + version + "    ",
            "<yellow>" + (settings.borders ? '█' : '') + "                |___/</yellow>",
            "<yellow>" + (settings.borders ? '█' : '') + "</yellow>"
        ]
            .map(function (line) {
            return parseHtml_1.default(line).trim();
        })
            .join('\n');
        return value;
    }
    return sugarHeading;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJIZWFkaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXJIZWFkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7OztJQUVWLGtFQUE4QztJQUM5QyxtRUFBK0M7SUE2Qi9DLFNBQVMsWUFBWSxDQUFDLFFBQW9DO1FBQXBDLHlCQUFBLEVBQUEsYUFBb0M7UUFDeEQsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsT0FBTyxFQUFFLE9BQU87WUFDaEIsT0FBTyxFQUFFLElBQUk7U0FDZCxFQUNELFFBQVEsQ0FDVCxDQUFDO1FBQ0YsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksUUFBUSxDQUFDLE9BQU87WUFBRSxPQUFPLEdBQUcsWUFBVSxRQUFRLENBQUMsT0FBTyxhQUFVLENBQUM7UUFDckUsSUFBTSxLQUFLLEdBQUc7WUFDWixjQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxlQUFXO1lBQ2pELGNBQ0UsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLG1EQUNrQjtZQUMvQyxjQUNFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSwrRkFDOEQ7WUFDM0YsY0FDRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsb0RBQ3NCO1lBQ25ELGNBQ0UsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLG9EQUNtQjtZQUNoRCxjQUNFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxvREFDaUIsT0FBTyxTQUFNO1lBQzNELGNBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLG9DQUFnQztZQUN0RSxjQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxlQUFXO1NBQ2xEO2FBQ0UsR0FBRyxDQUFDLFVBQUMsSUFBSTtZQUNSLE9BQU8sbUJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQyxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFZCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxPQUFTLFlBQVksQ0FBQyJ9