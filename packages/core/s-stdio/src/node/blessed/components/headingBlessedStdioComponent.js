// @ts-nocheck
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __toString from '@coffeekraken/sugar/shared/string/toString';
import __SBlessedComponent from '@coffeekraken/sugar/node/blessed/SBlessedComponent';
/**
 * @name        headingBlessedStdioComponent
 * @namespace   sugar.node.stdio.blessed.components
 * @type        ISStdioComponent
 *
 * Blessed stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
    id: 'heading',
    render(logObj, settings) {
        const value = __toString(logObj.value || logObj);
        const color = logObj.color || 'yellow';
        const character = logObj.character ? logObj.character.slice(0, 1) : '-';
        const $component = new __SBlessedComponent({
            blessed: {
                width: '100%',
                height: 'shrink',
                style: {}
            }
        });
        $component.on('update', () => {
            var _a;
            const width = ((_a = $component.parent) === null || _a === void 0 ? void 0 : _a.innerWidth) || process.stdout.columns;
            $component.width = width;
            const separator = `<${color}>${character.repeat(width)}</${color}>`;
            const logStr = __parseHtml([separator, value, separator].join('\n'));
            $component.setContent(logStr);
            $component.height = $component.realHeight;
        });
        return $component;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGluZ0JsZXNzZWRTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlYWRpbmdCbGVzc2VkU3RkaW9Db21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sbUJBQW1CLE1BQU0sb0RBQW9ELENBQUM7QUFFckY7Ozs7Ozs7OztHQVNHO0FBQ0gsZUFBZTtJQUNiLEVBQUUsRUFBRSxTQUFTO0lBQ2IsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFhO1FBQzFCLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDO1FBRXZDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRXhFLE1BQU0sVUFBVSxHQUFHLElBQUksbUJBQW1CLENBQUM7WUFDekMsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxNQUFNO2dCQUNiLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixLQUFLLEVBQUUsRUFBRTthQUNWO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFOztZQUMzQixNQUFNLEtBQUssR0FBRyxDQUFBLE1BQUEsVUFBVSxDQUFDLE1BQU0sMENBQUUsVUFBVSxLQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ3RFLFVBQVUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBRXpCLE1BQU0sU0FBUyxHQUFHLElBQUksS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxHQUFHLENBQUM7WUFDcEUsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyRSxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRixDQUFDIn0=