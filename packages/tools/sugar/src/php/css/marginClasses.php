<?php

namespace Sugar\css;

/**
 * @name            marginClasses
 * @namespace            php.css
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function takes an object|array of margins issued from the themeMargin.config.ts configuration file like:
 * - "marginTop" => 10
 * - "marginLeft" => 30
 * - etc...
 * This function will returns you the classes like "s-mbs:10" that you can apply where you want in your views.
 * * Supported margins are:
 * - margin
 * - marginBlock
 * - marginInline
 * - marginTop
 * - marginRight
 * - marginBottom
 * - marginLeft
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
 * @param       {Array|Object}         $margins           Some margins like "marginTop" => 10, etc...
 * @param       {Array|Object}          [$frontspec=[]]     The frontspec json to handle things like defaultMedia, etc...
 * @return      {String}                         The resulting css classes
 *
 * @snippet         \Sugar\css\marginClasses($1);
 *
 * @example         php
 * \Sugar\css\marginClasses([
 *      'marginBlock' => 20,
 *      'marginRight' => 10
 * ]);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function marginClasses($margins = [], $frontspec = [])
{
    // cast to object
    $frontspec = \Sugar\convert\toObject($frontspec);
    $margins = (array) $margins;
    $classes = [];
    $defaultMedia = 'desktop';

    // if the frontspec has been specified, check for the
    // default media
    if (isset($frontspec->media->defaultMedia)) {
        $defaultMedia = $frontspec->media->defaultMedia;
    }

    if (isset($margins['media'])) {
        foreach ($margins['media'] as $media => $value) {
            if ($media === $defaultMedia) {
                array_unshift(
                    $classes,
                    marginClasses($margins['media'][$media])
                );
            } else {
                array_push($classes, '@' . $media);
                array_push($classes, marginClasses($margins['media'][$media]));
            }
        }
    } else {
        if (isset($margins['margin'])) {
            array_push($classes, 's-m-' . $margins['margin']);
        }

        // block
        if (isset($margins['marginBlock'])) {
            array_push($classes, 's-mb-' . $margins['marginBlock']);
        } elseif (isset($margins['block'])) {
            array_push($classes, 's-mb-' . $margins['block']);
        } elseif (isset($margins['y'])) {
            array_push($classes, 's-mb-' . $margins['y']);
        }

        // inline
        if (isset($margins['marginInline'])) {
            array_push($classes, 's-mi-' . $margins['marginInline']);
        } elseif (isset($margins['inline'])) {
            array_push($classes, 's-mi-' . $margins['inline']);
        } elseif (isset($margins['x'])) {
            array_push($classes, 's-mi-' . $margins['x']);
        }

        // top
        if (isset($margins['marginTop'])) {
            array_push($classes, 's-mbs-' . $margins['marginTop']);
        } elseif (isset($margins['top'])) {
            array_push($classes, 's-mbs-' . $margins['top']);
        } elseif (isset($margins['blockStart'])) {
            array_push($classes, 's-mbs-' . $margins['blockStart']);
        }

        // right
        if (isset($margins['marginRight'])) {
            array_push($classes, 's-mie-' . $margins['marginRight']);
        } elseif (isset($margins['right'])) {
            array_push($classes, 's-mie-' . $margins['right']);
        } elseif (isset($margins['inlineEnd'])) {
            array_push($classes, 's-mie-' . $margins['inlineEnd']);
        }

        // bottom
        if (isset($margins['marginBottom'])) {
            array_push($classes, 's-mbe-' . $margins['marginBottom']);
        } elseif (isset($margins['bottom'])) {
            array_push($classes, 's-mbe-' . $margins['bottom']);
        } elseif (isset($margins['blockEnd'])) {
            array_push($classes, 's-mbe-' . $margins['blockEnd']);
        }

        // left
        if (isset($margins['marginLeft'])) {
            array_push($classes, 's-mis-' . $margins['marginLeft']);
        } elseif (isset($margins['left'])) {
            array_push($classes, 's-mis-' . $margins['left']);
        } elseif (isset($margins['inlineStart'])) {
            array_push($classes, 's-mis-' . $margins['inlineStart']);
        }
    }

    return implode(' ', $classes);
}
