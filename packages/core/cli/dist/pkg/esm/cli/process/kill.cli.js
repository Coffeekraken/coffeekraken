var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPromise from '@coffeekraken/s-promise';
import __fkill from 'fkill';
export default function kill(params) {
    return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        if (params.id) {
            yield __fkill(params.id);
            emit('log', {
                value: `<green>[process.kill]</green> The process with id <yellow>${params.id}</yellow> has been <green>successfully</green> killed`,
            });
        }
        else if (params.port) {
            try {
                yield __fkill(`:${params.port}`);
                emit('log', {
                    value: `<green>[process.kill]</green> The process running on the port <yellow>${params.port}</yellow> has been <green>successfully</green> killed`,
                });
            }
            catch (e) {
                emit('log', {
                    value: `<yellow>[process.kill]</yellow> It seems that no process are running on port <yellow>${params.port}</yellow>`,
                });
            }
        }
        resolve();
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUc1QixNQUFNLENBQUMsT0FBTyxVQUFVLElBQUksQ0FBQyxNQUFNO0lBQy9CLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN0RCxJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDWCxNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsNkRBQTZELE1BQU0sQ0FBQyxFQUFFLHVEQUF1RDthQUN2SSxDQUFDLENBQUM7U0FDTjthQUFNLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtZQUNwQixJQUFJO2dCQUNBLE1BQU0sT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLHlFQUF5RSxNQUFNLENBQUMsSUFBSSx1REFBdUQ7aUJBQ3JKLENBQUMsQ0FBQzthQUNOO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsd0ZBQXdGLE1BQU0sQ0FBQyxJQUFJLFdBQVc7aUJBQ3hILENBQUMsQ0FBQzthQUNOO1NBQ0o7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=