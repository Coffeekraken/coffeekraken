import __SInterface from '@coffeekraken/s-interface';

export default class SSliderComponentInterface extends __SInterface {
    static get _definition(): {
        direction: {
            description: string;
            values: string[];
            type: string;
            physical: boolean;
            default: string;
        };
        behaviors: {
            description: string;
            type: string;
            default: {};
        };
        behavior: {
            description: string;
            values: string[];
            type: string;
            default: string;
            physical: boolean;
        };
        pad: {
            type: string;
            description: string;
            default: boolean;
        };
        nextIconClass: {
            description: string;
            type: string;
        };
        previousIconClass: {
            description: string;
            type: string;
        };
        uiContainer: {
            description: string;
            type: string;
        };
        controls: {
            description: string;
            type: string;
            default: boolean;
        };
        nav: {
            description: string;
            type: string;
            default: boolean;
        };
        swipe: {
            description: string;
            type: string;
            default: boolean;
        };
        mousewheel: {
            description: string;
            type: string;
            default: boolean;
        };
        clickOnSlide: {
            description: string;
            type: string;
            default: boolean;
        };
        loop: {
            description: string;
            type: string;
            default: boolean;
        };
        slide: {
            description: string;
            type: string;
            default: number;
            physical: boolean;
        };
        slidesByPage: {
            description: string;
            type: string;
            default: number;
        };
        progress: {
            description: string;
            type: string;
            default: boolean;
        };
        timer: {
            description: string;
            type: string;
        };
        autoplay: {
            description: string;
            type: string;
            default: boolean;
        };
        intersectionClasses: {
            description: string;
            type: string;
            default: boolean;
        };
        transitionDuration: {
            description: string;
            type: string;
            default: number;
        };
        transitionEasing: {
            description: string;
            type: string;
            default: any;
        };
        transitionHandler: {
            description: string;
            type: string;
        };
    };
}
