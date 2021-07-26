var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SProcess from '@coffeekraken/s-process';
import __SInterface from '@coffeekraken/s-interface';
import __SPromise from '@coffeekraken/s-promise';
import __fkill from 'fkill';
export class SProcessKillCliInterface extends __SInterface {
}
SProcessKillCliInterface.definition = {
    id: {
        type: 'Number',
        description: 'Specify the process id you want to kill',
        alias: 'i'
    },
    port: {
        type: 'Number',
        description: 'Specify the port used by the process you want to kill',
        alias: 'p'
    }
};
export default function start(stringArgs = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const pro = yield __SProcess.from((params) => {
            return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
                if (params.id) {
                    yield __fkill(params.id);
                    emit('log', {
                        value: `<green>[process.kill]</green> The process with id <yellow>${params.id}</yellow> has been <green>successfully</green> killed`
                    });
                }
                else if (params.port) {
                    yield __fkill(`:${params.port}`);
                    emit('log', {
                        value: `<green>[process.kill]</green> The process running on the port <yellow>${params.port}</yellow> has been <green>successfully</green> killed`
                    });
                }
                resolve();
            }));
        }, {
            process: {
                interface: SProcessKillCliInterface
            }
        });
        yield pro.run(stringArgs);
        process.exit();
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2lsbC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJraWxsLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFFNUIsTUFBTSxPQUFPLHdCQUF5QixTQUFRLFlBQVk7O0FBQ2pELG1DQUFVLEdBQUc7SUFDbEIsRUFBRSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUseUNBQXlDO1FBQ3RELEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSx1REFBdUQ7UUFDcEUsS0FBSyxFQUFFLEdBQUc7S0FDWDtDQUNGLENBQUM7QUFHSixNQUFNLENBQUMsT0FBTyxVQUFnQixLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUU7O1FBQ2pELE1BQU0sR0FBRyxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FDL0IsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNULE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtnQkFDeEQsSUFBSSxNQUFNLENBQUMsRUFBRSxFQUFFO29CQUNiLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDekIsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDVixLQUFLLEVBQUUsNkRBQTZELE1BQU0sQ0FBQyxFQUFFLHVEQUF1RDtxQkFDckksQ0FBQyxDQUFDO2lCQUNKO3FCQUFNLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtvQkFDdEIsTUFBTSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDakMsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDVixLQUFLLEVBQUUseUVBQXlFLE1BQU0sQ0FBQyxJQUFJLHVEQUF1RDtxQkFDbkosQ0FBQyxDQUFDO2lCQUNKO2dCQUNELE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNMLENBQUMsRUFDRDtZQUNFLE9BQU8sRUFBRTtnQkFDUCxTQUFTLEVBQUUsd0JBQXdCO2FBQ3BDO1NBQ0YsQ0FDRixDQUFDO1FBQ0YsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQixDQUFDO0NBQUEifQ==