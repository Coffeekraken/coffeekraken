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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2lsbC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJraWxsLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFHNUIsTUFBTSxDQUFDLE9BQU8sVUFBVSxJQUFJLENBQUMsTUFBTTtJQUNqQyxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDeEQsSUFBSSxNQUFNLENBQUMsRUFBRSxFQUFFO1lBQ2IsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLDZEQUE2RCxNQUFNLENBQUMsRUFBRSx1REFBdUQ7YUFDckksQ0FBQyxDQUFDO1NBQ0o7YUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDdEIsTUFBTSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRSx5RUFBeUUsTUFBTSxDQUFDLElBQUksdURBQXVEO2FBQ25KLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyJ9