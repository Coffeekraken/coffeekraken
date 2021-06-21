// @ts-nocheck
/**
 * @name              namespace
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the namespace tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since       2.0.0
 * @namespace 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function namespace(data, blockSettings) {
    if (data &&
        data.value &&
        typeof data.value === 'string' &&
        data.value.trim() === '') {
        return true;
    }
    let namespace = data.value;
    if (blockSettings.packageJson) {
        namespace = `${blockSettings.packageJson.name.replace('/', '.')}.${namespace}`;
    }
    return namespace;
}
export default namespace;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZXNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmFtZXNwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUUsYUFBYTtJQUVwQyxJQUNFLElBQUk7UUFDSixJQUFJLENBQUMsS0FBSztRQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUN4QjtRQUNBLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzNCLElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRTtRQUM3QixTQUFTLEdBQUcsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0tBQy9FO0lBRUQsT0FBTyxTQUFTLENBQUM7QUFFbkIsQ0FBQztBQUNELGVBQWUsU0FBUyxDQUFDIn0=