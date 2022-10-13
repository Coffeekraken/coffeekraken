var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import { define as _sSpecsEditorComponentDefine } from '@coffeekraken/s-specs-editor-component/webcomponent';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
(() => __awaiter(void 0, void 0, void 0, function* () {
    // features
    __sActivateFeature();
    // components
    _sSpecsEditorComponentDefine();
    __querySelectorLive('[component]', ($app) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const component = JSON.parse($app.getAttribute('component'));
        const componentImport = yield import(component.path);
        const $componentContainer = document.querySelector(`#component-${component.target}`);
        switch (component.target) {
            case 'webcomponent':
                componentImport.define();
                $app.innerHTML = (_a = componentImport.metas) === null || _a === void 0 ? void 0 : _a.preview;
                let $component = $app.children[0], componentTagName = $component.tagName;
                $componentContainer === null || $componentContainer === void 0 ? void 0 : $componentContainer.addEventListener('s-specs-editor.change', (e) => {
                    const updatedProp = e.detail;
                    // const prop = e.detail;
                    // if (typeof prop.value === 'boolean') {
                    //     if (prop.value) {
                    //         $component.setAttribute(prop.id, 'true');
                    //     } else {
                    //         $component.removeAttribute(prop.id);
                    //     }
                    // } else {
                    //     if (!prop.value) {
                    //         $component.removeAttribute(prop.id);
                    //     } else {
                    //         $component.setAttribute(prop.id, prop.value);
                    //     }
                    // }
                    $component.remove();
                    const domParser = new DOMParser();
                    const $dom = domParser.parseFromString(componentImport.metas.preview, 'text/html');
                    $component = $dom.body.children[0];
                    for (let [prop, value] of Object.entries(component.specs.props)) {
                        if (prop === updatedProp.id) {
                            console.log(prop, value);
                        }
                    }
                    $app.appendChild();
                    console.log('Updated', e.detail);
                });
                break;
        }
    }));
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsTUFBTSxJQUFJLDRCQUE0QixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDN0csT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFOUQsQ0FBQyxHQUFTLEVBQUU7SUFDUixXQUFXO0lBQ1gsa0JBQWtCLEVBQUUsQ0FBQztJQUVyQixhQUFhO0lBQ2IsNEJBQTRCLEVBQUUsQ0FBQztJQUUvQixtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTs7UUFDOUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDN0QsTUFBTSxlQUFlLEdBQUcsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJELE1BQU0sbUJBQW1CLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDOUMsY0FBYyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQ25DLENBQUM7UUFFRixRQUFRLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDdEIsS0FBSyxjQUFjO2dCQUNmLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFBLGVBQWUsQ0FBQyxLQUFLLDBDQUFFLE9BQU8sQ0FBQztnQkFFaEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFDN0IsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQkFFMUMsbUJBQW1CLGFBQW5CLG1CQUFtQix1QkFBbkIsbUJBQW1CLENBQUUsZ0JBQWdCLENBQ2pDLHVCQUF1QixFQUN2QixDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNGLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7b0JBRTdCLHlCQUF5QjtvQkFDekIseUNBQXlDO29CQUN6Qyx3QkFBd0I7b0JBQ3hCLG9EQUFvRDtvQkFDcEQsZUFBZTtvQkFDZiwrQ0FBK0M7b0JBQy9DLFFBQVE7b0JBQ1IsV0FBVztvQkFDWCx5QkFBeUI7b0JBQ3pCLCtDQUErQztvQkFDL0MsZUFBZTtvQkFDZix3REFBd0Q7b0JBQ3hELFFBQVE7b0JBQ1IsSUFBSTtvQkFFSixVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBRXBCLE1BQU0sU0FBUyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7b0JBQ2xDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxlQUFlLENBQ2xDLGVBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUM3QixXQUFXLENBQ2QsQ0FBQztvQkFDRixVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRW5DLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUNwQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FDeEIsRUFBRTt3QkFDQyxJQUFJLElBQUksS0FBSyxXQUFXLENBQUMsRUFBRSxFQUFFOzRCQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzt5QkFDNUI7cUJBQ0o7b0JBRUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUVuQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JDLENBQUMsQ0FDSixDQUFDO2dCQUVGLE1BQU07U0FDYjtJQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMifQ==