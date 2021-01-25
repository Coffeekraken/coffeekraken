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
class SExtractStreamActionInterface extends SInterface_1.default {
}
SExtractStreamActionInterface.definition = {};
module.exports = (_a = class SExtractStreamAction extends SActionsStreamAction_1.default {
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
                id: 'actionStream.action.extract',
                sourceProp: 'data'
            }, settings));
            this.constructor.definition = {
                [this._settings.sourceProp]: {
                    type: 'String',
                    required: true
                }
            };
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
        run(streamObj, settings) {
            return super.run(streamObj, ({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
                const reg = /\/\*\s?extract:([a-zA-Z0-9-_]+)\s?\*\/(((?!\/\*\s?extract\s?\*\/)(.|\n))*)\/\*\s?extract\s?\*\//g;
                const source = streamObj[settings.sourceProp];
                let myArray;
                while ((myArray = reg.exec(source)) !== null) {
                    const prop = myArray[1];
                    const string = myArray[2];
                    streamObj[prop] = string;
                }
                resolve(streamObj);
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
        this: SExtractStreamActionInterface
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V4dHJhY3RTdHJlYW1BY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRXh0cmFjdFN0cmVhbUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxtRkFBNkQ7QUFJN0QsdUVBQWlEO0FBR2pELHdFQUFrRDtBQUVsRCxNQUFNLDZCQUE4QixTQUFRLG9CQUFZOztBQUMvQyx3Q0FBVSxHQUFHLEVBQUUsQ0FBQztBQXdCekIsdUJBQVMsTUFBTSxvQkFBcUIsU0FBUSw4QkFBc0I7UUFjaEU7Ozs7Ozs7O1dBUUc7UUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1lBQ3ZCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLEVBQUUsRUFBRSw2QkFBNkI7Z0JBQ2pDLFVBQVUsRUFBRSxNQUFNO2FBQ25CLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztZQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxHQUFHO2dCQUM1QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQzNCLElBQUksRUFBRSxRQUFRO29CQUNkLFFBQVEsRUFBRSxJQUFJO2lCQUNmO2FBQ0YsQ0FBQztRQUNKLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNILEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUTtZQUNyQixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtnQkFDeEQsTUFBTSxHQUFHLEdBQUcsa0dBQWtHLENBQUM7Z0JBQy9HLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzlDLElBQUksT0FBTyxDQUFDO2dCQUNaLE9BQU8sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtvQkFDNUMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7aUJBQzFCO2dCQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGO0lBOURDOzs7Ozs7OztPQVFHO0lBQ0ksYUFBVSxHQUFHO1FBQ2xCLElBQUksRUFBRSw2QkFBNkI7S0FDbkM7UUFtREYifQ==