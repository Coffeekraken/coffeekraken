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
    const pro = __SProcess.from((params) => {
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
    pro.run(stringArgs);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2lsbC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJraWxsLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFFNUIsTUFBTSxPQUFPLHdCQUF5QixTQUFRLFlBQVk7O0FBQ2pELG1DQUFVLEdBQUc7SUFDbEIsRUFBRSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUseUNBQXlDO1FBQ3RELEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSx1REFBdUQ7UUFDcEUsS0FBSyxFQUFFLEdBQUc7S0FDWDtDQUNGLENBQUM7QUFHSixNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUMzQyxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUN6QixDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ1QsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3hELElBQUksTUFBTSxDQUFDLEVBQUUsRUFBRTtnQkFDYixNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLDZEQUE2RCxNQUFNLENBQUMsRUFBRSx1REFBdUQ7aUJBQ3JJLENBQUMsQ0FBQzthQUNKO2lCQUFNLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDdEIsTUFBTSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEVBQUUseUVBQXlFLE1BQU0sQ0FBQyxJQUFJLHVEQUF1RDtpQkFDbkosQ0FBQyxDQUFDO2FBQ0o7WUFDRCxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDLEVBQ0Q7UUFDRSxPQUFPLEVBQUU7WUFDUCxTQUFTLEVBQUUsd0JBQXdCO1NBQ3BDO0tBQ0YsQ0FDRixDQUFDO0lBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=