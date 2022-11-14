"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const object_1 = require("@coffeekraken/sugar/object");
const lit_1 = require("lit");
const SGoogleMapComponentInterface_1 = __importDefault(require("./interface/SGoogleMapComponentInterface"));
// @ts-ignore
const s_google_map_css_1 = __importDefault(require("../../../../src/css/s-google-map.css")); // relative to /dist/pkg/esm/js
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
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
 * @install           shell
 * npm i @coffeekraken/s-google-map-component
 *
 * @install           js
 * import { define } from '@coffeekraken/s-google-map-component';
 * define();
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
 *           <div class="s-google-map-marker__icon">
 *               <i class="fa-solid fa-location-dot s-tc:accent"></i>
 *           </div>
 *           <div class="s-google-map-marker__content">
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
 *           <div class="s-google-map-marker__icon">
 *               <i class="fa-solid fa-location-dot s-tc:accent"></i>
 *           </div>
 *           <div class="s-google-map-marker__content">
 *               <h1 class="s-typo:h1">
 *                  Hello google! #1
 *              </h1>
 *           </div>
 *       </div>
 *   </s-google-map-marker>
 *   <s-google-map-marker lat="46.248038" lng="7.457280">
 *       <div class="s-google-map-marker">
 *           <div class="s-google-map-marker__icon">
 *               <i class="fa-solid fa-location-dot s-tc:accent"></i>
 *           </div>
 *           <div class="s-google-map-marker__content">
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
class SGoogleMapComponent extends s_lit_component_1.default {
    constructor() {
        super((0, object_1.__deepMerge)({
            name: 's-google-map',
            interface: SGoogleMapComponentInterface_1.default,
        }));
        // get the markers
        this._markers = this._getMarkers();
    }
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SGoogleMapComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_google_map_css_1.default)}
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
                        <div class="${this.componentUtils.className('-marker')}">
                            <div class="${this.componentUtils.className('-marker__icon')}">
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
        return (0, lit_1.html) ``;
    }
}
exports.default = SGoogleMapComponent;
SGoogleMapComponent.state = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCx1REFBeUQ7QUFDekQsNkJBQTJDO0FBQzNDLDRHQUFzRjtBQUV0RixhQUFhO0FBQ2IsNEZBQXlELENBQUMsK0JBQStCO0FBRXpGLHNEQUFnQztBQWtTWCxpQkFsU2QsZ0JBQVEsQ0FrU1k7QUFwUTNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Rkc7QUFFSCxNQUFxQixtQkFBb0IsU0FBUSx5QkFBZTtJQXdDNUQ7UUFDSSxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUFDO1lBQ1IsSUFBSSxFQUFFLGNBQWM7WUFDcEIsU0FBUyxFQUFFLHNDQUE4QjtTQUM1QyxDQUFDLENBQ0wsQ0FBQztRQUNGLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBaERELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLHNDQUE4QixDQUNqQyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxJQUFBLFNBQUcsRUFBQTtjQUNKLElBQUEsZUFBUyxFQUFDLDBCQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFLRCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQWM7UUFDekIsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMzQyxNQUFNLE9B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