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
 * - "paddingTop" => 10
 * - "paddingLeft" => 30
 * - etc...
 * This function will returns you the classes like "s-pbs:10" that you can apply where you want in your views.
 * Supported paddings are:
 * - padding
 * - paddingBlock
 * - paddingInline
 * - paddingTop
 * - paddingRight
 * - paddingBottom
 * - paddingLeft
 * - block
 * - inline
 * - top
 * - right
 * - bottom
 * - left
 * - blockStart
 * - inlineEnd
 * - blockEnd
 * - inlineStart
 *
 * @param       {Array|Object}         $paddings           Some paddings like "paddingBlock" => 10, etc...
 * @param       {Array|Object}          [$frontspec=[]]     The frontspec json to handle things like defaultMedia, etc...
 * @return      {String}                         The resulting css classes
 *
 * @snippet         \Sugar\css\paddingClasses($1);
 *
 * @example         php
 * \Sugar\css\paddingClasses([
 *      'paddingBlock' => 20,
 *      'paddingRight' => 10
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
        if (isset($paddings['padding'])) {
            array_push($classes, 's-p-' . $paddings['padding']);
        }

        // block
        if (isset($paddings['paddingBlock'])) {
            array_push($classes, 's-pb-' . $paddings['paddingBlock']);
        } elseif (isset($paddings['block'])) {
            array_push($classes, 's-pb-' . $paddings['block']);
        } elseif (isset($paddings['y'])) {
            array_push($classes, 's-pb-' . $paddings['y']);
        }

        // inline
        if (isset($paddings['paddingInline'])) {
            array_push($classes, 's-pi-' . $paddings['paddingInline']);
        } elseif (isset($paddings['inline'])) {
            array_push($classes, 's-pi-' . $paddings['inline']);
        } elseif (isset($paddings['x'])) {
            array_push($classes, 's-pi-' . $paddings['x']);
        }

        // top
        if (isset($paddings['paddingTop'])) {
            array_push($classes, 's-pbs-' . $paddings['paddingTop']);
        } elseif (isset($paddings['top'])) {
            array_push($classes, 's-pbs-' . $paddings['top']);
        } elseif (isset($paddings['blockStart'])) {
            array_push($classes, 's-pbs-' . $paddings['blockStart']);
        }

        // right
        if (isset($paddings['paddingRight'])) {
            array_push($classes, 's-pie-' . $paddings['paddingRight']);
        } elseif (isset($paddings['right'])) {
            array_push($classes, 's-pie-' . $paddings['right']);
        } elseif (isset($paddings['inlineEnd'])) {
            array_push($classes, 's-pie-' . $paddings['inlineEnd']);
        }

        // bottom
        if (isset($paddings['paddingBottom'])) {
            array_push($classes, 's-pbe-' . $paddings['paddingBottom']);
        } elseif (isset($paddings['bottom'])) {
            array_push($classes, 's-pbe-' . $paddings['bottom']);
        } elseif (isset($paddings['blockEnd'])) {
            array_push($classes, 's-pbe-' . $paddings['blockEnd']);
        }

        // left
        if (isset($paddings['paddingLeft'])) {
            array_push($classes, 's-pis-' . $paddings['paddingLeft']);
        } elseif (isset($paddings['left'])) {
            array_push($classes, 's-pis-' . $paddings['left']);
        } elseif (isset($paddings['inlineStart'])) {
            array_push($classes, 's-pis-' . $paddings['inlineStart']);
        }
    }

    return implode(' ', $classes);
}
