// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __copy from '@coffeekraken/sugar/node/clipboard/copy';
import __SDocmap from '../node/SDocmap';
export default (stringArgs = '') => {
    return new __SPromise(({ resolve, pipe, emit }) => __awaiter(void 0, void 0, void 0, function* () {
        const docmap = new __SDocmap();
        const promise = docmap.read(stringArgs);
        pipe(promise);
        const res = yield promise;
        __copy(JSON.stringify(res, null, 4));
        emit('log', {
            type: __SLog.TYPE_INFO,
            value: '<green>[read]</green> docmap.json copied to your clipboard',
        });
        resolve(res);
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLE1BQU0sTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RCxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUV4QyxlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNwRCxNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2QsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUM7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDdEIsS0FBSyxFQUFFLDREQUE0RDtTQUN0RSxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9