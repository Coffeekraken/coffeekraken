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
 *
 * @param       {Array|Object}         $margins           Some margins like "marginTop" => 10, etc...
 * @param       {Array|Object}          [$frontspec=[]]     The frontspec json to handle things like defaultMedia, etc...
 * @return      {String}                         The resulting css classes
 *
 * @snippet         \Sugar\css\marginClasses($1);
 *
 * @example         php
 * \Sugar\css\marginClasses([
 *      'block' => 20,
 *      'inlineEnd' => 10
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
            array_push($classes, 's-m--' . $margins['all']);
        }

        if (isset($margins['marginBlock'])) {
            array_push($classes, 's-mb--' . $margins['block']);
        }
        if (isset($margins['marginInline'])) {
            array_push($classes, 's-mi--' . $margins['inline']);
        }

        if (isset($margins['marginTop'])) {
            array_push($classes, 's-mbs--' . $margins['marginTop']);
        }
        if (isset($margins['marginRight'])) {
            array_push($classes, 's-mie--' . $margins['marginRight']);
        }
        if (isset($margins['marginBottom'])) {
            array_push($classes, 's-mbe--' . $margins['marginBottom']);
        }
        if (isset($margins['marginLeft'])) {
            array_push($classes, 's-mis--' . $margins['marginLeft']);
        }
    }

    return implode(' ', $classes);
}
