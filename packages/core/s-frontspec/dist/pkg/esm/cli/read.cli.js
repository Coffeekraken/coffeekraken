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
import __SPromise from '@coffeekraken/s-promise';
import __SFrontspec from '../node/SFrontspec';
import __copy from '@coffeekraken/sugar/node/clipboard/copy';
import __SLog from '@coffeekraken/s-log';
export default (stringArgs = '') => {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const frontspec = new __SFrontspec();
        const buildPromise = frontspec.read(stringArgs);
        const res = yield pipe(buildPromise);
        __copy(JSON.stringify(res, null, 4));
        emit('log', {
            type: __SLog.TYPE_INFO,
            value: '<green>[read]</green> frontspec.json copied to your clipboard',
        });
        resolve(res);
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLE1BQU0sTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUV6QyxlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUQsTUFBTSxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyQyxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO1lBQ3RCLEtBQUssRUFDRCwrREFBK0Q7U0FDdEUsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==