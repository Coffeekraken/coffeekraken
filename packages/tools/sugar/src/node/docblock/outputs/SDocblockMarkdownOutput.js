"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SDocblockOutput_1 = __importDefault(require("../SDocblockOutput"));
const default_1 = __importDefault(require("./markdown/templates/default"));
const class_1 = __importDefault(require("./markdown/templates/class"));
const function_1 = __importDefault(require("./markdown/templates/function"));
const default_2 = __importDefault(require("./markdown/blocks/default"));
const class_2 = __importDefault(require("./markdown/blocks/class"));
const function_2 = __importDefault(require("./markdown/blocks/function"));
module.exports = (_a = class SDocblockMarkdownOutput extends SDocblockOutput_1.default {
        /**
         * @name        constructor
         * @type        Function
         * @constructor
         *
         * Constructor
         *
         * @since     2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(docblockInstance, settings = {}) {
            super(docblockInstance, deepMerge_1.default({
                templates: {
                    default: default_1.default,
                    class: class_1.default,
                    function: function_1.default
                },
                blocks: {
                    default: default_2.default,
                    class: class_2.default,
                    function: function_2.default
                }
            }, settings));
        }
    },
    /**
     * @name        supportedTags
     * @type        Array<String>
     * @static
     *
     * Store the list of supported docblock tags
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.supportedTags = [
        '@type',
        '@namespace',
        '@name',
        '@static',
        '@get',
        '@set',
        '@since',
        '@description',
        '@param',
        '@example',
        '@author'
    ],
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrTWFya2Rvd25PdXRwdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jYmxvY2tNYXJrZG93bk91dHB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7O0FBRVYsdUVBQWlEO0FBQ2pELHlFQUFtRDtBQUduRCwyRUFBNkQ7QUFDN0QsdUVBQXlEO0FBQ3pELDZFQUErRDtBQUUvRCx3RUFBdUQ7QUFDdkQsb0VBQW1EO0FBQ25ELDBFQUF5RDtBQXdDekQsdUJBQVMsTUFBTSx1QkFBd0IsU0FBUSx5QkFBaUI7UUF5QjlEOzs7Ozs7Ozs7V0FTRztRQUNILFlBQVksZ0JBQWdCLEVBQUUsUUFBUSxHQUFHLEVBQUU7WUFDekMsS0FBSyxDQUNILGdCQUFnQixFQUNoQixtQkFBVyxDQUNUO2dCQUNFLFNBQVMsRUFBRTtvQkFDVCxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixLQUFLLEVBQUUsZUFBZTtvQkFDdEIsUUFBUSxFQUFFLGtCQUFrQjtpQkFDN0I7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLE9BQU8sRUFBRSxpQkFBYztvQkFDdkIsS0FBSyxFQUFFLGVBQVk7b0JBQ25CLFFBQVEsRUFBRSxrQkFBZTtpQkFDMUI7YUFDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFDSixDQUFDO0tBQ0Y7SUF0REM7Ozs7Ozs7OztPQVNHO0lBQ0ksZ0JBQWEsR0FBRztRQUNyQixPQUFPO1FBQ1AsWUFBWTtRQUNaLE9BQU87UUFDUCxTQUFTO1FBQ1QsTUFBTTtRQUNOLE1BQU07UUFDTixRQUFRO1FBQ1IsY0FBYztRQUNkLFFBQVE7UUFDUixVQUFVO1FBQ1YsU0FBUztLQUNUO1FBZ0NGIn0=