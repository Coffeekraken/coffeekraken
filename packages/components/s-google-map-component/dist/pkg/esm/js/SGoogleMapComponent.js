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
export default class SGoogleMapComponent extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            name: 's-google-map',
            interface: __SGoogleMapComponentInterface,
        }));
        // get the markers
        this._markers = this._getMarkers();
    }
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
        return html ``;
    }
}
SGoogleMapComponent.state = {};
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyw4QkFBOEIsTUFBTSwwQ0FBMEMsQ0FBQztBQUV0RixhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sc0NBQXNDLENBQUMsQ0FBQywrQkFBK0I7QUFFekYsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBOEJoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUFvQixTQUFRLGVBQWU7SUF5QzVEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLElBQUksRUFBRSxjQUFjO1lBQ3BCLFNBQVMsRUFBRSw4QkFBOEI7U0FDNUMsQ0FBQyxDQUNMLENBQUM7UUFDRixrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQWpERCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLDhCQUE4QixDQUNqQyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUMsS0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBS0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFjO1FBQ3pCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDL0I7UUFDRCxJQUFJ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