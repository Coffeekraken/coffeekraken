"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../class/SInterface"));
/**
 * @name                STestInterface
 * @namespace           sugar.node.test.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe the cli parameters for the
 * test process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      move in "format" folder
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STestInterface extends SInterface_1.default {
}
exports.default = STestInterface;
STestInterface.definition = {
    input: {
        type: 'String',
        alias: 'i',
        description: 'Input files glob pattern',
        required: true,
        level: 1
    },
    watch: {
        type: 'String|Object',
        alias: 'w',
        description: 'Watch files glob pattern or settings object',
        level: 1
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlc3RJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS90ZXN0L2ludGVyZmFjZS9TVGVzdEludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx3RUFBa0Q7QUFJbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBcUIsY0FBZSxTQUFRLG9CQUFZOztBQUF4RCxpQ0FnQkM7QUFmUSx5QkFBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsMEJBQTBCO1FBQ3ZDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxlQUFlO1FBQ3JCLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLDZDQUE2QztRQUMxRCxLQUFLLEVBQUUsQ0FBQztLQUNUO0NBQ0YsQ0FBQyJ9