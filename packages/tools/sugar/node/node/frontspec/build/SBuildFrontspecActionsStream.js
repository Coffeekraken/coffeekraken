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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRnJvbnRzcGVjQWN0aW9uc1N0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL2Zyb250c3BlYy9idWlsZC9TQnVpbGRGcm9udHNwZWNBY3Rpb25zU3RyZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlGQUEyRDtBQUMzRCx1RUFBaUQ7QUFDakQsdUdBQWlGO0FBQ2pGLG9HQUE4RTtBQUM5RSx3R0FBa0Y7QUFFbEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxNQUFxQiw0QkFBNkIsU0FBUSx3QkFBZ0I7SUFLeEU7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLHNCQUFzQjtRQUN0QixLQUFLLENBQ0g7WUFDRSxjQUFjLEVBQUUscUNBQTZCO1lBQzdDLFFBQVEsRUFBRSwrQkFBdUI7U0FDbEMsRUFDRCxtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLDhCQUE4QjtZQUNsQyxJQUFJLEVBQUUscUNBQXFDO1lBQzNDLFlBQVksRUFBRSxFQUFFO1lBQ2hCLGFBQWEsRUFBRSxFQUFFO1NBQ2xCLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztJQUNKLENBQUM7O0FBL0JILCtDQWdDQztBQS9CUSx1Q0FBVSxHQUFHO0lBQ2xCLElBQUksRUFBRSxrQ0FBMEI7Q0FDakMsQ0FBQyJ9