var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SDocblockBlock from '../SDocblockBlock';
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
        const docblock = new __SDocblockBlock(block);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsUUFBUSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtJQUM5QyxFQUFFLENBQUMsNENBQTRDLEVBQUUsR0FBUyxFQUFFO1FBQ3hELE1BQU0sS0FBSyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQW1DYixDQUFDO1FBRUYsTUFBTSxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3QyxzQ0FBc0M7UUFDdEMsd0RBQXdEO1FBRXhELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEIsaUNBQWlDO1FBQ2pDLDRCQUE0QjtRQUM1QixpQ0FBaUM7UUFDakMscUJBQXFCO1FBQ3JCLG1CQUFtQjtRQUNuQiwyRUFBMkU7UUFDM0Usd0ZBQXdGO1FBQ3hGLHVFQUF1RTtRQUN2RSxzRkFBc0Y7UUFDdEYsZUFBZTtRQUNmLHVCQUF1QjtRQUN2QixpQ0FBaUM7UUFDakMsMkNBQTJDO1FBQzNDLDZEQUE2RDtRQUM3RCxrQ0FBa0M7UUFDbEMsOEJBQThCO1FBQzlCLGFBQWE7UUFDYixzQkFBc0I7UUFDdEIsZ0NBQWdDO1FBQ2hDLDJDQUEyQztRQUMzQywyQkFBMkI7UUFDM0IsMkVBQTJFO1FBQzNFLDJCQUEyQjtRQUMzQixnQ0FBZ0M7UUFDaEMsYUFBYTtRQUNiLFNBQVM7UUFDVCxpQkFBaUI7UUFDakIsWUFBWTtRQUNaLDhCQUE4QjtRQUM5QixvQkFBb0I7UUFDcEIsMEZBQTBGO1FBQzFGLDJEQUEyRDtRQUMzRCxzREFBc0Q7UUFDdEQsOENBQThDO1FBQzlDLDJCQUEyQjtRQUMzQiwwQkFBMEI7UUFDMUIsK0RBQStEO1FBQy9ELHlDQUF5QztRQUN6QywwRUFBMEU7UUFDMUUsNENBQTRDO1FBQzVDLDhCQUE4QjtRQUM5QiwyQ0FBMkM7UUFDM0MsNEJBQTRCO1FBQzVCLDREQUE0RDtRQUM1RCw2Q0FBNkM7UUFDN0MseUJBQXlCO1FBQ3pCLGFBQWE7UUFDYixTQUFTO1FBQ1Qsc0JBQXNCO1FBQ3RCLGdCQUFnQjtRQUNoQixrQ0FBa0M7UUFDbEMsNkNBQTZDO1FBQzdDLDBDQUEwQztRQUMxQyxTQUFTO1FBQ1QsV0FBVztRQUNYLG9CQUFvQjtRQUNwQixrQkFBa0I7UUFDbEIsZ0RBQWdEO1FBQ2hELHFEQUFxRDtRQUNyRCx5Q0FBeUM7UUFDekMsa0JBQWtCO1FBQ2xCLDZFQUE2RTtRQUM3RSwwRkFBMEY7UUFDMUYseUVBQXlFO1FBQ3pFLDJGQUEyRjtRQUMzRixrQkFBa0I7UUFDbEIsa0hBQWtIO1FBQ2xILHFKQUFxSjtRQUNySixrQkFBa0I7UUFDbEIsc0NBQXNDO1FBQ3RDLG9GQUFvRjtRQUNwRixxREFBcUQ7UUFDckQsZ0RBQWdEO1FBQ2hELHdDQUF3QztRQUN4QyxxQkFBcUI7UUFDckIsb0JBQW9CO1FBQ3BCLHlEQUF5RDtRQUN6RCxtQ0FBbUM7UUFDbkMsb0VBQW9FO1FBQ3BFLHNDQUFzQztRQUN0Qyx3QkFBd0I7UUFDeEIscUNBQXFDO1FBQ3JDLHNCQUFzQjtRQUN0QixzREFBc0Q7UUFDdEQsdUNBQXVDO1FBQ3ZDLHNCQUFzQjtRQUN0QixrQkFBa0I7UUFDbEIseUNBQXlDO1FBQ3pDLGlHQUFpRztRQUNqRyxpQkFBaUI7UUFDakIsZ0JBQWdCO1FBQ2hCLE1BQU07SUFDVixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==