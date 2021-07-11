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
import __SSugarJsonListParamsInterface from './interface/SSugarJsonListParamsInterface';
import __SSugarJson from '../SSugarJson';
import __SPromise from '@coffeekraken/s-promise';
import __SDuration from '@coffeekraken/s-duration';
import __path from 'path';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
export default function start(stringArgs = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const pro = yield __SProcess.from((params = {}) => {
            return new __SPromise(({ resolve, reject, emit }) => {
                emit('log', {
                    value: '<yellow>[search]</yellow> Searching for <yellow>sugar.json</yellow> files'
                });
                const duration = new __SDuration();
                const sugarJson = new __SSugarJson();
                const list = sugarJson.search();
                emit('log', {
                    value: `<green>[success]</green> <magenta>${list.length}</magenta> file(s) found in <yellow>${duration.end().formatedDuration}</yellow>`
                });
                list.forEach((path) => {
                    emit('log', {
                        value: `<yellow>[file]</yellow> <cyan>${__path.relative(__packageRootDir(), path)}</cyan>`
                    });
                });
                resolve();
            }, {
                metas: {
                    id: 'json.list'
                }
            });
        }, {
            process: {
                interface: __SSugarJsonListParamsInterface
            }
        });
        pro.run(stringArgs);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLCtCQUErQixNQUFNLDJDQUEyQyxDQUFDO0FBQ3hGLE9BQU8sWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUVuRCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxnQkFBZ0IsTUFBTSw4Q0FBOEMsQ0FBQztBQUU1RSxNQUFNLENBQUMsT0FBTyxVQUFnQixLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUU7O1FBQ2pELE1BQU0sR0FBRyxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FDL0IsQ0FBQyxTQUFjLEVBQUUsRUFBRSxFQUFFO1lBQ25CLE9BQU8sSUFBSSxVQUFVLENBQ25CLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxFQUNILDJFQUEyRTtpQkFDOUUsQ0FBQyxDQUFDO2dCQUNILE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7Z0JBQ25DLE1BQU0sU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7Z0JBQ3JDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEVBQUUscUNBQ0wsSUFBSSxDQUFDLE1BQ1AsdUNBQ0UsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNqQixXQUFXO2lCQUNaLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQ3BCLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1YsS0FBSyxFQUFFLGlDQUFpQyxNQUFNLENBQUMsUUFBUSxDQUNyRCxnQkFBZ0IsRUFBRSxFQUNsQixJQUFJLENBQ0wsU0FBUztxQkFDWCxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLEVBQ0Q7Z0JBQ0UsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxXQUFXO2lCQUNoQjthQUNGLENBQ0YsQ0FBQztRQUNKLENBQUMsRUFDRDtZQUNFLE9BQU8sRUFBRTtnQkFDUCxTQUFTLEVBQUUsK0JBQStCO2FBQzNDO1NBQ0YsQ0FDRixDQUFDO1FBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0QixDQUFDO0NBQUEifQ==