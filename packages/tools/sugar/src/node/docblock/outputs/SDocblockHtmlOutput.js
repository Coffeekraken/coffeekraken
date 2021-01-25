"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SDocblockOutput_1 = __importDefault(require("../SDocblockOutput"));
module.exports = (_a = class SDocblockHtmlOutput extends SDocblockOutput_1.default {
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
                    default: '@coffeekraken/sugar/js/docblock/outputs/html/templates/default.js',
                    class: '@coffeekraken/sugar/js/docblock/outputs/html/templates/class.js',
                    function: '@coffeekraken/sugar/js/docblock/outputs/html/templates/function.js'
                },
                blocks: {
                    default: '@coffeekraken/sugar/js/docblock/outputs/html/blocks/default.js',
                    class: '@coffeekraken/sugar/js/docblock/outputs/html/blocks/class.js',
                    function: '@coffeekraken/sugar/js/docblock/outputs/html/blocks/function.js'
                },
                partials: {
                    author: '@coffeekraken/sugar/js/docblock/outputs/html/partials/author.js',
                    heading: '@coffeekraken/sugar/js/docblock/outputs/html/partials/heading.js',
                    example: '@coffeekraken/sugar/js/docblock/outputs/html/partials/example.js',
                    params: '@coffeekraken/sugar/js/docblock/outputs/html/partials/params.js',
                    sharings: '@coffeekraken/sugar/js/docblock/outputs/html/partials/sharings.js'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrSHRtbE91dHB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NibG9ja0h0bWxPdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7OztBQUVWLHVFQUFpRDtBQUNqRCx5RUFBbUQ7QUF3RG5ELHVCQUFTLE1BQU0sbUJBQW9CLFNBQVEseUJBQWlCO1FBeUIxRDs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFZLGdCQUFnQixFQUFFLFFBQVEsR0FBRyxFQUFFO1lBQ3pDLEtBQUssQ0FDSCxnQkFBZ0IsRUFDaEIsbUJBQVcsQ0FDVDtnQkFDRSxTQUFTLEVBQUU7b0JBQ1QsT0FBTyxFQUNMLG1FQUFtRTtvQkFDckUsS0FBSyxFQUNILGlFQUFpRTtvQkFDbkUsUUFBUSxFQUNOLG9FQUFvRTtpQkFDdkU7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLE9BQU8sRUFDTCxnRUFBZ0U7b0JBQ2xFLEtBQUssRUFDSCw4REFBOEQ7b0JBQ2hFLFFBQVEsRUFDTixpRUFBaUU7aUJBQ3BFO2dCQUNELFFBQVEsRUFBRTtvQkFDUixNQUFNLEVBQ0osaUVBQWlFO29CQUNuRSxPQUFPLEVBQ0wsa0VBQWtFO29CQUNwRSxPQUFPLEVBQ0wsa0VBQWtFO29CQUNwRSxNQUFNLEVBQ0osaUVBQWlFO29CQUNuRSxRQUFRLEVBQ04sbUVBQW1FO2lCQUN0RTthQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUNKLENBQUM7S0FDRjtJQXhFQzs7Ozs7Ozs7O09BU0c7SUFDSSxnQkFBYSxHQUFHO1FBQ3JCLE9BQU87UUFDUCxZQUFZO1FBQ1osT0FBTztRQUNQLFNBQVM7UUFDVCxNQUFNO1FBQ04sTUFBTTtRQUNOLFFBQVE7UUFDUixjQUFjO1FBQ2QsUUFBUTtRQUNSLFVBQVU7UUFDVixTQUFTO0tBQ1Q7UUFrREYifQ==