"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const linkPackages_1 = __importDefault(require("../../node/monorepo/linkPackages"));
const stdio_1 = __importDefault(require("../../node/process/stdio"));
module.exports = (stringArgs = '') => {
    const pro = linkPackages_1.default();
    stdio_1.default(pro);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaW5rLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLG9GQUE4RDtBQUM5RCxxRUFBK0M7QUFFL0MsaUJBQVMsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDM0IsTUFBTSxHQUFHLEdBQUcsc0JBQWMsRUFBRSxDQUFDO0lBQzdCLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQyJ9