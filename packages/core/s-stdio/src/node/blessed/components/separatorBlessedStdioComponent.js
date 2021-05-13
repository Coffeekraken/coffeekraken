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
    id: 'separator',
    render(logObj, settings) {
        const value = logObj.value || logObj;
        const logStr = __parseHtml(__toString(value));
        const character = logObj.character || '-';
        const color = logObj.color || 'yellow';
        const $component = new __SBlessedComponent({
            blessed: {
                width: '100%',
                height: 1,
                style: {}
            }
        });
        $component.on('update', () => {
            var _a;
            const width = ((_a = $component.parent) === null || _a === void 0 ? void 0 : _a.innerWidth) || process.stdout.columns;
            $component.width = width;
            const separator = `<${color}>${character.repeat(width)}</${color}>`;
            const logStr = __parseHtml(separator);
            $component.setContent(logStr);
            $component.height = 1;
        });
        return $component;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VwYXJhdG9yQmxlc3NlZFN0ZGlvQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VwYXJhdG9yQmxlc3NlZFN0ZGlvQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RSxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRSxPQUFPLG1CQUFtQixNQUFNLG9EQUFvRCxDQUFDO0FBRXJGOzs7Ozs7Ozs7R0FTRztBQUNILGVBQWU7SUFDYixFQUFFLEVBQUUsV0FBVztJQUNmLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBYTtRQUMxQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQztRQUNyQyxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFOUMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUM7UUFDMUMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUM7UUFFdkMsTUFBTSxVQUFVLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQztZQUN6QyxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLEVBQUU7YUFDVjtTQUNGLENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTs7WUFDM0IsTUFBTSxLQUFLLEdBQUcsQ0FBQSxNQUFBLFVBQVUsQ0FBQyxNQUFNLDBDQUFFLFVBQVUsS0FBSSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUN0RSxVQUFVLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN6QixNQUFNLFNBQVMsR0FBRyxJQUFJLEtBQUssSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDO1lBQ3BFLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0QyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztDQUNGLENBQUMifQ==