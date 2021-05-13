require = require('esm')(module, {});
import __SProcess from '@coffeekraken/s-process';
import __SSugarJsonListParamsInterface from './interface/SSugarJsonListParamsInterface';
import __SSugarJson from '../SSugarJson';
import __SPromise from '@coffeekraken/s-promise';
import __SDuration from '@coffeekraken/s-duration';
import __path from 'path';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
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
                    value: `<yellow>[file]</yellow> <cyan>${__path.relative(__packageRoot(), path)}</cyan>`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztBQUVyQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLCtCQUErQixNQUFNLDJDQUEyQyxDQUFDO0FBQ3hGLE9BQU8sWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUVuRCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFFdEUsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDM0MsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FDekIsQ0FBQyxTQUFjLEVBQUUsRUFBRSxFQUFFO1FBQ25CLE9BQU8sSUFBSSxVQUFVLENBQ25CLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEVBQ0gsMkVBQTJFO2FBQzlFLENBQUMsQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7WUFDbkMsTUFBTSxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUNyQyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEVBQUUscUNBQ0wsSUFBSSxDQUFDLE1BQ1AsdUNBQ0UsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNqQixXQUFXO2FBQ1osQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNwQixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLEtBQUssRUFBRSxpQ0FBaUMsTUFBTSxDQUFDLFFBQVEsQ0FDckQsYUFBYSxFQUFFLEVBQ2YsSUFBSSxDQUNMLFNBQVM7aUJBQ1gsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsRUFDRDtZQUNFLEtBQUssRUFBRTtnQkFDTCxFQUFFLEVBQUUsV0FBVzthQUNoQjtTQUNGLENBQ0YsQ0FBQztJQUNKLENBQUMsRUFDRDtRQUNFLE9BQU8sRUFBRTtZQUNQLFNBQVMsRUFBRSwrQkFBK0I7U0FDM0M7S0FDRixDQUNGLENBQUM7SUFDRixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==