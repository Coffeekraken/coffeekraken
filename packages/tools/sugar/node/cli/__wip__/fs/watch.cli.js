"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.definition = void 0;
const argsToObject_1 = __importDefault(require("../../node/cli/argsToObject"));
const chokidar_1 = __importDefault(require("chokidar"));
const packageRoot_1 = __importDefault(require("../../node/path/packageRoot"));
const path_1 = __importDefault(require("path"));
/**
 * @name                watch
 * @namespace           cli.fs
 * @type                cli
 *
 * This command simply take some glob patterns to watch files.
 * This command console log the updated/new/deleted files
 *
 * @param       {String}        --patterns|-p          The glob patterns to watch separated by a comma. Do not put space either...
 * @param       {String}        [--type|-t="new,update,delete"]              Specify what you want to watch using a comma separated string. The accepted values are "new,delete,update"
 * @param       {Boolean}       [--persistent=true]                         Indicates whether the process should continue to run as long as files are being watched
 * @param       {String}        --ignore|-i           Specify some glob patterns of files to ignore
 *
 * @example       cli
 * sugar fs.watch /myFolder/*.js
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const definition = {
    pattern: {
        type: 'String',
        alias: 'p',
        description: 'Files glob pattern(s)',
        required: true
    },
    type: {
        type: 'String',
        alias: 't',
        description: 'What you want to watch',
        default: 'new,update,delete'
    },
    persistent: {
        type: 'Boolean',
        description: 'Specify if the process shoud stay alive',
        default: true
    },
    ignore: {
        type: 'String',
        alias: 'i',
        description: 'Some glob patterns to ignore'
    }
};
exports.definition = definition;
exports.default = (stringArgs = '') => {
    const args = argsToObject_1.default(stringArgs, definition);
    const watcher = chokidar_1.default.watch(args.pattern.split(','), {
        persistent: args.persistent,
        ignored: args.ignore,
        ignoreInitial: true,
        followSymlinks: true,
        cwd: packageRoot_1.default(process.cwd()),
        ignorePermissionErrors: false
    });
    watcher
        .on('add', (path) => {
        if (args.type.split(',').indexOf('new') === -1)
            return;
        console.log(`new:${path_1.default.resolve(path)}`);
    })
        .on('change', (path) => {
        if (args.type.split(',').indexOf('update') === -1)
            return;
        console.log(`update:${path_1.default.resolve(path)}`);
    })
        .on('unlink', (path) => {
        if (args.type.split(',').indexOf('delete') === -1)
            return;
        console.log(`delete:${path_1.default.resolve(path)}`);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2guY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NsaS9fX3dpcF9fL2ZzL3dhdGNoLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7O0FBRWQsK0VBQXlEO0FBQ3pELHdEQUFrQztBQUNsQyw4RUFBd0Q7QUFDeEQsZ0RBQTBCO0FBRTFCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sVUFBVSxHQUFHO0lBQ2pCLE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsdUJBQXVCO1FBQ3BDLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLHdCQUF3QjtRQUNyQyxPQUFPLEVBQUUsbUJBQW1CO0tBQzdCO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixXQUFXLEVBQUUseUNBQXlDO1FBQ3RELE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLDhCQUE4QjtLQUM1QztDQUNGLENBQUM7QUE0Qk8sZ0NBQVU7QUExQm5CLGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2pDLE1BQU0sSUFBSSxHQUFHLHNCQUFjLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sT0FBTyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3hELFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtRQUMzQixPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU07UUFDcEIsYUFBYSxFQUFFLElBQUk7UUFDbkIsY0FBYyxFQUFFLElBQUk7UUFDcEIsR0FBRyxFQUFFLHFCQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLHNCQUFzQixFQUFFLEtBQUs7S0FDOUIsQ0FBQyxDQUFDO0lBRUgsT0FBTztTQUNKLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNsQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxjQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUM7U0FDRCxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDckIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQyxDQUFDO1NBQ0QsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3JCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLGNBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=