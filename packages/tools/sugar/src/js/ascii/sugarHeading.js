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
//# sourceMappingURL=module.js.map