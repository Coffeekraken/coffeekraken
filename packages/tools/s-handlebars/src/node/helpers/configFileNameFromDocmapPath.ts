/**
 * @name            configFileNameFromDocmapPath
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This helper allows you to get the .config file name from a passed docmap path
 *
 * @param       {String}        path            The dotpath to the config you want to get the filename from
 * @return      {String}                    The .config.js filename
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function configFileNameFromDocmapPath(path: string): any {
    if (!path.match(/^[a-zA-Z0-9_\-\.@]+\.config\.[a-zA-Z0-9_\-]+$/)) {
        throw new Error(
            `Sorry but the passed config path "${path}" is not a valid one and does not exists in the docmap`,
        );
    }
    return `${path.split('.').pop()}.config.js`;
}
