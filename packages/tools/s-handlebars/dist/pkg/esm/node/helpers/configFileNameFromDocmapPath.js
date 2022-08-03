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
 * @param       {String}        path            The dotpath to the config you want to get the filename from
 * @return      {String}                    The .config.js filename
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function configFileNameFromDocmapPath(namespace) {
    if (!namespace.match(/^[a-zA-Z0-9_\-\.@]+\.config\.[a-zA-Z0-9_\-]+$/)) {
        throw new Error(`Sorry but the passed config path "${namespace}" is not a valid one and does not exists in the docmap`);
    }
    return `${namespace.split('.').pop()}.config.js`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsNEJBQTRCLENBQUMsU0FBaUI7SUFDbEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsK0NBQStDLENBQUMsRUFBRTtRQUNuRSxNQUFNLElBQUksS0FBSyxDQUNYLHFDQUFxQyxTQUFTLHdEQUF3RCxDQUN6RyxDQUFDO0tBQ0w7SUFDRCxPQUFPLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDO0FBQ3JELENBQUMifQ==