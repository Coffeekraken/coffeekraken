import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __countLine from '@coffeekraken/sugar/shared/string/countLine';
/**
 * @name        separatorTerminalStdioComponent
 * @namespace   sugar.node.stdio.terminal.components
 * @type        ISStdioComponent
 *
 * Terminal stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
    id: 'separator',
    render(logObj, settings = {}) {
        const value = logObj.value;
        const color = logObj.color || 'yellow';
        const separator = logObj.separator ? logObj.separator.slice(0, 1) : '-';
        if (value) {
            return `${value} ${separator.repeat(process.stdout.columns - __countLine(value) - 1)}`;
        }
        else {
            return __parseHtml(`<${color}>${separator.repeat(process.stdout.columns)}</${color}>`);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VwYXJhdG9yVGVybWluYWxTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcGFyYXRvclRlcm1pbmFsU3RkaW9Db21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXLE1BQU0sOENBQThDLENBQUM7QUFDdkUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEU7Ozs7Ozs7OztHQVNHO0FBQ0gsZUFBZTtJQUNiLEVBQUUsRUFBRSxXQUFXO0lBQ2YsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMxQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzNCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDO1FBRXZDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hFLElBQUksS0FBSyxFQUFFO1lBQ1QsT0FBTyxHQUFHLEtBQUssSUFBSSxTQUFTLENBQUMsTUFBTSxDQUNqQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUNoRCxFQUFFLENBQUM7U0FDTDthQUFNO1lBQ0wsT0FBTyxXQUFXLENBQ2hCLElBQUksS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FDbkUsQ0FBQztTQUNIO0lBQ0gsQ0FBQztDQUNGLENBQUMifQ==