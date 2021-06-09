import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __unique from '@coffeekraken/sugar/shared/array/unique';

class postcssSugarPluginFlexClassesInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginFlexClassesParams {}

export { postcssSugarPluginFlexClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginFlexClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginFlexClassesParams = {
    ...params
  };

  const vars: string[] = [];

  vars.push(`/**
            * @name          s-flex
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows you to apply the flex styling to any HTMLElement
            * 
            * @example        html
            * <div class="s-flex"></div>
            */
            [class*="s-flex"]:not([class*="s-flex-item"]) {
                display: flex;
            }`);

    vars.push(`/**
            * @name          s-flex:row
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the flex-direction to row
            * 
            * @example        html
            * <div class="s-flex:row"></div>
            */
            [class*="s-flex"][class*=":row"]:not([class*="s-flex-item"]) {
                flex-direction: row;
            }`);

    vars.push(`/**
            * @name          s-flex:row-reverse
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the flex-direction to row-reverse
            * 
            * @example        html
            * <div class="s-flex:row-reverse"></div>
            */
            [class*="s-flex"][class*=":row-reverse"]:not([class*="s-flex-item"]) {
                flex-direction: row-reverse;
            }`);

    vars.push(`/**
            * @name          s-flex:column
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the flex-direction to column
            * 
            * @example        html
            * <div class="s-flex:column"></div>
            */
            [class*="s-flex"][class*=":column"]:not([class*="s-flex-item"]) {
                flex-direction: column;
            }`);

    vars.push(`/**
            * @name          s-flex:column-reverse
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the flex-direction to column-reverse
            * 
            * @example        html
            * <div class="s-flex:column-reverse"></div>
            */
            [class*="s-flex"][class*=":column-reverse"]:not([class*="s-flex-item"]) {
                flex-direction: column-reverse;
            }`);

    vars.push(`/**
            * @name          s-flex:nowrap
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the flex-wrap to nowrap
            * 
            * @example        html
            * <div class="s-flex:nowrap"></div>
            */
            [class*="s-flex"][class*=":nowrap"]:not([class*="s-flex-item"]) {
                flex-wrap: nowrap;
            }`);

    vars.push(`/**
            * @name          s-flex:wrap
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the flex-wrap to wrap
            * 
            * @example        html
            * <div class="s-flex:wrap"></div>
            */
            [class*="s-flex"][class*=":wrap"]:not([class*="s-flex-item"]) {
                flex-wrap: wrap;
            }`);

    vars.push(`/**
            * @name          s-flex:wrap-reverse
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the flex-wrap to wrap-reverse
            * 
            * @example        html
            * <div class="s-flex:wrap-reverse"></div>
            */
            [class*="s-flex"][class*=":wrap-reverse"]:not([class*="s-flex-item"]) {
                flex-wrap: wrap-reverse;
            }`);

    vars.push(`/**
            * @name          s-flex:justify-start
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the justify-content property to start
            * 
            * @example        html
            * <div class="s-flex:justify-start"></div>
            */
            [class*="s-flex"][class*=":justify-start"]:not([class*="s-flex-item"]) {
                justify-content: start;
            }`);
    
    vars.push(`/**
            * @name          s-flex:justify-flex-start
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the justify-content property to flex-start
            * 
            * @example        html
            * <div class="s-flex:justify-flex-start"></div>
            */
            [class*="s-flex"][class*=":justify-flex-start"]:not([class*="s-flex-item"]) {
                justify-content: flex-start;
            }`);

    vars.push(`/**
            * @name          s-flex:justify-end
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the justify-content property to end
            * 
            * @example        html
            * <div class="s-flex:justify-end"></div>
            */
            [class*="s-flex"][class*=":justify-end"]:not([class*="s-flex-item"]) {
                justify-content: end;
            }`);
    
    vars.push(`/**
            * @name          s-flex:justify-flex-end
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the justify-content property to flex-end
            * 
            * @example        html
            * <div class="s-flex:justify-flex-end"></div>
            */
            [class*="s-flex"][class*=":justify-flex-end"]:not([class*="s-flex-item"]) {
                justify-content: flex-end;
            }`);

    vars.push(`/**
            * @name          s-flex:justify-center
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the justify-content property to flex-center
            * 
            * @example        html
            * <div class="s-flex:justify-center"></div>
            */
            [class*="s-flex"][class*=":justify-center"]:not([class*="s-flex-item"]) {
                justify-content: center;
            }`);

    vars.push(`/**
            * @name          s-flex:justify-space-between
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the justify-content property to space-between
            * 
            * @example        html
            * <div class="s-flex:justify-space-between"></div>
            */
            [class*="s-flex"][class*=":justify-space-between"]:not([class*="s-flex-item"]) {
                justify-content: space-between;
            }`);

    vars.push(`/**
            * @name          s-flex:justify-space-around
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the justify-content property to space-around
            * 
            * @example        html
            * <div class="s-flex:justify-space-around"></div>
            */
            [class*="s-flex"][class*=":justify-space-around"]:not([class*="s-flex-item"]) {
                justify-content: space-around;
            }`);

    vars.push(`/**
            * @name          s-flex:justify-space-evenly
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the justify-content property to space-evenly
            * 
            * @example        html
            * <div class="s-flex:justify-space-evenly"></div>
            */
            [class*="s-flex"][class*=":justify-space-evenly"]:not([class*="s-flex-item"]) {
                justify-content: space-evenly;
            }`);

    vars.push(`/**
            * @name          s-flex:justify-stretch
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the justify-content property to stretch
            * 
            * @example        html
            * <div class="s-flex:justify-stretch"></div>
            */
            [class*="s-flex"][class*=":justify-stretch"]:not([class*="s-flex-item"]) {
                justify-content: stretch;
            }`);

    vars.push(`/**
            * @name          s-flex:align-start
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the align-items property to start
            * 
            * @example        html
            * <div class="s-flex:align-start"></div>
            */
            [class*="s-flex"][class*=":align-start"]:not([class*="s-flex-item"]) {
                align-items: start;
            }`);

    vars.push(`/**
            * @name          s-flex:align-flex-start
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the align-items property to flex-start
            * 
            * @example        html
            * <div class="s-flex:align-flex-start"></div>
            */
            [class*="s-flex"][class*=":align-flex-start"]:not([class*="s-flex-item"]) {
                align-items: flex-start;
            }`);

    vars.push(`/**
            * @name          s-flex:align-end
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the align-items property to end
            * 
            * @example        html
            * <div class="s-flex:align-end"></div>
            */
            [class*="s-flex"][class*=":align-end"]:not([class*="s-flex-item"]) {
                align-items: end;
            }`);

    vars.push(`/**
            * @name          s-flex:align-flex-end
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the align-items property to flex-end
            * 
            * @example        html
            * <div class="s-flex:align-flex-end"></div>
            */
            [class*="s-flex"][class*=":align-flex-end"]:not([class*="s-flex-item"]) {
                align-items: flex-end;
            }`);

    vars.push(`/**
            * @name          s-flex:align-center
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the align-items property to center
            * 
            * @example        html
            * <div class="s-flex:align-center"></div>
            */
            [class*="s-flex"][class*=":align-center"]:not([class*="s-flex-item"]) {
                align-items: center;
            }`);

    vars.push(`/**
            * @name          s-flex:align-baseline
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the align-items property to baseline
            * 
            * @example        html
            * <div class="s-flex:align-baseline"></div>
            */
            [class*="s-flex"][class*=":align-baseline"]:not([class*="s-flex-item"]) {
                align-items: baseline;
            }`);

    vars.push(`/**
        * @name          s-flex-item:grow
        * @namespace          sugar.css.flex
        * @type               CssClass
        * 
        * This class allows specify the flex-grow property of a flex item to 1
        * 
        * @example        html
        * <div class="s-flex">
        *   <div class="s-flex-item:grow"></div>
        * </div>
        */
        [class*="s-flex-item"][class*=":grow"]:not([class*=":grow-"]) {
            flex-grow: 1;
        }`);

    vars.push(`/**
        * @name          s-flex-item:shrink
        * @namespace          sugar.css.flex
        * @type               CssClass
        * 
        * This class allows specify the flex-shrink property of a flex item to 1
        * 
        * @example        html
        * <div class="s-flex">
        *   <div class="s-flex-item:shrink"></div>
        * </div>
        */
        [class*="s-flex-item"][class*=":shrink"]:not([class*=":shrink-"]) {
            flex-shrink: 1;
        }`);

    for (let i=1; i<20; i++) {
        vars.push(`/**
                * @name          s-flex-item:order-${i}
                * @namespace          sugar.css.flex
                * @type               CssClass
                * 
                * This class allows specify the order property of a flex item to ${i}
                * 
                * @example        html
                * <div class="s-flex">
                *   <div class="s-flex-item:order-${i}"></div>
                * </div>
                */
                [class*="s-flex-item"][class*=":order-${i}"] {
                    order: ${i};
                }`);
    }


    for (let i=1; i<20; i++) {
        vars.push(`/**
                * @name          s-flex-item:grow-${i}
                * @namespace          sugar.css.flex
                * @type               CssClass
                * 
                * This class allows specify the flex-grow property of a flex item to ${i}
                * 
                * @example        html
                * <div class="s-flex">
                *   <div class="s-flex-item:grow-${i}"></div>
                * </div>
                */
                [class*="s-flex-item"][class*=":grow-${i}"] {
                    flex-grow: ${i};
                }`);
            }

    for (let i=1; i<20; i++) {
        vars.push(`/**
                * @name          s-flex-item:shrink-${i}
                * @namespace          sugar.css.flex
                * @type               CssClass
                * 
                * This class allows specify the flex-shrink property of a flex item to ${i}
                * 
                * @example        html
                * <div class="s-flex">
                *   <div class="s-flex-item:shrink-${i}"></div>
                * </div>
                */
                [class*="s-flex-item"][class*=":shrink-${i}"] {
                    flex-shrink: ${i};
                }`);
            }

    vars.push(`/**
            * @name          s-flex-item:align-flex-start
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the align-self property of a flex item to flex-start
            * 
            * @example        html
            * <div class="s-flex">
            *   <div class="s-flex-item:align-flex-start"></div>
            * </div>
            */
            [class*="s-flex-item"][class*=":align-flex-start"] {
                align-self: flex-start;
            }`);

    vars.push(`/**
            * @name          s-flex-item:align-flex-end
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the align-self property of a flex item to flex-end
            * 
            * @example        html
            * <div class="s-flex">
            *   <div class="s-flex-item:align-flex-end"></div>
            * </div>
            */
            [class*="s-flex-item"][class*=":align-flex-end"] {
                align-self: flex-end;
            }`);

    vars.push(`/**
            * @name          s-flex-item:align-center
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the align-self property of a flex item to center
            * 
            * @example        html
            * <div class="s-flex">
            *   <div class="s-flex-item:align-center"></div>
            * </div>
            */
            [class*="s-flex-item"][class*=":align-center"] {
                align-self: center;
            }`);

    vars.push(`/**
            * @name          s-flex-item:align-baseline
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the align-self property of a flex item to baseline
            * 
            * @example        html
            * <div class="s-flex">
            *   <div class="s-flex-item:align-baseline"></div>
            * </div>
            */
            [class*="s-flex-item"][class*=":align-baseline"] {
                align-self: baseline;
            }`);

    vars.push(`/**
            * @name          s-flex-item:align-stretch
            * @namespace          sugar.css.flex
            * @type               CssClass
            * 
            * This class allows specify the align-self property of a flex item to stretch
            * 
            * @example        html
            * <div class="s-flex">
            *   <div class="s-flex-item:align-stretch"></div>
            * </div>
            */
            [class*="s-flex-item"][class*=":align-stretch"] {
                align-self: stretch;
            }`);

  replaceWith(vars);
}
