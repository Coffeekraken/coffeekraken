"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDobbyFsPoolSettingsSpecs = void 0;
__exportStar(require("../shared/specs"), exports);
const path_1 = require("@coffeekraken/sugar/path");
exports.SDobbyFsPoolSettingsSpecs = {
    type: 'Object',
    title: 'SDobby FS adapter settings',
    description: 'Specify the SDobby FS adapter settings',
    props: {
        folder: {
            type: 'String',
            title: 'Folder',
            description: 'Specify where to save the SDobby configurations',
            default: `${(0, path_1.__homeDir)()}/.dobby`,
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQWdDO0FBRWhDLG1EQUFxRDtBQUV4QyxRQUFBLHlCQUF5QixHQUFHO0lBQ3JDLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLDRCQUE0QjtJQUNuQyxXQUFXLEVBQUUsd0NBQXdDO0lBQ3JELEtBQUssRUFBRTtRQUNILE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLFFBQVE7WUFDZixXQUFXLEVBQUUsaURBQWlEO1lBQzlELE9BQU8sRUFBRSxHQUFHLElBQUEsZ0JBQVMsR0FBRSxTQUFTO1NBQ25DO0tBQ0o7Q0FDSixDQUFDIn0=