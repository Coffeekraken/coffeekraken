<?php

namespace Sugar\css;

/**
 * @name            paddingClasses
 * @namespace            php.css
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function takes an object|array of paddings issued from the themePadding.config.ts configuration file like:
 * - "blockStart" => 10
 * - "inlineEnd" => 30
 * - "block" => 10
 * - etc...
 * This function will returns you the classes like "s-pbs:10" that you can apply where you want in your views.
 *
 * @param       {Array|Object}         $paddings           Some paddings like "block" => 10, etc...
 * @param       {Array|Object}          [$frontspec=[]]     The frontspec json to handle things like defaultMedia, etc...
 * @return      {String}                         The resulting css classes
 *
 * @example         php
 * \Sugar\css\paddingClasses([
 *      'block' => 20,
 *      'inlineEnd' => 10
 * ]);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function paddingClasses($paddings = [], $frontspec = [])
{
    // cast to object
    $frontspec = \Sugar\convert\toObject($frontspec);
    $paddings = (array) $paddings;
    $classes = [];
    $defaultMedia = 'desktop';

    // if the frontspec has been specified, check for the
    // default media
    if (isset($frontspec->media->defaultMedia)) {
        $defaultMedia = $frontspec->media->defaultMedia;
    }

    if (isset($paddings['media'])) {
        foreach ($paddings['media'] as $media => $value) {
            if ($media === $defaultMedia) {
                array_unshift(
                    $classes,
                    paddingClasses($paddings['media'][$media])
                );
            } else {
                array_push($classes, '@' . $media);
                array_push(
                    $classes,
                    paddingClasses($paddings['media'][$media])
                );
            }
        }
    } else {
        if (isset($paddings['all'])) {
            array_push($classes, 's-p--' . $paddings['all']);
        }

        if (isset($paddings['block'])) {
            array_push($classes, 's-pb--' . $paddings['block']);
        }
        if (isset($paddings['inline'])) {
            array_push($classes, 's-pi--' . $paddings['inline']);
        }

        if (isset($paddings['blockStart'])) {
            array_push($classes, 's-pbs--' . $paddings['blockStart']);
        }
        if (isset($paddings['blockEnd'])) {
            array_push($classes, 's-pbe--' . $paddings['blockEnd']);
        }
        if (isset($paddings['inlineStart'])) {
            array_push($classes, 's-pis--' . $paddings['inlineStart']);
        }
        if (isset($paddings['inlineEnd'])) {
            array_push($classes, 's-pie--' . $paddings['inlineEnd']);
        }
    }

    return implode(' ', $classes);
}
