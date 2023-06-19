var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SGoogleMapComponentInterface from './interface/SGoogleMapComponentInterface';
// @ts-ignore
import __css from '../../../../src/css/s-google-map.css'; // relative to /dist/pkg/esm/js
/**
 * @name                SGoogleMapComponent
 * @as                  Google map
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SGoogleMapComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-google-map
 * @platform            html
 * @status              beta
 *
 * This component allows you to create easily nice google map with custom marker(s) on it.
 *
 * @feature          Framework agnostic. Simply webcomponent.
 * @feature            Support of (custom) marker(s)
 * @feature            Declarative markers using simple `s-gogle-map-marker` tag
 * @feature            Theming your map as usual using the [Google cloud maps styles](https://console.cloud.google.com/google/maps-apis/studio/styles)
 * @feature              And more...
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @import          import { define as __SGoogleMapComponentDefine } from '@coffeekraken/s-google-map-component';
 *
 * @snippet         __SGoogleMapComponentDefine($1)
 *
 * @install           shell
 * npm i @coffeekraken/s-google-map-component
 *
 * @install           js
 * import { __define as __SGoogleMapComponentDefine } from '@coffeekraken/s-google-map-component';
 * __SGoogleMapComponentDefine();
 *
 * @example         html        Simple google map
 * <s-google-map class="s-ratio:16-9" map-id="7bfb2f702a07e548" lat="46.618038" lng="7.057280" zoom="10">
 *      <s-google-map-marker lat="46.118038" lng="7.157280">
 *           <div class="my-map-marker">
 *              <h1 class="s-typo:h1">
 *                  Hello google!
 *              </h1>
 *           </div>
 *       </s-google-map-marker>
 * </s-google-map>
 *
 * @example         html        Using the base s-google-map classes
 * <s-google-map class="s-ratio:16-9" map-id="7bfb2f702a07e548" lat="46.618038" lng="7.057280" zoom="10">
 *   <s-google-map-marker lat="46.148038" lng="7.257280">
 *       <div class="s-google-map-marker">
 *           <div class="s-google-map-marker_icon">
 *               <i class="fa-solid fa-location-dot s-tc:accent"></i>
 *           </div>
 *           <div class="s-google-map-marker_content">
 *               <h1 class="s-typo:h1">
 *                  Hello google!
 *              </h1>
 *           </div>
 *       </div>
 *   </s-google-map-marker>
 * </s-google-map>
 *
 * @example         html        Using multiple markers
 * <s-google-map class="s-ratio:16-9" map-id="7bfb2f702a07e548" lat="46.618038" lng="7.057280">
 *   <s-google-map-marker lat="46.148038" lng="7.257280">
 *       <div class="s-google-map-marker">
 *           <div class="s-google-map-marker_icon">
 *               <i class="fa-solid fa-location-dot s-tc:accent"></i>
 *           </div>
 *           <div class="s-google-map-marker_content">
 *               <h1 class="s-typo:h1">
 *                  Hello google! #1
 *              </h1>
 *           </div>
 *       </div>
 *   </s-google-map-marker>
 *   <s-google-map-marker lat="46.248038" lng="7.457280">
 *       <div class="s-google-map-marker">
 *           <div class="s-google-map-marker_icon">
 *               <i class="fa-solid fa-location-dot s-tc:accent"></i>
 *           </div>
 *           <div class="s-google-map-marker_content">
 *               <h1 class="s-typo:h1">
 *                  Hello google! #2
 *              </h1>
 *           </div>
 *       </div>
 *   </s-google-map-marker>
 * </s-google-map>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SGoogleMapComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SGoogleMapComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    static loadApi(apiKey) {
        if (this._loadApiPromise) {
            return this._loadApiPromise;
        }
        this._loadApiPromise = new Promise((resolve) => {
            const $script = document.createElement('script');
            $script.setAttribute('id', 's-google-map-component');
            $script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=beta&libraries=marker&callback=_initMap`;
            $script.async = true;
            // @ts-ignore
            window._initMap = function () {
                resolve(null);
            };
            document.head.appendChild($script);
        });
        return this._loadApiPromise;
    }
    constructor() {
        super(__deepMerge({
            name: 's-google-map',
            interface: __SGoogleMapComponentInterface,
        }));
        // get the markers
        this._markers = this._getMarkers();
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // load the google map api
            // @ts-ignore
            yield this.constructor.loadApi(this.props.apiKey);
            // create the actual map
            this._map = new google.maps.Map(this, {
                center: { lat: this.props.lat, lng: this.props.lng },
                zoom: 8,
                mapId: this.props.mapId,
                zoomControl: this.props.zoomControl,
                mapTypeControl: this.props.mapTypeControl,
                scaleControl: this.props.scaleControl,
                streetViewControl: this.props.streetViewControl,
                rotateControl: this.props.rotateControl,
                fullscreenControl: this.props.fullscreenControl,
                disableDefaultUI: true,
            });
            // create markers
            this._createMarkers(this._markers);
            // handle bounds and zoom
            this._handleBoundsAndZoom();
        });
    }
    /**
     * Handle bounds and zoom
     */
    _handleBoundsAndZoom() {
        // handle bounds and zoom
        const boundsListener = this._map.addListener('bounds_changed', () => {
            // do this only once
            google.maps.event.removeListener(boundsListener);
            // bounds id needed
            if (this.props.bounds) {
                this._bounds(this._markers);
            }
            // apply zoom if specified
            if (this.props.zoom) {
                this._map.setZoom(this.props.zoom);
            }
        });
    }
    /**
     * Bounds markers
     */
    _bounds(markers) {
        const bounds = new google.maps.LatLngBounds();
        for (let marker of markers) {
            const latLng = new google.maps.LatLng(marker.lat, marker.lng);
            bounds.extend(latLng);
        }
        this._map.fitBounds(bounds);
    }
    /**
     * Create the markers
     */
    _createMarkers(markers) {
        for (let marker of markers) {
            const latLng = { lat: marker.lat, lng: marker.lng };
            if (!marker.content) {
                const $defaultMarkerContent = document.createElement('div');
                const domParser = new DOMParser(), markerDocument = domParser.parseFromString(`
                        <div class="${this.utils.cls('-marker')}">
                            <div class="${this.utils.cls('-marker__icon')}">
                                ${this.props.icons.marker}
                            </div>
                        </div>
                    `, 'text/html');
                marker.content = markerDocument.body.children[0];
            }
            marker.marker = new google.maps.marker.AdvancedMarkerView({
                map: this._map,
                content: marker.content,
                position: latLng,
            });
        }
    }
    /**
     * Get the markers from the component children
     */
    _getMarkers() {
        const markers = Array.from(
        // @ts-ignore
        this.querySelectorAll(`${this.tagName.toLowerCase()}-marker`)).map(($marker) => {
            var _a, _b;
            return {
                lat: parseFloat((_a = $marker.getAttribute('lat')) !== null && _a !== void 0 ? _a : '0'),
                lng: parseFloat((_b = $marker.getAttribute('lng')) !== null && _b !== void 0 ? _b : '0'),
                icon: $marker.getAttribute('icon'),
                content: $marker.children.length ? $marker.children[0] : null,
            };
        });
        return markers;
    }
    render() {
        return html ``;
    }
}
SGoogleMapComponent.state = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyw4QkFBOEIsTUFBTSwwQ0FBMEMsQ0FBQztBQUV0RixhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sc0NBQXNDLENBQUMsQ0FBQywrQkFBK0I7QUE4QnpGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkZHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyxtQkFBb0IsU0FBUSxlQUFlO0lBQzVELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsOEJBQThCLENBQ2pDLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFLRCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQWM7UUFDekIsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMzQyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxF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