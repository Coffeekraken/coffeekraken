import __SLitComponent from '@coffeekraken/s-lit-component';
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

export default class SGoogleMapComponent extends __SLitComponent {
    static get properties(): any;
    static get styles(): import("lit").CSSResult;
    static state: {};
    static _loadApiPromise: any;
    static loadApi(apiKey: string): Promise<any>;
    _map: any;
    _markers: ISGoogleMapComponentMarker[];
    constructor();
    mount(): Promise<void>;
    
    _handleBoundsAndZoom(): void;
    
    _bounds(markers: ISGoogleMapComponentMarker[]): void;
    
    _createMarkers(markers: ISGoogleMapComponentMarker[]): void;
    
    _getMarkers(): ISGoogleMapComponentMarker[];
    render(): import("lit-html").TemplateResult<1>;
}
export { __define as define };
