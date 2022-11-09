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
 * @as                  Clipboard copy
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SGoogleMapComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-clipboard-copy
 * @platform            html
 * @status              beta
 *
 * This component allows you to create easily nice google map with custom markers on it
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
 * <s-google-map lat="46.618038" lng="7.057280"></s-google-map>
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
                console.log('loaded');
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
            // apply the zoom if needed
            if (this.props.zoom) {
                const boundsListener = this._map.addListener('bounds_changed', () => {
                    google.maps.event.removeListener(boundsListener);
                    this._map.setZoom(this.props.zoom);
                });
            }
            // bounds id needed
            if (this.props.bounds) {
                this._bounds(this._markers);
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
                $defaultMarkerContent.classList.add(this.componentUtils.className('__marker'));
                $defaultMarkerContent.innerHTML = `
                    ${this.props.icons.marker}
                `;
                marker.content = $defaultMarkerContent;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCx1REFBeUQ7QUFDekQsNkJBQTJDO0FBQzNDLDRHQUFzRjtBQUV0RixhQUFhO0FBQ2IsNEZBQXlELENBQUMsK0JBQStCO0FBRXpGLHNEQUFnQztBQXNOWCxpQkF0TmQsZ0JBQVEsQ0FzTlk7QUF4TDNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUVILE1BQXFCLG1CQUFvQixTQUFRLHlCQUFlO0lBeUM1RDtRQUNJLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQUM7WUFDUixJQUFJLEVBQUUsY0FBYztZQUNwQixTQUFTLEVBQUUsc0NBQThCO1NBQzVDLENBQUMsQ0FDTCxDQUFDO1FBQ0Ysa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFqREQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyx5QkFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0Ysc0NBQThCLENBQ2pDLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLElBQUEsU0FBRyxFQUFBO2NBQ0osSUFBQSxlQUFTLEVBQUMsMEJBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQUtELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBYztRQUN6QixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzNDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakQsT0FBTyxDQUFD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