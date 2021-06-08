import __SDocblockBlock from '../SDocblockBlock';
describe('s-docblock.shared.SDocblockBlock', () => {
    it('Should parse a complete docblock correctly', () => {
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
        `;
        const docblock = new __SDocblockBlock(block);
        expect(docblock.toObject()).toEqual({
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
                    type: 'ISProcessSettings',
                    description: 'The processes you want to pipe',
                    default: undefined
                },
                settings: {
                    name: 'settings',
                    type: 'ISProcessSettings',
                    description: 'Some settings to configure your process pipe instance',
                    default: {}
                }
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
                        '});'
                }
            ],
            since: '2.0.0',
            author: {
                name: 'Olivier Bossel',
                email: 'olivier.bossel@gmail.com',
                url: 'https://olivierbossel.com'
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
                '* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n' +
                '\n' +
                '*/'
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrQmxvY2sudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NibG9ja0Jsb2NrLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxnQkFBZ0IsTUFBTSxtQkFBbUIsQ0FBQztBQUVqRCxRQUFRLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxFQUFFO0lBRTlDLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxHQUFHLEVBQUU7UUFFbEQsTUFBTSxLQUFLLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBbUNiLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbEMsSUFBSSxFQUFFLGNBQWM7WUFDcEIsU0FBUyxFQUFFLGNBQWM7WUFDekIsSUFBSSxFQUFFLE9BQU87WUFDYixXQUFXLEVBQUUsOERBQThEO2dCQUN6RSwyRUFBMkU7Z0JBQzNFLDBEQUEwRDtnQkFDMUQsMEVBQTBFO1lBQzVFLEtBQUssRUFBRTtnQkFDTCxTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxtQkFBbUI7b0JBQ3pCLFdBQVcsRUFBRSxnQ0FBZ0M7b0JBQzdDLE9BQU8sRUFBRSxTQUFTO2lCQUNuQjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxtQkFBbUI7b0JBQ3pCLFdBQVcsRUFBRSx1REFBdUQ7b0JBQ3BFLE9BQU8sRUFBRSxFQUFFO2lCQUNaO2FBQ0Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ1A7b0JBQ0UsUUFBUSxFQUFFLElBQUk7b0JBQ2QsSUFBSSxFQUFFLHFFQUFxRTt3QkFDekUsc0NBQXNDO3dCQUN0QyxpQ0FBaUM7d0JBQ2pDLHlCQUF5Qjt3QkFDekIsTUFBTTt3QkFDTixLQUFLO3dCQUNMLDBDQUEwQzt3QkFDMUMsb0JBQW9CO3dCQUNwQixxREFBcUQ7d0JBQ3JELHVCQUF1Qjt3QkFDdkIsU0FBUzt3QkFDVCxzQkFBc0I7d0JBQ3RCLE9BQU87d0JBQ1AsdUNBQXVDO3dCQUN2Qyx3QkFBd0I7d0JBQ3hCLEtBQUs7aUJBQ1I7YUFDRjtZQUNELEtBQUssRUFBRSxPQUFPO1lBQ2QsTUFBTSxFQUFFO2dCQUNOLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLEtBQUssRUFBRSwwQkFBMEI7Z0JBQ2pDLEdBQUcsRUFBRSwyQkFBMkI7YUFDakM7WUFDRCxHQUFHLEVBQUUsT0FBTztnQkFDVixLQUFLO2dCQUNMLG1DQUFtQztnQkFDbkMsd0NBQXdDO2dCQUN4Qyw0QkFBNEI7Z0JBQzVCLEtBQUs7Z0JBQ0wsZ0VBQWdFO2dCQUNoRSw2RUFBNkU7Z0JBQzdFLDREQUE0RDtnQkFDNUQsOEVBQThFO2dCQUM5RSxLQUFLO2dCQUNMLHFHQUFxRztnQkFDckcsd0lBQXdJO2dCQUN4SSxLQUFLO2dCQUNMLHlCQUF5QjtnQkFDekIsdUVBQXVFO2dCQUN2RSx3Q0FBd0M7Z0JBQ3hDLG1DQUFtQztnQkFDbkMsMkJBQTJCO2dCQUMzQixRQUFRO2dCQUNSLE9BQU87Z0JBQ1AsNENBQTRDO2dCQUM1QyxzQkFBc0I7Z0JBQ3RCLHVEQUF1RDtnQkFDdkQseUJBQXlCO2dCQUN6QixXQUFXO2dCQUNYLHdCQUF3QjtnQkFDeEIsU0FBUztnQkFDVCx5Q0FBeUM7Z0JBQ3pDLDBCQUEwQjtnQkFDMUIsU0FBUztnQkFDVCxLQUFLO2dCQUNMLDRCQUE0QjtnQkFDNUIsc0ZBQXNGO2dCQUN0RixJQUFJO2dCQUNKLElBQUk7U0FDUCxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUVQLENBQUMsQ0FBQyxDQUFDIn0=