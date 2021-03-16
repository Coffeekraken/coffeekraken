"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../node/class/SInterface"));
class SNpmBinInterface extends SInterface_1.default {
}
exports.default = SNpmBinInterface;
SNpmBinInterface.definition = {
    action: {
        type: 'String',
        required: true,
        alias: 'a',
        values: ['install', 'i', 'uninstall', 'u', 'un'],
        description: 'Specify which action you want to execute in the "bin" module'
    },
    global: {
        type: 'Boolean',
        required: true,
        alias: 'g',
        description: 'Specify if you want to symlink the passed bin in the global scope or in local one',
        default: false
    },
    package: {
        type: 'String',
        alias: 'p',
        description: "Specify the package you want to install the bin from. If not specified, will take the current package where you're in using ```process.cwd``` function",
        default: null
    },
    bin: {
        type: 'String',
        alias: 'b',
        description: 'Specify the bin you want to symlink',
        default: null
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05wbUJpbkNsaUludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jbGkvbnBtL2ludGVyZmFjZS9TTnBtQmluQ2xpSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGdGQUF5RDtBQUV6RCxNQUFxQixnQkFBaUIsU0FBUSxvQkFBVzs7QUFBekQsbUNBZ0NDO0FBL0JRLDJCQUFVLEdBQUc7SUFDbEIsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztRQUNoRCxXQUFXLEVBQ1QsOERBQThEO0tBQ2pFO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUNULG1GQUFtRjtRQUNyRixPQUFPLEVBQUUsS0FBSztLQUNmO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFDVCx3SkFBd0o7UUFDMUosT0FBTyxFQUFFLElBQUk7S0FDZDtJQUNELEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUscUNBQXFDO1FBQ2xELE9BQU8sRUFBRSxJQUFJO0tBQ2Q7Q0FDRixDQUFDIn0=