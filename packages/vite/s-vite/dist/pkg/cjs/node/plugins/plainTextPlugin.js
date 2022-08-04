"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const defaultVirtualNamespace = 'raw:';
const getResolvedVirtualNamespace = () => `@resolved${virtualNamespace}`;
/**
 * @param match
 * Regular expression in string or Regexp type,
 *  or a match predicate  (this: vite transform context, code: string, id: file name string) => void
 * @returns transformed code
 */
function plainTextPlugin(virtualNamespace = defaultVirtualNamespace) {
    const resolvedVirtualModuleId = `@resolved${virtualNamespace}`;
    return {
        name: 'raw-plugin',
        resolveId(id, fromPath) {
            if (id.indexOf(virtualNamespace) === 0) {
                const path = id.slice(virtualNamespace.length);
                let resPath = path;
                if (path.match(/^(\.)/)) {
                    console.log('RES', fromPath, path);
                    resPath = path_1.default.resolve(path_1.default.dirname(fromPath), path);
                }
                const encodedLoadId = encodeURIComponent(resPath);
                return `${resolvedVirtualModuleId}${encodedLoadId}`;
            }
            // if (id.startsWith(virtualNamespace)) {
            //     return `${resolvedVirtualModuleId}${id.slice(
            //         virtualNamespace.length,
            //     )}`;
            // }
            // if (id.indexOf(virtualNamespace) === 0) {
            //     const encodedLoadId = encodeURIComponent(
            //         id.slice(virtualNamespace.length),
            //     );
            //     console.log('EEE', resolvedVirtualModuleId, encodedLoadId);
            //     return `${resolvedVirtualModuleId}${encodedLoadId}`;
            // }
        },
        // async transform(src, id) {
        //     if (src.includes(virtualNamespace)) {
        //         console.log('src', src);
        //     }
        //     if (id.includes(virtualNamespace)) {
        //         console.log('id', id);
        //     }
        //     // if (fileRegex.test(id)) {
        //     //     return {
        //     //         code: compileFileToJS(src),
        //     //         map: null, // provide source map if available
        //     //     };
        //     // }
        // },
        load(maybeEncodedId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (maybeEncodedId.indexOf(resolvedVirtualModuleId) === 0) {
                    const decodedLoadId = decodeURIComponent(maybeEncodedId.slice(resolvedVirtualModuleId.length));
                    const filePath = path_1.default.resolve(decodedLoadId);
                    const content = yield fs_1.default.promises.readFile(filePath, {
                        encoding: 'utf-8',
                    });
                    console.log('content', content);
                    return `export default ${JSON.stringify(content)}`;
                }
            });
        },
    };
}
exports.default = plainTextPlugin();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTBCO0FBQzFCLDRDQUFzQjtBQUV0QixNQUFNLHVCQUF1QixHQUFHLE1BQU0sQ0FBQztBQUN2QyxNQUFNLDJCQUEyQixHQUFHLEdBQUcsRUFBRSxDQUFDLFlBQVksZ0JBQWdCLEVBQUUsQ0FBQztBQUV6RTs7Ozs7R0FLRztBQUNILFNBQVMsZUFBZSxDQUFDLGdCQUFnQixHQUFHLHVCQUF1QjtJQUMvRCxNQUFNLHVCQUF1QixHQUFHLFlBQVksZ0JBQWdCLEVBQUUsQ0FBQztJQUUvRCxPQUFPO1FBQ0gsSUFBSSxFQUFFLFlBQVk7UUFDbEIsU0FBUyxDQUFDLEVBQVUsRUFBRSxRQUFnQjtZQUNsQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3BDLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9DLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDbkIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ25DLE9BQU8sR0FBRyxjQUFNLENBQUMsT0FBTyxDQUFDLGNBQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQzVEO2dCQUNELE1BQU0sYUFBYSxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsRCxPQUFPLEdBQUcsdUJBQXVCLEdBQUcsYUFBYSxFQUFFLENBQUM7YUFDdkQ7WUFFRCx5Q0FBeUM7WUFDekMsb0RBQW9EO1lBQ3BELG1DQUFtQztZQUNuQyxXQUFXO1lBQ1gsSUFBSTtZQUVKLDRDQUE0QztZQUM1QyxnREFBZ0Q7WUFDaEQsNkNBQTZDO1lBQzdDLFNBQVM7WUFDVCxrRUFBa0U7WUFDbEUsMkRBQTJEO1lBQzNELElBQUk7UUFDUixDQUFDO1FBRUQsNkJBQTZCO1FBQzdCLDRDQUE0QztRQUM1QyxtQ0FBbUM7UUFDbkMsUUFBUTtRQUNSLDJDQUEyQztRQUMzQyxpQ0FBaUM7UUFDakMsUUFBUTtRQUVSLG1DQUFtQztRQUNuQyxzQkFBc0I7UUFDdEIsNkNBQTZDO1FBQzdDLCtEQUErRDtRQUMvRCxnQkFBZ0I7UUFDaEIsV0FBVztRQUNYLEtBQUs7UUFFQyxJQUFJLENBQUMsY0FBc0I7O2dCQUM3QixJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3ZELE1BQU0sYUFBYSxHQUFHLGtCQUFrQixDQUNwQyxjQUFjLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUN2RCxDQUFDO29CQUNGLE1BQU0sUUFBUSxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQy9DLE1BQU0sT0FBTyxHQUFHLE1BQU0sWUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO3dCQUNuRCxRQUFRLEVBQUUsT0FBTztxQkFDcEIsQ0FBQyxDQUFDO29CQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNoQyxPQUFPLGtCQUFrQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7aUJBQ3REO1lBQ0wsQ0FBQztTQUFBO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFFRCxrQkFBZSxlQUFlLEVBQUUsQ0FBQyJ9