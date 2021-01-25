"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const blessed_1 = __importDefault(require("blessed"));
const SBlessedComponent_1 = __importDefault(require("../SBlessedComponent"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const color_1 = __importDefault(require("../../color/color"));
module.exports = class SBlessedWindowBox extends SBlessedComponent_1.default {
    /**
     * @name                  constructor
     * @type                  Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor($content, settings = {}) {
        super(deepMerge_1.default({
            blessed: {
                style: {
                    fg: 'black',
                    bg: color_1.default('terminal.primary').toString()
                },
                padding: {
                    top: 1,
                    left: 2,
                    right: 2,
                    bottom: 1
                }
            }
        }, settings));
        this._$body = blessed_1.default.box({
            width: '100%',
            height: '100%',
            position: {
                top: 0,
                left: 0
            },
            style: {
                fg: 'white',
                bg: 'black'
            }
        });
        this.append(this._$body);
        this.update();
    }
    update() {
        setTimeout(() => {
            super.update();
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1dpbmRvd0JveC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNXaW5kb3dCb3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFFZCxzREFBZ0M7QUFDaEMsNkVBQXVEO0FBQ3ZELHVFQUFpRDtBQUlqRCw4REFBd0M7QUFvQ3hDLGlCQUFTLE1BQU0saUJBQWtCLFNBQVEsMkJBQW1CO0lBQzFEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFRLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDakMsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxPQUFPO29CQUNYLEVBQUUsRUFBRSxlQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxRQUFRLEVBQUU7aUJBQzNDO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxHQUFHLEVBQUUsQ0FBQztvQkFDTixJQUFJLEVBQUUsQ0FBQztvQkFDUCxLQUFLLEVBQUUsQ0FBQztvQkFDUixNQUFNLEVBQUUsQ0FBQztpQkFDVjthQUNGO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxpQkFBUyxDQUFDLEdBQUcsQ0FBQztZQUMxQixLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFO2dCQUNSLEdBQUcsRUFBRSxDQUFDO2dCQUNOLElBQUksRUFBRSxDQUFDO2FBQ1I7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLE9BQU87Z0JBQ1gsRUFBRSxFQUFFLE9BQU87YUFDWjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXpCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQyJ9