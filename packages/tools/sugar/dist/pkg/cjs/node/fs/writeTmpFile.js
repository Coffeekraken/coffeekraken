"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const path_2 = __importDefault(require("path"));
const uniqid_1 = __importDefault(require("../../node/string/uniqid"));
function __writeTmpFile(data, settings = {}) {
    var _a;
    settings = Object.assign({ path: undefined }, settings);
    let path = path_2.default.resolve((0, path_1.__packageTmpDir)(), (_a = settings.path) !== null && _a !== void 0 ? _a : (0, uniqid_1.default)() + '.tmp');
    (0, fs_1.__writeFileSync)(path, data);
    return path;
}
exports.default = __writeTmpFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtDQUF5RDtBQUN6RCxtREFBMkQ7QUFDM0QsZ0RBQTBCO0FBQzFCLHNFQUFnRDtBQW1DaEQsU0FBd0IsY0FBYyxDQUNsQyxJQUFJLEVBQ0osV0FBMkMsRUFBRTs7SUFFN0MsUUFBUSxtQkFDSixJQUFJLEVBQUUsU0FBUyxJQUNaLFFBQVEsQ0FDZCxDQUFDO0lBRUYsSUFBSSxJQUFJLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FDckIsSUFBQSxzQkFBZSxHQUFFLEVBQ2pCLE1BQUEsUUFBUSxDQUFDLElBQUksbUNBQUksSUFBQSxnQkFBUSxHQUFFLEdBQUcsTUFBTSxDQUN2QyxDQUFDO0lBQ0YsSUFBQSxvQkFBZSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBZkQsaUNBZUMifQ==