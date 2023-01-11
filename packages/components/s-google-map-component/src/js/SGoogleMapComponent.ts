import __SLitComponent from '@coffeekraken/s-lit-component';

import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SGoogleMapComponentInterface from './interface/SGoogleMapComponentInterface';

// @ts-ignore
import __css from '../../../../src/css/s-google-map.css'; // relative to /dist/pkg/esm/js

import __define from './define';

export interface ISGoogleMapComponentMarker {
    lat: number;
    lng: number;
    icon?: string;
    content?: HTMLElement;
    marker: any;
}

export interface ISGoogleMapComponentIcons {
    marker: string;
}

export interface ISGoogleMapComponentProps {
    apiKey: string;
    lat: number;
    lng: number;
    zoom: number;
    bounds: boolean;
    theme: any;
    icons: ISGoogleMapComponentIcons;
    zoomControl: boolean;
    mapTypeControl: boolean;
    scaleControl: boolean;
    streetViewControl: boolean;
    rotateControl: boolean;
    fullscreenControl: boolean;
}

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

export default class SGoogleMapComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            __SGoogleMapComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    static state = {};

    static _loadApiPromise;
    static loadApi(apiKey: string): Promise<any> {
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

    // store the google map instance
    _map;
    _markers: ISGoogleMapComponentMarker[];

    constructor() {
        super(
            __deepMerge({
                name: 's-google-map',
                interface: __SGoogleMapComponentInterface,
            }),
        );
        // get the markers
        this._markers = this._getMarkers();
    }

    async mount() {
        // load the google map api
        // @ts-ignore
        await this.constructor.loadApi(this.props.apiKey);

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
    _bounds(markers: ISGoogleMapComponentMarker[]): void {
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
    _createMarkers(markers: ISGoogleMapComponentMarker[]): void {
        for (let marker of markers) {
            const latLng = { lat: marker.lat, lng: marker.lng };

            if (!marker.content) {
                const $defaultMarkerContent = document.createElement('div');

                const domParser = new DOMParser(),
                    markerDocument = domParser.parseFromString(
                        `
                        <div class="${this.utils.cls('-marker')}">
                            <div class="${this.utils.cls('-marker__icon')}">
                                ${this.props.icons.marker}
                            </div>
                        </div>
                    `,
                        'text/html',
                    );

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
    _getMarkers(): ISGoogleMapComponentMarker[] {
        const markers: ISGoogleMapComponentMarker[] = Array.from(
            // @ts-ignore
            this.querySelectorAll(`${this.tagName.toLowerCase()}-marker`),
        ).map(($marker: HTMLElement) => {
            return {
                lat: parseFloat($marker.getAttribute('lat') ?? '0'),
                lng: parseFloat($marker.getAttribute('lng') ?? '0'),
                icon: $marker.getAttribute('icon'),
                content: $marker.children.length ? $marker.children[0] : null,
            };
        });
        return markers;
    }

    render() {
        return html``;
    }
}

export { __define as define };
