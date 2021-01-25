"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SActionsStreamAction_1 = __importDefault(require("../SActionsStreamAction"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
const STestJestProcessManager_1 = __importDefault(require("../../test/jest/STestJestProcessManager"));
class SJestStreamActionInterface extends SInterface_1.default {
}
SJestStreamActionInterface.definition = {};
module.exports = (_a = class SJestStreamAction extends SActionsStreamAction_1.default {
        /**
         * @name            constructor
         * @type            Function
         * @constructor
         *
         * Constructor
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings = {}) {
            super(deepMerge_1.default({
                id: 'SJestStreamAction'
            }, settings));
        }
        /**
         * @name          run
         * @type          Function
         * @async
         *
         * Override the base class run method
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        run(streamObj, settings = this._settings) {
            return super.run(streamObj, ({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
                // if (!streamObj.pack) return resolve(streamObj);
                const input = streamObj.updatedFilePath || streamObj.input;
                const jestProcess = new STestJestProcessManager_1.default({}, {
                    deamon: null
                });
                const promise = jestProcess.run({
                    input
                });
                //   promise.catch((e) => {
                //     reject(e);
                //   });
                const result = yield promise;
                // const cli = new __STestJestCli({
                // })
            }));
        }
    },
    /**
     * @name            interface
     * @type             Object
     * @static
     *
     * Store the definition object that specify the streamObj required properties, types, etc...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.interfaces = {
        this: SJestStreamActionInterface
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0plc3RTdHJlYW1BY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSmVzdFN0cmVhbUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxtRkFBNkQ7QUFLN0QsdUVBQWlEO0FBQ2pELHdFQUFrRDtBQUVsRCxzR0FBeUU7QUFFekUsTUFBTSwwQkFBMkIsU0FBUSxvQkFBWTs7QUFDNUMscUNBQVUsR0FBRyxFQUFFLENBQUM7QUFzQnpCLHVCQUFTLE1BQU0saUJBQWtCLFNBQVEsOEJBQXNCO1FBYzdEOzs7Ozs7OztXQVFHO1FBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtZQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtnQkFDRSxFQUFFLEVBQUUsbUJBQW1CO2FBQ3hCLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUNKLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNILEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTO1lBQ3RDLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO2dCQUN4RCxrREFBa0Q7Z0JBRWxELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxlQUFlLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQztnQkFFM0QsTUFBTSxXQUFXLEdBQUcsSUFBSSxpQ0FBa0IsQ0FDeEMsRUFBRSxFQUNGO29CQUNFLE1BQU0sRUFBRSxJQUFJO2lCQUNiLENBQ0YsQ0FBQztnQkFFRixNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDO29CQUM5QixLQUFLO2lCQUNOLENBQUMsQ0FBQztnQkFDSCwyQkFBMkI7Z0JBQzNCLGlCQUFpQjtnQkFDakIsUUFBUTtnQkFDUixNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQztnQkFFN0IsbUNBQW1DO2dCQUVuQyxLQUFLO1lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNMLENBQUM7S0FDRjtJQXBFQzs7Ozs7Ozs7T0FRRztJQUNJLGFBQVUsR0FBRztRQUNsQixJQUFJLEVBQUUsMEJBQTBCO0tBQ2hDO1FBeURGIn0=