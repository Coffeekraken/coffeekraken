import __SFile from '@coffeekraken/s-file';
import __SugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name            registerSFileClasses
 * @namespace            node.fs
 * @type            Function
 *
 * This function is responsivle to register the SFile classes with their proper
 * extensions.
 *
 * @since       2.0.0
 */
export default () => {
    const map = __SugarConfig.get('fs.sFileClassesMap');
    Object.keys(map).forEach((key) => {
        const cls = require(map[key]).default;
        key
            .split(',')
            .map((l) => l.trim())
            .forEach((pattern) => {
            __SFile.registerClass(pattern, cls);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJTRmlsZUNsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RlclNGaWxlQ2xhc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUV6RDs7Ozs7Ozs7O0dBU0c7QUFDSCxlQUFlLEdBQUcsRUFBRTtJQUNsQixNQUFNLEdBQUcsR0FBMkIsYUFBYSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDL0IsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUN0QyxHQUFHO2FBQ0EsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3BCLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ25CLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==