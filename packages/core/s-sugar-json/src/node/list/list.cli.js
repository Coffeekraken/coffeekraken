require = require('esm')(module, {});
import __SProcess from '@coffeekraken/s-process';
import __SSugarJsonListParamsInterface from './interface/SSugarJsonListParamsInterface';
import __SSugarJson from '../SSugarJson';
import __SPromise from '@coffeekraken/s-promise';
import __SDuration from '@coffeekraken/s-duration';
import __path from 'path';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
export default function start(stringArgs = '') {
    const pro = __SProcess.from((params = {}) => {
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztBQUVyQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLCtCQUErQixNQUFNLDJDQUEyQyxDQUFDO0FBQ3hGLE9BQU8sWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUVuRCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxnQkFBZ0IsTUFBTSw4Q0FBOEMsQ0FBQztBQUU1RSxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUMzQyxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUN6QixDQUFDLFNBQWMsRUFBRSxFQUFFLEVBQUU7UUFDbkIsT0FBTyxJQUFJLFVBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFDSCwyRUFBMkU7YUFDOUUsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUNuQyxNQUFNLFNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1lBQ3JDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRSxxQ0FDTCxJQUFJLENBQUMsTUFDUCx1Q0FDRSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQ2pCLFdBQVc7YUFDWixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLGlDQUFpQyxNQUFNLENBQUMsUUFBUSxDQUNyRCxnQkFBZ0IsRUFBRSxFQUNsQixJQUFJLENBQ0wsU0FBUztpQkFDWCxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxFQUNEO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLEVBQUUsRUFBRSxXQUFXO2FBQ2hCO1NBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQyxFQUNEO1FBQ0UsT0FBTyxFQUFFO1lBQ1AsU0FBUyxFQUFFLCtCQUErQjtTQUMzQztLQUNGLENBQ0YsQ0FBQztJQUNGLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9