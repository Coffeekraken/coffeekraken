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
import __childProcess from 'child_process';
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
                __childProcess.execSync(`npx kill-port ${params.port}`);
                // __childProcess.execSync(`kill -9 $(lsof -ti:${params.port})`);
                emit('log', {
                    value: `<green>[process.kill]</green> The process running on the port <yellow>${params.port}</yellow> has been <green>successfully</green> killed`,
                });
                return resolve();
            }
            catch (e) { }
            try {
                yield __fkill(`:${params.port}`);
                emit('log', {
                    value: `<green>[process.kill]</green> The process running on the port <yellow>${params.port}</yellow> has been <green>successfully</green> killed`,
                });
                return resolve();
            }
            catch (e) { }
            emit('log', {
                value: `<yellow>[process.kill]</yellow> It seems that no process are running on port <yellow>${params.port}</yellow>`,
            });
        }
        resolve();
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFFNUIsTUFBTSxDQUFDLE9BQU8sVUFBVSxJQUFJLENBQUMsTUFBTTtJQUMvQixPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDdEQsSUFBSSxNQUFNLENBQUMsRUFBRSxFQUFFO1lBQ1gsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLDZEQUE2RCxNQUFNLENBQUMsRUFBRSx1REFBdUQ7YUFDdkksQ0FBQyxDQUFDO1NBQ047YUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDcEIsSUFBSTtnQkFDQSxjQUFjLENBQUMsUUFBUSxDQUFDLGlCQUFpQixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDeEQsaUVBQWlFO2dCQUNqRSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSx5RUFBeUUsTUFBTSxDQUFDLElBQUksdURBQXVEO2lCQUNySixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxPQUFPLEVBQUUsQ0FBQzthQUNwQjtZQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7WUFFZCxJQUFJO2dCQUNBLE1BQU0sT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLHlFQUF5RSxNQUFNLENBQUMsSUFBSSx1REFBdUQ7aUJBQ3JKLENBQUMsQ0FBQztnQkFDSCxPQUFPLE9BQU8sRUFBRSxDQUFDO2FBQ3BCO1lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtZQUVkLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLHdGQUF3RixNQUFNLENBQUMsSUFBSSxXQUFXO2FBQ3hILENBQUMsQ0FBQztTQUNOO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9