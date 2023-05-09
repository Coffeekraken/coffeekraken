<?php

namespace Sugar\css;

/**
 * @name            layoutCss
 * @namespace            php.css
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function takes a layout definition like "1 2 _ 3 3" and generate the css that will handle this layout.
 * You can as well pass some informations the gap wanted, the alignement, etc...
 *
 * @param       {String}         $layout            The layout string defintion you want to generate the css for like "1 2 _ 3 3"
 * @param       {Array}         [$settings=[]]      Some settings to configure your layout generation
 * @return      {String}                         The resulting css
 *
 * @setting        {String}         [selector='#layout']       A css selector used to target the correct section/div...
 * @setting         {String}        [gap=null]                 A gap value to apply on your layout
 * @setting         {Boolean}       [gapBetween=true]           Specify if you want the gap only between the cells or all around
 * @setting         {String}        [align='stretch']           The "align-items" value for your grid layout
 * @setting         {String}        [justify='stretch']         The "justify-items" value for your grid layout
 * @setting         {String}        [media=null]                A media to pass to the \Sugar\css\buildMediaQuery function to scope the generated css in the correct media query
 * @setting         {Array}         [mediaSettings=[]]          Specify the \Sugar\css\buildMediaQuery $settings parameter if you specify a "media" setting
 * @setting         {Boolean}       [minify=true]             Minify the output css or not
 * @setting         {Array}         [$scope=['bare','lnf','gap','align','justify']]             The scope(s) you want to generate
 *
 * @snippet             \Sugar\css\layoutCss($1);
 *
 * @example         php
 * $css = \Sugar\css\layoutCss('1 2 _ 3 3', [
 *      'selector' => '#my-layout'
 * ]);
 * print '<style>' . $css . '</style>';
 * print '<div class="s-layout" id="my-layout">
 *      <div class="s-layout_area-1">Cell #1</div>
 *      <div class="s-layout_area-2">Cell #2</div>
 *      <div class="s-layout_area-3>Cell #3</div>
 * </div>';
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function layoutCss($layout, $settings = [])
{
    $media = new \SMedia();
    $res = $media->layoutCss($layout, $settings);
    return $res;
}
