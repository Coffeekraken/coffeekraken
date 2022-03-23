var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../node/monorepo/linkPackages"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // @ts-nocheck
    const linkPackages_1 = __importDefault(require("../../node/monorepo/linkPackages"));
    exports.default = (stringArgs = '') => {
        let individual = false;
        if (stringArgs.match(/\s?--individual\s?/) || stringArgs.match(/\s?-i\s?/))
            individual = true;
        (0, linkPackages_1.default)({
            individual
        });
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaW5rLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLGNBQWM7SUFDZCxvRkFBOEQ7SUFFOUQsa0JBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7UUFDakMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQ3hFLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBQSxzQkFBYyxFQUFDO1lBQ2IsVUFBVTtTQUNYLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyJ9