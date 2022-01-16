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
import __SCliFsCopyParamsInterface from '../../node/fs/interface/SCliFsCopyParamsInterface';
import __SPromise from '@coffeekraken/s-promise';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __isDirectory from '@coffeekraken/sugar/node/is/directory';
import __SLog from '@coffeekraken/s-log';
export default (stringArgs = '') => {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = __SCliFsCopyParamsInterface.apply(stringArgs);
        const type = __isDirectory(finalParams.src) ? 'directory' : 'file';
        emit('log', {
            type: __SLog.TYPE_INFO,
            value: `<yellow>[copy]</yellow> Copying the ${type} <cyan>${finalParams.src}</cyan> to <cyan>${finalParams.dest}</cyan>`,
        });
        // copy the file/directory
        __copySync(finalParams.src, finalParams.dest);
        emit('log', {
            type: __SLog.TYPE_INFO,
            value: `<green>[copy]</green> Copy finished <green>successfully</green>`,
        });
        if (finalParams.chdir) {
            process.chdir(finalParams.dest);
            emit('chdir', finalParams.dest);
        }
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3B5LmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxjQUFjO0FBQ2QsT0FBTywyQkFBMkIsTUFBTSxtREFBbUQsQ0FBQztBQUM1RixPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFVBQVUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RCxPQUFPLGFBQWEsTUFBTSx1Q0FBdUMsQ0FBQztBQUNsRSxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUV6QyxlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxFQUFFLEVBQUU7UUFDMUQsTUFBTSxXQUFXLEdBQUcsMkJBQTJCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWxFLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRW5FLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDdEIsS0FBSyxFQUFFLHVDQUF1QyxJQUFJLFVBQVUsV0FBVyxDQUFDLEdBQUcsb0JBQW9CLFdBQVcsQ0FBQyxJQUFJLFNBQVM7U0FDM0gsQ0FBQyxDQUFDO1FBRUgsMEJBQTBCO1FBQzFCLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO1lBQ3RCLEtBQUssRUFBRSxpRUFBaUU7U0FDM0UsQ0FBQyxDQUFDO1FBRUgsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25DO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=