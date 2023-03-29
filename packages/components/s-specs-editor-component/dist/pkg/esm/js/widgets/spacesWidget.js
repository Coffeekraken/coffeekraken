import { html } from 'lit';
import { define as __SSpacesSelectorComponentDefine } from '@coffeekraken/s-spaces-selector-component';
__SSpacesSelectorComponentDefine();
export default function (component) {
    let error, warning;
    return {
        render({ propObj, values, path }) {
            const spaces = {
                padding: [],
                margin: [],
            };
            propObj.props.paddingTop.options.forEach((option) => {
                spaces.padding.push(Object.assign(Object.assign({}, option), { default: option.value == propObj.props.paddingTop.default }));
            });
            propObj.props.marginTop.options.forEach((option) => {
                spaces.margin.push(Object.assign(Object.assign({}, option), { default: option.value == propObj.props.marginTop.default }));
            });
            return {
                error,
                warning,
                html: html `
                    <div
                        class="${component.utils.cls('_spaces-widget')}"
                        @s-spaces-selector.change=${(e) => {
                    const setPath = `${path.join('.')}`;
                    component.setValue(setPath, e.detail);
                    component.apply();
                }}
                    >
                        <s-spaces-selector
                            .spaces=${spaces}
                            .values=${Object.assign({}, values !== null && values !== void 0 ? values : {})}
                        ></s-spaces-selector>
                    </div>
                `,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxFQUFFLE1BQU0sSUFBSSxnQ0FBZ0MsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRXZHLGdDQUFnQyxFQUFFLENBQUM7QUFFbkMsTUFBTSxDQUFDLE9BQU8sV0FBVyxTQUFTO0lBQzlCLElBQUksS0FBSyxFQUFFLE9BQU8sQ0FBQztJQUVuQixPQUFPO1FBQ0gsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDNUIsTUFBTSxNQUFNLEdBQUc7Z0JBQ1gsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsTUFBTSxFQUFFLEVBQUU7YUFDYixDQUFDO1lBRUYsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNoRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksaUNBQ1osTUFBTSxLQUNULE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFDM0QsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUMvQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksaUNBQ1gsTUFBTSxLQUNULE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sSUFDMUQsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTztnQkFDSCxLQUFLO2dCQUNMLE9BQU87Z0JBQ1AsSUFBSSxFQUFFLElBQUksQ0FBQTs7aUNBRU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7b0RBQ2xCLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQzlCLE1BQU0sT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUNwQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3RDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQzs7O3NDQUdhLE1BQU07c0NBQ04sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDOzs7aUJBR3BEO2FBQ0osQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9