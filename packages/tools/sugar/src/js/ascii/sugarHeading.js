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
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = sugarHeading;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJIZWFkaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3VnYXJIZWFkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVixrRUFBOEM7SUFDOUMsbUVBQStDO0lBNkIvQyxTQUFTLFlBQVksQ0FBQyxRQUFvQztRQUFwQyx5QkFBQSxFQUFBLGFBQW9DO1FBQ3hELFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLE9BQU8sRUFBRSxJQUFJO1NBQ2QsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUNGLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLFFBQVEsQ0FBQyxPQUFPO1lBQUUsT0FBTyxHQUFHLFlBQVUsUUFBUSxDQUFDLE9BQU8sYUFBVSxDQUFDO1FBQ3JFLElBQU0sS0FBSyxHQUFHO1lBQ1osY0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsZUFBVztZQUNqRCxjQUNFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxtREFDa0I7WUFDL0MsY0FDRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsK0ZBQzhEO1lBQzNGLGNBQ0UsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLG9EQUNzQjtZQUNuRCxjQUNFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxvREFDbUI7WUFDaEQsY0FDRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsb0RBQ2lCLE9BQU8sU0FBTTtZQUMzRCxjQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxvQ0FBZ0M7WUFDdEUsY0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsZUFBVztTQUNsRDthQUNFLEdBQUcsQ0FBQyxVQUFDLElBQUk7WUFDUixPQUFPLG1CQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsa0JBQWUsWUFBWSxDQUFDIn0=