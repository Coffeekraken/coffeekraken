// @ts-nocheck
/**
 * @name              simpleValue
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the simpleValue tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function simpleValue(data, blockSettings) {
    if (data &&
        data.value &&
        typeof data.value === 'string' &&
        data.value.trim() === '') {
        return true;
    }
    const value = new String(data.value);
    value.render = true;
    return value;
}
export default simpleValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaW1wbGVWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFDcEMsSUFDSSxJQUFJO1FBQ0osSUFBSSxDQUFDLEtBQUs7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUTtRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFDMUI7UUFDRSxPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxlQUFlLFdBQVcsQ0FBQyJ9