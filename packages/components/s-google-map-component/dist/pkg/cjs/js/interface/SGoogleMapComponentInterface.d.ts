import __SInterface from '@coffeekraken/s-interface';

export default class SGoogleMapComponentInterface extends __SInterface {
    static get _definition(): {
        apiKey: {
            type: string;
            description: string;
            default: any;
            required: boolean;
        };
        mapId: {
            type: string;
            description: string;
            required: boolean;
        };
        lat: {
            type: string;
            description: string;
            required: boolean;
        };
        lng: {
            type: string;
            description: string;
            required: boolean;
        };
        zoom: {
            type: string;
            description: string;
        };
        bounds: {
            type: string;
            description: string;
            default: boolean;
        };
        icons: {
            type: string;
            description: string;
            default: {
                marker: string;
            };
        };
        zoomControl: {
            type: string;
            description: string;
            default: boolean;
        };
        mapTypeControl: {
            type: string;
            description: string;
            default: boolean;
        };
        scaleControl: {
            type: string;
            description: string;
            default: boolean;
        };
        streetViewControl: {
            type: string;
            description: string;
            default: boolean;
        };
        rotateControl: {
            type: string;
            description: string;
            default: boolean;
        };
        fullscreenControl: {
            type: string;
            description: string;
            default: boolean;
        };
    };
}
