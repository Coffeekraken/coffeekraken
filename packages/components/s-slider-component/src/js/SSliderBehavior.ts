import SSliderComponent from './SSliderComponent';

export default class SSliderBehavior {

    /**
     * @name           settings
     * @type            any
     * 
     * Store the passed settings accessible through `this.settings`.
     * 
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    settings: any;

    /**
     * @name        $slider
     * @type        SSliderComponent
     * 
     * Store the slider web component instance to manupilate it or call methods like `next`, `goTo`, etc...
     * This is setted by the slider component instance directly...
     * 
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    $slider: SSliderComponent;

    /**
     * @name        constructor
     * @type        Function
     * @constructor
     * 
     * Constructor
     * 
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: any) {
        this.settings = settings ?? {};
        // @ts-ignore
        this.$slider = undefined;
    }
}