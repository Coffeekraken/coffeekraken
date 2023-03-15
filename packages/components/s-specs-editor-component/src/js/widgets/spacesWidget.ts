import { html } from 'lit';

import { define as __SSpacesSelectorComponentDefine } from '@coffeekraken/s-spaces-selector-component';

__SSpacesSelectorComponentDefine();

export default function (component) {
    return {
        hideOriginals: true,
        html({ propObj, values, path }) {
            const spaces = {
                padding: [],
                margin: [],
            };

            propObj.props.paddingTop.options.forEach((option) => {
                spaces.padding.push({
                    ...option,
                    default: option.value == propObj.props.paddingTop.default,
                });
            });
            propObj.props.marginTop.options.forEach((option) => {
                spaces.margin.push({
                    ...option,
                    default: option.value == propObj.props.marginTop.default,
                });
            });

            console.log('SPA', spaces);

            return html`
                <div
                    class="${component.utils.cls('_spaces')}"
                    @s-spaces-selector.change=${(e) => {
                        Object.keys(e.detail ?? {}).forEach((key) => {
                            const value = e.detail[key];
                            const setPath = `${path.join('.')}.props.${key}`;
                            component.setValue(setPath, value);
                        });
                        component.apply();
                    }}
                >
                    <s-spaces-selector
                        .spaces=${spaces}
                        .values=${Object.assign({}, values ?? {})}
                    ></s-spaces-selector>
                </div>
            `;
        },
        events: {},
    };
}
