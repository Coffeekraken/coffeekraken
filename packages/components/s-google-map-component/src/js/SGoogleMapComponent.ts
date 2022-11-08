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
}

export interface ISGoogleMapComponentIcons {
    marker: string;
}

export interface ISGoogleMapComponentProps {
    apiKey: string;
    lat: number;
    lng: number;
    zoom: number;
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
                console.log('loaded');
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
    }

    /**
     * Create the markers
     */
    _createMarkers(markers: ISGoogleMapComponentMarker[]): void {
        for (let marker of markers) {
            const latLng = { lat: marker.lat, lng: marker.lng };

            if (!marker.content) {
                const $defaultMarkerContent = document.createElement('div');
                $defaultMarkerContent.classList.add(
                    this.componentUtils.className('__marker'),
                );
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

            // } else {
            //     // @ts-ignore
            //     marker.marker = new google.maps.Marker({
            //         position: latLng,
            //         map: this._map,
            //         title: 'Hello World!',
            //     });
            // }
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
