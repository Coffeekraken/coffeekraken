import { __getExtendsStack } from '@coffeekraken/sugar/class';
export default {
    id: 'webcomponent',
    test(component) {
        var _a;
        if (component.target === 'webcomponent' ||
            ((_a = component.metas) === null || _a === void 0 ? void 0 : _a.type) === 'webcomponent') {
            return true;
        }
        let isHtmlElement = false;
        try {
            const extendsStack = __getExtendsStack(component.default);
            isHtmlElement = Object.keys(extendsStack).includes('HTMLElement');
        }
        catch (e) {
            return false;
        }
        return component.define && isHtmlElement;
    },
    create(component, settings) {
        var _a, _b, _c, _d;
        const $root = (_a = settings.$root) !== null && _a !== void 0 ? _a : document.body;
        (_b = component.define) === null || _b === void 0 ? void 0 : _b.call(component);
        $root.innerHTML = (_d = (_c = component.metas) === null || _c === void 0 ? void 0 : _c.preview) !== null && _d !== void 0 ? _d : settings.html;
        const $component = $root.children[0];
        component.$element = $component;
    },
    setProps(component, props) {
        for (let [prop, value] of Object.entries(props !== null && props !== void 0 ? props : {})) {
            if (value === undefined) {
                continue;
            }
            // @ts-ignore
            component.$element.props[prop] = value;
        }
        // @ts-ignore
        component.$element.update();
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBTTlELGVBQWU7SUFDWCxFQUFFLEVBQUUsY0FBYztJQUNsQixJQUFJLENBQUMsU0FBb0M7O1FBQ3JDLElBQ0ksU0FBUyxDQUFDLE1BQU0sS0FBSyxjQUFjO1lBQ25DLENBQUEsTUFBQSxTQUFTLENBQUMsS0FBSywwQ0FBRSxJQUFJLE1BQUssY0FBYyxFQUMxQztZQUNFLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSTtZQUNBLE1BQU0sWUFBWSxHQUFHLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRCxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDckU7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxTQUFTLENBQUMsTUFBTSxJQUFJLGFBQWEsQ0FBQztJQUM3QyxDQUFDO0lBQ0QsTUFBTSxDQUNGLFNBQW9DLEVBQ3BDLFFBQWlEOztRQUVqRCxNQUFNLEtBQUssR0FBRyxNQUFBLFFBQVEsQ0FBQyxLQUFLLG1DQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDOUMsTUFBQSxTQUFTLENBQUMsTUFBTSx5REFBSSxDQUFDO1FBQ3JCLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBUSxNQUFBLFNBQVMsQ0FBQyxLQUFLLDBDQUFFLE9BQU8sbUNBQUksUUFBUSxDQUFDLElBQUksQ0FBQztRQUNwRSxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ3BDLENBQUM7SUFDRCxRQUFRLENBQUMsU0FBb0MsRUFBRSxLQUFVO1FBQ3JELEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLEVBQUUsQ0FBQyxFQUFFO1lBQ25ELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDckIsU0FBUzthQUNaO1lBQ0QsYUFBYTtZQUNiLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUMxQztRQUNELGFBQWE7UUFDYixTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLENBQUM7Q0FDSixDQUFDIn0=