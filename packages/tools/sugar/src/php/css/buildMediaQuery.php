<?php

namespace Sugar\css;

/**
 * @name            buildMediaQuery
 * @namespace            php.css
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function takes a media query definition like "mobile", ">mobile", "=tablet", etc... and
 * returns you the corresponding css media query string.
 * This is based on the passed settings that you can pass as a second parameter.
 *
 * Here's the default medias availables:
 * - mobile: 0-639px
 * - tablet: 640px-1279px
 * - desktop: 1280px-2047px
 * - wide: 2048px-...
 * - dwarf: 0-700px (height)
 * You can as well override these in the $settings parameter.
 *
 * @param       {String}        $media          The media query definition you want like "mobile", ">mobile", etc...
 * @param       {Array}         [$settings=[]]      Some settings to configure your media query css generation
 *
 * @setting         {String}        [defaultAction='>=']        Specify the default action you want when none is passed in the $media parameter. Can be "<", ">", "=", "<=" or ">=".
 * @setting         {String}        [defaultQuery='screen']         A default query to always use in the generation
 * @setting         {Array}         [queries=['mobile'=>[],'tablet'=>[],'desktop'=>[],'wide'=>[],'dwarf'=>[]]]      All the available queries you want to support with for each the "min-width|height" and "max-width|height" values in integer (used as px)
 *
 * @example         php
 * \Sugar\css\buildMediaQuery('desktop');
 * \Sugar\css\buildMediaQuery('>desktop');
 * \Sugar\css\buildMediaQuery('<tablet');
 * \Sugar\css\buildMediaQuery('desktop', [
 *   'queries' => [
 *      'desktop' => [
 *          'min-width': 1000,
 *          'max-width': null
 *      ]
 *   ]
 * ]);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function buildMediaQuery($media, $params = null)
{
    $finalParams = (object) [
        'defaultAction' => '>=',
        'defaultQuery' => 'screen',
        'queries' => [
            'mobile' => [
                'min-width' => 0,
                'max-width' => 639,
            ],
            'tablet' => [
                'min-width' => 640,
                'max-width' => 1279,
            ],
            'desktop' => [
                'min-width' => 1280,
                'max-width' => 2047,
            ],
            'wide' => [
                'min-width' => 2048,
                'max-width' => null,
            ],
            'dwarf' => [
                'min-height' => null,
                'max-height' => 700,
            ],
        ],
    ];

    // if (isset($params)) {
    //     var_dump($params);
    // }

    $finalParams = (object) $params;
    $finalParams = (object) \Sugar\convert\objectToArray($finalParams);

    $queries = [];

    $qs = explode(',', trim($media));
    foreach ($qs as $query) {
        array_push($queries, trim($query));
    }

    $fullQueriesList = [];

    foreach ($queries as $query) {
        $currentQueryList = [];

        if ($query == 'and' || $query == 'or') {
            array_push($currentQueryList, $query);
            continue;
        }

        $firstChar = substr($query, 0, 1);
        $firstTwoChar = substr($query, 0, 2);
        $lastChar = substr($query, -1);

        $action = $finalParams->defaultAction;
        $mediaName = $query;

        if ($lastChar == '-' || $lastChar == '|') {
            $mediaName = substr($mediaName, 0, -1);
        }

        if (
            $firstTwoChar == '>=' ||
            $firstTwoChar == '<=' ||
            $firstTwoChar == '=='
        ) {
            $mediaName = substr($mediaName, 2);
            $action = $firstTwoChar;
        } elseif ($firstChar == '<' || $firstChar == '>' || $firstChar == '=') {
            $mediaName = substr($mediaName, 1);
            $action = $firstChar;
        }

        $mediaQueryConfig = $finalParams->queries[$mediaName];

        if (!$mediaQueryConfig) {
            throw new \Exception(
                '[buildMediaQuery] Sorry but the requested media "' .
                    $mediaName .
                    '" does not exists in the config'
            );
        }

        $queryList = [];
        foreach (array_keys((array) $mediaQueryConfig) as $prop) {
            $value = $mediaQueryConfig[$prop];

            if (!$value) {
                continue;
            }

            if (
                in_array($prop, [
                    'min-width',
                    'max-width',
                    'min-device-width',
                    'max-device-width',
                ])
            ) {
                if ($action == '>') {
                    if ($prop == 'max-width' || $prop == 'max-device-width') {
                        $argName = 'min-width';
                        if (str_contains($prop, '-device')) {
                            $argName = 'min-device-width';
                        }
                        array_push(
                            $queryList,
                            '(' . $argName . ': ' . ($value + 1) . 'px)'
                        );
                    }
                } elseif ($action == '<') {
                    if ($prop == 'min-width' || $prop == 'min-device-width') {
                        $argName = 'max-width';
                        if (str_contains($prop, '-device')) {
                            $argName = 'max-device-width';
                        }
                        array_push(
                            $queryList,
                            '(' . $argName . ': ' . $value . 'px)'
                        );
                    }
                } elseif ($action == '=') {
                    array_push($queryList, '(' . $prop . ': ' . $value . 'px)');
                } elseif ($action == '>=') {
                    if ($prop == 'min-width' || $prop == 'min-device-width') {
                        array_push(
                            $queryList,
                            '(' . $prop . ': ' . $value . 'px)'
                        );
                    }
                } elseif ($action == '<=') {
                    if ($prop == 'max-width' || $prop == 'max-device-width') {
                        array_push(
                            $queryList,
                            '(' . $prop . ': ' . $value . 'px)'
                        );
                    }
                } else {
                    array_push($queryList, '(' . $prop . ': ' . $value . 'px)');
                }
            } else {
                array_push($queryList, '(' . $prop . ': ' . $value . 'px)');
            }
        }

        if ($lastChar == '-') {
            array_push($queryList, '(orientation: landscape)');
        } elseif ($lastChar == '|') {
            array_push($queryList, '(orientation: portrait)');
        }

        array_push($currentQueryList, implode(' and ', $queryList));

        array_push($fullQueriesList, implode(' ', $currentQueryList));
    }

    $fullQueriesList = array_filter($fullQueriesList, function ($l) {
        return trim($l) !== '';
    });

    if (count($fullQueriesList)) {
        array_unshift($fullQueriesList, 'and');
    }
    array_unshift($fullQueriesList, $finalParams->defaultQuery);

    return '@media ' . implode(' ', $fullQueriesList);
}
