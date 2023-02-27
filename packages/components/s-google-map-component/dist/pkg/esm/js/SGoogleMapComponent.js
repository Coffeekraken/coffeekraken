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
import __define from './define';
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
 * import { define as __SGoogleMapComponentDefine } from '@coffeekraken/s-google-map-component';
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
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyw4QkFBOEIsTUFBTSwwQ0FBMEMsQ0FBQztBQUV0RixhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sc0NBQXNDLENBQUMsQ0FBQywrQkFBK0I7QUFFekYsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBOEJoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJGRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sbUJBQW9CLFNBQVEsZUFBZTtJQUM1RCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLDhCQUE4QixDQUNqQyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUMsS0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBS0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFjO1FBQ3pCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDM0MsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZ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