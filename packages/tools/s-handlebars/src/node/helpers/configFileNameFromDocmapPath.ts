/**
 * @name            configFileNameFromDocmapPath
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
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
export default function configFileNameFromDocmapPath(namespace: string): any {
    if (!namespace.match(/^[a-zA-Z0-9_\-\.@]+\.config\.[a-zA-Z0-9_\-]+$/)) {
        throw new Error(
            `Sorry but the passed config path "${namespace}" is not a valid one and does not exists in the docmap`,
        );
    }
    return `${namespace.split('.').pop()}.config.js`;
}
