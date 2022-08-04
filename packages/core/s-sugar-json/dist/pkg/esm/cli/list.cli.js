var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __path from 'path';
import __SSugarJson from '../node/SSugarJson';
export default (stringArgs = '') => {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        emit('log', {
            type: __SLog.TYPE_INFO,
            value: '<yellow>[search]</yellow> Searching for <yellow>sugar.json</yellow> files that are used in your <magenta>current context</magenta>...',
        });
        const sugarJson = new __SSugarJson();
        const list = yield sugarJson.search();
        list.forEach((path) => {
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[file]</yellow> <cyan>${__path.relative(__packageRootDir(), path)}</cyan>`,
            });
        });
        emit('log', {
            type: __SLog.TYPE_INFO,
            value: `<green>[success]</green> <magenta>${list.length}</magenta> file(s) found`,
        });
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGdCQUFnQixNQUFNLDhDQUE4QyxDQUFDO0FBQzVFLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztZQUN0QixLQUFLLEVBQUUsdUlBQXVJO1NBQ2pKLENBQUMsQ0FBQztRQUNILE1BQU0sU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckMsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsaUNBQWlDLE1BQU0sQ0FBQyxRQUFRLENBQ25ELGdCQUFnQixFQUFFLEVBQ2xCLElBQUksQ0FDUCxTQUFTO2FBQ2IsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO1lBQ3RCLEtBQUssRUFBRSxxQ0FBcUMsSUFBSSxDQUFDLE1BQU0sMEJBQTBCO1NBQ3BGLENBQUMsQ0FBQztRQUNILE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9