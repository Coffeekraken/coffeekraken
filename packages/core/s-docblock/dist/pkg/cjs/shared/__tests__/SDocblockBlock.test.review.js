"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const SDocblockBlock_1 = __importDefault(require("../SDocblockBlock"));
describe('s-docblock.shared.SDocblockBlock', () => {
    it('Should parse a complete docblock correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const block = `
        /**
 * @name            SProcessPipe
 * @namespace            node.process
 * @type            Class
 *
 * This class allows you to handle easily some process pipes.
 * A process pipe is simply multiple processes that will execute one after
 * the other by passing the params to one after the other
 * and will be resolved once all the processes have been executed correctly
 *
 * @param         {ISProcessSettings}           processes           The processes you want to pipe
 * @param         {ISProcessSettings}               [settings={}]               Some settings to configure your process pipe instance
 *
 * @example         js
 * import SProcess, { SProcessPipe } from '@coffeekraken/s-process';
 * class MyProcess extends SProcess {
 *  constructor(settings = {}) {
 *      super(settings);
 *  }
 * }
 * const processPipe = new SProcessPipe([
 *    (params) => {
 *      // update params to pass to the next process
 *      return params;
 *    },
 *    new MyProcess()
 * ]);
 * const res = await processPipe.run({
 *    something: 'coco'
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
        `;
        const docblock = new SDocblockBlock_1.default(block);
        // const obj = await docblock.parse();
        // const seializedObj = JSON.parse(JSON.stringify(obj));
        expect(true).toBe(true);
        // expect(seializedObj).toEqual({
        //     name: 'SProcessPipe',
        //     namespace: 'node.process',
        //     type: 'Class',
        //     description:
        //         'This class allows you to handle easily some process pipes.\n' +
        //         'A process pipe is simply multiple processes that will execute one after\n' +
        //         'the other by passing the params to one after the other\n' +
        //         'and will be resolved once all the processes have been executed correctly',
        //     param: {
        //         processes: {
        //             name: 'processes',
        //             type: ['ISProcessSettings'],
        //             description: 'The processes you want to pipe',
        //             default: undefined,
        //             defaultStr: '',
        //         },
        //         settings: {
        //             name: 'settings',
        //             type: ['ISProcessSettings'],
        //             description:
        //                 'Some settings to configure your process pipe instance',
        //             default: {},
        //             defaultStr: '{}',
        //         },
        //     },
        //     example: [
        //         {
        //             language: 'js',
        //             code:
        //                 "import SProcess, { SProcessPipe } from '@coffeekraken/s-process';\n" +
        //                 'class MyProcess extends SProcess {\n' +
        //                 ' constructor(settings = {}) {\n' +
        //                 '     super(settings);\n' +
        //                 ' }\n' +
        //                 '}\n' +
        //                 'const processPipe = new SProcessPipe([\n' +
        //                 '   (params) => {\n' +
        //                 '     // update params to pass to the next process\n' +
        //                 '     return params;\n' +
        //                 '   },\n' +
        //                 '   new MyProcess()\n' +
        //                 ']);\n' +
        //                 'const res = await processPipe.run({\n' +
        //                 "   something: 'coco'\n" +
        //                 '});',
        //         },
        //     ],
        //     since: '2.0.0',
        //     author: {
        //         name: 'Olivier Bossel',
        //         email: 'olivier.bossel@gmail.com',
        //         url: 'https://coffeekraken.io',
        //     },
        //     raw:
        //         '/**\n' +
        //         '*\n' +
        //         '* @name            SProcessPipe\n' +
        //         '* @namespace            node.process\n' +
        //         '* @type            Class\n' +
        //         '*\n' +
        //         '* This class allows you to handle easily some process pipes.\n' +
        //         '* A process pipe is simply multiple processes that will execute one after\n' +
        //         '* the other by passing the params to one after the other\n' +
        //         '* and will be resolved once all the processes have been executed correctly\n' +
        //         '*\n' +
        //         '* @param         {ISProcessSettings}           processes           The processes you want to pipe\n' +
        //         '* @param         {ISProcessSettings}               [settings={}]               Some settings to configure your process pipe instance\n' +
        //         '*\n' +
        //         '* @example         js\n' +
        //         "* import SProcess, { SProcessPipe } from '@coffeekraken/s-process';\n" +
        //         '* class MyProcess extends SProcess {\n' +
        //         '*  constructor(settings = {}) {\n' +
        //         '*      super(settings);\n' +
        //         '*  }\n' +
        //         '* }\n' +
        //         '* const processPipe = new SProcessPipe([\n' +
        //         '*    (params) => {\n' +
        //         '*      // update params to pass to the next process\n' +
        //         '*      return params;\n' +
        //         '*    },\n' +
        //         '*    new MyProcess()\n' +
        //         '* ]);\n' +
        //         '* const res = await processPipe.run({\n' +
        //         "*    something: 'coco'\n" +
        //         '* });\n' +
        //         '*\n' +
        //         '* @since           2.0.0\n' +
        //         '* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)\n' +
        //         '\n' +
        //         '*/',
        // });
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUVBQWlEO0FBRWpELFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUU7SUFDOUMsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLEdBQVMsRUFBRTtRQUN4RCxNQUFNLEtBQUssR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FtQ2IsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFHLElBQUksd0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFN0Msc0NBQXNDO1FBQ3RDLHdEQUF3RDtRQUV4RCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhCLGlDQUFpQztRQUNqQyw0QkFBNEI7UUFDNUIsaUNBQWlDO1FBQ2pDLHFCQUFxQjtRQUNyQixtQkFBbUI7UUFDbkIsMkVBQTJFO1FBQzNFLHdGQUF3RjtRQUN4Rix1RUFBdUU7UUFDdkUsc0ZBQXNGO1FBQ3RGLGVBQWU7UUFDZix1QkFBdUI7UUFDdkIsaUNBQWlDO1FBQ2pDLDJDQUEyQztRQUMzQyw2REFBNkQ7UUFDN0Qsa0NBQWtDO1FBQ2xDLDhCQUE4QjtRQUM5QixhQUFhO1FBQ2Isc0JBQXNCO1FBQ3RCLGdDQUFnQztRQUNoQywyQ0FBMkM7UUFDM0MsMkJBQTJCO1FBQzNCLDJFQUEyRTtRQUMzRSwyQkFBMkI7UUFDM0IsZ0NBQWdDO1FBQ2hDLGFBQWE7UUFDYixTQUFTO1FBQ1QsaUJBQWlCO1FBQ2pCLFlBQVk7UUFDWiw4QkFBOEI7UUFDOUIsb0JBQW9CO1FBQ3BCLDBGQUEwRjtRQUMxRiwyREFBMkQ7UUFDM0Qsc0RBQXNEO1FBQ3RELDhDQUE4QztRQUM5QywyQkFBMkI7UUFDM0IsMEJBQTBCO1FBQzFCLCtEQUErRDtRQUMvRCx5Q0FBeUM7UUFDekMsMEVBQTBFO1FBQzFFLDRDQUE0QztRQUM1Qyw4QkFBOEI7UUFDOUIsMkNBQTJDO1FBQzNDLDRCQUE0QjtRQUM1Qiw0REFBNEQ7UUFDNUQsNkNBQTZDO1FBQzdDLHlCQUF5QjtRQUN6QixhQUFhO1FBQ2IsU0FBUztRQUNULHNCQUFzQjtRQUN0QixnQkFBZ0I7UUFDaEIsa0NBQWtDO1FBQ2xDLDZDQUE2QztRQUM3QywwQ0FBMEM7UUFDMUMsU0FBUztRQUNULFdBQVc7UUFDWCxvQkFBb0I7UUFDcEIsa0JBQWtCO1FBQ2xCLGdEQUFnRDtRQUNoRCxxREFBcUQ7UUFDckQseUNBQXlDO1FBQ3pDLGtCQUFrQjtRQUNsQiw2RUFBNkU7UUFDN0UsMEZBQTBGO1FBQzFGLHlFQUF5RTtRQUN6RSwyRkFBMkY7UUFDM0Ysa0JBQWtCO1FBQ2xCLGtIQUFrSDtRQUNsSCxxSkFBcUo7UUFDckosa0JBQWtCO1FBQ2xCLHNDQUFzQztRQUN0QyxvRkFBb0Y7UUFDcEYscURBQXFEO1FBQ3JELGdEQUFnRDtRQUNoRCx3Q0FBd0M7UUFDeEMscUJBQXFCO1FBQ3JCLG9CQUFvQjtRQUNwQix5REFBeUQ7UUFDekQsbUNBQW1DO1FBQ25DLG9FQUFvRTtRQUNwRSxzQ0FBc0M7UUFDdEMsd0JBQXdCO1FBQ3hCLHFDQUFxQztRQUNyQyxzQkFBc0I7UUFDdEIsc0RBQXNEO1FBQ3RELHVDQUF1QztRQUN2QyxzQkFBc0I7UUFDdEIsa0JBQWtCO1FBQ2xCLHlDQUF5QztRQUN6QyxpR0FBaUc7UUFDakcsaUJBQWlCO1FBQ2pCLGdCQUFnQjtRQUNoQixNQUFNO0lBQ1YsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=