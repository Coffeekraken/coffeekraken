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
        const boundings = this.getBoundingClientRect();
        const strokeWidth = parseFloat(window.getComputedStyle(this).strokeWidth);
        const scale = (1 / (boundings.width + strokeWidth)) * boundings.width;
        console.log('stro', strokeWidth, scale);
        return html `
            <svg
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
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTywwQkFBMEIsTUFBTSx5Q0FBeUMsQ0FBQztBQUVqRixhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sMkNBQTJDLENBQUMsQ0FBQywrQkFBK0I7QUFTOUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxlQUFlO0lBQ3hELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsMEJBQTBCLENBQzdCLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssS0FBSztRQUNaLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLElBQUksRUFBRSxTQUFTO1lBQ2YsU0FBUyxFQUFFLDBCQUEwQjtTQUN4QyxDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNO1FBQ0YsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFL0MsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUMxQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUM1QyxDQUFDO1FBRUYsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUV0RSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEMsT0FBTyxJQUFJLENBQUE7OytCQUVZLFNBQVMsQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLE1BQU07Ozs7OzsrREFNSCxLQUFLO3NDQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87O1dBRTdDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsR0FBRztRQUN4QixTQUFTLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUMsS0FBSztZQUM1QixHQUFHLFVBQVUsU0FBUyxDQUFDLEtBQUs7UUFDeEMsU0FBUyxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDLEtBQUs7WUFDNUIsR0FBRyxXQUFXLFNBQVMsQ0FBQyxLQUFLOzs7OzsrREFLYyxLQUFLO3NDQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87O1dBRTdDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsR0FBRztRQUN4QixTQUFTLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUMsS0FBSztZQUM1QixHQUFHLFVBQVUsU0FBUyxDQUFDLEtBQUs7UUFDeEMsU0FBUyxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDLEtBQUs7WUFDNUIsR0FBRyxXQUFXLFNBQVMsQ0FBQyxLQUFLOzs7O1NBSXhDLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==