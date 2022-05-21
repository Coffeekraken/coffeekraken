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
        name: 'raw-plugin', // required, will show up in warnings and errors
        resolveId(id: string, fromPath: string) {
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

        async load(maybeEncodedId: string) {
            if (maybeEncodedId.indexOf(resolvedVirtualModuleId) === 0) {
                const decodedLoadId = decodeURIComponent(
                    maybeEncodedId.slice(resolvedVirtualModuleId.length),
                );
                const filePath = __path.resolve(decodedLoadId);
                const content = await __fs.promises.readFile(filePath, {
                    encoding: 'utf-8',
                });
                console.log('content', content);
                return `export default ${JSON.stringify(content)}`;
            }
        },
    };
}

export default plainTextPlugin();
