"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const get_1 = __importDefault(require("./get"));
const set_1 = __importDefault(require("./set"));
module.exports = (obj, path, value = {}) => {
    const v = get_1.default(obj, path);
    if (v === undefined) {
        set_1.default(obj, path, value);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5zdXJlRXhpc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW5zdXJlRXhpc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7OztBQUVWLGdEQUEwQjtBQUMxQixnREFBMEI7QUEyQjFCLGlCQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDakMsTUFBTSxDQUFDLEdBQUcsYUFBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQixJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7UUFDbkIsYUFBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDekI7QUFDSCxDQUFDLENBQUMifQ==