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
import __find from 'find-in-files';
import __path from 'path';
import __writeFileSync from '../../node/fs/writeFileSync';
import __appRoot from 'app-root-path';
import __parseArgs from '../../node/cli/parseArgs';
import __parse from '../../node/docblock/parse';
import __includes from '../../node/string/includes';
export default (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    const args = __parseArgs(stringArgs, {
        definition: {
            source: {
                type: 'String',
                alias: 's',
                default: `${__appRoot.path}/src/node`
            },
            destination: {
                type: 'String',
                alias: 'd',
                default: `${__appRoot.path}/node.js`
            },
            ignore: {
                type: 'String',
                alias: 'i',
                default: `__tests__,__wip__`
            }
        }
    });
    const itemsArray = [
        `
  require('module-alias/register');
const __ensureExists = require('@coffeekraken/sugar/node/object/ensureExists');
const api = {};
  `
    ];
    const stackFn = {};
    const stack = {};
    const files = yield __find.find('@namespace', args.source, '.js$');
    for (let i = 0; i < Object.keys(files).length; i++) {
        const filepath = Object.keys(files)[i];
        if (__includes(filepath, args.ignore))
            continue;
        // let fileContent = __fs.readFileSync(filepath).toString();
        // parse the file docblocks
        const docObj = __parse(filepath, {
            preprocessor: (blockString) => {
                blockString = blockString.replace('sugar.js', 'sugar.node');
                blockString = blockString.replace('Sugar.js', 'Sugar.node');
                blockString = blockString.replace('sugar/js/', 'sugar/node/');
                return blockString;
            }
        })[0];
        const relativeFilePath = __path.relative(args.destination.split('/').slice(0, -1).join('/'), docObj._.filepath);
        // check the type of the parsed file
        switch (docObj.type.toLowerCase()) {
            case 'function':
                itemsArray.push(`
${docObj._.raw}
__ensureExists(api, '${docObj.namespace.split('.').slice(1).join('.')}.${docObj.name}', null);
api.${docObj.namespace.split('.').slice(1).join('.')}.${docObj.name} = (...args) => {
  return require('./${relativeFilePath}').call(null, ...args);
};
        `);
                break;
            case 'class':
            default:
                itemsArray.push(`
${docObj._.raw}
__ensureExists(api, '${docObj.namespace.split('.').slice(1).join('.')}.${docObj.name}', null);
Object.defineProperty(api.${docObj.namespace.split('.').slice(1).join('.')}, '${docObj.name}', {
  get: function() {
    return require('./${relativeFilePath}');
  }
});
          `);
                break;
        }
    }
    // export the API
    itemsArray.push(`module.exports = api;`);
    __writeFileSync(args.destination, itemsArray.join('\n'));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub2RlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBR2QsT0FBTyxNQUFNLE1BQU0sZUFBZSxDQUFDO0FBQ25DLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLGVBQWUsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRCxPQUFPLFNBQVMsTUFBTSxlQUFlLENBQUM7QUFDdEMsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxPQUFPLE1BQU0sMkJBQTJCLENBQUM7QUFDaEQsT0FBTyxVQUFVLE1BQU0sNEJBQTRCLENBQUM7QUFFcEQsZUFBZSxDQUFPLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUN2QyxNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFO1FBQ25DLFVBQVUsRUFBRTtZQUNWLE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsR0FBRyxTQUFTLENBQUMsSUFBSSxXQUFXO2FBQ3RDO1lBQ0QsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxHQUFHLFNBQVMsQ0FBQyxJQUFJLFVBQVU7YUFDckM7WUFDRCxNQUFNLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLG1CQUFtQjthQUM3QjtTQUNGO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsTUFBTSxVQUFVLEdBQUc7UUFDakI7Ozs7R0FJRDtLQUNBLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDbkIsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBRWpCLE1BQU0sS0FBSyxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUVuRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2QyxJQUFJLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUFFLFNBQVM7UUFFaEQsNERBQTREO1FBRTVELDJCQUEyQjtRQUMzQixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQy9CLFlBQVksRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUM1QixXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzVELFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDNUQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUM5RCxPQUFPLFdBQVcsQ0FBQztZQUNyQixDQUFDO1NBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRU4sTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUNsRCxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FDbEIsQ0FBQztRQUVGLG9DQUFvQztRQUNwQyxRQUFRLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDakMsS0FBSyxVQUFVO2dCQUNiLFVBQVUsQ0FBQyxJQUFJLENBQUM7RUFDdEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHO3VCQUNTLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQzNELE1BQU0sQ0FBQyxJQUNUO01BQ0YsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFDMUMsTUFBTSxDQUFDLElBQ1Q7c0JBQ2MsZ0JBQWdCOztTQUU3QixDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNSLEtBQUssT0FBTyxDQUFDO1lBQ2I7Z0JBQ0UsVUFBVSxDQUFDLElBQUksQ0FBQztFQUN0QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUc7dUJBQ1MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFDM0QsTUFBTSxDQUFDLElBQ1Q7NEJBQ29CLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQ2hFLE1BQU0sQ0FBQyxJQUNUOzt3QkFFZ0IsZ0JBQWdCOzs7V0FHN0IsQ0FBQyxDQUFDO2dCQUNMLE1BQU07U0FDVDtLQUNGO0lBRUQsaUJBQWlCO0lBQ2pCLFVBQVUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUV6QyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDM0QsQ0FBQyxDQUFBLENBQUMifQ==