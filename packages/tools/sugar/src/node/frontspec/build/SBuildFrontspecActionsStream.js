"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SActionsStream_1 = __importDefault(require("../../stream/SActionsStream"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SFsOutputStreamAction_1 = __importDefault(require("../../stream/actions/SFsOutputStreamAction"));
const SBuildFrontspecInterface_1 = __importDefault(require("./interface/SBuildFrontspecInterface"));
const SBuildFrontspecStreamAction_1 = __importDefault(require("./actions/SBuildFrontspecStreamAction"));
/**
 * @name            SBuildFrontspecActionsStream
 * @namespace           sugar.node.build.frontspec
 * @type            Class
 * @extends         SActionsStream
 * @status              wip
 *
 * This class represent a pre-configured action stream to build easily frontspec files
 *
 * @param           {Object}          [settings={}]         The settings object to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo        Document the streamObj required properties
 *
 * @example         js
 * import SBuildFrontspecActionsStream from '@coffeekraken/sugar/node/build/frontspec/SBuildFrontspecActionsStream';
 * const myStream = new SBuildFrontspecActionsStream();
 * myStream.start({
 *    input: '...',
 *    outputDir: '...'
 * }).on('resolve', (result) => {
 *    // do something
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBuildFrontspecActionsStream extends SActionsStream_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        // init actions stream
        super({
            buildFrontspec: SBuildFrontspecStreamAction_1.default,
            fsOutput: SFsOutputStreamAction_1.default
        }, deepMerge_1.default({
            id: 'SBuildFrontspecActionsStream',
            name: 'Build Frontspec.json Actions Stream',
            afterActions: {},
            beforeActions: {}
        }, settings));
    }
}
exports.default = SBuildFrontspecActionsStream;
SBuildFrontspecActionsStream.interfaces = {
    this: SBuildFrontspecInterface_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRnJvbnRzcGVjQWN0aW9uc1N0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNCdWlsZEZyb250c3BlY0FjdGlvbnNTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsaUZBQTJEO0FBQzNELHVFQUFpRDtBQUNqRCx1R0FBaUY7QUFDakYsb0dBQThFO0FBQzlFLHdHQUFrRjtBQUVsRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILE1BQXFCLDRCQUE2QixTQUFRLHdCQUFnQjtJQUt4RTs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsc0JBQXNCO1FBQ3RCLEtBQUssQ0FDSDtZQUNFLGNBQWMsRUFBRSxxQ0FBNkI7WUFDN0MsUUFBUSxFQUFFLCtCQUF1QjtTQUNsQyxFQUNELG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsOEJBQThCO1lBQ2xDLElBQUksRUFBRSxxQ0FBcUM7WUFDM0MsWUFBWSxFQUFFLEVBQUU7WUFDaEIsYUFBYSxFQUFFLEVBQUU7U0FDbEIsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7QUEvQkgsK0NBZ0NDO0FBL0JRLHVDQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFLGtDQUEwQjtDQUNqQyxDQUFDIn0=