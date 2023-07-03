var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __path from 'path';
import __fs from 'fs';
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
                    resPath = __path.resolve(__path.dirname(fromPath), path);
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
                    const filePath = __path.resolve(decodedLoadId);
                    const content = yield __fs.promises.readFile(filePath, {
                        encoding: 'utf-8',
                    });
                    console.log('content', content);
                    return `export default ${JSON.stringify(content)}`;
                }
            });
        },
    };
}
export default plainTextPlugin();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsTUFBTSx1QkFBdUIsR0FBRyxNQUFNLENBQUM7QUFDdkMsTUFBTSwyQkFBMkIsR0FBRyxHQUFHLEVBQUUsQ0FBQyxZQUFZLGdCQUFnQixFQUFFLENBQUM7QUFFekU7Ozs7O0dBS0c7QUFDSCxTQUFTLGVBQWUsQ0FBQyxnQkFBZ0IsR0FBRyx1QkFBdUI7SUFDL0QsTUFBTSx1QkFBdUIsR0FBRyxZQUFZLGdCQUFnQixFQUFFLENBQUM7SUFFL0QsT0FBTztRQUNILElBQUksRUFBRSxZQUFZO1FBQ2xCLFNBQVMsQ0FBQyxFQUFVLEVBQUUsUUFBZ0I7WUFDbEMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNwQyxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNuQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUM1RDtnQkFDRCxNQUFNLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbEQsT0FBTyxHQUFHLHVCQUF1QixHQUFHLGFBQWEsRUFBRSxDQUFDO2FBQ3ZEO1lBRUQseUNBQXlDO1lBQ3pDLG9EQUFvRDtZQUNwRCxtQ0FBbUM7WUFDbkMsV0FBVztZQUNYLElBQUk7WUFFSiw0Q0FBNEM7WUFDNUMsZ0RBQWdEO1lBQ2hELDZDQUE2QztZQUM3QyxTQUFTO1lBQ1Qsa0VBQWtFO1lBQ2xFLDJEQUEyRDtZQUMzRCxJQUFJO1FBQ1IsQ0FBQztRQUVELDZCQUE2QjtRQUM3Qiw0Q0FBNEM7UUFDNUMsbUNBQW1DO1FBQ25DLFFBQVE7UUFDUiwyQ0FBMkM7UUFDM0MsaUNBQWlDO1FBQ2pDLFFBQVE7UUFFUixtQ0FBbUM7UUFDbkMsc0JBQXNCO1FBQ3RCLDZDQUE2QztRQUM3QywrREFBK0Q7UUFDL0QsZ0JBQWdCO1FBQ2hCLFdBQVc7UUFDWCxLQUFLO1FBRUMsSUFBSSxDQUFDLGNBQXNCOztnQkFDN0IsSUFBSSxjQUFjLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN2RCxNQUFNLGFBQWEsR0FBRyxrQkFBa0IsQ0FDcEMsY0FBYyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FDdkQsQ0FBQztvQkFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUMvQyxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTt3QkFDbkQsUUFBUSxFQUFFLE9BQU87cUJBQ3BCLENBQUMsQ0FBQztvQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDaEMsT0FBTyxrQkFBa0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2lCQUN0RDtZQUNMLENBQUM7U0FBQTtLQUNKLENBQUM7QUFDTixDQUFDO0FBRUQsZUFBZSxlQUFlLEVBQUUsQ0FBQyJ9