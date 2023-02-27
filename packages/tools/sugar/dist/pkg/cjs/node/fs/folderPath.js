"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
function __folderPath(path, settings) {
    const finalSettings = Object.assign({ checkExistence: false }, settings !== null && settings !== void 0 ? settings : {});
    if (finalSettings.checkExistence) {
        if (!(0, fs_1.__isPath)(path, true))
            return false;
    }
    const parts = path.split('/');
    if (parts.length <= 1) {
        return '';
    }
    return parts.slice(0, -1).join('/');
}
exports.default = __folderPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLCtDQUFrRDtBQStCbEQsU0FBd0IsWUFBWSxDQUFDLElBQUksRUFBRSxRQUF1QztJQUU5RSxNQUFNLGFBQWEsbUJBQ2YsY0FBYyxFQUFFLEtBQUssSUFDbEIsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNwQixDQUFBO0lBRUQsSUFBSSxhQUFhLENBQUMsY0FBYyxFQUFFO1FBQzlCLElBQUksQ0FBQyxJQUFBLGFBQVEsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7S0FDM0M7SUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7UUFDbkIsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUNELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQWZELCtCQWVDIn0=