import __SLitComponent from '@coffeekraken/s-lit-component';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SGaugeComponentInterface from './interface/SGaugeComponentInterface.js';
// @ts-ignore
import __css from '../../../../src/css/s-gauge-component.css'; // relative to /dist/pkg/esm/js
/**
 * @name                SGaugeComponent
 * @as                  Gauge
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SGaugeComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-gauge
 * @platform            html
 * @status              beta
 *
 * This component represent a simple "gauge" component .
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @import          import { define as __SGaugeComponentDefine } from '@coffeekraken/s-gauge-component';
 *
 * @snippet         __SGaugeComponentDefine($1)
 *
 * @install           shell
 * npm i @coffeekraken/s-gauge-component
 *
 * @install           js
 * import { define as __SGaugeComponentDefine } from '@coffeekraken/s-gauge-component';
 * __SGaugeComponentDefine();
 *
 * @example         html        Copy from an input
 * <s-gauge max="100" value="67"></<s-gauge>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SGaugeComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SGaugeComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    static get state() {
        return {};
    }
    constructor() {
        super(__deepMerge({
            name: 's-gauge',
            interface: __SGaugeComponentInterface,
        }));
    }
    render() {
        const value = parseFloat(this.props.value);
        const boundings = this.getBoundingClientRect(), strokeWidth = parseFloat(window.getComputedStyle(this).strokeWidth), scale = (1 / (boundings.width + strokeWidth)) * boundings.width, valuePercent = (100 / this.props.max) * parseFloat(this.props.value);
        for (let [cls, percentage] of Object.entries(this.props.classes)) {
            if ((100 / this.props.max) * value >= percentage) {
                this.classList.add(cls);
            }
            else {
                this.classList.remove(cls);
            }
        }
        return html `
            <svg
                style="--start-degree: ${this.props.start}; --end-degree: ${this
            .props.end}; --value-percent: ${valuePercent};"
                viewBox="0 0 ${boundings.width} ${boundings.height}"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    class="_track"
                    style="transform: rotateZ(-180deg) scale(${scale});"
                    stroke-linecap="${this.props.linecap}"
                    d="
    M 0, ${boundings.width * 0.5}
    a ${boundings.width * 0.5},${boundings.width *
            0.5} 0 1,1 ${boundings.width},0
    a ${boundings.width * 0.5},${boundings.width *
            0.5} 0 1,1 -${boundings.width},0
  "
                />
                <path
                    class="_gauge"
                    style="transform: rotateZ(-180deg) scale(${scale});"
                    stroke-linecap="${this.props.linecap}"
                    d="
    M 0, ${boundings.width * 0.5}
    a ${boundings.width * 0.5},${boundings.width *
            0.5} 0 1,1 ${boundings.width},0
    a ${boundings.width * 0.5},${boundings.width *
            0.5} 0 1,1 -${boundings.width},0
  "
                />
            </svg>
            <div class="_value">${this.props.value}</div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTywwQkFBMEIsTUFBTSx5Q0FBeUMsQ0FBQztBQUVqRixhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sMkNBQTJDLENBQUMsQ0FBQywrQkFBK0I7QUFVOUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxlQUFlO0lBQ3hELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsMEJBQTBCLENBQzdCLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssS0FBSztRQUNaLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLElBQUksRUFBRSxTQUFTO1lBQ2YsU0FBUyxFQUFFLDBCQUEwQjtTQUN4QyxDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNO1FBQ0YsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLEVBQzFDLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUNuRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFDL0QsWUFBWSxHQUNSLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFOUQsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM5RCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxJQUFZLFVBQVUsRUFBRTtnQkFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDOUI7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFBOzt5Q0FFc0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLG1CQUFtQixJQUFJO2FBQzNELEtBQUssQ0FBQyxHQUFHLHNCQUFzQixZQUFZOytCQUNqQyxTQUFTLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNOzs7Ozs7K0RBTUgsS0FBSztzQ0FDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPOztXQUU3QyxTQUFTLENBQUMsS0FBSyxHQUFHLEdBQUc7UUFDeEIsU0FBUyxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDLEtBQUs7WUFDNUIsR0FBRyxVQUFVLFNBQVMsQ0FBQyxLQUFLO1FBQ3hDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxJQUFJLFNBQVMsQ0FBQyxLQUFLO1lBQzVCLEdBQUcsV0FBVyxTQUFTLENBQUMsS0FBSzs7Ozs7K0RBS2MsS0FBSztzQ0FDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPOztXQUU3QyxTQUFTLENBQUMsS0FBSyxHQUFHLEdBQUc7UUFDeEIsU0FBUyxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDLEtBQUs7WUFDNUIsR0FBRyxVQUFVLFNBQVMsQ0FBQyxLQUFLO1FBQ3hDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxJQUFJLFNBQVMsQ0FBQyxLQUFLO1lBQzVCLEdBQUcsV0FBVyxTQUFTLENBQUMsS0FBSzs7OztrQ0FJZixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7U0FDekMsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9