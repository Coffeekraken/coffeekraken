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
        const obj = yield docblock.parse();
        const seializedObj = JSON.parse(JSON.stringify(obj));
        expect(seializedObj).toEqual({
            name: 'SProcessPipe',
            namespace: 'node.process',
            type: 'Class',
            description: 'This class allows you to handle easily some process pipes.\n' +
                'A process pipe is simply multiple processes that will execute one after\n' +
                'the other by passing the params to one after the other\n' +
                'and will be resolved once all the processes have been executed correctly',
            param: {
                processes: {
                    name: 'processes',
                    type: ['ISProcessSettings'],
                    description: 'The processes you want to pipe',
                    default: undefined,
                    defaultStr: '',
                },
                settings: {
                    name: 'settings',
                    type: ['ISProcessSettings'],
                    description: 'Some settings to configure your process pipe instance',
                    default: {},
                    defaultStr: '{}',
                },
            },
            example: [
                {
                    language: 'js',
                    code: "import SProcess, { SProcessPipe } from '@coffeekraken/s-process';\n" +
                        'class MyProcess extends SProcess {\n' +
                        ' constructor(settings = {}) {\n' +
                        '     super(settings);\n' +
                        ' }\n' +
                        '}\n' +
                        'const processPipe = new SProcessPipe([\n' +
                        '   (params) => {\n' +
                        '     // update params to pass to the next process\n' +
                        '     return params;\n' +
                        '   },\n' +
                        '   new MyProcess()\n' +
                        ']);\n' +
                        'const res = await processPipe.run({\n' +
                        "   something: 'coco'\n" +
                        '});',
                },
            ],
            since: '2.0.0',
            author: {
                name: 'Olivier Bossel',
                email: 'olivier.bossel@gmail.com',
                url: 'https://olivierbossel.com',
            },
            raw: '/**\n' +
                '*\n' +
                '* @name            SProcessPipe\n' +
                '* @namespace            node.process\n' +
                '* @type            Class\n' +
                '*\n' +
                '* This class allows you to handle easily some process pipes.\n' +
                '* A process pipe is simply multiple processes that will execute one after\n' +
                '* the other by passing the params to one after the other\n' +
                '* and will be resolved once all the processes have been executed correctly\n' +
                '*\n' +
                '* @param         {ISProcessSettings}           processes           The processes you want to pipe\n' +
                '* @param         {ISProcessSettings}               [settings={}]               Some settings to configure your process pipe instance\n' +
                '*\n' +
                '* @example         js\n' +
                "* import SProcess, { SProcessPipe } from '@coffeekraken/s-process';\n" +
                '* class MyProcess extends SProcess {\n' +
                '*  constructor(settings = {}) {\n' +
                '*      super(settings);\n' +
                '*  }\n' +
                '* }\n' +
                '* const processPipe = new SProcessPipe([\n' +
                '*    (params) => {\n' +
                '*      // update params to pass to the next process\n' +
                '*      return params;\n' +
                '*    },\n' +
                '*    new MyProcess()\n' +
                '* ]);\n' +
                '* const res = await processPipe.run({\n' +
                "*    something: 'coco'\n" +
                '* });\n' +
                '*\n' +
                '* @since           2.0.0\n' +
                '* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)\n' +
                '\n' +
                '*/',
        });
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrQmxvY2sudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NibG9ja0Jsb2NrLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxnQkFBZ0IsTUFBTSxtQkFBbUIsQ0FBQztBQUVqRCxRQUFRLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxFQUFFO0lBQzlDLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxHQUFTLEVBQUU7UUFDeEQsTUFBTSxLQUFLLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBbUNiLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdDLE1BQU0sR0FBRyxHQUFHLE1BQU0sUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXJELE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDekIsSUFBSSxFQUFFLGNBQWM7WUFDcEIsU0FBUyxFQUFFLGNBQWM7WUFDekIsSUFBSSxFQUFFLE9BQU87WUFDYixXQUFXLEVBQ1AsOERBQThEO2dCQUM5RCwyRUFBMkU7Z0JBQzNFLDBEQUEwRDtnQkFDMUQsMEVBQTBFO1lBQzlFLEtBQUssRUFBRTtnQkFDSCxTQUFTLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxDQUFDLG1CQUFtQixDQUFDO29CQUMzQixXQUFXLEVBQUUsZ0NBQWdDO29CQUM3QyxPQUFPLEVBQUUsU0FBUztvQkFDbEIsVUFBVSxFQUFFLEVBQUU7aUJBQ2pCO2dCQUNELFFBQVEsRUFBRTtvQkFDTixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLENBQUMsbUJBQW1CLENBQUM7b0JBQzNCLFdBQVcsRUFDUCx1REFBdUQ7b0JBQzNELE9BQU8sRUFBRSxFQUFFO29CQUNYLFVBQVUsRUFBRSxJQUFJO2lCQUNuQjthQUNKO1lBQ0QsT0FBTyxFQUFFO2dCQUNMO29CQUNJLFFBQVEsRUFBRSxJQUFJO29CQUNkLElBQUksRUFDQSxxRUFBcUU7d0JBQ3JFLHNDQUFzQzt3QkFDdEMsaUNBQWlDO3dCQUNqQyx5QkFBeUI7d0JBQ3pCLE1BQU07d0JBQ04sS0FBSzt3QkFDTCwwQ0FBMEM7d0JBQzFDLG9CQUFvQjt3QkFDcEIscURBQXFEO3dCQUNyRCx1QkFBdUI7d0JBQ3ZCLFNBQVM7d0JBQ1Qsc0JBQXNCO3dCQUN0QixPQUFPO3dCQUNQLHVDQUF1Qzt3QkFDdkMsd0JBQXdCO3dCQUN4QixLQUFLO2lCQUNaO2FBQ0o7WUFDRCxLQUFLLEVBQUUsT0FBTztZQUNkLE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixLQUFLLEVBQUUsMEJBQTBCO2dCQUNqQyxHQUFHLEVBQUUsMkJBQTJCO2FBQ25DO1lBQ0QsR0FBRyxFQUNDLE9BQU87Z0JBQ1AsS0FBSztnQkFDTCxtQ0FBbUM7Z0JBQ25DLHdDQUF3QztnQkFDeEMsNEJBQTRCO2dCQUM1QixLQUFLO2dCQUNMLGdFQUFnRTtnQkFDaEUsNkVBQTZFO2dCQUM3RSw0REFBNEQ7Z0JBQzVELDhFQUE4RTtnQkFDOUUsS0FBSztnQkFDTCxxR0FBcUc7Z0JBQ3JHLHdJQUF3STtnQkFDeEksS0FBSztnQkFDTCx5QkFBeUI7Z0JBQ3pCLHVFQUF1RTtnQkFDdkUsd0NBQXdDO2dCQUN4QyxtQ0FBbUM7Z0JBQ25DLDJCQUEyQjtnQkFDM0IsUUFBUTtnQkFDUixPQUFPO2dCQUNQLDRDQUE0QztnQkFDNUMsc0JBQXNCO2dCQUN0Qix1REFBdUQ7Z0JBQ3ZELHlCQUF5QjtnQkFDekIsV0FBVztnQkFDWCx3QkFBd0I7Z0JBQ3hCLFNBQVM7Z0JBQ1QseUNBQXlDO2dCQUN6QywwQkFBMEI7Z0JBQzFCLFNBQVM7Z0JBQ1QsS0FBSztnQkFDTCw0QkFBNEI7Z0JBQzVCLG9GQUFvRjtnQkFDcEYsSUFBSTtnQkFDSixJQUFJO1NBQ1gsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=