"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SActionsStream_1 = __importDefault(require("../../stream/SActionsStream"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SFsOutputStreamAction_1 = __importDefault(require("../../stream/actions/SFsOutputStreamAction"));
const SBuildFrontspecInterface_1 = __importDefault(require("./interface/SBuildFrontspecInterface"));
const SBuildFrontspecStreamAction_1 = __importDefault(require("./actions/SBuildFrontspecStreamAction"));
module.exports = (_a = class SBuildFrontspecActionsStream extends SActionsStream_1.default {
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
    },
    _a.interfaces = {
        this: SBuildFrontspecInterface_1.default
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRnJvbnRzcGVjQWN0aW9uc1N0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNCdWlsZEZyb250c3BlY0FjdGlvbnNTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsaUZBQTJEO0FBQzNELHVFQUFpRDtBQUNqRCx1R0FBaUY7QUFDakYsb0dBQThFO0FBQzlFLHdHQUFrRjtBQStCbEYsdUJBQVMsTUFBTSw0QkFBNkIsU0FBUSx3QkFBZ0I7UUFLbEU7Ozs7Ozs7O1dBUUc7UUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1lBQ3ZCLHNCQUFzQjtZQUN0QixLQUFLLENBQ0g7Z0JBQ0UsY0FBYyxFQUFFLHFDQUE2QjtnQkFDN0MsUUFBUSxFQUFFLCtCQUF1QjthQUNsQyxFQUNELG1CQUFXLENBQ1Q7Z0JBQ0UsRUFBRSxFQUFFLDhCQUE4QjtnQkFDbEMsSUFBSSxFQUFFLHFDQUFxQztnQkFDM0MsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLGFBQWEsRUFBRSxFQUFFO2FBQ2xCLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUNKLENBQUM7S0FDRjtJQS9CUSxhQUFVLEdBQUc7UUFDbEIsSUFBSSxFQUFFLGtDQUEwQjtLQUNoQztRQTZCRiJ9