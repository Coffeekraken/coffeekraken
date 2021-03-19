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
const __firstDocblocksWithNamespaceInFolder = require('../firstDocblocksWithNamespaceInFolder');
describe('sugar.node.docblock.firstDocblocksWithNamespaceInFolder', () => {
    it('Should search and extract the first docblock correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const firstDocblocksWithNamespaceInFolder = yield __firstDocblocksWithNamespaceInFolder(`${__dirname}/doc`);
        expect(firstDocblocksWithNamespaceInFolder['some.thing.something']).toEqual({
            name: 'something',
            namespace: 'some.thing',
            description: 'This is something',
            param: {
                param1: {
                    name: 'param1',
                    type: 'Object',
                    description: 'This is the parameter 1',
                    default: undefined
                },
                param2: {
                    name: 'param2',
                    type: 'Number',
                    description: 'This is the parameter 2',
                    default: 10
                }
            },
            since: '2.0.0',
            author: {
                name: 'Olivier Bossel',
                email: 'olivier.bossel@gmail.com',
                website: 'https://olivierbossel.com'
            },
            path: 'somethinf.md'
        });
        expect(firstDocblocksWithNamespaceInFolder['other.thing.coco.otherThing']).toEqual({
            name: 'otherThing',
            namespace: 'other.thing.coco',
            description: 'This is another thing',
            param: {
                param1: {
                    name: 'param1',
                    type: 'Object',
                    description: 'This is the parameter 1',
                    default: undefined
                },
                param2: {
                    name: 'param2',
                    type: 'Number',
                    description: 'This is the parameter 2',
                    default: 10
                }
            },
            since: '2.0.0',
            author: {
                name: 'Olivier Bossel',
                email: 'olivier.bossel@gmail.com',
                website: 'https://olivierbossel.com'
            },
            path: 'child/other.md'
        });
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyc3REb2NibG9ja3NXaXRoTmFtZXNwYWNlSW5Gb2xkZXIudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcnN0RG9jYmxvY2tzV2l0aE5hbWVzcGFjZUluRm9sZGVyLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0scUNBQXFDLEdBQUcsT0FBTyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7QUFDaEcsUUFBUSxDQUFDLHlEQUF5RCxFQUFFLEdBQUcsRUFBRTtJQUN2RSxFQUFFLENBQUMsd0RBQXdELEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUMxRSxNQUFNLG1DQUFtQyxHQUFHLE1BQU0scUNBQXFDLENBQ3JGLEdBQUcsU0FBUyxNQUFNLENBQ25CLENBQUM7UUFFRixNQUFNLENBQUMsbUNBQW1DLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FDekU7WUFDRSxJQUFJLEVBQUUsV0FBVztZQUNqQixTQUFTLEVBQUUsWUFBWTtZQUN2QixXQUFXLEVBQUUsbUJBQW1CO1lBQ2hDLEtBQUssRUFBRTtnQkFDTCxNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLHlCQUF5QjtvQkFDdEMsT0FBTyxFQUFFLFNBQVM7aUJBQ25CO2dCQUNELE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUseUJBQXlCO29CQUN0QyxPQUFPLEVBQUUsRUFBRTtpQkFDWjthQUNGO1lBQ0QsS0FBSyxFQUFFLE9BQU87WUFDZCxNQUFNLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsS0FBSyxFQUFFLDBCQUEwQjtnQkFDakMsT0FBTyxFQUFFLDJCQUEyQjthQUNyQztZQUNELElBQUksRUFBRSxjQUFjO1NBQ3JCLENBQ0YsQ0FBQztRQUNGLE1BQU0sQ0FDSixtQ0FBbUMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUNuRSxDQUFDLE9BQU8sQ0FBQztZQUNSLElBQUksRUFBRSxZQUFZO1lBQ2xCLFNBQVMsRUFBRSxrQkFBa0I7WUFDN0IsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxLQUFLLEVBQUU7Z0JBQ0wsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSx5QkFBeUI7b0JBQ3RDLE9BQU8sRUFBRSxTQUFTO2lCQUNuQjtnQkFDRCxNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLHlCQUF5QjtvQkFDdEMsT0FBTyxFQUFFLEVBQUU7aUJBQ1o7YUFDRjtZQUNELEtBQUssRUFBRSxPQUFPO1lBQ2QsTUFBTSxFQUFFO2dCQUNOLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLEtBQUssRUFBRSwwQkFBMEI7Z0JBQ2pDLE9BQU8sRUFBRSwyQkFBMkI7YUFDckM7WUFDRCxJQUFJLEVBQUUsZ0JBQWdCO1NBQ3ZCLENBQUMsQ0FBQztRQUVILElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=