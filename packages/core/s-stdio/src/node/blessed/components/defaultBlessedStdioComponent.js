// @ts-nocheck
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __toString from '@coffeekraken/sugar/shared/string/toString';
import __SBlessedComponent from '@coffeekraken/sugar/node/blessed/SBlessedComponent';
/**
 * @name        defaultBlessedStdioComponent
 * @namespace   sugar.node.stdio.blessed.components
 * @type        ISStdioComponent
 *
 * Blessed stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
    id: 'default',
    render(logObj, settings) {
        const value = logObj.value || logObj;
        const logStr = __parseHtml(__toString(value)).trim();
        const $component = new __SBlessedComponent({
            blessed: {
                width: '100%',
                height: 0
            }
        });
        $component.on('update', () => {
            $component.setContent(logStr);
            $component.height = $component.realHeight;
        });
        return $component;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdEJsZXNzZWRTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZmF1bHRCbGVzc2VkU3RkaW9Db21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sbUJBQW1CLE1BQU0sb0RBQW9ELENBQUM7QUFFckY7Ozs7Ozs7OztHQVNHO0FBQ0gsZUFBZTtJQUNiLEVBQUUsRUFBRSxTQUFTO0lBQ2IsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFhO1FBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVyRCxNQUFNLFVBQVUsR0FBRyxJQUFJLG1CQUFtQixDQUFDO1lBQ3pDLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUUsTUFBTTtnQkFDYixNQUFNLEVBQUUsQ0FBQzthQUNWO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQzNCLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIsVUFBVSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztDQUNGLENBQUMifQ==